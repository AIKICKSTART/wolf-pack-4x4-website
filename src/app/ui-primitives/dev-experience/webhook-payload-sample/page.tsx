import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WebhookPayloadSample } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Webhook payload sample | UI Primitives — Dev experience",
}

const QUOTE_CREATED = `{
  "id": "evt_01HQ8FK4ZJM7CVS3Y9VTBP2NTR",
  "type": "quote.created",
  "created": "2026-05-21T08:42:11Z",
  "workshop_id": "wsh_oak_flats",
  "data": {
    "quote_id": "qte_2026_xforce_extractor_001",
    "vehicle_id": "veh_2026_ford_ranger_xl",
    "bay_id": "bay_oak_flats_03",
    "total_aud": 1842.50,
    "valid_until": "2026-05-23T08:42:11Z",
    "line_items": [
      { "part_id": "part_extractor_xforce_4cyl", "qty": 1, "subtotal_aud": 1620.00 },
      { "labour_id": "lbr_install_extractor", "hours": 2.5, "subtotal_aud": 222.50 }
    ]
  }
}`

const INVOICE_PAID = `{
  "id": "evt_01HQ8FZP8AVMK0NXG28HV1QYTC",
  "type": "invoice.paid",
  "created": "2026-05-21T16:09:44Z",
  "workshop_id": "wsh_oak_flats",
  "data": {
    "invoice_id": "inv_2026_05_001124",
    "amount_aud": 1842.50,
    "currency": "AUD",
    "paid_via": "stripe",
    "stripe_payment_intent": "pi_3PqR4z2eZvKYlo2C0X9Dq8Mn"
  }
}`

export default function WebhookPayloadSamplePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 07"
        title="Webhook payload sample"
        description="Event type chip, version + timestamp meta strip, signature header, and the full JSON payload body."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Webhook payload sample" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quote.created — bay_oak_flats_03</span>
          <WebhookPayloadSample
            eventType="quote.created"
            version="2026-05-01"
            timestamp="2026-05-21T08:42:11Z"
            signatureHeader="t=1716280931,v1=8f2e9a4d3c6b1f7e0c5a2b8d4e6f9c1a3b5d7e8f2a4c6b8d0e2f4a6c8b1d3f5e"
            payload={QUOTE_CREATED}
          />
          <WebhookPayloadSample
            eventType="invoice.paid"
            version="2026-05-01"
            timestamp="2026-05-21T16:09:44Z"
            signatureHeader="t=1716307784,v1=2c8e1f5d9a3b7e0f4c6a8d2b5e7f1c3a9b0d2e4f6a8c1b3d5e7f9a2c4b6d8e1f"
            payload={INVOICE_PAID}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The event chip uses the Mufflermen webhook taxonomy verbatim — purple tone for
            event classification. Signature is the literal{" "}
            <code>Mufflermen-Signature</code> header your endpoint receives. Sample data
            references the Oak Flats workshop and a real-world Stripe payment intent shape.
          </p>
        </div>
      </section>
    </main>
  )
}
