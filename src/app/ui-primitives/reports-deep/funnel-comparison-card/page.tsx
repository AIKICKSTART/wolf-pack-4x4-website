import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FunnelComparisonCard } from "../../components/reports-deep"
import { FUNNEL_STAGES } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Funnel comparison card | Reports-deep",
  description:
    "Primitive 08 — period-over-period funnel comparison with current vs prior bars and per-stage delta chips.",
}

export default function FunnelComparisonCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Funnel comparison card"
        title="Funnel comparison card"
        description="Side-by-side period funnel — current week vs prior. Mufflermen lead → quote → approval → booking → completion. Quote-approval shows the conversion drop that triggers the anomaly callout in primitive 11."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Funnel comparison card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <FunnelComparisonCard
          title="Workshop conversion funnel"
          currentLabel="Week 22 FY26"
          priorLabel="Week 21 FY26"
          stages={FUNNEL_STAGES}
        />
      </section>
    </main>
  )
}
