import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { AreaDetailPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { areaPages, breadcrumbJsonLd, getArea, pageAlternates } from "@/lib/seo"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ area: string }>
}

export function generateStaticParams() {
  return areaPages.map((area) => ({ area: area.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params
  const area = getArea(slug)
  if (!area) return {}

  const path = `/areas/${area.slug}`
  const fallbackMetadata: Metadata = {
    title: area.metaTitle,
    description: area.description,
    alternates: pageAlternates(path),
  }

  const override = await getPublishedContentOverrideByPath(path)
  return contentOverrideMetadata(override, fallbackMetadata, path)
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params
  const area = getArea(slug)
  if (!area) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(`/areas/${area.slug}`),
    getPublicSiteSettings(),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Regional hubs", href: "/areas" },
          { name: area.name, href: `/areas/${area.slug}` },
        ])}
      />
      <AreaDetailPage area={area} contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
