/**
 * Pure analyzer for stored Payload block rows (content-overrides and
 * marketing-pages `blocks` fields). A generic key-driven walker — no per-block
 * logic — scores headings, body copy, links, and image alt coverage so the
 * admin "SEO page" view can render per-block report cards.
 *
 * Field-shape knowledge comes from the canonical block definitions in
 * `./blocks/payload-blocks.ts` (allPageBlocks), which is also where the
 * human-readable labels live.
 */

import { allPageBlocks } from "./blocks/payload-blocks.ts"
import type { SeoLight } from "./seo-audit.ts"

export type BlockSeoFinding = {
  field: string
  /** The offending/inspected value, truncated to 80 chars. */
  value: string
  light: SeoLight
  tip: string
}

export type BlockSeoReport = {
  blockType: string
  label: string
  findings: BlockSeoFinding[]
  /** Worst light across all findings (green when there are none). */
  overall: SeoLight
}

const HEADING_KEYS = ["heading", "headline", "title", "eyebrow", "question", "kicker"]
const BODY_KEYS = ["body", "lede", "description", "text", "answer", "caption", "summary", "subhead"]
const LINK_KEYS = ["href", "url", "buttonHref"]
const ARRAY_KEYS = [
  "items",
  "entries",
  "features",
  "testimonials",
  "steps",
  "choices",
  "events",
  "links",
  "actions",
  "columns",
  "rows",
  "bullets",
  "trust",
  "assurances",
  "tiers",
  "pairs",
  "chapters",
]

const IMAGE_KEY_PATTERN = /(image(Url)?|poster(Url)?|src|backgroundImageUrl)$/i
const ALT_KEY_PATTERN = /^alt$|Alt$/

const HEADING_MIN = 10
const HEADING_MAX = 70
const BODY_MIN = 50
const BODY_MAX = 300
const VALUE_TRUNCATE = 80

const LIGHT_RANK: Record<SeoLight, number> = { green: 0, amber: 1, red: 2 }

const labelsBySlug = new Map<string, string>()
for (const block of allPageBlocks) {
  const singular = block.labels?.singular
  if (typeof singular === "string") labelsBySlug.set(block.slug, singular)
}

export function blockLabel(blockType: string): string {
  return labelsBySlug.get(blockType) ?? blockType
}

