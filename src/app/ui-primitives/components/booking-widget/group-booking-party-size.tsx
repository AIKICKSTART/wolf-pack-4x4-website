"use client"

import { Minus, Plus } from "lucide-react"

import styles from "./group-booking-party-size.module.css"
import type { MoneyAud } from "./booking-widget-types"

interface GroupBookingPartySizeProps {
  size: number
  perPersonPrice: MoneyAud
  /** Discount applied per person when group meets threshold, in cents. Optional. */
  groupDiscountCents?: number
  /** Minimum party size before the discount applies. Default 3. */
  groupDiscountThreshold?: number
  /** Inclusive min and max. Defaults 1 and 8. */
  minSize?: number
  maxSize?: number
  onChange?: (next: number) => void
}

function formatAud(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export function GroupBookingPartySize({
  size,
  perPersonPrice,
  groupDiscountCents = 0,
  groupDiscountThreshold = 3,
  minSize = 1,
  maxSize = 8,
  onChange,
}: GroupBookingPartySizeProps) {
  const qualifiesForDiscount =
    groupDiscountCents > 0 && size >= groupDiscountThreshold
  const effectivePerPerson = qualifiesForDiscount
    ? Math.max(0, perPersonPrice.cents - groupDiscountCents)
    : perPersonPrice.cents
  const total = effectivePerPerson * size

  const inc = () => {
    if (size < maxSize) onChange?.(size + 1)
  }
  const dec = () => {
    if (size > minSize) onChange?.(size - 1)
  }

  return (
    <div className={styles.wrap} role="radiogroup" aria-label="Party size">
      <header className={styles.head}>
        <span className={styles.kicker}>Party size</span>
        {qualifiesForDiscount ? (
          <span className={styles.discountChip}>
            Group save {formatAud(groupDiscountCents)} pp
          </span>
        ) : null}
      </header>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={dec}
          aria-label="Reduce party size"
          disabled={size <= minSize}
        >
          <Minus size={14} strokeWidth={2.6} aria-hidden="true" />
        </button>
        <div className={styles.display} aria-live="polite">
          <strong>{size}</strong>
          <span>{size === 1 ? "person" : "people"}</span>
        </div>
        <button
          type="button"
          className={styles.btn}
          onClick={inc}
          aria-label="Add to party size"
          disabled={size >= maxSize}
        >
          <Plus size={14} strokeWidth={2.6} aria-hidden="true" />
        </button>
      </div>
      <dl className={styles.summary}>
        <div>
          <dt>Per person</dt>
          <dd className={qualifiesForDiscount ? styles.discounted : undefined}>
            {qualifiesForDiscount ? (
              <>
                <s>{formatAud(perPersonPrice.cents)}</s>{" "}
                <strong>{formatAud(effectivePerPerson)}</strong>
              </>
            ) : (
              formatAud(perPersonPrice.cents)
            )}
          </dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>
            <strong>{formatAud(total)}</strong>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default GroupBookingPartySize
