import type { Metadata } from "next"

import { NpsTrendChart } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_NPS_POINTS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "NPS trend chart | Customer success",
  description:
    "Primitive 03 — NPS trend with stacked area chart of promoters, passives, and detractors and a latest-NPS callout.",
}

export default function NpsTrendScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / NPS trend"
        title="NPS trend chart"
        description="Composes the AreaChart primitive with a stacked layout — detractors → passives → promoters — and a chip row summarising the trailing window."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "NPS trend chart" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen Q1 → Q2 trailing NPS</span>
        <NpsTrendChart
          points={SAMPLE_NPS_POINTS}
          ariaLabel="NPS trend for Mufflermen Dec 2025 through May 2026"
        />
      </section>
    </main>
  )
}
