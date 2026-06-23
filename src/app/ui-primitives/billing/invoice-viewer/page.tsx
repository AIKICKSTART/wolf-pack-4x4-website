import type { Metadata } from "next"

import { InvoiceViewer } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { CUSTOMER, DEMO_INVOICE_LINES } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Invoice viewer | Billing | UI Primitives",
  description:
    "In-app invoice viewer primitive — line items, subtotal, GST, total, status chip and actions.",
}

export default function InvoiceViewerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03"
        title="Invoice viewer"
        description="Digital invoice surface — line items table, subtotal, GST 10%, total due, status chip, and Download / Mark paid / Send actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Invoice viewer" },
        ]}
      />
      <InvoiceViewer
        invoiceNumber="OFM-30418"
        status="open"
        issuedISO="2026-05-04"
        dueISO="2026-05-18"
        customerName={CUSTOMER.name}
        customerAddress={CUSTOMER.address}
        lineItems={DEMO_INVOICE_LINES}
        abn="56 102 998 312"
      />
    </main>
  )
}
