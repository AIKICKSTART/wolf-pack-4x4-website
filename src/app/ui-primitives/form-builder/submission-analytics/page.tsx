import type { Metadata } from "next"

import { SubmissionAnalyticsCard } from "../../components/form-builder"
import { PageHeader } from "../../components/page-header"

import { SUBMISSION_DROPOFF } from "../fixtures"
import styles from "../form-builder.module.css"

export const metadata: Metadata = {
  title: "Submission analytics | Form builder",
  description:
    "Primitive 10 — submissions analytics card with totals, completion gauge, and per-field drop-off bars.",
}

export default function SubmissionAnalyticsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Submission analytics"
        title="Submission analytics card"
        description="Three KPIs — total submissions, average time-to-complete, and a SVG completion gauge — sit above a per-field drop-off bar chart. Bars are tone-coded high / mid / low so the abandonment cliff is visible at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder", href: "/ui-primitives/form-builder" },
          { label: "Submission analytics" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — last 30 days</span>
        <SubmissionAnalyticsCard
          totalSubmissions={1284}
          completionRate={62}
          averageTime="1m 48s"
          dropOff={SUBMISSION_DROPOFF}
          trend="+12%"
        />
      </section>
    </main>
  )
}
