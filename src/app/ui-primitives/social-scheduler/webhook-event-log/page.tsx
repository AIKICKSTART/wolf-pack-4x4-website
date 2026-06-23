import type { Metadata } from "next"

import { WebhookEventLog } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { PLATFORMS, WEBHOOK_EVENTS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Webhook event log | Muffler Pulse",
  description:
    "Primitive 13 — incoming platform webhook events tail.",
}

export default function WebhookEventLogPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Webhook log"
        title="Webhook event log"
        description="The live tail of platform webhooks — likes spikes, mentions, DMs, token refreshes, publish failures. Severity colour-codes urgency at a glance."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Webhook log" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Mixed severity tail</span>
        <WebhookEventLog events={WEBHOOK_EVENTS} platforms={PLATFORMS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Errors-only triage view</span>
        <WebhookEventLog
          title="Errors / warnings"
          events={WEBHOOK_EVENTS.filter(
            (event) => event.severity === "error" || event.severity === "warn",
          )}
          platforms={PLATFORMS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Engagement signal stream</span>
        <WebhookEventLog
          title="Engagement signals"
          events={WEBHOOK_EVENTS.filter(
            (event) =>
              event.kind === "likes_spike" ||
              event.kind === "share_burst" ||
              event.kind === "comment" ||
              event.kind === "mention" ||
              event.kind === "dm",
          )}
          platforms={PLATFORMS}
        />
      </section>
    </main>
  )
}
