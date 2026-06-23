import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProductDetailPage } from "../../components/storefront"

import {
  HERO_PRODUCT,
  PDP_DESCRIPTION,
  PDP_MEDIA,
  PDP_REVIEWS,
  PDP_REVIEW_SUMMARY,
  PDP_SPECS,
  PDP_VARIANTS,
  SHOWCASE_PRODUCTS,
} from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Product detail page | Storefront",
  description:
    "Primitive 02 — PDP with media gallery, variant picker, spec table and verified-buyer reviews.",
}

const OOS_PRODUCT = SHOWCASE_PRODUCTS.find((p) => p.stock === "out-of-stock") ?? HERO_PRODUCT
const PREORDER_PRODUCT = SHOWCASE_PRODUCTS.find((p) => p.stock === "pre-order") ?? HERO_PRODUCT

export default function ProductDetailPageRoute() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Product detail page"
        title="Product detail page"
        description="PDP composes media gallery, variant picker, fitment chip, price tag with Afterpay, spec table and verified-buyer reviews."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Product detail page" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · hero PDP · in-stock · 3 reviews</span>
        <ProductDetailPage
          product={HERO_PRODUCT}
          media={PDP_MEDIA}
          description={PDP_DESCRIPTION}
          specs={PDP_SPECS}
          variants={PDP_VARIANTS}
          reviews={PDP_REVIEWS}
          reviewSummary={PDP_REVIEW_SUMMARY}
        />
        <span className={styles.stageCaption}>State 02 · pre-order PDP · variants only</span>
        <ProductDetailPage
          product={PREORDER_PRODUCT}
          media={PDP_MEDIA.slice(0, 3)}
          description="Pre-order Manta&apos;s next-gen Ranger Raptor axle-back. Build cap is 12 units per month — first shipment lands at Bay 1 in early June."
          specs={PDP_SPECS.slice(0, 4)}
          variants={PDP_VARIANTS.slice(0, 1)}
        />
        <span className={styles.stageCaption}>State 03 · out-of-stock PDP · no reviews</span>
        <ProductDetailPage
          product={OOS_PRODUCT}
          media={PDP_MEDIA.slice(0, 2)}
          description="Beaudesert XF Falcon extractors — currently sold out. Restock arrives mid-June from the Brisbane foundry."
          specs={PDP_SPECS.slice(0, 3)}
        />
      </section>
    </main>
  )
}
