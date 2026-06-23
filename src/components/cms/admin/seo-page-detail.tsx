import type { AdminViewServerProps } from "payload"
import Link from "next/link"

import { analyzeBlock, type BlockSeoReport } from "@/lib/cms/block-seo"
import { extractSeoAudit, type SeoAudit, type SeoLight } from "@/lib/cms/seo-audit"
import type { CmsContentOverride, CmsMarketingPage } from "@/lib/cms/types"
import { partCategories } from "@/lib/parts"
import { routeEntries } from "@/lib/seo"

import { SeoPagePreview } from "./seo-page-preview"

const FETCH_TIMEOUT_MS = 15_000

const LIGHT_COLORS: Record<SeoLight, string> = {
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
}

const panelStyle: React.CSSProperties = {
  border: "1px solid var(--theme-elevation-150, #e5e7eb)",
  borderRadius: 8,
  marginBottom: 24,
  padding: "16px 20px",
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: "var(--theme-elevation-50, #f3f4f6)",
  border: "1px solid var(--theme-elevation-250, #d1d5db)",
  borderRadius: 6,
  display: "inline-block",
  fontSize: 13,
  padding: "6px 14px",
  textDecoration: "none",
}

const chipStyle: React.CSSProperties = {
  backgroundColor: "var(--theme-elevation-100, #f3f4f6)",
  border: "1px solid var(--theme-elevation-250, #d1d5db)",
  borderRadius: 999,
  display: "inline-block",
  fontSize: 12,
  marginBottom: 4,
  marginRight: 6,
  padding: "2px 10px",
}

function Light({ light }: { light: SeoLight }) {
  return (
    <span
      style={{
        backgroundColor: LIGHT_COLORS[light],
        borderRadius: "50%",
        display: "inline-block",
        height: 10,
        marginRight: 6,
        width: 10,
      }}
    />
  )
}

function MetaRow({ label, light, children }: { label: string; light?: SeoLight; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", fontSize: 13, gap: 8, marginBottom: 8 }}>
      <span style={{ flexShrink: 0, fontWeight: 600, width: 150 }}>{label}</span>
      <span>
        {light ? <Light light={light} /> : null}
        {children}
      </span>
    </div>
  )
}

function isValidPath(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//") && !/\s/.test(value)
}

