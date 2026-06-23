import type { Metadata } from "next"

import { MetricCounterStrip } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { METRICS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Metric counter strip | Landing Pages",
  description: "Primitive 10 — animated counter strip with years, vehicles, reviews, fleet count.",
}

const FOCUS_METRICS = METRICS.slice(0, 2)
const FLEET_METRICS = [
  {
    id: "fleet-vehicles",
    value: 124,
    label: "Fleet vehicles on rolling audit",
    caption: "Across councils, civil + trade",
  },
  {
    id: "fleet-hours",
    value: 1820,
    label: "Tip-truck downtime hours saved",
    caption: "Shellharbour Council · 2025",
  },
  {
    id: "fleet-savings",
    value: 54000,
    prefix: "$",
    label: "Annual compliance savings",
    caption: "Per council fleet · year",
  },
] as const

export default function MetricCounterStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Metric strip"
        title="Metric counter strip"
        description="Animated counter strip. Three states: full 4-metric strip, focused 2-metric strip, and a fleet-specific 3-metric strip with monetary prefix."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Metric counter strip" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full 4-metric strip</span>
      <MetricCounterStrip metrics={METRICS} />

      <span className={styles.stageCaption}>State · Focused 2-metric strip</span>
      <MetricCounterStrip metrics={FOCUS_METRICS} />

      <span className={styles.stageCaption}>State · Fleet-specific 3-metric strip</span>
      <MetricCounterStrip metrics={FLEET_METRICS} />
    </main>
  )
}
