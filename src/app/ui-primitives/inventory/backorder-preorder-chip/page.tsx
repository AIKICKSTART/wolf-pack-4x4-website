import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BackorderPreorderChip } from "../../components/inventory"

import { BACKORDER_CHIPS } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Backorder / pre-order chip | Inventory",
  description:
    "Primitive 14 — Compact chip group for backordered, preordered and drop-ship SKUs with ETA + customer-impact count.",
}

export default function BackorderPreorderChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Pipeline"
        title="Backorder / pre-order chip"
        description="Compact chip group — kind, ETA, customer-impact count. Useful inline beside a SKU row to communicate why it is out of stock and how many customers are affected."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Backorder / pre-order chip" },
        ]}
      />
      <section className={styles.stageFrame}>
        {BACKORDER_CHIPS.map((chip, idx) => (
          <BackorderPreorderChip key={`${chip.kind}-${idx}`} {...chip} />
        ))}
      </section>
    </main>
  )
}
