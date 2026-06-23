import type { Metadata } from "next"

import { EngagementDecayChart } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { ENGAGEMENT_DECAY_SERIES } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Engagement decay chart | Marketing automation",
  description:
    "Primitive 14 — engagement half-life curve per channel with summary tiles and dashed half-life markers.",
}

function exponentialDecay(halfLife: number, length: number): number[] {
  const points: number[] = []
  for (let day = 0; day <= length; day += 1) {
    points.push(Math.pow(0.5, day / halfLife))
  }
  return points
}

const SLOW_DECAY = [
  { channel: "email" as const, points: exponentialDecay(5.4, 14), halfLifeDays: 5.4 },
  { channel: "task" as const, points: exponentialDecay(7.8, 14), halfLifeDays: 7.8 },
]

const TIGHT_DECAY = [
  { channel: "sms" as const, points: exponentialDecay(0.6, 14), halfLifeDays: 0.6 },
  { channel: "voice" as const, points: exponentialDecay(0.4, 14), halfLifeDays: 0.4 },
]

export default function EngagementDecayChartScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Engagement decay chart"
        title="Engagement decay chart"
        description="Channel-level engagement decay. Each curve is normalised so the half-life marker is the day engagement crosses 50%. The summary tiles surface the half-life as a number."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Engagement decay chart" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Multi-channel baseline</h2>
        <EngagementDecayChart
          title="Mufflermen channels · half-life"
          series={ENGAGEMENT_DECAY_SERIES}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Long-tail (email + task)</h2>
        <EngagementDecayChart
          title="Owned channels · long tail"
          series={SLOW_DECAY}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Tight decay (SMS + voice)</h2>
        <EngagementDecayChart
          title="Push channels · tight decay"
          series={TIGHT_DECAY}
        />
      </section>
    </main>
  )
}
