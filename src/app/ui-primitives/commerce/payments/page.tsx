import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../commerce.module.css"
import { PaymentMethodsGrid, type PaymentMethod } from "./payment-methods-grid"

export const metadata: Metadata = {
  title: "Saved payment methods | Commerce | UI Primitives",
  description:
    "Saved payment methods — Visa, Mastercard, Amex, PayPal, Afterpay tiles plus add-new method CTA.",
}

const METHODS: ReadonlyArray<PaymentMethod> = [
  {
    id: "visa-personal",
    brand: "visa",
    label: "Personal · everyday",
    maskedNumber: "4242424242424242",
    expiry: "04 / 28",
    holder: "Mick Bartelle",
    isDefault: true,
  },
  {
    id: "mastercard-business",
    brand: "mastercard",
    label: "Workshop business",
    maskedNumber: "5454545454540077",
    expiry: "11 / 27",
    holder: "Oak Flats Mufflermen Pty Ltd",
  },
  {
    id: "amex-platinum",
    brand: "amex",
    label: "Travel · Platinum",
    maskedNumber: "377712345678801",
    expiry: "09 / 26",
    holder: "Mick Bartelle",
  },
  {
    id: "paypal-personal",
    brand: "paypal",
    label: "PayPal · personal",
    maskedNumber: "mick@mufflermen.com.au",
    holder: "Linked since 2019",
  },
  {
    id: "afterpay",
    brand: "afterpay",
    label: "Afterpay instalments",
    maskedNumber: "Active · 4 fortnightly",
    holder: "Credit limit $2,000 AUD",
  },
  {
    id: "applepay",
    brand: "applepay",
    label: "Apple Pay · iPhone",
    maskedNumber: "•••• •••• •••• 9921",
    holder: "Touch ID required",
  },
]

export default function PaymentsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 08"
        title="Saved payment methods"
        description="Cards, digital wallets, and Afterpay all in one place. Default method appears highlighted at the top of the grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Commerce", href: "/ui-primitives/commerce" },
          { label: "Payments" },
        ]}
      />

      <PaymentMethodsGrid methods={METHODS} />
    </main>
  )
}
