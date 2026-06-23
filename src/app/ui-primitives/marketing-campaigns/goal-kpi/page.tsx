import type { Metadata } from "next"

import { GoalKpiSelector } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_GOAL_OPTIONS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Goal KPI selector | Marketing campaigns",
  description:
    "Primitive 06 — pick the campaign success goal and target value: opens, clicks, conversions, revenue or bookings.",
}

export default function GoalKpiScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Goal KPI selector"
        title="Goal KPI selector"
        description="Pick the primary success metric for the campaign. Each option carries its own helper copy and unit. The bound target input drives downstream cohort metrics."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Goal KPI" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <GoalKpiSelector options={DEMO_GOAL_OPTIONS} defaultGoal="bookings" />
      </section>
    </main>
  )
}
