import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookReceiverCard } from "../../components/api-explorer"
import { WEBHOOK_EVENTS_PRIMARY } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Webhook receiver card | API Explorer",
  description:
    "Primitive 09 — webhook receiver card. Three states: configured, no events, replaying.",
}

export default function WebhookReceiverCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Webhook receiver card"
        title="Webhook receiver card"
        description="Receiver-side configuration card — URL, signing secret, subscribed events, last delivery, and a replay button. Pairs with the api-console webhook subscriber row on the sender side."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Webhook receiver card" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Configured receiver">
        <span className={styles.sectionLabel}>State 01 / Configured</span>
        <WebhookReceiverCard
          url="https://workshop.muffler.men/hooks/v1/inbox"
          secretMasked="whsec_••••••••••••7af2"
          events={WEBHOOK_EVENTS_PRIMARY}
          lastDeliveryAt="2026-05-28 08:41:09 — 200 OK in 218ms"
        />
      </section>

      <section className={styles.routeSection} aria-label="No events subscribed">
        <span className={styles.sectionLabel}>State 02 / No events</span>
        <WebhookReceiverCard
          url="https://workshop.muffler.men/hooks/v1/staging"
          secretMasked="whsec_••••••••••••staging"
          events={[]}
        />
      </section>

      <section className={styles.routeSection} aria-label="Replaying delivery">
        <span className={styles.sectionLabel}>State 03 / Replaying delivery</span>
        <WebhookReceiverCard
          url="https://accounting.muffler.men/webhooks/payments"
          secretMasked="whsec_••••••••••••a91d"
          events={["payment.succeeded", "payment.failed"]}
          lastDeliveryAt="2026-05-28 06:12:54 — 201 Created in 412ms"
          replaying
        />
      </section>

      <aside className={styles.note}>
        <span>Reuse note</span>
        <p>
          Event labels render through the primitives <code>Chip</code> in teal. Pair this card
          with <code>webhook-event-log</code> from the api-console family for full
          observability.
        </p>
      </aside>
    </main>
  )
}
