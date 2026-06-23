import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { ServiceLocationDetailPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, getLocation, getService, locations, pageAlternates, serviceJsonLd, serviceLocationDescription, serviceLocationFaq, serviceLocationMetaTitle, serviceLocationPath, serviceLocationTitle, servicePages } from "@/lib/seo"
import { siteImages } from "@/lib/site-assets"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ suburb: string; service: string }>
}

export function generateStaticParams() {
  return locations.flatMap((location) =>
    servicePages.map((service) => ({
      suburb: location.slug,
      service: service.slug,
    })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { suburb, service: serviceSlug } = await params
  const location = getLocation(suburb)
  const service = getService(serviceSlug)
  if (!location || !service) return {}

  const title = serviceLocationTitle(service, location)
  const description = serviceLocationDescription(service, location)
  const canonical = serviceLocationPath(service, location)
  const contentOverride = await getPublishedContentOverrideByPath(canonical)

  return contentOverrideMetadata(contentOverride, {
    title: serviceLocationMetaTitle(service, location),
    description,
    keywords: [
      `${service.shortTitle} ${location.name}`,
      `${service.serviceType} ${location.name}`,
      `4x4 workshop ${location.name}`,
      `${location.name} ${service.shortTitle.toLowerCase()}`,
      ...location.nearby.map((nearby) => `${service.shortTitle} ${nearby}`),
    ],
    alternates: pageAlternates(canonical),
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      type: "website",
      images: [{ url: siteImages.covers.locations, width: 1600, height: 900, alt: `${service.title} for ${location.name}` }],
    },
  }, canonical)
}

export default async function ServiceLocationPage({ params }: Props) {
  const { suburb, service: serviceSlug } = await params
  const location = getLocation(suburb)
  const service = getService(serviceSlug)
  if (!location || !service) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(serviceLocationPath(service, location)),
    getPublicSiteSettings(),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd(service, location)} />
      <JsonLd data={faqJsonLd(serviceLocationFaq(service, location))} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
          { name: service.shortTitle, href: serviceLocationPath(service, location) },
        ])}
      />
      <ServiceLocationDetailPage
        contentOverride={contentOverride}
        service={service}
        location={location}
        siteSettings={siteSettings}
      />
    </>
  )
}
