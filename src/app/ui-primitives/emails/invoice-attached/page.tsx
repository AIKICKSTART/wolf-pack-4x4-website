import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailInvoiceAttached,
  EmailPreviewFrame,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Invoice email | Email Templates",
  description:
    "Template 07 — Mufflermen invoice notification with invoice number, amount due, due date, and view/download links.",
}

export default function InvoiceAttachedEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 07 / Invoice"
        title="Invoice attached"
        description="Sent when a new invoice is issued — invoice number, amount due, due date strip, view invoice CTA, and a download-PDF link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Invoice" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Mufflermen Accounts <accounts@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "Invoice INV-2026-0418 from Mufflermen",
        }}
        email={
          <EmailInvoiceAttached
            recipientFirstName="Jordan"
            invoiceNumber="INV-2026-0418"
            amountDueCents={48200}
            dueDateLabel="Friday 13 June 2026"
            jobReference="JOB-2026-0331"
            viewInvoiceUrl="https://mufflermen.com.au/invoices/INV-2026-0418"
            downloadPdfUrl="https://mufflermen.com.au/invoices/INV-2026-0418.pdf"
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
