import type { Metadata } from "next"

import { PaymentIconStrip } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Payment icon strip | POS checkout",
  description:
    "Primitive 13 — accepted payment-methods strip with Visa, Mastercard, Amex, Apple Pay, Google Pay and EFTPOS brands.",
}

export default function PaymentIconStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Payment icon strip"
        title="Payment icon strip"
        description="Accepted payment-method strip with Visa, Mastercard, Amex, Apple Pay, Google Pay and EFTPOS brand logos. Supports disabled-method tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Payment icon strip" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · full Bay 1 spread</span>
        <PaymentIconStrip
          accepted={["visa", "mastercard", "amex", "eftpos", "applepay", "googlepay"]}
          note="Tyro EFTPOS · Apple/Google Pay tap supported on this terminal"
        />
        <span className={styles.stageCaption}>State 02 · Amex temporarily disabled</span>
        <PaymentIconStrip
          accepted={["visa", "mastercard", "amex", "eftpos"]}
          disabled={["amex"]}
          note="Amex acquirer offline — try Visa/Mastercard"
        />
        <span className={styles.stageCaption}>State 03 · cash + EFTPOS only</span>
        <PaymentIconStrip
          accepted={["eftpos"]}
          title="Accepted today"
          note="Cash drawer + Tyro EFTPOS only — credit network outage"
        />
      </section>
    </main>
  )
}
