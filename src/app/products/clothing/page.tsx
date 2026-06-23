import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { WolfpackStoreClient } from "@/components/wolfpack/store/WolfpackStoreClient"
import { CmsBreadcrumbs, CmsPageShell } from "@/lib/cms/public-ui"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { absoluteUrl, breadcrumbJsonLd, pageAlternates } from "@/lib/seo"
import {
  getWolfpackStoreStats,
  wolfpackClothingHeroes,
  wolfpackClothingProducts,
} from "@/lib/wolfpack-store"

export const revalidate = 300

const clothingStats = getWolfpackStoreStats(wolfpackClothingProducts)

export const metadata: Metadata = {
  title: { absolute: "Wolfpack Clothing and Apparel | Wolfpack 4x4" },
  description:
    "Wolfpack 4x4 clothing and apparel concepts with front, back, side and detail product views for shirts, jackets, hats, socks and country-ready merch.",
  alternates: pageAlternates("/products/clothing"),
  openGraph: {
    title: "Wolfpack Clothing and Apparel",
    description:
      "Wolfpack 4x4 apparel concepts with four-angle product imagery and customer try-on support.",
    images: [
      {
        url: wolfpackClothingHeroes[0].src,
        alt: "Wolfpack 4x4 clothing line with shirts, jackets, hats and socks",
      },
    ],
  },
}

function clothingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl("/products/clothing"),
    url: absoluteUrl("/products/clothing"),
    name: "Wolfpack Clothing and Apparel",
    description: "Wolfpack 4x4 apparel, headwear and merch concept store.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: clothingStats.products,
      itemListElement: wolfpackClothingProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          category: product.category,
          description: product.summary,
          image: absoluteUrl(product.images.front),
          brand: { "@type": "Brand", name: "Wolfpack 4x4" },
        },
      })),
    },
  }
}

export default async function ProductClothingPage() {
  const siteSettings = await getPublicSiteSettings()

  return (
    <CmsPageShell settings={siteSettings}>
      <JsonLd data={clothingJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "Clothing", href: "/products/clothing" },
        ])}
      />
      <CmsBreadcrumbs
        items={[
          { href: "/", name: "Home" },
          { href: "/products", name: "Products" },
          { href: "/products/clothing", name: "Clothing" },
        ]}
      />
      <WolfpackStoreClient
        products={wolfpackClothingProducts}
        heroes={wolfpackClothingHeroes}
        variant="clothing"
      />
    </CmsPageShell>
  )
}
