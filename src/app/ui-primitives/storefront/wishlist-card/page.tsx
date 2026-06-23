import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WishlistCard } from "../../components/storefront"

import { WISHLIST_ENTRIES } from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Wishlist card | Storefront",
  description: "Primitive 11 — saved item card with stock-alert toggle and move-to-cart.",
}

export default function WishlistCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Wishlist card"
        title="Wishlist card"
        description="Saved-item card with stock-alert toggle, move-to-cart and remove. Shows pre-order, low-stock and out-of-stock states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Wishlist card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · pre-order · alert ON</span>
        <WishlistCard entry={WISHLIST_ENTRIES[0]} />
        <span className={styles.stageCaption}>State 02 · low-stock · alert OFF</span>
        <WishlistCard entry={WISHLIST_ENTRIES[1]} />
        <span className={styles.stageCaption}>State 03 · out-of-stock · move-to-cart disabled</span>
        <WishlistCard entry={WISHLIST_ENTRIES[2]} />
      </section>
    </main>
  )
}
