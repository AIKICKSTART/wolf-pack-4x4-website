import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CohortGrid } from "../../components/reports-deep"
import {
  COHORT_ENGAGEMENT,
  COHORT_PERIODS,
  COHORT_RETENTION,
  COHORT_REVENUE,
} from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Cohort grid | Reports-deep",
  description:
    "Primitive 09 — cohort grid heatmap with retention, revenue and engagement metric toggle.",
}

export default function CohortGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Cohort grid"
        title="Cohort grid"
        description="Weekly cohorts indexed by their first job. Switch the metric between retention (% still returning), revenue (AUD), and engagement (avg interactions per customer). Cell intensity scales with value."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Cohort grid" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <CohortGrid
          title="FY26 weekly cohorts"
          periodLabels={COHORT_PERIODS}
          datasets={[
            { metric: "retention", label: "Retention", rows: COHORT_RETENTION },
            { metric: "revenue", label: "Revenue", rows: COHORT_REVENUE },
            { metric: "engagement", label: "Engagement", rows: COHORT_ENGAGEMENT },
          ]}
          initialMetric="retention"
        />
      </section>
    </main>
  )
}
