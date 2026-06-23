import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MetricBlock } from "../../components/data-display"
import type { MetricBlockItem } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Metric block | UI Primitives — Data display",
}

const todayMetrics: ReadonlyArray<MetricBlockItem> = [
  { id: "jobs", label: "Jobs booked", value: "38", unit: "today", delta: { label: "+4", direction: "up" } },
  { id: "revenue", label: "Revenue", value: "A$14,820", delta: { label: "+8.2%", direction: "up" } },
  { id: "wait", label: "Avg wait", value: "26", unit: "min", delta: { label: "-3 min", direction: "down" } },
  { id: "loaners", label: "Loaners out", value: "14 / 18", delta: { label: "flat", direction: "flat" } },
]

const partsMetrics: ReadonlyArray<MetricBlockItem> = [
  { id: "skus", label: "Active SKUs", value: "2,148", delta: { label: "+34", direction: "up" } },
  { id: "backorder", label: "On backorder", value: "36", delta: { label: "+8", direction: "up" } },
  { id: "lead", label: "Avg lead time", value: "9.4", unit: "days", delta: { label: "-0.6", direction: "down" } },
  { id: "value", label: "Inventory value", value: "A$486k", delta: { label: "+2.1%", direction: "up" } },
  { id: "fillrate", label: "Fill rate", value: "97.2%", delta: { label: "+0.4pp", direction: "up" } },
]

export default function MetricBlockShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.03 / Data display"
        title="Metric block — dense KPI band"
        description="A definition list bound into a single horizontal band. Each metric carries label, value, optional unit, and directional delta. Auto-wraps below 160px columns."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Metric block" },
        ]}
      />
      <section className={styles.canvas}>
        <MetricBlock metrics={todayMetrics} />
        <MetricBlock metrics={partsMetrics} />
        <div className={styles.note}>
          <span>Usage</span>
          <p>
            Use the metric block above tables or below dashboard cards to summarise figures
            without competing for hierarchy. Direction colours stay subdued for legibility.
          </p>
        </div>
      </section>
    </main>
  )
}
