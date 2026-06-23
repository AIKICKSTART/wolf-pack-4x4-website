import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookConfigCard } from "../../components/connectors"

import { WEBHOOK_SHOPIFY, WEBHOOK_STRIPE, WEBHOOK_TWILIO } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Webhook config card | Connectors",
  description:
    "Primitive 03 — webhook endpoint URL, masked signing secret and event-filter checkboxes for Stripe, Shopify and Twilio.",
}

export default function WebhookConfigCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Card"
        title="Webhook config card"
        description="Per-source webhook card — endpoint URL, masked signing secret (reveal requires explicit press) and an event-filter checkbox set. Three live states — connected (Stripe payments), warning (Shopify orders) and error (Twilio inbound SMS)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Webhook config card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three webhook sources · connected / warning / error</span>
        <div className={styles.demoTriple}>
          <WebhookConfigCard
            source={WEBHOOK_STRIPE.source}
            endpoint={WEBHOOK_STRIPE.endpoint}
            signingSecret={WEBHOOK_STRIPE.signingSecret}
            status={WEBHOOK_STRIPE.status}
            events={WEBHOOK_STRIPE.events}
          />
          <WebhookConfigCard
            source={WEBHOOK_SHOPIFY.source}
            endpoint={WEBHOOK_SHOPIFY.endpoint}
            signingSecret={WEBHOOK_SHOPIFY.signingSecret}
            status={WEBHOOK_SHOPIFY.status}
            events={WEBHOOK_SHOPIFY.events}
          />
          <WebhookConfigCard
            source={WEBHOOK_TWILIO.source}
            endpoint={WEBHOOK_TWILIO.endpoint}
            signingSecret={WEBHOOK_TWILIO.signingSecret}
            status={WEBHOOK_TWILIO.status}
            events={WEBHOOK_TWILIO.events}
          />
        </div>
      </section>
    </main>
  )
}
