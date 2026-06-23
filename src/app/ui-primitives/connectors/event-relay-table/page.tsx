import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EventRelayTable } from "../../components/connectors"

import { EVENT_RELAY_ROWS } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Event relay table | Connectors",
  description:
    "Primitive 07 — inbound webhook event log with replay button per row.",
}

const ALL_DELIVERED = EVENT_RELAY_ROWS.filter((row) => row.outcome === "delivered")
const MIXED_TRAFFIC = EVENT_RELAY_ROWS
const FAILURES_ONLY = EVENT_RELAY_ROWS.filter(
  (row) => row.outcome === "failed" || row.outcome === "retrying",
)

export default function EventRelayTableScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Table"
        title="Event relay table"
        description="Inbound webhook event log built on DataTable — received-at, source, event code, HTTP code, outcome chip, attempt count and a replay button per row. Three live states — calm (delivered only), mixed traffic (live tail) and failures only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Event relay table" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · all delivered (calm)</span>
        <EventRelayTable rows={ALL_DELIVERED} caption="Delivered events" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · live tail (mixed outcomes)</span>
        <EventRelayTable rows={MIXED_TRAFFIC} caption="Live event tail" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · failures + retrying</span>
        <EventRelayTable rows={FAILURES_ONLY} caption="Failures and retries" />
      </section>
    </main>
  )
}
