import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OrderConfirmationCard } from "../../components/storefront"

import {
  ORDER_CONFIRMATION_AFTERPAY,
  ORDER_CONFIRMATION_PAID,
} from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Order confirmation card | Storefront",
  description: "Primitive 14 — thank-you card with order #, ETA, share, track.",
}

export default function OrderConfirmationCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Order confirmation card"
        title="Order confirmation card"
        description="Thank-you card with order number, payment + capture chip, shipping/pickup, ETA, copy + share + track + email-again actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Order confirmation card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · paid · Visa ····4242 · full $2,670</span>
        <OrderConfirmationCard confirmation={ORDER_CONFIRMATION_PAID} />
        <span className={styles.stageCaption}>State 02 · Afterpay · single line · pickup</span>
        <OrderConfirmationCard confirmation={ORDER_CONFIRMATION_AFTERPAY} />
        <span className={styles.stageCaption}>State 03 · no tracking · email-only handover</span>
        <OrderConfirmationCard
          confirmation={{
            ...ORDER_CONFIRMATION_PAID,
            orderNumber: "OFM-30421",
            trackingUrl: undefined,
            paymentBrand: "BPay",
            paymentLast4: undefined,
            freightLabel: "Pickup only · Albion Park Bay 1",
            etaLabel: "Ready Saturday 9:00",
          }}
        />
      </section>
    </main>
  )
}
