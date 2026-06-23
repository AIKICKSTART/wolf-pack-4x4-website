import type { Metadata } from "next"

import { ExperimentResultsCard } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Experiment results card | Feature flags",
  description:
    "Primitive 10 — experiment results card with conversion, uplift, p-value chip and winner badge.",
}

export default function ExperimentResultsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Results"
        title="Experiment results card"
        description="Summary card for an A/B/C experiment. Each row shows the variant name, raw conversion rate, uplift vs control (green up / red down), a p-value chip that turns green at < 0.05 (configurable significance threshold), and a winner badge for the leading variant. A horizontal significance bar visualises relative conversion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Experiment results" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two finished experiments</span>
        <div className={styles.demoStack}>
          <ExperimentResultsCard
            name="Quote conversion — live pricing"
            description="Does live recalculating during quote build lift booking conversion vs save-then-price?"
            sampleSize={28430}
            variants={[
              {
                id: "control",
                name: "Save then price",
                conversionRate: 18.4,
                uplift: 0,
                pValue: 1,
                isControl: true,
              },
              {
                id: "live",
                name: "Live preview",
                conversionRate: 22.1,
                uplift: 20.1,
                pValue: 0.0009,
                isWinner: true,
              },
            ]}
          />
          <ExperimentResultsCard
            name="Parts page — viewer treatment"
            description="3D viewer vs AR overlay against the existing carousel."
            sampleSize={9842}
            variants={[
              {
                id: "flat",
                name: "Carousel",
                conversionRate: 4.9,
                uplift: 0,
                pValue: 1,
                isControl: true,
              },
              {
                id: "viewer",
                name: "3D viewer",
                conversionRate: 6.1,
                uplift: 24.4,
                pValue: 0.012,
                isWinner: true,
              },
              {
                id: "ar",
                name: "AR overlay",
                conversionRate: 5.3,
                uplift: 8.1,
                pValue: 0.42,
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
