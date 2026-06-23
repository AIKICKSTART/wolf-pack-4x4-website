import type { Metadata } from "next"

import { DeliveryReportRow } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { RetryableDeliveryReportRows } from "../_interactive-demos"
import { MOCK_DELIVERY_REPORTS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Delivery report row | Notifications system",
  description:
    "Primitive 14 — per-message delivery status row across the workshop notification fanout.",
}

const FAILED_ROWS = MOCK_DELIVERY_REPORTS.filter(
  (row) => row.status === "failed" || row.status === "bounced",
)
const HAPPY_ROWS = MOCK_DELIVERY_REPORTS.filter(
  (row) =>
    row.status === "delivered" ||
    row.status === "opened" ||
    row.status === "clicked",
)

export default function DeliveryReportRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Delivery report row"
        title="Delivery report row"
        description="One row of the delivery report — channel, recipient, subject, status, latency, retry count. Failure states surface a retry control."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Delivery report row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Full mixed report (7 rows)</span>
        <RetryableDeliveryReportRows rows={MOCK_DELIVERY_REPORTS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Happy path (delivered → clicked)</span>
        <div className={styles.delList}>
          {HAPPY_ROWS.map((row) => (
            <DeliveryReportRow key={row.id} row={row} />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Failures only (retry surfaced)</span>
        <RetryableDeliveryReportRows rows={FAILED_ROWS} />
      </section>
    </main>
  )
}
