import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import styles from "../storefront.module.css"

import { FullShopScene } from "./full-shop-scene"

export const metadata: Metadata = {
  title: "Full shop | Storefront",
  description:
    "Composition route — search, faceted filters, product grid, cart drawer, coupon card and order rail wired into a live shop surface.",
}

export default function FullShopPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Full shop"
        title="Full shop composition"
        description="Live e-commerce surface composing search, faceted filters, product grid, mini cart badge, cart drawer, order summary rail and coupon card. Add to cart from the grid to see the drawer fly open and totals recompute. Try MUFFLER10 or TRADE15."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Full shop" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · live storefront · search → filter → add → drawer → coupon</span>
        <FullShopScene />
      </section>
    </main>
  )
}
