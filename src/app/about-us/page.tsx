import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { AboutUsPublicPage } from "@/components/mufflermen/public-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { aboutPageJsonLd, breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: { absolute: "About Wolfpack 4x4 | 4x4 Upgrade Workshop NSW" },
  description:
    "Meet Wolfpack 4x4 — the Albion Park Rail team planning, supplying and fitting performance 4x4 upgrades, touring gear and parts for Illawarra drivers.",
  alternates: pageAlternates("/about-us"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/about-us")
  return contentOverrideMetadata(override, fallbackMetadata, "/about-us")
}

export default async function AboutUsPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/about-us"),
  ])

  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about-us" },
        ])}
      />
      <AboutUsPublicPage contentOverride={contentOverride} settings={siteSettings} />
    </>
  )
}
