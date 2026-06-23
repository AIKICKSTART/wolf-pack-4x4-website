import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { GoalTrackerCard } from "../../components/reports-deep"
import { GOAL_DYNO_MONTH, GOAL_PARTS_QUARTER, GOAL_REVENUE_WEEK } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Goal tracker card | Reports-deep",
  description:
    "Primitive 12 — goal progress card with target, projected and variance. Status chip flips between ahead, on-track and behind.",
}

export default function GoalTrackerCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Goal tracker card"
        title="Goal tracker card"
        description="Tracks current, target and projected for a goal. The teal bar shows current progress; the amber band shows the projected end-of-period landing. Variance pill flips green/red based on direction. Weekly revenue $42,180 trending toward $43,900 vs $45,000 target."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Goal tracker card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoColumns}>
          <GoalTrackerCard goal={GOAL_REVENUE_WEEK} />
          <GoalTrackerCard goal={GOAL_DYNO_MONTH} />
          <GoalTrackerCard goal={GOAL_PARTS_QUARTER} />
        </div>
      </section>
    </main>
  )
}
