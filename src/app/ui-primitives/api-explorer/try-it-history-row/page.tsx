import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TryItHistoryRow } from "../../components/api-explorer"
import { HISTORY_ROWS } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Try-it history row | API Explorer",
  description:
    "Primitive 13 — recent try-it call row. Three states: success, error, full timeline.",
}

const [SUCCESS_ROW, , , ERROR_ROW] = HISTORY_ROWS

export default function TryItHistoryRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Try-it history row"
        title="Try-it history rows"
        description="A row in the recent-calls list — timestamp, method chip, path, status chip, duration, and a copy-curl action. Designed to live inside a Drawer or sidebar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Try-it history row" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Successful call">
        <span className={styles.sectionLabel}>State 01 / Success row</span>
        <TryItHistoryRow {...SUCCESS_ROW} />
      </section>

      <section className={styles.routeSection} aria-label="Error call">
        <span className={styles.sectionLabel}>State 02 / Error row (with replay)</span>
        <TryItHistoryRow {...ERROR_ROW} onReplay={undefined} />
      </section>

      <section className={styles.routeSection} aria-label="Recent history list">
        <span className={styles.sectionLabel}>State 03 / Recent history list</span>
        <div className={styles.stack}>
          {HISTORY_ROWS.map((row) => (
            <TryItHistoryRow key={row.id} {...row} />
          ))}
        </div>
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          Status chip and duration use the same tabular-num styling as the response viewer
          so a column alignment falls in naturally on the composed explorer.
        </p>
      </aside>
    </main>
  )
}
