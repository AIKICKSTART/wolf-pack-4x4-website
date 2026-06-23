import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { PartCategoryPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { getPartCategory, partCategories } from "@/lib/parts"
import { breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return partCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const category = getPartCategory(slug)
  if (!category) return {}

  const path = `/parts/category/${category.slug}`
  const fallbackMetadata: Metadata = {
    title: `${category.title} | 4x4 Parts Catalogue`,
    description: category.description,
    alternates: pageAlternates(path),
  }

  const override = await getPublishedContentOverrideByPath(path)
  return contentOverrideMetadata(override, fallbackMetadata, path)
}

export default async function PartCategoryRoute({ params }: Props) {
  const { category: slug } = await params
  const category = getPartCategory(slug)
  if (!category) notFound()
  const [contentOverride, siteSettings] = await Promise.all([
    getPublishedContentOverrideByPath(`/parts/category/${category.slug}`),
    getPublicSiteSettings(),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Parts", href: "/parts" },
          { name: category.title, href: `/parts/category/${category.slug}` },
        ])}
      />
      <PartCategoryPage category={category} contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
