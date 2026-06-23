"use client"

import { Truck, Zap } from "lucide-react"
import { useState, type FormEvent } from "react"

import styles from "./freight-estimator.module.css"

export type FreightTier = "express" | "standard" | "economy"

export interface FreightEstimate {
  tier: FreightTier
  label: string
  price: number
  windowLabel: string
  notes?: string
}

interface FreightEstimatorProps {
  estimates?: ReadonlyArray<FreightEstimate>
  onEstimate?: (postcode: string) => void
  busy?: boolean
  currency?: string
  defaultPostcode?: string
}

const TIER_CLASS: Record<FreightTier, string> = {
  express: styles.tierExpress,
  standard: styles.tierStandard,
  economy: styles.tierEconomy,
}

function formatCurrency(value: number, currency: string): string {
  if (value === 0) {
    return "Free"
  }
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

function isValidPostcode(value: string): boolean {
  return /^\d{4}$/.test(value.trim())
}

export function FreightEstimator({
  estimates,
  onEstimate,
  busy = false,
  currency = "AUD",
  defaultPostcode = "",
}: FreightEstimatorProps) {
  const [postcode, setPostcode] = useState<string>(defaultPostcode)
  const [touched, setTouched] = useState<boolean>(false)

  const valid = isValidPostcode(postcode)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    if (!valid || busy) {
      return
    }
    onEstimate?.(postcode.trim())
  }

  return (
    <section className={styles.estimator} aria-labelledby="freight-estimator-title">
      <header className={styles.head}>
        <Truck size={20} aria-hidden="true" className={styles.headIcon} />
        <h3 id="freight-estimator-title" className={styles.title}>Freight estimator</h3>
        <p className={styles.copy}>NSW postcode lookup — typical bands for our courier partners.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label} htmlFor="freight-postcode">
          <span>Delivery postcode</span>
          <input
            id="freight-postcode"
            type="text"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            placeholder="2529"
            value={postcode}
            aria-invalid={touched && !valid}
            aria-describedby={touched && !valid ? "freight-postcode-error" : undefined}
            onChange={(event) => setPostcode(event.target.value.replace(/\D/g, "").slice(0, 4))}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.cta} disabled={!valid || busy}>
          {busy ? "…" : "Estimate"}
        </button>
        {touched && !valid && (
          <p id="freight-postcode-error" className={styles.error} role="alert">
            Enter a 4-digit Australian postcode.
          </p>
        )}
      </form>

      {estimates && estimates.length > 0 && (
        <output className={styles.output} aria-live="polite">
          <ul className={styles.tiers}>
            {estimates.map((estimate) => (
              <li
                key={estimate.tier}
                className={`${styles.tier} ${TIER_CLASS[estimate.tier]}`}
              >
                <span className={styles.tierIcon} aria-hidden="true">
                  {estimate.tier === "express" ? (
                    <Zap size={16} strokeWidth={2.2} />
                  ) : (
                    <Truck size={16} strokeWidth={2.2} />
                  )}
                </span>
                <div className={styles.tierBody}>
                  <span className={styles.tierLabel}>{estimate.label}</span>
                  <span className={styles.tierWindow}>{estimate.windowLabel}</span>
                  {estimate.notes && (
                    <span className={styles.tierNotes}>{estimate.notes}</span>
                  )}
                </div>
                <span className={styles.tierPrice}>
                  {formatCurrency(estimate.price, currency)}
                </span>
              </li>
            ))}
          </ul>
        </output>
      )}
    </section>
  )
}

export default FreightEstimator
