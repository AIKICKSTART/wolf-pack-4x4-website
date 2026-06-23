import type { MetadataRoute } from "next"

import { publishedCmsSitemapEntries } from "@/lib/cms/content"
import { partRouteEntries } from "@/lib/parts"
import { routeEntries } from "@/lib/seo"

export const dynamic = "force-dynamic"

// /ui-primitives design-system demo pages are intentionally excluded — they
// dilute crawl budget and are not customer-facing content.
function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false
    seen.add(entry.url)
    return true
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const existingRoutes = [...routeEntries(), ...partRouteEntries()]

  try {
    return dedupeByUrl([...existingRoutes, ...(await publishedCmsSitemapEntries())])
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`[cms] Sitemap CMS routes skipped. ${message}`)
    return dedupeByUrl(existingRoutes)
  }
}
