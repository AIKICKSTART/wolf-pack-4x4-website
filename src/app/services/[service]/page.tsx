import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { ServiceDetailPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, getService, pageAlternates, serviceJsonLd, servicePages } from "@/lib/seo"
import { siteImages } from "@/lib/site-assets"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ service: string }>
}

export function generateStaticParams() {
  return servicePages.map((service) => ({ service: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params
  const service = getService(slug)
  if (!service) return {}
  const path = `/services/${service.slug}`
  const contentOverride = await getPublishedContentOverrideByPath(path)

  return contentOverrideMetadata(contentOverride, {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.includes,
    alternates: pageAlternates(path),
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(path),
      type: "website",
      images: [{ url: siteImages.covers.serviceDetail, width: 1600, height: 900, alt: service.title }],
    },
  }, path)
}

export default async function ServicePage({ params }: Props) {
  const { service: slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(`/services/${service.slug}`),
    getPublicSiteSettings(),
  ])

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ])}
      />
      <ServiceDetailPage contentOverride={contentOverride} service={service} siteSettings={siteSettings} />
    </>
  )
}
