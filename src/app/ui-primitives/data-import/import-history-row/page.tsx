import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ImportHistoryRow } from "../../components/data-import"
import { IMPORT_HISTORY } from "../demo-data"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Import history row | Data import",
  description:
    "Primitive 10 — History row: filename, timestamp, rows, status chip, duration, rollback chip.",
}

export default function ImportHistoryRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Import history row"
        title="Import history row"
        description="A single row in the import history list. Status chip + duration + row count give a quick read; the rollback chip is the most-clicked control once an import lands."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Import history row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Recent imports</span>
        <div className={styles.demoStack}>
          {IMPORT_HISTORY.map((entry) => (
            <ImportHistoryRow key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
