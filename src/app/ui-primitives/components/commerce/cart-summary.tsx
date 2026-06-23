"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { useState, type ReactNode } from "react"

import { CountUp } from "../primitives/count-up"

import styles from "./cart-summary.module.css"

export interface CartSummaryLine {
  label: string
  amount: number
  tone?: "neutral" | "discount" | "freight"
}

interface CartSummaryProps {
  subtotal: number
  freight: number
  gst: number
  total: number
  discount?: number
  currency?: string
  extraLines?: ReadonlyArray<CartSummaryLine>
  discountSlot?: ReactNode
  onCheckout?: () => void
  checkoutLabel?: string
  busy?: boolean
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function CartSummary({
  subtotal,
  freight,
  gst,
  total,
  discount,
  currency = "AUD",
  extraLines,
  discountSlot,
  onCheckout,
  checkoutLabel = "Proceed to checkout",
  busy = false,
}: CartSummaryProps) {
  const [discountOpen, setDiscountOpen] = useState<boolean>(false)

  return (
    <aside className={styles.summary} aria-labelledby="cart-summary-title">
      <header className={styles.head}>
        <h2 id="cart-summary-title" className={styles.title}>Order summary</h2>
        <span className={styles.kicker}>Cart total · GST inc.</span>
      </header>

      <dl className={styles.lines}>
        <div className={styles.line}>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal, currency)}</dd>
        </div>
        <div className={styles.line}>
          <dt>Freight</dt>
          <dd>{freight === 0 ? "Free" : formatCurrency(freight, currency)}</dd>
        </div>
        <div className={styles.line}>
          <dt>GST (10%)</dt>
          <dd>{formatCurrency(gst, currency)}</dd>
        </div>
        {discount && discount > 0 ? (
          <div className={`${styles.line} ${styles.lineDiscount}`}>
            <dt>Discount</dt>
            <dd>−{formatCurrency(discount, currency)}</dd>
          </div>
        ) : null}
        {extraLines?.map((line) => (
          <div
            key={line.label}
            className={`${styles.line} ${line.tone === "discount" ? styles.lineDiscount : ""}`}
          >
            <dt>{line.label}</dt>
            <dd>{line.tone === "discount" ? "−" : ""}{formatCurrency(line.amount, currency)}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className={styles.discountToggle}
        aria-expanded={discountOpen}
        aria-controls="cart-summary-discount-region"
        onClick={() => setDiscountOpen((prev) => !prev)}
      >
        <span>Apply discount or gift card</span>
        {discountOpen ? (
          <ChevronDown size={16} aria-hidden="true" />
        ) : (
          <ChevronRight size={16} aria-hidden="true" />
        )}
      </button>
      <div
        id="cart-summary-discount-region"
        className={styles.discountRegion}
        hidden={!discountOpen}
      >
        {discountSlot}
      </div>

      <div className={styles.totalRow} role="status" aria-live="polite">
        <span className={styles.totalLabel}>Total payable</span>
        <strong className={styles.totalValue}>
          <span className={styles.totalCurrency}>{currency}</span>
          <CountUp to={total} decimals={2} prefix="$" />
        </strong>
      </div>

      <button
        type="button"
        className={styles.cta}
        onClick={onCheckout}
        disabled={busy}
      >
        <span>{busy ? "Working…" : checkoutLabel}</span>
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      <p className={styles.fineprint}>
        Australian-owned. Free freight on orders over $599. 14-day return on unfitted parts.
      </p>
    </aside>
  )
}

export default CartSummary
