import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InventoryAnalyticsTile } from "../../components/inventory"

import { TURNOVER_TREND } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Inventory analytics tile | Inventory",
  description:
    "Primitive 11 — KPI tile composing MetricBlock + Sparkline for turnover, days of stock and carrying cost.",
}

export default function InventoryAnalyticsTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / KPI"
        title="Inventory analytics tile"
        description="Composes the MetricBlock + Sparkline primitives. Turnover, days of stock, monthly carrying cost — with an optional delta chip on the turnover metric."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Inventory analytics tile" },
        ]}
      />
      <section className={styles.stageFrame}>
        <div className={styles.stageRow}>
          <InventoryAnalyticsTile
            scopeLabel="Oak Flats (HQ)"
            turnoverRate={6.4}
            daysOfStock={57}
            carryingCost={18_400}
            turnoverTrend={TURNOVER_TREND}
            turnoverDeltaPct={4.2}
          />
          <InventoryAnalyticsTile
            scopeLabel="Albion Park"
            turnoverRate={4.8}
            daysOfStock={76}
            carryingCost={9_650}
            turnoverTrend={[3.4, 3.6, 3.9, 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.8, 4.8]}
            turnoverDeltaPct={2.1}
          />
          <InventoryAnalyticsTile
            scopeLabel="Sydney Depot"
            turnoverRate={5.6}
            daysOfStock={65}
            carryingCost={14_200}
            turnoverTrend={[6.4, 6.2, 6.0, 5.9, 5.8, 5.7, 5.6, 5.6, 5.5, 5.6, 5.6, 5.6]}
            turnoverDeltaPct={-1.4}
          />
        </div>
      </section>
    </main>
  )
}
