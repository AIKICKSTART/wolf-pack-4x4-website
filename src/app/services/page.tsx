import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { ServicesIndexPage } from "@/components/mufflermen/seo-pages"
import {
  contentOverrideMetadata,
  getPublishedContentOverrideByPath,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, pageAlternates, servicesIndexJsonLd } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: "4x4 Upgrade Services Illawarra",
  description:
    "Suspension, bull bars, winches, lighting, dual battery systems, towing upgrades and 4x4 parts for Oak Flats, Shellharbour and Wollongong.",
  alternates: pageAlternates("/services"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/services")
  return contentOverrideMetadata(override, fallbackMetadata, "/services")
}

export default async function ServicesPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/services"),
  ])

  return (
    <>
      <JsonLd data={servicesIndexJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ])}
      />
      <ServicesIndexPage contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
