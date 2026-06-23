import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SafetyStockGauge } from "../../components/inventory-deep"

import { SAFETY_GAUGES } from "../_mock-data"
import styles from "../inventory-deep.module.css"

export const metadata: Metadata = {
  title: "Safety stock gauge | Inventory deep",
  description:
    "Primitive 09 — radial gauge showing current vs safety stock and days of cover.",
}

export default function SafetyStockGaugePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Safety stock"
        title="Safety stock gauge"
        description="Radial gauge — current vs safety floor, with days-of-cover derived from daily burn. Tone shifts red below safety floor, amber for thin buffer, green for healthy."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory deep", href: "/ui-primitives/inventory-deep" },
          { label: "Safety stock gauge" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Above safety · healthy cover</span>
        <SafetyStockGauge {...SAFETY_GAUGES[0]} />

        <span className={styles.stageCaption}>Below safety · trigger restock</span>
        <SafetyStockGauge {...SAFETY_GAUGES[1]} />

        <span className={styles.stageCaption}>Bulk SKU · deep cover</span>
        <SafetyStockGauge {...SAFETY_GAUGES[2]} />
      </section>
    </main>
  )
}
