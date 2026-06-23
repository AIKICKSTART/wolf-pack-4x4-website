import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { PartDetailPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import {
  getPart,
  getPartCategory,
  hasRealPartImage,
  displayPartTitle,
  partMetadataDescription,
  partMetadataTitle,
  partJsonLd,
  shouldEmitPartProductJsonLd,
} from "@/lib/parts"
import { absoluteUrl, breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const dynamicParams = true
export const revalidate = 86400

type Props = {
  params: Promise<{ part: string }>
}

export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) return {}
  const hasProductImage = hasRealPartImage(part)
  const path = `/parts/${part.slug}`
  const contentOverride = await getPublishedContentOverrideByPath(path)

  return contentOverrideMetadata(contentOverride, {
    title: partMetadataTitle(part),
    description: partMetadataDescription(part),
    alternates: pageAlternates(path),
    ...(hasProductImage
      ? {}
      : {
          robots: {
            index: false,
            follow: true,
            googleBot: {
              index: false,
              follow: true,
            },
          },
        }),
    openGraph: {
      title: partMetadataTitle(part),
      description: partMetadataDescription(part),
      ...(hasProductImage ? { images: [{ url: absoluteUrl(part.image), alt: part.imageAlt }] } : {}),
      url: absoluteUrl(path),
      type: "website",
    },
  }, path)
}

export default async function PartRoute({ params }: Props) {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(`/parts/${part.slug}`),
    getPublicSiteSettings(),
  ])
  const emitProductJsonLd = shouldEmitPartProductJsonLd(part)
  const category = getPartCategory(part.category)
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Parts", href: "/parts" },
    ...(category ? [{ name: category.title, href: `/parts/category/${category.slug}` }] : []),
    { name: displayPartTitle(part, 88), href: `/parts/${part.slug}` },
  ]

  return (
    <>
      {emitProductJsonLd ? <JsonLd data={partJsonLd(part)} /> : null}
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <PartDetailPage part={part} category={category} contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
