import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookEventLog } from "../../components/api-console"
import { EVENT_LOG } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Webhook event log | API Console",
  description:
    "Primitive 04 — webhook event log table with timestamp, event type, endpoint, http status, duration, retry count, and payload expand.",
}

export default function WebhookEventLogPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Event log"
        title="Webhook event log"
        description="A table of every webhook delivery — when it fired, which event type, the target endpoint, the HTTP status chip, total round-trip duration, how many retries it cost, and a row-expand that reveals the JSON payload via the shared code-block primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Event log" },
        ]}
      />
      <WebhookEventLog entries={EVENT_LOG} caption="Last 4 deliveries" />
    </main>
  )
}
