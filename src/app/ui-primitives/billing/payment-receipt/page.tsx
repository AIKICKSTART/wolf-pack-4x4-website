import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DEMO_AMOUNTS } from "../demo-data"
import styles from "../billing.module.css"

import { ReceiptTrigger } from "./receipt-trigger"

export const metadata: Metadata = {
  title: "Payment receipt | Billing | UI Primitives",
  description:
    "Payment receipt modal primitive — confirmation icon, amount, card last-4, transaction ID, download / email actions.",
}

export default function PaymentReceiptPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14"
        title="Payment receipt"
        description="Modal that confirms a successful charge. Shows a green check, the amount, the brand + last-4, transaction ID, paid timestamp, and Download / Email / Close actions. Close on Esc or backdrop click."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Payment receipt" },
        ]}
      />
      <ReceiptTrigger amount={DEMO_AMOUNTS.receiptAmount} />
    </main>
  )
}
