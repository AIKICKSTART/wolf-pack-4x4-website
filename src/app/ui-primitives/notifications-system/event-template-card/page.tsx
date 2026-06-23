import type { Metadata } from "next"

import { EventTemplateCard } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { PreviewableEventTemplateCard } from "../_interactive-demos"
import {
  MOCK_TEMPLATE_INVOICE_PAID,
  MOCK_TEMPLATE_SMS_PICKUP,
} from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Event template card | Notifications system",
  description:
    "Primitive 13 — message template card per event type with merge tags and channel-aware fields.",
}

const PUSH_TEMPLATE = {
  ...MOCK_TEMPLATE_INVOICE_PAID,
  channel: "push-mobile" as const,
  subject: "Payment received",
  body: "Hi {{first_name}} — A${{amount}} captured for {{vehicle}}. Receipt in app.",
}

export default function EventTemplateCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Event template card"
        title="Event template card"
        description="The per-event message editor. Subject + body for email and in-app, body only for SMS. Insertable merge tags expand into the body at the cursor position when clicked."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Event template card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Email · Invoice paid</span>
        <PreviewableEventTemplateCard
          initialValue={MOCK_TEMPLATE_INVOICE_PAID}
          eventLabel="Invoice paid"
          channelLabel="Email"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — SMS · Pickup ready (no subject field)</span>
        <PreviewableEventTemplateCard
          initialValue={MOCK_TEMPLATE_SMS_PICKUP}
          eventLabel="Service complete"
          channelLabel="SMS"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Push · short body</span>
        <EventTemplateCard
          initialValue={PUSH_TEMPLATE}
          eventLabel="Invoice paid"
          channelLabel="Push · mobile"
        />
      </section>
    </main>
  )
}
