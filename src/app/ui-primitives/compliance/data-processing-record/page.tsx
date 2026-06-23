import type { Metadata } from "next"

import { DataProcessingRecord } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Data processing record | Compliance",
  description:
    "Primitive 03 — ROPA / Article-30 record showing category, purpose, legal basis, retention, recipients, and transfers.",
}

export default function DataProcessingRecordScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Record"
        title="Data processing record"
        description="A single record of processing activity (ROPA) — Australian Privacy Principles + GDPR Article 30 compatible. Renders the activity, data category, processing purpose, lawful basis, retention period, recipients and cross-border-transfer disclosure inside a semantic dl/dt/dd."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Data processing record" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · two ROPA records</span>
        <div className={styles.demoSplit}>
          <DataProcessingRecord
            recordId="ROPA-2026-014"
            activityName="Workshop quoting + invoicing"
            dataCategory="Customer name, contact details, vehicle VIN + rego, parts + labour lines"
            purpose="Generate quotes, accept bookings, invoice for muffler + exhaust services"
            legalBasis="contract"
            retention="7 years post-service (ATO record-keeping)"
            recipients={["Stripe AU (payments)", "Xero (invoicing)", "ATO (BAS lodgement)"]}
          />
          <DataProcessingRecord
            recordId="ROPA-2026-022"
            activityName="Marketing newsletter (opt-in)"
            dataCategory="Email address + engagement metadata"
            purpose="Send quarterly workshop news, promotions, new-fitment alerts"
            legalBasis="consent"
            retention="Until consent withdrawn"
            recipients={["Mailchimp (US)", "Sendgrid (US)"]}
            crossBorderTransfer="US — Mailchimp & Sendgrid under EU-US DPF + AU SCC addendum"
          />
        </div>
      </section>
    </main>
  )
}
