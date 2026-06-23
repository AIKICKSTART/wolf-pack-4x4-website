import type { Metadata } from "next"

import { CohortRetentionGrid } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { COHORT_COLUMN_LABELS, SAMPLE_COHORTS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Cohort retention grid | Customer success",
  description:
    "Primitive 02 — tone-coded cohort retention grid. Rows are signup cohorts; columns are months since signup; cells are retention percentages.",
}

export default function CohortRetentionGridScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Cohort retention"
        title="Cohort retention grid"
        description="A familiar Vitally / Gainsight cohort grid sized for workshop bookings. Cells deepen from red (under 25%) through amber, teal, and green (85%+)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Cohort retention grid" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen monthly cohorts · 10 months</span>
        <CohortRetentionGrid
          rows={SAMPLE_COHORTS}
          columnLabels={COHORT_COLUMN_LABELS}
          ariaLabel="Mufflermen cohort retention grid for August 2025 through May 2026"
        />
      </section>
    </main>
  )
}
