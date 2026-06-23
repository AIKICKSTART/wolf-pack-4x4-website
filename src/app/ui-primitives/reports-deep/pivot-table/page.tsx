import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PivotTable } from "../../components/reports-deep"
import {
  PIVOT_COL_GROUPS,
  PIVOT_MATRIX,
  PIVOT_MEASURES,
  PIVOT_ROW_GROUPS,
  PIVOT_TITLE,
} from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Pivot table | Reports-deep",
  description:
    "Primitive 07 — pivot table with grouped row + column headers, a measure picker radio group, row subtotals, column subtotals and grand total.",
}

export default function PivotTablePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Pivot table"
        title="Pivot table"
        description="The canonical pivot — service line grouped by performance vs service rows; suburbs grouped by northern vs southern Illawarra columns. Swap the active measure (revenue, jobs, parts margin) via the radio picker. Subtotals + grand total are derived."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Pivot table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <PivotTable
          title={PIVOT_TITLE}
          rowGroups={PIVOT_ROW_GROUPS}
          columnGroups={PIVOT_COL_GROUPS}
          measures={PIVOT_MEASURES}
          matrix={PIVOT_MATRIX}
          initialMeasureId="m-revenue"
        />
      </section>
    </main>
  )
}
