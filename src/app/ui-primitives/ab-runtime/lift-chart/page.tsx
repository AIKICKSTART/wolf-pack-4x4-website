import type { Metadata } from "next"

import { LiftChart, type LiftDailyPoint } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Lift chart | A/B runtime",
  description:
    "Primitive 06 — daily lift line chart with a 95% confidence band over the zero baseline.",
}

const POINTS: ReadonlyArray<LiftDailyPoint> = [
  { label: "May 12", lift: 4.1, lower: -3.4, upper: 11.6 },
  { label: "May 13", lift: 6.8, lower: -1.1, upper: 14.7 },
  { label: "May 14", lift: 5.6, lower: -0.8, upper: 12.0 },
  { label: "May 15", lift: 8.2, lower: 1.6, upper: 14.8 },
  { label: "May 16", lift: 9.4, lower: 3.2, upper: 15.6 },
  { label: "May 17", lift: 10.1, lower: 4.4, upper: 15.8 },
  { label: "May 18", lift: 9.6, lower: 4.2, upper: 15.0 },
  { label: "May 19", lift: 10.9, lower: 5.6, upper: 16.2 },
  { label: "May 20", lift: 11.3, lower: 6.4, upper: 16.2 },
  { label: "May 21", lift: 11.6, lower: 7.0, upper: 16.2 },
  { label: "May 22", lift: 11.8, lower: 7.4, upper: 16.2 },
  { label: "May 23", lift: 11.6, lower: 7.3, upper: 15.9 },
  { label: "May 24", lift: 11.4, lower: 7.3, upper: 15.5 },
  { label: "May 25", lift: 11.6, lower: 7.6, upper: 15.6 },
]

export default function LiftChartScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Chart"
        title="Lift chart"
        description="Daily lift over control with a 95% confidence band. Bands narrow as the sample accumulates and the experiment converges on its true effect."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Lift chart" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign · 14 days</span>
        <LiftChart
          title="Quote PDF redesign — daily lift over legacy"
          points={POINTS}
          confidence={0.95}
        />
      </section>
    </main>
  )
}
