import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StatusHistoryTable } from "../../components/status-page"

import { STATUS_HISTORY } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Status history table | Status page",
  description:
    "Primitive 08 — historical incident table powered by the shared DataTable.",
}

export default function StatusHistoryTableScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Table"
        title="Status history table"
        description="Powered by the shared DataTable primitive — date, service, title, severity chip, duration and final stage chip. Sortable on date / service / severity / duration. Used at the bottom of the public status page."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Status history table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · last 5 resolved incidents</span>
        <StatusHistoryTable rows={STATUS_HISTORY} />
      </section>
    </main>
  )
}
