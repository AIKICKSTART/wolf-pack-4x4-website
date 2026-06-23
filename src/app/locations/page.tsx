import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { LocationsIndexPage } from "@/components/mufflermen/seo-pages"
import {
  contentOverrideMetadata,
  getPublishedContentOverrideByPath,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: "4x4 Upgrade Service Areas Near Albion Park Rail",
  description:
    "Service-area pages for Oak Flats, Shellharbour, Wollongong, Kiama, Shoalhaven, Southern Highlands, Macarthur and Sutherland Shire 4x4 owners.",
  alternates: pageAlternates("/locations"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/locations")
  return contentOverrideMetadata(override, fallbackMetadata, "/locations")
}

export default async function LocationsPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/locations"),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
        ])}
      />
      <LocationsIndexPage contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
