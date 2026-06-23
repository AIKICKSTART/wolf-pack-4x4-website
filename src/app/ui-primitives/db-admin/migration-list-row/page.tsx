import type { Metadata } from "next"

import { MigrationListRow } from "../../components/db-admin"
import { PageHeader } from "../../components/page-header"

import { MIGRATIONS } from "../_mock-data"
import styles from "../db-admin.module.css"

export const metadata: Metadata = {
  title: "Migration row | DB Admin",
  description:
    "Primitive 06 — single migration row with version, name, applied-at, status chip across Pending / Applied / Failed / Rolled back, and actions.",
}

function formatDuration(ms?: number): string | undefined {
  if (typeof ms !== "number") {
    return undefined
  }
  if (ms < 1000) {
    return `${ms}ms`
  }
  return `${(ms / 1000).toFixed(1)}s`
}

export default function MigrationListRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Migration row"
        title="Migration row"
        description="A single row in the migration list. The version chip is locked to the left, the name and applied-at meta occupy the body, a status chip surfaces the lifecycle (Pending / Applied / Failed / Rolled back), and two action buttons swap between Run and Rollback depending on the row state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin", href: "/ui-primitives/db-admin" },
          { label: "Migration row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — recent migrations</span>
        <div>
          {MIGRATIONS.map((migration) => (
            <MigrationListRow
              key={migration.version}
              version={migration.version}
              name={migration.name}
              appliedAt={migration.appliedAt}
              status={migration.status}
              duration={formatDuration(migration.durationMs)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
