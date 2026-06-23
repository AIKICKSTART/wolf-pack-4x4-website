import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailPaymentFailed,
  EmailPreviewFrame,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Payment failed email | Email Templates",
  description:
    "Template 06 — Mufflermen payment failed alert with retry CTA, update-card CTA, and support contact.",
}

export default function PaymentFailedEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 06 / Payment failed"
        title="Payment failed"
        description="Sent when a charge declines — masked card, declined reason, retry-payment + update-card CTAs, and a clear support contact."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Payment failed" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Mufflermen Billing <billing@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "We couldn't process your payment",
        }}
        email={
          <EmailPaymentFailed
            recipientFirstName="Jordan"
            invoiceNumber="INV-2026-0418"
            amountCents={28725}
            failureReason="Your card issuer declined the charge. This usually means insufficient funds or a daily-limit block."
            cardBrand="Visa"
            cardLast4="4218"
            retryUrl="https://mufflermen.com.au/billing/retry/INV-2026-0418"
            updateCardUrl="https://mufflermen.com.au/account/billing/cards"
            supportEmail="support@mufflermen.com.au"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
