"use client"

import { useState } from "react"

import { formatCurrency, formatPercent } from "./quote-types"
import styles from "./tax-calc-strip.module.css"

export interface TaxLine {
  label: string
  rate: number
  amount: number
}

interface TaxCalcStripProps {
  subtotal: number
  taxes: ReadonlyArray<TaxLine>
  total: number
  currency?: string
  defaultInclusive?: boolean
  onInclusiveChange?: (inclusive: boolean) => void
}

export function TaxCalcStrip({
  subtotal,
  taxes,
  total,
  currency = "AUD",
  defaultInclusive = false,
  onInclusiveChange,
}: TaxCalcStripProps) {
  const [inclusive, setInclusive] = useState<boolean>(defaultInclusive)

  const toggle = () => {
    const next = !inclusive
    setInclusive(next)
    onInclusiveChange?.(next)
  }

  return (
    <section className={styles.strip} aria-labelledby="tax-strip-title">
      <header className={styles.head}>
        <h3 id="tax-strip-title" className={styles.title}>Totals</h3>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={inclusive}
            onChange={toggle}
            aria-label="Tax-inclusive pricing"
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>Tax-inclusive</span>
        </label>
      </header>
      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal, currency)}</dd>
        </div>
        {taxes.map((tax) => (
          <div key={tax.label} className={styles.row}>
            <dt>
              {tax.label} <span className={styles.rate}>{formatPercent(tax.rate)}</span>
            </dt>
            <dd>{formatCurrency(tax.amount, currency)}</dd>
          </div>
        ))}
        <div className={styles.total}>
          <dt>Total {inclusive ? "(incl. tax)" : "(excl. tax already added)"}</dt>
          <dd>{formatCurrency(total, currency)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default TaxCalcStrip
