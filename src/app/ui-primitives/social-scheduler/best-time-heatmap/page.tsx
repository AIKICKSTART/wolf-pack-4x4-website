import type { Metadata } from "next"

import { BestTimeHeatmap } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { HEATMAP_CELLS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Best time heatmap | Muffler Pulse",
  description:
    "Primitive 09 — day × hour heatmap of best posting times with peak callout.",
}

export default function BestTimeHeatmapPage() {
  // State B: ramp morning peaks for tradies' early scroll.
  const morningHeavy = HEATMAP_CELLS.map((cell) =>
    cell.hour >= 5 && cell.hour <= 8 ? { ...cell, score: Math.min(1, cell.score + 0.45) } : cell,
  )

  // State C: weekends-only — flatten weekdays.
  const weekendOnly = HEATMAP_CELLS.map((cell) =>
    cell.day < 5 ? { ...cell, score: cell.score * 0.3 } : cell,
  )

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Best time heatmap"
        title="Best time to post heatmap"
        description="Engagement intensity by day of week and hour of day. Drives both the queue recommendation engine and the team's weekly planning huddle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Best time heatmap" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · All-week, Dyno Tuesday lights up</span>
        <BestTimeHeatmap cells={HEATMAP_CELLS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Tradie morning bias (5–8am ramped)</span>
        <BestTimeHeatmap
          title="Tradie morning bias"
          cells={morningHeavy}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Weekend-only window</span>
        <BestTimeHeatmap
          title="Weekend window"
          cells={weekendOnly}
        />
      </section>
    </main>
  )
}