export async function SeoPageDetail(props: AdminViewServerProps) {
  const initPageResult = props?.initPageResult

  if (!initPageResult?.req?.user) {
    return (
      <div style={{ padding: 32 }}>
        <h1 style={{ fontSize: 20 }}>SEO page audit</h1>
        <p>Sign in required — you must be logged in to the admin panel to view this page.</p>
      </div>
    )
  }

  const payload = initPageResult.req.payload
  const serverURL = payload.config.serverURL

  // `searchParams` comes from ServerProps (part of AdminViewServerProps) and
  // is typed `{ [key: string]: string | string[] | undefined }` — handle both.
  const rawPath = props.searchParams?.path
  const path = Array.isArray(rawPath) ? rawPath[0] : rawPath

  if (!path || !isValidPath(path)) {
    return (
      <div style={{ padding: "24px 32px" }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>SEO page audit</h1>
        <p style={{ opacity: 0.75 }}>
          No page path supplied. Open this view from a path link on the{" "}
          <Link href="/admin/seo-dashboard">SEO dashboard</Link>.
        </p>
      </div>
    )
  }

  // --- Allow-list: route inventory + parts categories + CMS-known paths ---
  const allowedPaths = new Set<string>()
  for (const entry of routeEntries()) {
    try {
      allowedPaths.add(new URL(entry.url).pathname)
    } catch {
      // Skip malformed sitemap URLs.
    }
  }
  for (const category of partCategories) {
    allowedPaths.add(`/parts/category/${category.slug}`)
  }

  let override: CmsContentOverride | undefined
  try {
    const result = await payload.find({
      collection: "content-overrides",
      depth: 0,
      limit: 1,
      sort: "-updatedAt",
      where: { targetPath: { equals: path } },
    })
    override = (result.docs as unknown as CmsContentOverride[])[0]
  } catch {
    // CMS query failed — fall through; the static allow-list still applies.
  }

  let marketingPage: CmsMarketingPage | undefined
  try {
    const result = await payload.find({
      collection: "marketing-pages",
      depth: 0,
      limit: 1,
      where: {
        and: [{ path: { equals: path } }, { _status: { equals: "published" } }],
      },
    })
    marketingPage = (result.docs as unknown as CmsMarketingPage[])[0]
  } catch {
    // CMS query failed — fall through.
  }

  const isAllowed = allowedPaths.has(path) || Boolean(override) || Boolean(marketingPage)
  if (!isAllowed) {
    return (
      <div style={{ padding: "24px 32px" }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>SEO page audit</h1>
        <p style={{ opacity: 0.75 }}>
          <span style={{ fontFamily: "monospace" }}>{path}</span> is not a known page — it is not in the route
          inventory, has no content override, and is not a published marketing page. Go back to the{" "}
          <Link href="/admin/seo-dashboard">SEO dashboard</Link>.
        </p>
      </div>
    )
  }

  // --- Fetch the rendered page and audit it ---
  const pageUrl = `${serverURL}${path}`
  let audit: SeoAudit | null = null
  let fetchError: string | null = null
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(pageUrl, { cache: "no-store", signal: controller.signal })
    if (response.ok) {
      audit = extractSeoAudit(await response.text(), { origin: serverURL })
    } else {
      fetchError = `Page responded with HTTP ${response.status}.`
    }
  } catch (error: unknown) {
    fetchError =
      error instanceof Error && error.name === "AbortError"
        ? `Page did not respond within ${FETCH_TIMEOUT_MS / 1000}s.`
        : error instanceof Error
          ? error.message
          : "Failed to fetch the page."
  } finally {
    clearTimeout(timer)
  }

  // --- Block analysis (override blocks win, else marketing page blocks) ---
  const blockSource = override?.blocks?.length ? "override" : marketingPage?.blocks?.length ? "marketing" : null
  const blockRows = (blockSource === "override" ? override?.blocks : marketingPage?.blocks) ?? []
  const blockReports: BlockSeoReport[] = blockRows
    .filter((row): row is Record<string, unknown> => typeof row === "object" && row !== null)
    .map((row) => analyzeBlock(row))
  const blockEditHref =
    blockSource === "override" && override?.id != null
      ? `/admin/collections/content-overrides/${override.id}#blocks`
      : blockSource === "marketing" && marketingPage?.id != null
        ? `/admin/collections/marketing-pages/${marketingPage.id}#blocks`
        : null

  const editPageHref =
    override && override.id != null
      ? `/admin/collections/content-overrides/${override.id}`
      : `/admin/collections/content-overrides?where[targetPath][equals]=${encodeURIComponent(path)}`

  return (
    <div style={{ padding: "24px 32px", maxWidth: 1280 }}>
      <p style={{ fontSize: 12, marginBottom: 8 }}>
        <Link href="/admin/seo-dashboard">&larr; SEO dashboard</Link>
      </p>
      <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <h1 style={{ fontFamily: "monospace", fontSize: 22, margin: 0 }}>{path}</h1>
        <span style={{ display: "inline-flex", gap: 8, marginLeft: "auto" }}>
          <a href={editPageHref} style={buttonStyle}>
            {override ? "Edit page" : "Create override"}
          </a>
          <Link href="/admin/globals/seo-settings" style={buttonStyle}>
            SEO defaults
          </Link>
        </span>
      </div>

      <div style={panelStyle}>
        <h2 style={{ fontSize: 15, marginBottom: 12, marginTop: 0 }}>Preview</h2>
        <SeoPagePreview src={pageUrl} />
      </div>

      <div style={panelStyle}>
        <h2 style={{ fontSize: 15, marginBottom: 12, marginTop: 0 }}>Audit</h2>
        {fetchError ? (
          <p style={{ fontSize: 13 }}>
            <Light light="red" />
            Could not audit this page: {fetchError}
          </p>
        ) : audit ? (
          <div>
            <MetaRow label="Title" light={audit.titleLight}>
              {audit.title ? `${audit.title} (${audit.titleLength})` : "(missing)"}
            </MetaRow>
            <MetaRow label="Description" light={audit.metaDescriptionLight}>
              {audit.metaDescription ? `${audit.metaDescription} (${audit.metaDescriptionLength})` : "(missing)"}
            </MetaRow>
            <MetaRow label="Canonical" light={audit.canonical ? "green" : "amber"}>
              {audit.canonical ?? "(missing)"}
            </MetaRow>
            <MetaRow label="Robots" light={audit.noIndex ? "red" : "green"}>
              {audit.robots ?? "(not set)"}
              {audit.noIndex ? " — page is noindexed" : ""}
            </MetaRow>
            <MetaRow label="H1 count" light={audit.h1Count === 1 ? "green" : "amber"}>
              {audit.h1Count}
            </MetaRow>
            <MetaRow
              label="Images"
              light={audit.images.missingAlt === 0 ? "green" : "red"}
            >
              {audit.images.total} total, {audit.images.missingAlt} missing alt
            </MetaRow>
            {audit.images.missingAltSrcs.length > 0 && (
              <ul style={{ fontFamily: "monospace", fontSize: 12, margin: "0 0 8px 158px", opacity: 0.75 }}>
                {audit.images.missingAltSrcs.map((src) => (
                  <li key={src}>{src}</li>
                ))}
              </ul>
            )}
            <MetaRow label="Word count" light={audit.wordCount >= 250 ? "green" : "amber"}>
              {audit.wordCount}
            </MetaRow>
            <MetaRow label="Links">
              {audit.links.internal} internal / {audit.links.external} external
            </MetaRow>
            <MetaRow label="og:image" light={audit.ogImage ? "green" : "amber"}>
              {audit.ogImage ? "present" : "missing"}
            </MetaRow>
            <MetaRow label="JSON-LD" light={audit.jsonLdTypes.length > 0 ? "green" : "amber"}>
              {audit.jsonLdTypes.length > 0 ? (
                <span>
                  {audit.jsonLdTypes.map((type, index) => (
                    <span key={`${type}-${index}`} style={chipStyle}>
                      {type}
                    </span>
                  ))}
                </span>
              ) : (
                "none found"
              )}
            </MetaRow>
            {audit.outline.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontSize: 13, marginBottom: 8 }}>Heading outline (first {audit.outline.length})</h3>
                <ol style={{ fontSize: 12, listStyle: "none", margin: 0, padding: 0 }}>
                  {audit.outline.map((heading, index) => (
                    <li key={index} style={{ marginBottom: 2, paddingLeft: (heading.level - 1) * 18 }}>
                      <span style={{ fontFamily: "monospace", marginRight: 6, opacity: 0.6 }}>h{heading.level}</span>
                      {heading.text || "(empty)"}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : (
          <p style={{ fontSize: 13, opacity: 0.75 }}>No audit available.</p>
        )}
      </div>

      {blockReports.length > 0 && (
        <div>
          <h2 style={{ fontSize: 15, marginBottom: 12 }}>
            Blocks ({blockReports.length}, from {blockSource === "override" ? "content override" : "marketing page"})
          </h2>
          {blockReports.map((report, index) => (
            <div key={index} style={panelStyle}>
              <div style={{ alignItems: "center", display: "flex", gap: 8, marginBottom: 8 }}>
                <Light light={report.overall} />
                <strong style={{ fontSize: 14 }}>{report.label}</strong>
                <span style={{ fontFamily: "monospace", fontSize: 12, opacity: 0.6 }}>{report.blockType}</span>
                {blockEditHref && (
                  <a href={blockEditHref} style={{ ...buttonStyle, fontSize: 12, marginLeft: "auto", padding: "4px 10px" }}>
                    Edit
                  </a>
                )}
              </div>
              {report.findings.length > 0 ? (
                <table style={{ borderCollapse: "collapse", fontSize: 12, width: "100%" }}>
                  <tbody>
                    {report.findings.map((finding, findingIndex) => (
                      <tr key={findingIndex}>
                        <td style={{ padding: "3px 8px 3px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>
                          <Light light={finding.light} />
                          <span style={{ fontFamily: "monospace" }}>{finding.field}</span>
                        </td>
                        <td style={{ padding: "3px 8px", verticalAlign: "top" }}>{finding.value}</td>
                        <td style={{ opacity: 0.7, padding: "3px 0", verticalAlign: "top" }}>{finding.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ fontSize: 12, margin: 0, opacity: 0.65 }}>No SEO-relevant fields in this block.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SeoPageDetail
