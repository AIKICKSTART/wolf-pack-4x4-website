import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CorrelationMatrix } from "../../components/observability"

import { CORRELATION_METRICS, CORRELATION_VALUES } from "../_mock-data"
import styles from "../observability.module.css"

export const metadata: Metadata = {
  title: "Correlation matrix | Observability cockpit",
  description:
    "Primitive 11 — Pearson-style correlation heatmap between platform metrics with a -1 / 0 / +1 legend.",
}

export default function CorrelationMatrixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Correlation"
        title="Correlation matrix"
        description="A Pearson-style correlation heatmap — each cell shows the coefficient (-1 to +1) between a pair of platform metrics. Cells lean teal for positive correlation and red for negative, with intensity scaled to the absolute value. Useful for spotting which signals tend to move together when an incident starts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Observability", href: "/ui-primitives/observability" },
          { label: "Correlation matrix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 6 metrics · 36 cells</span>
        <CorrelationMatrix
          metrics={CORRELATION_METRICS}
          values={CORRELATION_VALUES}
          caption="Mufflermen platform · last 24h"
        />
      </section>
    </main>
  )
}
