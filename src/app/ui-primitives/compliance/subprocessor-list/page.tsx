import type { Metadata } from "next"

import { SubprocessorList } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Sub-processor list | Compliance",
  description:
    "Primitive 05 — sub-processor table with vendor, service, location, DPIA status, and last-reviewed date.",
}

export default function SubprocessorListScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Schedule 2"
        title="Sub-processor list"
        description="Schedule 2 of any data processing agreement — the running list of third parties who touch personal information. Powered by the shared DataTable. Each row carries vendor + service, a tone-mapped location chip, a DPIA-status chip, and the most recent assurance review date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Sub-processor list" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · seven sub-processors</span>
        <SubprocessorList
          rows={[
            {
              id: "stripe",
              vendor: "Stripe",
              service: "Card payment processing",
              location: "au",
              locationLabel: "Sydney AU (ap-southeast-2)",
              dpiaStatus: "approved",
              lastReviewed: "2026-03-14",
            },
            {
              id: "xero",
              vendor: "Xero",
              service: "Invoicing + BAS lodgement",
              location: "au",
              locationLabel: "Sydney AU",
              dpiaStatus: "approved",
              lastReviewed: "2026-02-08",
            },
            {
              id: "twilio",
              vendor: "Twilio",
              service: "SMS booking reminders",
              location: "us",
              locationLabel: "Virginia US (us-east-1)",
              dpiaStatus: "approved",
              lastReviewed: "2026-04-02",
            },
            {
              id: "sendgrid",
              vendor: "SendGrid",
              service: "Transactional email",
              location: "us",
              locationLabel: "Colorado US",
              dpiaStatus: "approved",
              lastReviewed: "2026-04-02",
            },
            {
              id: "mailchimp",
              vendor: "Mailchimp",
              service: "Marketing newsletter (opt-in only)",
              location: "us",
              locationLabel: "Atlanta US",
              dpiaStatus: "pending",
              lastReviewed: "2026-04-22",
            },
            {
              id: "datadog",
              vendor: "Datadog",
              service: "APM + log aggregation",
              location: "eu",
              locationLabel: "Frankfurt EU",
              dpiaStatus: "approved",
              lastReviewed: "2026-01-30",
            },
            {
              id: "intercom",
              vendor: "Intercom",
              service: "Live chat support",
              location: "us",
              locationLabel: "Dublin IE + US",
              dpiaStatus: "rejected",
              lastReviewed: "2026-05-04",
            },
          ]}
        />
      </section>
    </main>
  )
}
