import type { Metadata } from "next"

import { ExperimentDashboardCard } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Experiment dashboard card | A/B runtime",
  description:
    "Primitive 01 — running experiment card with status, arms, winner indicator, exposed count, and lift chip.",
}

export default function ExperimentDashboardCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Card"
        title="Experiment dashboard card"
        description="Workhorse dashboard row for a running experiment. Surfaces status, treatment arms with conversion and allocation, current winner star, exposed count, lift, region, and day running."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Experiment dashboard card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three experiments</span>
        <div className={styles.demoStack}>
          <ExperimentDashboardCard
            experimentId="EXP-OF-0421"
            name="Quote PDF redesign"
            hypothesis="Brand-led header + structured line-items on quote PDFs lifts quote-accept rate vs the legacy mono-block layout."
            status="running"
            region="AU+NZ"
            daysRunning={14}
            exposed={28430}
            primaryMetricLabel="Quote-accept rate"
            lift={11.6}
            arms={[
              {
                id: "control",
                name: "Legacy PDF",
                role: "control",
                allocation: 50,
                conversionRate: 18.4,
              },
              {
                id: "treatment",
                name: "Brand header v2",
                role: "treatment",
                allocation: 50,
                conversionRate: 20.6,
                isWinner: true,
              },
            ]}
          />

          <ExperimentDashboardCard
            experimentId="EXP-OF-0422"
            name="Suburb landing CTA"
            hypothesis="Suburb-pinned CTA copy (e.g. 'Book Wollongong workshop') lifts suburb-page → quote click-through vs the generic CTA."
            status="ramping"
            region="AU"
            daysRunning={6}
            exposed={9842}
            primaryMetricLabel="Quote click-through"
            lift={6.2}
            arms={[
              {
                id: "control",
                name: "Generic CTA",
                role: "control",
                allocation: 70,
                conversionRate: 9.8,
              },
              {
                id: "treatment",
                name: "Suburb-pinned",
                role: "treatment",
                allocation: 30,
                conversionRate: 10.4,
                isWinner: true,
              },
            ]}
          />

          <ExperimentDashboardCard
            experimentId="EXP-OF-0419"
            name="Mobile dock vs sidebar"
            hypothesis="Bottom-dock nav (mobile only) reduces quote-flow drop-off vs the legacy hamburger sidebar."
            status="shipped"
            region="AU+NZ · mobile"
            daysRunning={28}
            exposed={61204}
            primaryMetricLabel="Mobile quote completion"
            lift={14.8}
            arms={[
              {
                id: "control",
                name: "Hamburger sidebar",
                role: "control",
                allocation: 50,
                conversionRate: 7.6,
              },
              {
                id: "treatment",
                name: "Bottom dock",
                role: "treatment",
                allocation: 50,
                conversionRate: 8.7,
                isWinner: true,
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
