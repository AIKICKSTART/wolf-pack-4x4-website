import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PivotTablePreview } from "../../components/reports"
import { PIVOT_HEADERS, PIVOT_ROWS, PIVOT_TOTALS } from "../demo-data"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Pivot table preview | Reports",
  description:
    "Primitive 06 — compact pivot preview with row + column headers, cells, subtotal row, and totals.",
}

export default function PivotTablePreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Pivot table preview"
        title="Pivot table preview"
        description="The summary grid produced by the builder — row headers across job types, column headers across suburbs, currency cells, an italic subtotal row, and a totals row."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Pivot table preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PivotTablePreview
          title="May FY26 — revenue by suburb × job type (AUD)"
          rowHeader="Job type"
          columnHeaders={PIVOT_HEADERS}
          rows={PIVOT_ROWS}
          totalsLabel="May total"
          totals={PIVOT_TOTALS}
        />
      </section>
    </main>
  )
}
