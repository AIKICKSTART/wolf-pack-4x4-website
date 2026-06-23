import type { Metadata } from "next"

import { CheckoutStepper, type CheckoutStep } from "../../components/commerce/checkout-stepper"
import { CartSummary } from "../../components/commerce/cart-summary"
import { PaymentMethodCard } from "../../components/commerce/payment-method-card"
import { FreightEstimator, type FreightEstimate } from "../../components/commerce/freight-estimator"
import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"

export const metadata: Metadata = {
  title: "Checkout | Commerce | UI Primitives",
  description:
    "Checkout stepper with address recap, payment method row, order review, and freight estimator.",
}

const STEPS: ReadonlyArray<CheckoutStep> = [
  { key: "cart", label: "Cart", description: "5 items reviewed", status: "complete" },
  { key: "address", label: "Address", description: "Delivery confirmed", status: "complete" },
  { key: "payment", label: "Payment", description: "Choose method", status: "current" },
  { key: "confirm", label: "Confirm", description: "Final review", status: "upcoming" },
]

const FREIGHT_ESTIMATES: ReadonlyArray<FreightEstimate> = [
  {
    tier: "express",
    label: "Express overnight",
    price: 28.5,
    windowLabel: "Tomorrow before 12pm",
    notes: "Sydney metro · TOLL Priority",
  },
  {
    tier: "standard",
    label: "Standard road",
    price: 12.95,
    windowLabel: "3 business days",
    notes: "TOLL IPEC · tracked",
  },
  {
    tier: "economy",
    label: "Workshop pickup",
    price: 0,
    windowLabel: "Same day from Oak Flats",
    notes: "210 Princes Hwy · 7am–5pm",
  },
]

export default function CheckoutPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 02"
        title="Checkout"
        description="Four-step checkout flow — cart review, address recap, payment selection, final confirmation. Currently in step 03 of 04."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Checkout" },
        ]}
      />

      <CheckoutStepper steps={STEPS} />

      <div className={styles.checkoutLayout}>
        <div className={styles.checkoutMain}>
          <section className={styles.sectionCard} aria-labelledby="checkout-address">
            <header className={styles.sectionHeader}>
              <h2 id="checkout-address" className={styles.sectionTitle}>Delivery address</h2>
              <button type="button" className={styles.editLink}>Edit</button>
            </header>
            <address className={styles.addressBlock}>
              <strong>Mick Bartelle</strong>
              <span>Unit 4 / 12 Yallah Road</span>
              <span>Oak Flats NSW 2529</span>
              <span>Australia · +61 412 045 880</span>
            </address>
          </section>

          <section className={styles.sectionCard} aria-labelledby="checkout-freight">
            <header className={styles.sectionHeader}>
              <h2 id="checkout-freight" className={styles.sectionTitle}>Freight options</h2>
              <span className={styles.sectionMeta}>NSW 2529</span>
            </header>
            <FreightEstimator
              estimates={FREIGHT_ESTIMATES}
              defaultPostcode="2529"
            />
          </section>

          <section className={styles.sectionCard} aria-labelledby="checkout-payment">
            <header className={styles.sectionHeader}>
              <h2 id="checkout-payment" className={styles.sectionTitle}>Payment method</h2>
              <button type="button" className={styles.editLink}>Add new</button>
            </header>
            <PaymentMethodCard
              brand="visa"
              label="Personal · everyday"
              maskedNumber="4242424242424242"
              expiry="04 / 28"
              holder="Mick Bartelle"
              isDefault
            />
          </section>

          <section className={styles.sectionCard} aria-labelledby="checkout-review">
            <header className={styles.sectionHeader}>
              <h2 id="checkout-review" className={styles.sectionTitle}>Order review</h2>
              <span className={styles.sectionMeta}>5 items · 9 units</span>
            </header>
            <ul className={styles.addressBlock} style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>Manta 2.5&quot; Cat-Back · VF SS Ute — 1 × $1,149.00</li>
              <li>Manta 1-3/4&quot; Headers · VT-VZ LS1 — 1 × $689.00</li>
              <li>Manta 3&quot; Resonator — 2 × $142.50</li>
              <li>Manta V-Band Clamp 3&quot; — 4 × $38.95</li>
              <li>Manta Quad Tip · Blue Burnt — 1 × $285.00</li>
            </ul>
          </section>
        </div>

        <CartSummary
          subtotal={2563.30}
          freight={12.95}
          gst={257.62}
          total={2833.87}
          checkoutLabel="Place order"
        />
      </div>
    </main>
  )
}
