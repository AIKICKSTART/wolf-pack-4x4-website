import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReportRunHistoryTable } from "../../components/reports"
import { RUN_HISTORY } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Run history table | Reports",
  description:
    "Primitive 05 — semantic table of report runs with timestamp, duration, rows, size, status, and download.",
}

export default function ReportRunHistoryTableScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Run history table"
        title="Run history table"
        description="A compact log of every report execution — start time, duration, row count, file size, delivery status, and a per-run download. Built on the data table primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Run history table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ReportRunHistoryTable
          runs={RUN_HISTORY}
          caption="Weekly bay utilisation runs"
        />
      </section>
    </main>
  )
}
