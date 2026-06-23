import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StorefrontCheckoutStepper } from "../../components/storefront"

import {
  CHECKOUT_STAGES_CART,
  CHECKOUT_STAGES_DONE,
  CHECKOUT_STAGES_PAYMENT,
} from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Checkout stepper | Storefront",
  description: "Primitive 05 — Cart → Shipping → Payment → Review stepper with captions.",
}

export default function CheckoutStepperPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Checkout stepper"
        title="Checkout stepper"
        description="Cart → Shipping → Payment → Review progression. Each stage carries label, caption and status, with segmented progress bar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Checkout stepper" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · cart current · 0% checkout</span>
        <StorefrontCheckoutStepper stages={CHECKOUT_STAGES_CART} />
        <span className={styles.stageCaption}>State 02 · payment current · 50% checkout</span>
        <StorefrontCheckoutStepper stages={CHECKOUT_STAGES_PAYMENT} />
        <span className={styles.stageCaption}>State 03 · all complete · paid</span>
        <StorefrontCheckoutStepper stages={CHECKOUT_STAGES_DONE} />
      </section>
    </main>
  )
}
