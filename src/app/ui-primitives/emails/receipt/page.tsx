import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EmailPreviewFrame, EmailReceipt } from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Receipt email | Email Templates",
  description:
    "Template 10 — Mufflermen payment receipt with line items, GST, masked payment method, refund link, and support contact.",
}

export default function ReceiptEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 10 / Receipt"
        title="Payment receipt"
        description="Sent after a successful payment — line items, GST split out, masked payment method, refund link, and clear support contact."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Receipt" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Mufflermen Accounts <accounts@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Your Mufflermen receipt · RCPT-2026-0418",
        }}
        email={
          <EmailReceipt
            recipientFirstName="Jordan"
            receiptNumber="RCPT-2026-0418"
            paidOnLabel="28 May 2026 · 10:14am"
            lineItems={[
              {
                description: "Muffler swap · 2.5\" centre bullet (labour)",
                qty: 1,
                unitPriceCents: 22000,
                lineTotalCents: 22000,
              },
              {
                description: "Manifold gasket replacement (labour)",
                qty: 1,
                unitPriceCents: 8500,
                lineTotalCents: 8500,
              },
              {
                description: "Centre Bullet Muffler · 2.5\"",
                qty: 1,
                unitPriceCents: 18900,
                lineTotalCents: 18900,
              },
            ]}
            subtotalCents={49400}
            gstCents={4940}
            totalCents={54340}
            paymentMethodLabel="Visa"
            paymentMethodLast4="4218"
            refundUrl="https://mufflermen.com.au/receipts/RCPT-2026-0418/refund"
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
