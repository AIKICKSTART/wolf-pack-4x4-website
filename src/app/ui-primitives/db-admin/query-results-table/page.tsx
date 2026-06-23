import type { Metadata } from "next"

import { QueryResultsTable } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { RESULT_COLUMNS, RESULT_ROWS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Query results table | DB Admin",
  description:
    "Primitive 05 — query result table composing the data-display DataTable with a row-number column, auto-formatted cells per type, and an export CTA.",
}

export default function QueryResultsTableScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Query results table"
        title="Query results table"
        description="A result surface that composes the existing data-display DataTable. A first row-number column, type-aware cell renderers (number alignment, ISO date formatting, boolean chip, JSON pill, NULL italic), and a CSV export chip are layered over the base table."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Query results table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — quotes result (5 rows)</span>
        <QueryResultsTable
          columns={RESULT_COLUMNS}
          rows={RESULT_ROWS}
          duration="184ms"
        />
      </section>
    </main>
  )
}
