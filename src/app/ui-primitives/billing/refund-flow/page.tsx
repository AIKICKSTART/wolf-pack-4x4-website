import type { Metadata } from "next"

import { RefundFlow } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_REFUNDABLE } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Refund flow | Billing | UI Primitives",
  description:
    "Refund 2-step flow primitive — choose invoice then choose amount (full / partial) with reason and internal note.",
}

export default function RefundFlowPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07"
        title="Refund flow"
        description="Two-step refund flow. Step 1 picks the invoice. Step 2 picks full or partial amount, a reason (duplicate, fraudulent, requested by customer, service not delivered, other), and an internal note."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Refund flow" },
        ]}
      />
      <RefundFlow invoices={DEMO_REFUNDABLE} />
    </main>
  )
}
