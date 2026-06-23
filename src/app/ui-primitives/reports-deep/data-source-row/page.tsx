import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DataSourceRow } from "../../components/reports-deep"
import { DATA_SOURCES } from "../demo-data"

import styles from "../reports-deep.module.css"

export const metadata: Metadata = {
  title: "Data source row | Reports-deep",
  description:
    "Primitive 13 — connected data source row with state dot, record count, last/next sync timestamps and refresh button.",
}

export default function DataSourceRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Data source row"
        title="Data source row"
        description="A list row for a connected analytics data source. State chip shows healthy, syncing, stale, failed or auth-needed. Refresh triggers an in-flight syncing state for ~800ms. Mufflermen sources: POS, Dynojet, Manta inventory, Google Business and Xero."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports-deep", href: "/ui-primitives/reports-deep" },
          { label: "Data source row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          {DATA_SOURCES.map((connection) => (
            <DataSourceRow key={connection.id} connection={connection} />
          ))}
        </div>
      </section>
    </main>
  )
}