function truncate(value: string): string {
  return value.length > VALUE_TRUNCATE ? `${value.slice(0, VALUE_TRUNCATE - 1)}…` : value
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function describeImageValue(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number") return `media #${value}`
  if (isPlainObject(value)) {
    const url = value.url ?? value.filename ?? value.id
    return typeof url === "string" || typeof url === "number" ? String(url) : "(media)"
  }
  return "(media)"
}

function siblingAltValue(siblings: Record<string, unknown>, imageKey: string): string | undefined {
  // `<key>Alt` first (spotlightImage -> spotlightImageAlt), then the key with
  // a trailing Image/Url segment stripped (beforeImage -> beforeAlt,
  // afterImage -> afterAlt), then the generic candidates. The stripped form
  // covers beforeAlt/afterAlt without cross-matching between siblings.
  const stripped = imageKey.replace(/(image|url)+$/i, "")
  const candidates = [
    `${imageKey}Alt`,
    stripped.length > 0 && stripped !== imageKey ? `${stripped}Alt` : null,
    "alt",
    "imageAlt",
  ].filter((candidate): candidate is string => Boolean(candidate))

  for (const candidate of candidates) {
    if (candidate in siblings) {
      const value = siblings[candidate]
      return typeof value === "string" ? value : undefined
    }
  }
  return undefined
}

function analyzeHeading(field: string, value: string, findings: BlockSeoFinding[]): void {
  const length = value.trim().length
  if (length >= HEADING_MIN && length <= HEADING_MAX) {
    findings.push({ field, value: truncate(value), light: "green", tip: `Heading length ${length} is in the ${HEADING_MIN}–${HEADING_MAX} sweet spot.` })
  } else {
    const tip =
      length === 0
        ? "Heading is empty — give this block a real heading."
        : length < HEADING_MIN
          ? `Heading is short (${length} chars) — aim for ${HEADING_MIN}–${HEADING_MAX}.`
          : `Heading is long (${length} chars) — trim toward ${HEADING_MIN}–${HEADING_MAX}.`
    findings.push({ field, value: truncate(value), light: "amber", tip })
  }
}

function analyzeBody(field: string, value: string, findings: BlockSeoFinding[]): void {
  const length = value.trim().length
  if (length >= BODY_MIN && length <= BODY_MAX) {
    findings.push({ field, value: truncate(value), light: "green", tip: `Body copy length ${length} is in the ${BODY_MIN}–${BODY_MAX} range.` })
  } else {
    const tip =
      length === 0
        ? "Body copy is empty."
        : length < BODY_MIN
          ? `Body copy is thin (${length} chars) — aim for ${BODY_MIN}–${BODY_MAX}.`
          : `Body copy is long (${length} chars) — consider tightening toward ${BODY_MIN}–${BODY_MAX}.`
    findings.push({ field, value: truncate(value), light: "amber", tip })
  }
}

function analyzeLink(field: string, value: string, findings: BlockSeoFinding[]): void {
  const href = value.trim()
  if (href.length === 0 || href === "#") {
    findings.push({ field, value: truncate(href || "(empty)"), light: "red", tip: 'Link is empty or "#" — it goes nowhere. Point it at a real path or URL.' })
  } else if (href.startsWith("/") || href.startsWith("https://")) {
    findings.push({ field, value: truncate(href), light: "green", tip: "Link resolves to a path or secure URL." })
  } else {
    findings.push({ field, value: truncate(href), light: "amber", tip: 'Link is neither a relative path nor an https:// URL — double-check it.' })
  }
}

function walk(node: Record<string, unknown>, prefix: string, findings: BlockSeoFinding[]): void {
  for (const [key, value] of Object.entries(node)) {
    if (key === "blockType" || key === "blockName" || key === "id") continue
    const field = prefix ? `${prefix}.${key}` : key

    // Alt fields are consumed as siblings of their image field — skip them.
    if (ALT_KEY_PATTERN.test(key)) continue

    if (IMAGE_KEY_PATTERN.test(key)) {
      const hasImage =
        (typeof value === "string" && value.trim().length > 0) ||
        typeof value === "number" ||
        isPlainObject(value)
      if (hasImage) {
        const alt = siblingAltValue(node, key)
        if (alt && alt.trim().length > 0) {
          findings.push({ field, value: truncate(describeImageValue(value)), light: "green", tip: `Image has alt text: "${truncate(alt)}".` })
        } else {
          findings.push({ field, value: truncate(describeImageValue(value)), light: "red", tip: "Image has no alt text — add a sibling alt field value." })
        }
      }
      continue
    }

    if (typeof value === "string") {
      if (LINK_KEYS.includes(key)) {
        analyzeLink(field, value, findings)
      } else if (HEADING_KEYS.includes(key)) {
        analyzeHeading(field, value, findings)
      } else if (BODY_KEYS.includes(key)) {
        analyzeBody(field, value, findings)
      }
      continue
    }

    if (Array.isArray(value)) {
      if (!ARRAY_KEYS.includes(key)) continue
      value.forEach((entry, index) => {
        if (isPlainObject(entry)) walk(entry, `${field}[${index}]`, findings)
      })
      continue
    }

    if (isPlainObject(value)) {
      // Group fields (primaryAction, cta, summary, …) — recurse.
      walk(value, field, findings)
    }
  }
}

export function analyzeBlock(row: Record<string, unknown>): BlockSeoReport {
  const blockType = typeof row.blockType === "string" ? row.blockType : "unknown"
  const findings: BlockSeoFinding[] = []
  walk(row, "", findings)

  let overall: SeoLight = "green"
  for (const finding of findings) {
    if (LIGHT_RANK[finding.light] > LIGHT_RANK[overall]) overall = finding.light
  }

  return { blockType, label: blockLabel(blockType), findings, overall }
}
