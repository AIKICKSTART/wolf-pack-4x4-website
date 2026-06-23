import type { Metadata } from "next"

import { ExperimentHistoryRow } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Experiment history row | A/B runtime",
  description:
    "Primitive 11 — past experiment row with dates, name, final lift, outcome and key learning.",
}

export default function ExperimentHistoryRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / History"
        title="Experiment history row"
        description="One past experiment per row — drop into a sortable history table. Surfaces ran-from / ran-to, the name, the final lift, the outcome bucket (shipped / iterated / killed / inconclusive), and a one-line key learning."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Experiment history row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · last 5 experiments</span>
        <div className={styles.rowGroup}>
          <ExperimentHistoryRow
            name="Mobile dock vs sidebar"
            ranFrom="2026-03-04"
            ranTo="2026-04-01"
            finalLiftPct={14.8}
            outcome="shipped"
            learning="Bottom dock lifted mobile quote completion by 14.8% on iOS + Android. Shipped to 100% mobile."
          />
          <ExperimentHistoryRow
            name="Suburb landing CTA"
            ranFrom="2026-05-15"
            ranTo="2026-05-25"
            finalLiftPct={6.2}
            outcome="iterated"
            learning="Suburb-pinned CTA lifted Wollongong but flat in Bega. Iterating with state-level fallback copy."
          />
          <ExperimentHistoryRow
            name="Workshop bay availability tile"
            ranFrom="2026-02-10"
            ranTo="2026-03-08"
            finalLiftPct={1.4}
            outcome="inconclusive"
            learning="Live bay tile moved nothing on same-day bookings. Underpowered at observed effect; not worth re-running."
          />
          <ExperimentHistoryRow
            name="Parts AR overlay vs 3D viewer"
            ranFrom="2026-01-08"
            ranTo="2026-02-04"
            finalLiftPct={-3.8}
            outcome="killed"
            learning="AR overlay tanked add-to-quote on Android. Killed at day 22 after guardrail breach."
          />
          <ExperimentHistoryRow
            name="Quote line-item icons"
            ranFrom="2025-12-01"
            ranTo="2025-12-21"
            finalLiftPct={4.6}
            outcome="shipped"
            learning="Per-line icons lifted quote-accept 4.6% with no guardrail moves. Shipped to all AU."
          />
        </div>
      </section>
    </main>
  )
}
