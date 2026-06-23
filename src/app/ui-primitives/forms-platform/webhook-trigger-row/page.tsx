import type { Metadata } from "next"

import { WebhookTriggerRow } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { WEBHOOK_TRIGGERS } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Webhook trigger row | Forms platform",
  description:
    "Primitive 12 — webhook trigger rows with delivery status, retries, and a pretty-printed JSON payload.",
}

export default function WebhookTriggerRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Webhook trigger row"
        title="Webhook trigger row"
        description="Three webhooks — Hermes booking ingest delivered, Hermes payment ingest retrying, Xero invoice creation failed after 5 retries. Pretty-printed JSON sample sits inside each row for inline inspection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Webhook trigger row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Hermes + Xero webhooks
        </span>
        <div className={styles.demoRowList}>
          {WEBHOOK_TRIGGERS.map((trigger) => (
            <WebhookTriggerRow key={trigger.id} trigger={trigger} />
          ))}
        </div>
      </section>
    </main>
  )
}
