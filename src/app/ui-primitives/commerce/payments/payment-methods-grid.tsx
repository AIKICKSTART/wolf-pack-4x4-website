"use client"

import { PaymentMethodCard } from "../../components/commerce/payment-method-card"
import type { PaymentBrand } from "../../components/commerce/payment-brand-logo"
import styles from "../commerce.module.css"

export interface PaymentMethod {
  id: string
  brand: PaymentBrand
  label: string
  maskedNumber: string
  expiry?: string
  holder?: string
  isDefault?: boolean
}

interface PaymentMethodsGridProps {
  methods: ReadonlyArray<PaymentMethod>
}

export function PaymentMethodsGrid({ methods }: PaymentMethodsGridProps) {
  return (
    <section className={styles.paymentsGrid} aria-label="Saved payment methods">
      {methods.map((method) => (
        <PaymentMethodCard
          key={method.id}
          brand={method.brand}
          label={method.label}
          maskedNumber={method.maskedNumber}
          expiry={method.expiry}
          holder={method.holder}
          isDefault={method.isDefault}
          onEdit={() => undefined}
          onRemove={() => undefined}
          onSetDefault={() => undefined}
        />
      ))}
      <button type="button" className={styles.addMethodCard} onClick={() => undefined}>
        <span className={styles.addMethodPlus} aria-hidden="true">+</span>
        <span>Add new payment method</span>
      </button>
    </section>
  )
}

export default PaymentMethodsGrid
