import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TourAnalyticsCard } from "../../components/product-tours"
import { SAMPLE_FUNNEL } from "../fixtures"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Tour analytics card | Product tours",
  description:
    "Primitive 06 — completion-rate gauge plus per-step funnel showing where users drop off.",
}

const LOW_PERF_FUNNEL = SAMPLE_FUNNEL.map((row, index) => ({
  ...row,
  reached: Math.round(row.reached * (index === 0 ? 0.4 : 0.32)),
  completed: Math.round(row.completed * (index === 0 ? 0.34 : 0.22)),
}))

export default function TourAnalyticsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Analytics"
        title="Tour analytics card"
        description="Per-tour analytics — starts, completions, drop-off step, completion-rate radial gauge, and a per-step funnel showing exactly where users abandon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Tour analytics" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Instant quote walk-through · healthy</span>
        <TourAnalyticsCard
          tourName="Instant quote walk-through"
          starts={2_184}
          completions={996}
          dropOffStep={3}
          totalSteps={6}
          window="Last 30 days"
          funnel={SAMPLE_FUNNEL}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Fleet operator onboarding · critical</span>
        <TourAnalyticsCard
          tourName="Fleet operator onboarding"
          starts={148}
          completions={36}
          dropOffStep={4}
          totalSteps={12}
          window="Last 30 days"
          funnel={LOW_PERF_FUNNEL.slice(0, 6)}
        />
      </section>
    </main>
  )
}
