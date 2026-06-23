import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { ContactUsPublicPage } from "@/components/mufflermen/public-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, contactPageJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: { absolute: "Contact Wolfpack 4x4 | 4x4 Upgrades Illawarra" },
  description:
    "Contact Wolfpack 4x4, Albion Park Rail, for suspension, bull bars, winches, lighting, towing support, touring accessories and 4x4 parts. Call 02 4256 9256 or send your vehicle details.",
  alternates: pageAlternates("/contact-us"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/contact-us")
  return contentOverrideMetadata(override, fallbackMetadata, "/contact-us")
}

export default async function ContactUsPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/contact-us"),
  ])

  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact-us" },
        ])}
      />
      <ContactUsPublicPage contentOverride={contentOverride} settings={siteSettings} />
    </>
  )
}
