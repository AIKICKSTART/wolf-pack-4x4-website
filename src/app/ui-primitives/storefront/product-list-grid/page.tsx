import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProductListGrid } from "../../components/storefront"

import { SHOWCASE_PRODUCTS } from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Product list grid | Storefront",
  description:
    "Primitive 01 — product grid with quick-view hover, inline qty stepper and add-to-cart.",
}

const dense = SHOWCASE_PRODUCTS.slice(0, 6)
const wide = SHOWCASE_PRODUCTS

export default function ProductListGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Product list grid"
        title="Product list grid"
        description="Product cards with quick-view, inline quantity steppers and add-to-cart. Shows in-stock, low stock, back-order, OOS and pre-order tones."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Product list grid" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · full catalogue with mixed stock states</span>
        <ProductListGrid products={wide} />
        <span className={styles.stageCaption}>State 02 · trimmed showcase · dense layout</span>
        <ProductListGrid products={dense} />
        <span className={styles.stageCaption}>State 03 · empty results</span>
        <ProductListGrid products={[]} />
      </section>
    </main>
  )
}
