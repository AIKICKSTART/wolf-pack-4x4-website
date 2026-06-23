import type { Metadata } from "next"

import { QuoteRequestPublicPage } from "@/components/mufflermen/public-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { JsonLd } from "@/components/mufflermen/json-ld"
import { absoluteUrl, breadcrumbJsonLd, pageAlternates, webPageJsonLd } from "@/lib/seo"
import { siteImages } from "@/lib/site-assets"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: "Request a 4x4 Quote",
  description:
    "Request a 4x4 upgrade quote from Wolfpack 4x4. Send your vehicle make, model, year, current accessories and the touring, towing or off-road result you want.",
  alternates: pageAlternates("/quote"),
  openGraph: {
    title: "Request a 4x4 Quote | Wolfpack 4x4",
    description:
      "Send the vehicle and the result you want quoted. The workshop steers you toward parts, fitment and a staged upgrade path.",
    url: absoluteUrl("/quote"),
    type: "website",
    images: [{ url: siteImages.covers.services, width: 1600, height: 900, alt: "Wolfpack 4x4 quote" }],
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/quote")
  return contentOverrideMetadata(override, fallbackMetadata, "/quote")
}

export default async function QuotePage() {
  const siteSettings = await getPublicSiteSettings()

  return (
    <>
      <JsonLd data={webPageJsonLd("/quote", "Request a 4x4 quote", "Send the vehicle and the result you want quoted by Wolfpack 4x4.")} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Quote", href: "/quote" }])} />
      <QuoteRequestPublicPage settings={siteSettings} />
    </>
  )
}
