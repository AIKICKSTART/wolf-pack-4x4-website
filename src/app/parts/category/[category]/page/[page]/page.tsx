import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { PartCategoryPage } from "@/components/mufflermen/seo-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { getPartCategory, partCategories, partCategoryPageCount } from "@/lib/parts"
import { breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const dynamicParams = false
export const revalidate = 300

type Props = {
  params: Promise<{ category: string; page: string }>
}

export function generateStaticParams() {
  return partCategories.flatMap((category) =>
    Array.from({ length: Math.max(0, partCategoryPageCount(category.slug) - 1) }, (_, index) => ({
      category: category.slug,
      page: String(index + 2),
    })),
  )
}

function parsePage(value: string) {
  const page = Number.parseInt(value, 10)
  return Number.isFinite(page) && page > 1 ? page : null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug, page: pageParam } = await params
  const category = getPartCategory(slug)
  const page = parsePage(pageParam)
  if (!category || !page || page > partCategoryPageCount(category.slug)) return {}

  const path = `/parts/category/${category.slug}/page/${page}`
  const fallbackMetadata: Metadata = {
    title: `${category.title} Parts Page ${page} | 4x4 Parts Catalogue`,
    description: `${category.description} Browse page ${page} of the Wolfpack 4x4 supplier catalogue.`,
    alternates: pageAlternates(path),
  }

  const override = await getPublishedContentOverrideByPath(path)
  return contentOverrideMetadata(override, fallbackMetadata, path)
}

export default async function PartCategoryPaginatedRoute({ params }: Props) {
  const { category: slug, page: pageParam } = await params
  const category = getPartCategory(slug)
  const page = parsePage(pageParam)
  if (!category || !page || page > partCategoryPageCount(category.slug)) notFound()
  // Page content is edited against the unpaginated canonical category path.
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
          { name: `Page ${page}`, href: `/parts/category/${category.slug}/page/${page}` },
        ])}
      />
      <PartCategoryPage category={category} contentOverride={contentOverride} page={page} siteSettings={siteSettings} />
    </>
  )
}
