import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FilterPanel } from "../../components/reports-deep"
import { FILTER_CHIPS, FILTER_TEXT_FIELDS } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Filter panel | Reports-deep",
  description:
    "Primitive 03 — left-rail filter panel with date range, select, numeric range and chip groups, plus a clear-all chip.",
}

export default function FilterPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Filter panel"
        title="Filter panel"
        description="The canonical left-rail filter panel — date range pair, select dropdown, numeric range pair and any number of chip groups. The clear button shows the active filter count and resets all fields to initial."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Filter panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: "320px" }}>
          <FilterPanel
            title="Workshop revenue"
            dateRange={{
              id: "date-range",
              label: "Date range",
              initial: { start: "2026-05-22", end: "2026-05-28" },
            }}
            selectField={{
              id: "report-set",
              label: "Report set",
              initial: "weekly",
              options: [
                { id: "weekly", label: "Weekly" },
                { id: "monthly", label: "Monthly" },
                { id: "quarterly", label: "Quarterly" },
                { id: "ytd", label: "Year to date" },
              ],
            }}
            numericRange={{
              id: "revenue-range",
              label: "Revenue band",
              unit: "AUD",
              bounds: { min: 0, max: 50000 },
              initial: { min: 0, max: 50000 },
            }}
            chipGroups={FILTER_CHIPS}
            textFields={FILTER_TEXT_FIELDS}
          />
        </div>
      </section>
    </main>
  )
}
