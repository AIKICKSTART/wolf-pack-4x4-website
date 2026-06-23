import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { AreasIndexPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: "Regional 4x4 Upgrade Hubs",
  description:
    "Regional 4x4 upgrade hubs for the Illawarra, Shoalhaven, Southern Highlands, Macarthur, Wollondilly and Sutherland Shire service-area pages.",
  alternates: pageAlternates("/areas"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/areas")
  return contentOverrideMetadata(override, fallbackMetadata, "/areas")
}

export default async function AreasPage() {
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath("/areas"),
    getPublicSiteSettings(),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Regional hubs", href: "/areas" },
        ])}
      />
      <AreasIndexPage contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
