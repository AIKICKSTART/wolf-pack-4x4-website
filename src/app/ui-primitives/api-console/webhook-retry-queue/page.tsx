import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookRetryQueue } from "../../components/api-console"
import { RETRY_QUEUE } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Webhook retry queue | API Console",
  description:
    "Primitive 05 — pending webhook retries with attempt progress, backoff schedule, manual retry, and abandon controls.",
}

export default function WebhookRetryQueuePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Retry queue"
        title="Webhook retry queue"
        description="Pending webhook retries with attempt-versus-cap progress, exponential backoff schedule, the last failure reason, and operator controls for force-retry or abandon. Empty state acknowledges a clean queue rather than rendering blank space."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Retry queue" },
        ]}
      />
      <WebhookRetryQueue items={RETRY_QUEUE} />
    </main>
  )
}
