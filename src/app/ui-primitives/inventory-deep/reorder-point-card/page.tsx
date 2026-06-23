import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReorderPointCard } from "../../components/inventory-deep"

import { REORDER_CARDS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Reorder point card | Inventory deep",
  description:
    "Primitive 04 — SKU reorder card with EOQ + lead time + safety stock + days of cover.",
}

export default function ReorderPointCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Reorder point"
        title="Reorder point card"
        description="EOQ-aware SKU card — on-hand vs reorder point, EOQ, safety stock, supplier lead time and days of cover with tone-coded health."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Reorder point card" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Trigger now · below reorder</span>
        <ReorderPointCard {...REORDER_CARDS[0]} />

        <span className={styles.stageCaption}>On track · long lead</span>
        <ReorderPointCard {...REORDER_CARDS[1]} />

        <span className={styles.stageCaption}>Comfortable cover</span>
        <ReorderPointCard {...REORDER_CARDS[2]} />
      </section>
    </main>
  )
}
