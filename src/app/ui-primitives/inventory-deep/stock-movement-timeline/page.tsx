import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StockMovementTimeline } from "../../components/inventory-deep"

import { MOVEMENTS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Stock movement timeline | Inventory deep",
  description:
    "Primitive 12 — chronological in / out movements per SKU.",
}

export default function StockMovementTimelinePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Movements"
        title="Stock movement timeline"
        description="Per-SKU traceability timeline — newest-first list of receipts, picks, transfers, adjustments and write-offs with running balance and source reference."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Stock movement timeline" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>MB-3-90 · last 6 movements</span>
        <StockMovementTimeline sku="MB-3-90" entries={MOVEMENTS} />

        <span className={styles.stageCaption}>Sparse history · single receipt</span>
        <StockMovementTimeline
          sku="MAN-CB-30-RNG"
          entries={[
            {
              id: "rng-001",
              kind: "receipt",
              delta: 8,
              balanceAfter: 8,
              at: "2026-05-12T09:15:00+10:00",
              reference: "PO-2026-0463",
              actor: "Brad",
            },
          ]}
        />

        <span className={styles.stageCaption}>Heavy write-off run · investigation queue</span>
        <StockMovementTimeline
          sku="GEN-EBC"
          entries={[
            {
              id: "ebc-w-1",
              kind: "write-off",
              delta: -2,
              balanceAfter: 4,
              at: "2026-05-22T11:02:00+10:00",
              reference: "WO-2026-018",
              actor: "Jase",
            },
            {
              id: "ebc-w-2",
              kind: "adjustment",
              delta: -1,
              balanceAfter: 6,
              at: "2026-05-18T15:48:00+10:00",
              reference: "Cycle #045",
              actor: "Jase",
            },
            {
              id: "ebc-w-3",
              kind: "write-off",
              delta: -3,
              balanceAfter: 7,
              at: "2026-05-04T10:10:00+10:00",
              reference: "WO-2026-014",
              actor: "Brad",
            },
          ]}
        />
      </section>
    </main>
  )
}
