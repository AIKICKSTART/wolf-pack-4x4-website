import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { LocationDetailPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { absoluteUrl, breadcrumbJsonLd, getLocation, locationMetaTitle, locations, pageAlternates, serviceJsonLd, servicePages } from "@/lib/seo"
import { siteImages } from "@/lib/site-assets"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ suburb: string }>
}

export function generateStaticParams() {
  return locations.map((location) => ({ suburb: location.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb } = await params
  const location = getLocation(suburb)
  if (!location) return {}
  const path = `/locations/${location.slug}`
  const contentOverride = await getPublishedContentOverrideByPath(path)

  return contentOverrideMetadata(contentOverride, {
    title: locationMetaTitle(location),
    description: `Wolfpack 4x4 serves ${location.name} with suspension, bull bars, winches, lighting, towing upgrades and 4x4 parts fitment.`,
    alternates: pageAlternates(path),
    openGraph: {
      title: `4x4 Upgrades ${location.name} NSW`,
      description: `4x4 upgrade services for ${location.name}, ${location.nearby.join(", ")} and nearby ${location.region} service areas.`,
      url: absoluteUrl(path),
      type: "website",
      images: [{ url: siteImages.covers.locations, width: 1600, height: 900, alt: `4x4 upgrade services for ${location.name}` }],
    },
  }, path)
}

export default async function LocationPage({ params }: Props) {
  const { suburb } = await params
  const location = getLocation(suburb)
  if (!location) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(`/locations/${location.slug}`),
    getPublicSiteSettings(),
  ])

  return (
    <>
      {servicePages.slice(0, 3).map((service) => (
        <JsonLd key={service.slug} data={serviceJsonLd(service, location)} />
      ))}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
        ])}
      />
      <LocationDetailPage contentOverride={contentOverride} location={location} siteSettings={siteSettings} />
    </>
  )
}
