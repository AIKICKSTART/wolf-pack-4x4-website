import type { Metadata } from "next"

import { PaymentFieldCard } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { PAYMENT_FIELD_DRAFT } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Payment field card | Forms platform",
  description:
    "Primitive 05 — the Stripe payment field for the Book-a-Service deposit with cardholder, expiry, CVC, and tip selector.",
}

export default function PaymentFieldCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Payment field card"
        title="Payment field card"
        description="$150 AUD booking deposit captured via Stripe AU. Cardholder, expiry, CVC, optional tip — chips render percent and the calculated dollar amount in tabular numerals."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Payment field card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book-a-Service deposit
        </span>
        <div className={styles.demoInline}>
          <PaymentFieldCard draft={PAYMENT_FIELD_DRAFT} />
        </div>
      </section>
    </main>
  )
}
