import type { AdminViewServerProps } from "payload"

import type { CmsContentOverride } from "@/lib/cms/types"
import { routeEntries } from "@/lib/seo"

import { SeoDashboardFilter, type SeoDashboardRow } from "./seo-dashboard-filter"

const MAX_ROWS = 150
const TITLE_MIN = 30
const TITLE_MAX = 60
const DESCRIPTION_MIN = 70
const DESCRIPTION_MAX = 155
// ~1,009 content-overrides exist after seeding — page through them in chunks.
const OVERRIDES_PAGE_SIZE = 500
const OVERRIDES_MAX_PAGES = 20

// Service-location combos (/locations/<location>/<service>) are excluded —
// they would dwarf the table and are template-generated anyway.
const serviceLocationPattern = /^\/locations\/[^/]+\/[^/]+/

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && text.length > 0 ? text : undefined
}

function inRange(length: number, min: number, max: number) {
  return length >= min && length <= max
}

type RowStatus = {
  color: string
  label: string
}

function rowStatus(override: CmsContentOverride | undefined, title?: string, description?: string): RowStatus {
  if (!override) {
    return { color: "#9ca3af", label: "default" }
  }

  const titleOk = Boolean(title && inRange(title.length, TITLE_MIN, TITLE_MAX))
  const descriptionOk = Boolean(description && inRange(description.length, DESCRIPTION_MIN, DESCRIPTION_MAX))

  return titleOk && descriptionOk
    ? { color: "#22c55e", label: "good" }
    : { color: "#f59e0b", label: "check lengths" }
}

function withLength(value?: string) {
  return value ? `${value} (${value.length})` : "(page default)"
}

export async function SeoDashboard(props: AdminViewServerProps) {
  const initPageResult = props?.initPageResult
  const user = initPageResult?.req?.user

  if (!user) {
    return (
      <div style={{ padding: 32 }}>
        <h1 style={{ fontSize: 20 }}>SEO dashboard</h1>
        <p>You must be logged in to the admin panel to view this page.</p>
      </div>
    )
  }

  const payload = initPageResult.req.payload

  const paths = routeEntries()
    .map((entry) => {
      try {
        return new URL(entry.url).pathname
      } catch {
        return null
      }
    })
    .filter((path): path is string => Boolean(path))
    .filter((path) => !serviceLocationPattern.test(path))
    // routeEntries() is already in priority order: static routes, services,
    // areas, then locations — slicing keeps the most important 150 rows.
    .slice(0, MAX_ROWS)

  const overridesByPath = new Map<string, CmsContentOverride>()
  try {
    let page = 1
    while (page <= OVERRIDES_MAX_PAGES) {
      const result = await payload.find({
        collection: "content-overrides",
        depth: 0,
        limit: OVERRIDES_PAGE_SIZE,
        page,
        where: {
          _status: {
            equals: "published",
          },
        },
      })

      for (const doc of result.docs as unknown as CmsContentOverride[]) {
        if (doc?.targetPath) {
          overridesByPath.set(doc.targetPath, doc)
        }
      }

      if (!result.hasNextPage) break
      page += 1
    }
  } catch {
    // CMS query failed — render every row as "(page default)" instead of erroring.
  }

  const rows: SeoDashboardRow[] = paths.map((path) => {
    const override = overridesByPath.get(path)
    const title = override
      ? cleanText(override.seo?.metaTitle) ?? cleanText(override.hero?.headline)
      : undefined
    const description = override
      ? cleanText(override.seo?.metaDescription) ?? cleanText(override.hero?.lede) ?? cleanText(override.summary)
      : undefined
    const status = rowStatus(override, title, description)
    const editHref =
      override && override.id != null
        ? `/admin/collections/content-overrides/${override.id}`
        : `/admin/collections/content-overrides?where[targetPath][equals]=${encodeURIComponent(path)}`

    return {
      path,
      titleCell: withLength(title),
      descriptionCell: withLength(description),
      statusColor: status.color,
      statusLabel: status.label,
      detailHref: `/admin/seo-page?path=${encodeURIComponent(path)}`,
      editHref,
      editLabel: override ? "Edit override" : "Create override",
    }
  })

  return (
    <div style={{ padding: "24px 32px", maxWidth: 1280 }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>SEO dashboard</h1>
      <p style={{ marginBottom: 16, opacity: 0.75 }}>
        Route inventory ({paths.length} pages, service-location combos excluded) with published content-override
        coverage. Green: title {TITLE_MIN}&ndash;{TITLE_MAX} chars and description {DESCRIPTION_MIN}&ndash;
        {DESCRIPTION_MAX} chars. Amber: override outside those ranges. Grey: no override — the page serves its
        built-in default metadata. Click a path for the full per-page SEO audit.
      </p>
      <SeoDashboardFilter rows={rows} />
    </div>
  )
}

export default SeoDashboard
