"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { PaymentMethodCard } from "../../components/storefront"
import type { PaymentMethod } from "../../components/storefront"

import { AFTERPAY_SCHEDULE, BPAY_BILLER } from "../_mock-data"
import styles from "../storefront.module.css"

function StatefulPay({
  defaultMethod,
  total,
  declined,
}: {
  defaultMethod: PaymentMethod
  total: number
  declined?: boolean
}) {
  const [selected, setSelected] = useState<PaymentMethod>(defaultMethod)
  return (
    <PaymentMethodCard
      selected={selected}
      onSelect={setSelected}
      total={total}
      afterpaySchedule={AFTERPAY_SCHEDULE}
      bpayBiller={BPAY_BILLER}
      errorMessage={
        declined
          ? "Visa ····4242 declined — insufficient funds. Try another card or switch to Afterpay."
          : undefined
      }
    />
  )
}

export default function PaymentMethodCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Payment method card"
        title="Payment method card"
        description="Card, Apple Pay, Google Pay, Afterpay (4 fortnightly), and BPay biller code with declined fallback messaging."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Payment method card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · card · happy path · $2,670</span>
        <StatefulPay defaultMethod="card" total={2670} />
        <span className={styles.stageCaption}>State 02 · Afterpay · 4 × $322.50</span>
        <StatefulPay defaultMethod="afterpay" total={1290} />
        <span className={styles.stageCaption}>State 03 · BPay biller · declined card alert</span>
        <StatefulPay defaultMethod="bpay" total={2670} declined />
      </section>
    </main>
  )
}
