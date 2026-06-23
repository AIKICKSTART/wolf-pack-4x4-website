import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { ProductsPublicPage, productLinks } from "@/components/mufflermen/public-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, pageAlternates, productsPageJsonLd } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: { absolute: "4x4 Parts, Accessories and Upgrade Products | Wolfpack 4x4" },
  description:
    "4x4 products from Wolfpack 4x4: suspension, towing accessories, lighting, engine-bay support, performance chips and cold air intakes for Illawarra rigs.",
  alternates: pageAlternates("/products"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/products")
  return contentOverrideMetadata(override, fallbackMetadata, "/products")
}

export default async function ProductsPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/products"),
  ])

  return (
    <>
      <JsonLd data={productsPageJsonLd(productLinks)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ])}
      />
      <ProductsPublicPage contentOverride={contentOverride} settings={siteSettings} />
    </>
  )
}
