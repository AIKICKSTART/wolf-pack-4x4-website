import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AbcAnalysisTile } from "../../components/inventory-deep"

import { ABC_BANDS } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "ABC analysis tile | Inventory deep",
  description:
    "Primitive 06 — A/B/C class breakdown showing SKU share, revenue contribution and revenue share bars.",
}

export default function AbcAnalysisTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / ABC"
        title="ABC analysis tile"
        description="Standard ABC analysis — Class A is the core 18% of SKUs delivering 72% of revenue; Class C is the long tail. Bands show SKU share and revenue contribution."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "ABC analysis tile" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Oak Flats HQ · 786 SKUs</span>
        <AbcAnalysisTile scopeLabel="Oak Flats HQ" bands={ABC_BANDS} />

        <span className={styles.stageCaption}>Pacemaker NSW depot · 318 SKUs</span>
        <AbcAnalysisTile
          scopeLabel="Pacemaker NSW depot"
          bands={[
            { klass: "A", skuCount: 64, skuShare: 0.2, revenue: 248_500, revenueShare: 0.68 },
            { klass: "B", skuCount: 92, skuShare: 0.29, revenue: 82_100, revenueShare: 0.22 },
            { klass: "C", skuCount: 162, skuShare: 0.51, revenue: 36_750, revenueShare: 0.1 },
          ]}
        />

        <span className={styles.stageCaption}>Manta Direct line · 184 SKUs</span>
        <AbcAnalysisTile
          scopeLabel="Manta Direct line"
          bands={[
            { klass: "A", skuCount: 28, skuShare: 0.15, revenue: 412_600, revenueShare: 0.78 },
            { klass: "B", skuCount: 52, skuShare: 0.28, revenue: 88_400, revenueShare: 0.17 },
            { klass: "C", skuCount: 104, skuShare: 0.57, revenue: 26_300, revenueShare: 0.05 },
          ]}
        />
      </section>
    </main>
  )
}
