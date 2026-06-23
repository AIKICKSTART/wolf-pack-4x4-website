import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  InvoiceSubmissionForm,
  type InvoiceLine,
} from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Invoice submission | UI Primitives — Supplier Portal",
}

const lines: ReadonlyArray<InvoiceLine> = [
  {
    id: "ln-1",
    title: "Manta 3in stainless cat-back",
    sku: "MAN-MK24-405",
    unitPrice: 1289,
    quantity: 4,
  },
  {
    id: "ln-2",
    title: "Manta Hilux N80 DPF-back",
    sku: "MAN-N80-DPF",
    unitPrice: 1095,
    quantity: 2,
  },
]

export default function InvoiceSubmissionPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.09 / Supplier portal"
        title="Invoice submission form"
        description="Supplier-side invoice raise — PO reference, line items, GST handling, PDF attachment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Invoice submission" },
        ]}
      />
      <section className={styles.canvas}>
        <InvoiceSubmissionForm
          defaultPoRef="PO-OF-0921"
          defaultInvoiceNumber="MP-INV-04132"
          lines={lines}
        />
      </section>
    </main>
  )
}
