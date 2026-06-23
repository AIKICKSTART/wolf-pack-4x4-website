"use client"

import { useMemo } from "react"
import type { ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import type { DiscountKind } from "./pos-checkout-types"
import styles from "./discount-picker.module.css"

interface DiscountPickerProps {
  /** Total inc GST being discounted. */
  baseTotal: number
  /** Currently active kind. */
  kind: DiscountKind
  /** Current percentage value (0..100) when kind = percent. */
  percentValue?: number
  /** Current dollar value (AUD) when kind = dollar. */
  dollarValue?: number
  /** Selected coupon code when kind = coupon. */
  couponCode?: string
  /** Predefined coupons available. */
  coupons?: ReadonlyArray<{ code: string; description: string; discount: number }>
  /** Available reason chips. */
  reasons: ReadonlyArray<string>
  /** Selected reason. */
  reason: string | null
  /** Fires when the kind changes. */
  onKindChange?: (kind: DiscountKind) => void
  /** Fires when the percent value changes. */
  onPercentChange?: (value: number) => void
  /** Fires when the dollar value changes. */
  onDollarChange?: (value: number) => void
  /** Fires when the coupon selection changes. */
  onCouponChange?: (code: string) => void
  /** Fires when the reason changes. */
  onReasonChange?: (reason: string) => void
}

const KIND_LABEL: Record<DiscountKind, string> = {
  percent: "Percent",
  dollar: "Dollar",
  coupon: "Coupon",
}

const KIND_HINT: Record<DiscountKind, string> = {
  percent: "% off subtotal",
  dollar: "Fixed $ off",
  coupon: "Code on file",
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function clampNumber(raw: string, max: number): number {
  const cleaned = raw.replace(/[^0-9.]/g, "")
  const num = Number.parseFloat(cleaned)
  if (!Number.isFinite(num)) return 0
  return Math.min(max, Math.max(0, num))
}

export function DiscountPicker({
  baseTotal,
  kind,
  percentValue = 0,
  dollarValue = 0,
  couponCode = "",
  coupons = [],
  reasons,
  reason,
  onKindChange,
  onPercentChange,
  onDollarChange,
  onCouponChange,
  onReasonChange,
}: DiscountPickerProps) {
  const discountAmount = useMemo(() => {
    if (kind === "percent") {
      return Math.min(baseTotal, (baseTotal * percentValue) / 100)
    }
    if (kind === "dollar") {
      return Math.min(baseTotal, dollarValue)
    }
    const matched = coupons.find((entry) => entry.code === couponCode)
    return matched ? Math.min(baseTotal, matched.discount) : 0
  }, [baseTotal, kind, percentValue, dollarValue, couponCode, coupons])

  const finalTotal = Math.max(0, baseTotal - discountAmount)

  const handlePercent = (event: ChangeEvent<HTMLInputElement>) => {
    onPercentChange?.(clampNumber(event.target.value, 100))
  }

  const handleDollar = (event: ChangeEvent<HTMLInputElement>) => {
    onDollarChange?.(clampNumber(event.target.value, baseTotal))
  }

  const handleCoupon = (event: ChangeEvent<HTMLSelectElement>) => {
    onCouponChange?.(event.target.value)
  }

  return (
    <section className={styles.card} aria-label="Discount picker">
      <header className={styles.head}>
        <span className={styles.kicker}>Discount · POS rules</span>
        <h2 className={styles.title}>Apply discount</h2>
      </header>

      <div className={styles.kindGroup} role="radiogroup" aria-label="Discount kind">
        {(Object.keys(KIND_LABEL) as ReadonlyArray<DiscountKind>).map((token) => {
          const selected = kind === token
          return (
            <button
              key={token}
              type="button"
              className={`${styles.kindButton}${selected ? ` ${styles.kindButtonActive}` : ""}`}
              role="radio"
              aria-checked={selected}
              onClick={() => onKindChange?.(token)}
            >
              <span>{KIND_LABEL[token]}</span>
              <span className={styles.kindHint}>{KIND_HINT[token]}</span>
            </button>
          )
        })}
      </div>

      {kind !== "coupon" && (
        <div className={styles.valueRow}>
          {kind === "percent" ? (
            <div className={styles.field}>
              <label htmlFor="pos-discount-percent" className={styles.fieldLabel}>
                Percent off
              </label>
              <input
                id="pos-discount-percent"
                className={styles.input}
                type="text"
                inputMode="decimal"
                value={percentValue.toString()}
                onChange={handlePercent}
                aria-label="Discount percent"
              />
            </div>
          ) : (
            <div className={styles.field}>
              <label htmlFor="pos-discount-dollar" className={styles.fieldLabel}>
                Dollar off (AUD)
              </label>
              <input
                id="pos-discount-dollar"
                className={styles.input}
                type="text"
                inputMode="decimal"
                value={dollarValue.toFixed(2)}
                onChange={handleDollar}
                aria-label="Discount amount in AUD"
              />
            </div>
          )}
        </div>
      )}

      {kind === "coupon" && (
        <div className={styles.field}>
          <label htmlFor="pos-discount-coupon" className={styles.fieldLabel}>
            Coupon code
          </label>
          <select
            id="pos-discount-coupon"
            className={styles.select}
            value={couponCode}
            onChange={handleCoupon}
          >
            <option value="">Select coupon</option>
            {coupons.map((coupon) => (
              <option key={coupon.code} value={coupon.code}>
                {coupon.code} · {coupon.description} · −{formatAud(coupon.discount)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.reasonRow}>
        <span className={styles.fieldLabel}>Reason captured</span>
        <div className={styles.reasonChips}>
          {reasons.map((token) => (
            <Chip
              key={token}
              label={token}
              tone={reason === token ? "teal" : "neutral"}
              selected={reason === token}
              onSelect={() => onReasonChange?.(token)}
            />
          ))}
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal inc GST</span>
          <span>{formatAud(baseTotal)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.summaryDiscount}`}>
          <span>Discount</span>
          <span>−{formatAud(discountAmount)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.summaryRowGrand}`}>
          <span>Final due</span>
          <span>{formatAud(finalTotal)}</span>
        </div>
      </div>
    </section>
  )
}

export default DiscountPicker
