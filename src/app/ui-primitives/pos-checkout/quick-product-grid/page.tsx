import type { Metadata } from "next"

import { QuickProductGrid } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { QUICK_PRODUCTS } from "../_mock-data"
import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Quick product grid | POS checkout",
  description:
    "Primitive 10 — tile grid of top-seller SKUs for fast adding to the active sale. Oil, washer fluid, wipers, muffler-themed air freshener.",
}

export default function QuickProductGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Quick product grid"
        title="Quick product grid"
        description="Top-seller tile grid for fast adding. Oak Flats workshop favourites — oil, washer fluid, wipers, muffler-themed air freshener, V-band hardware."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Quick product grid" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · top 8 sellers</span>
        <QuickProductGrid products={QUICK_PRODUCTS} />
        <span className={styles.stageCaption}>State 02 · narrowed · workshop floor essentials</span>
        <QuickProductGrid
          products={QUICK_PRODUCTS.slice(0, 4)}
          kicker="Workshop floor"
          title="Bay essentials"
        />
        <span className={styles.stageCaption}>State 03 · empty grid</span>
        <QuickProductGrid products={[]} title="No tiles configured" />
      </section>
    </main>
  )
}
