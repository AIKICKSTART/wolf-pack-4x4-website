import type { Metadata } from "next"

import { InvoicePayCard } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import {
  INVOICE_FALCON_PARTIAL,
  INVOICE_HILUX_OUTSTANDING,
  INVOICE_RAPTOR_PAID,
} from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Invoice pay card | Customer portal",
  description:
    "Primitive 03 — outstanding invoice with Apple Pay, Google Pay, card, bank-transfer picker — three states.",
}

export default function InvoicePayCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Invoice pay card"
        title="Outstanding invoice with payment picker"
        description="Outstanding ($1,842.50 cat-back on the Hilux), part-paid ($800 deposit on the Falcon X-Force), and settled (Raptor pink-slip, receipt already lodged)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Invoice pay card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <InvoicePayCard invoice={INVOICE_HILUX_OUTSTANDING} />
          <InvoicePayCard invoice={INVOICE_FALCON_PARTIAL} />
          <InvoicePayCard invoice={INVOICE_RAPTOR_PAID} />
        </div>
      </section>
    </main>
  )
}
