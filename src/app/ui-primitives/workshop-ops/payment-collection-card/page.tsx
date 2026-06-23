import type { Metadata } from "next"

import { PaymentCollectionCard } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"

import { PAYMENT_GT, PAYMENT_MICK, PAYMENT_RANGER } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Payment collection card | Workshop ops",
  description:
    "Primitive 10 — payment collection card with Stripe / Square / Tyro selector and refund button — three states.",
}

export default function PaymentCollectionCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Payment collection card"
        title="Payment collection card"
        description="Front-counter payment moment — amount inc GST, provider selector across Stripe (online), Square (terminal), Tyro (EFTPOS) and cash, and a refund flow when applicable. Three states — pending Tyro tap-to-pay, fully settled Stripe invoice with receipt CTA, and a partially refunded Square charge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Payment collection card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <PaymentCollectionCard payment={PAYMENT_MICK} />
          <PaymentCollectionCard payment={PAYMENT_GT} />
          <PaymentCollectionCard payment={PAYMENT_RANGER} />
        </div>
      </section>
    </main>
  )
}
