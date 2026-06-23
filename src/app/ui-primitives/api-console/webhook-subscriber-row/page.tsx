import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookSubscriberRow } from "../../components/api-console"
import { SUBSCRIBERS } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Webhook subscriber row | API Console",
  description:
    "Primitive 03 — webhook subscriber row with URL, event chips, status, last delivery, masked secret, and edit / revoke controls.",
}

export default function WebhookSubscriberRowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Webhook subscriber"
        title="Webhook subscribers"
        description="A row for each registered webhook endpoint — destination URL, the events it subscribes to, current delivery status, when it last fired, a masked signing secret with reveal toggle, and edit / revoke actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Webhook subscriber" },
        ]}
      />
      <section className={styles.stack} role="list" aria-label="Webhook subscribers">
        {SUBSCRIBERS.map((subscriber) => (
          <WebhookSubscriberRow key={subscriber.id} subscriber={subscriber} />
        ))}
      </section>
    </main>
  )
}
