/**
 * Pure, dependency-free HTML SEO auditor for the admin "SEO page" detail view.
 * Parses a rendered page's HTML with attribute-order-tolerant regexes — no DOM,
 * no third-party parser — so it can run anywhere (server components, tests).
 *
 * Thresholds mirror the SEO dashboard: title 30–60 chars, description 70–155.
 */

export type SeoLight = "green" | "amber" | "red"

export type SeoHeading = {
  level: 1 | 2 | 3
  text: string
}

export type SeoAuditImages = {
  total: number
  missingAlt: number
  /** First 5 `src` values of images missing (or with empty) alt text. */
  missingAltSrcs: string[]
}

export type SeoAuditLinks = {
  internal: number
  external: number
}

export type SeoAudit = {
  title: string | null
  titleLength: number
  titleLight: SeoLight
  metaDescription: string | null
  metaDescriptionLength: number
  metaDescriptionLight: SeoLight
  canonical: string | null
  robots: string | null
  noIndex: boolean
  h1Count: number
  /** First 40 h1–h3 headings, in document order. */
  outline: SeoHeading[]
  images: SeoAuditImages
  wordCount: number
  links: SeoAuditLinks
  /** Every "@type" string found in JSON-LD scripts (including inside @graph). */
  jsonLdTypes: string[]
  ogImage: boolean
}

const TITLE_MIN = 30
const TITLE_MAX = 60
const DESCRIPTION_MIN = 70
const DESCRIPTION_MAX = 155
const OUTLINE_LIMIT = 40
const MISSING_ALT_SRC_LIMIT = 5

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  copy: "©",
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => {
      const code = Number.parseInt(hex, 16)
      return Number.isFinite(code) ? String.fromCodePoint(code) : ""
    })
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const code = Number.parseInt(dec, 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : ""
    })
    .replace(/&([a-z]+);/gi, (match, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
}

/** Parse a single tag's attributes regardless of order or quote style. */
function parseAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {}
  const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g
  let match: RegExpExecArray | null
  while ((match = attrPattern.exec(tag)) !== null) {
    const name = match[1].toLowerCase()
    const value = match[3] ?? match[4] ?? match[5] ?? ""
    attributes[name] = decodeEntities(value)
  }
  // Boolean attributes (e.g. a bare `alt`) — record as empty strings.
  const boolPattern = /[\s<]([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?=[\s/>])/g
  while ((match = boolPattern.exec(tag)) !== null) {
    const name = match[1].toLowerCase()
    if (!(name in attributes)) attributes[name] = ""
  }
  return attributes
}

function findTags(html: string, tagName: string): string[] {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi")
  return html.match(pattern) ?? []
}

function lengthLight(length: number, min: number, max: number): SeoLight {
  if (length === 0) return "red"
  return length >= min && length <= max ? "green" : "amber"
}

function collectJsonLdTypes(value: unknown, into: string[]): void {
  if (Array.isArray(value)) {
    for (const entry of value) collectJsonLdTypes(entry, into)
    return
  }
  if (value === null || typeof value !== "object") return
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === "@type") {
      if (typeof child === "string") into.push(child)
      else if (Array.isArray(child)) {
        for (const entry of child) if (typeof entry === "string") into.push(entry)
      }
      continue
    }
    collectJsonLdTypes(child, into)
  }
}

export function extractSeoAudit(html: string, opts: { origin: string }): SeoAudit {
  const origin = opts.origin.replace(/\/+$/, "")

  // --- title ---
  const titleMatch = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)
  const title = titleMatch ? stripTags(titleMatch[1]) || null : null
  const titleLength = title?.length ?? 0

  // --- meta tags (attribute-order tolerant) ---
  let metaDescription: string | null = null
  let robots: string | null = null
  let ogImage = false
  for (const tag of findTags(html, "meta")) {
    const attrs = parseAttributes(tag)
    const key = attrs.name ?? attrs.property
    if (!key) continue
    const lowered = key.toLowerCase()
    if (lowered === "description" && metaDescription === null) {
      metaDescription = attrs.content?.trim() || null
    } else if (lowered === "robots" && robots === null) {
      robots = attrs.content?.trim() || null
    } else if (lowered === "og:image" && attrs.content?.trim()) {
      ogImage = true
    }
  }
  const metaDescriptionLength = metaDescription?.length ?? 0
  const noIndex = robots !== null && /noindex/i.test(robots)

  // --- canonical ---
  let canonical: string | null = null
  for (const tag of findTags(html, "link")) {
    const attrs = parseAttributes(tag)
    if (attrs.rel?.toLowerCase() === "canonical" && attrs.href) {
      canonical = attrs.href
      break
    }
  }

  // --- headings ---
  const outline: SeoHeading[] = []
  let h1Count = 0
  const headingPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi
  let headingMatch: RegExpExecArray | null
  while ((headingMatch = headingPattern.exec(html)) !== null) {
    const level = Number(headingMatch[1]) as 1 | 2 | 3
    if (level === 1) h1Count += 1
    if (outline.length < OUTLINE_LIMIT) {
      outline.push({ level, text: stripTags(headingMatch[2]) })
    }
  }

  // --- images ---
  let missingAlt = 0
  const missingAltSrcs: string[] = []
  const imgTags = findTags(html, "img")
  for (const tag of imgTags) {
    const attrs = parseAttributes(tag)
    const alt = attrs.alt
    if (alt === undefined || alt.trim().length === 0) {
      missingAlt += 1
      if (missingAltSrcs.length < MISSING_ALT_SRC_LIMIT && attrs.src) {
        missingAltSrcs.push(attrs.src)
      }
    }
  }

  // --- word count (visible text only) ---
  const visible = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
  const text = stripTags(visible)
  const wordCount = text.length === 0 ? 0 : text.split(/\s+/).length

  // --- links ---
  let internal = 0
  let external = 0
  for (const tag of findTags(html, "a")) {
    const href = parseAttributes(tag).href?.trim()
    if (!href) continue
    if (href.startsWith("/") || href.startsWith(origin)) internal += 1
    else if (/^https?:\/\//i.test(href)) external += 1
  }

  // --- JSON-LD types ---
  const jsonLdTypes: string[] = []
  const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi
  let scriptMatch: RegExpExecArray | null
  while ((scriptMatch = scriptPattern.exec(html)) !== null) {
    const attrs = parseAttributes(scriptMatch[0].slice(0, scriptMatch[0].indexOf(">") + 1))
    if (!attrs.type || !/ld\+json/i.test(attrs.type)) continue
    const raw = scriptMatch[1].trim()
    if (!raw) continue
    try {
      collectJsonLdTypes(JSON.parse(raw), jsonLdTypes)
    } catch {
      // Malformed JSON — fall back to scanning for "@type" string values.
      const typePattern = /"@type"\s*:\s*"([^"]+)"/g
      let typeMatch: RegExpExecArray | null
      while ((typeMatch = typePattern.exec(raw)) !== null) {
        jsonLdTypes.push(typeMatch[1])
      }
    }
  }

  return {
    title,
    titleLength,
    titleLight: lengthLight(titleLength, TITLE_MIN, TITLE_MAX),
    metaDescription,
    metaDescriptionLength,
    metaDescriptionLight: lengthLight(metaDescriptionLength, DESCRIPTION_MIN, DESCRIPTION_MAX),
    canonical,
    robots,
    noIndex,
    h1Count,
    outline,
    images: { total: imgTags.length, missingAlt, missingAltSrcs },
    wordCount,
    links: { internal, external },
    jsonLdTypes,
    ogImage,
  }
}
