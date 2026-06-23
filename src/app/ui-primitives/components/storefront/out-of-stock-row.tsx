"use client"

import { BellRing, Check, Mail } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import { PriceTag } from "../commerce/price-tag"

import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./out-of-stock-row.module.css"

interface OutOfStockRowProps {
  sku: string
  brand: string
  title: string
  price: number
  thumbnailGlyph?: string
  etaLabel?: string
  alternateSuggestion?: { sku: string; label: string }
  email?: string
  subscribed?: boolean
  onSubscribe?: (email: string) => void
  onViewAlternate?: (sku: string) => void
  currency?: string
  locale?: string
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function OutOfStockRow({
  sku,
  brand,
  title,
  price,
  thumbnailGlyph,
  etaLabel,
  alternateSuggestion,
  email,
  subscribed = false,
  onSubscribe,
  onViewAlternate,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
}: OutOfStockRowProps) {
  const [draftEmail, setDraftEmail] = useState<string>(email ?? "")
  const [confirmed, setConfirmed] = useState<boolean>(subscribed)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftEmail(event.target.value)
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidEmail(draftEmail)) {
      setError("Enter a valid email")
      return
    }
    setError(null)
    setConfirmed(true)
    onSubscribe?.(draftEmail)
  }

  return (
    <article className={styles.row} aria-labelledby={`oos-${sku}-title`}>
      <div className={styles.media} aria-hidden="true">
        <span className={styles.glyph}>{thumbnailGlyph ?? sku.slice(0, 3)}</span>
        <span className={styles.oosBadge}>OOS</span>
      </div>
      <div className={styles.body}>
        <span className={styles.brand}>{brand}</span>
        <h3 id={`oos-${sku}-title`} className={styles.title}>
          {title}
        </h3>
        <div className={styles.meta}>
          <span className={styles.sku}>SKU · {sku}</span>
          {etaLabel && <span className={styles.eta}>ETA · {etaLabel}</span>}
        </div>
      </div>
      <div className={styles.aside}>
        <PriceTag amount={price} currency={currency} locale={locale} size="sm" />
        {alternateSuggestion && (
          <button
            type="button"
            className={styles.alternateBtn}
            onClick={() => onViewAlternate?.(alternateSuggestion.sku)}
          >
            See {alternateSuggestion.label}
          </button>
        )}
      </div>
      <form className={styles.notify} onSubmit={handleSubmit}>
        {confirmed ? (
          <div className={styles.confirmed} role="status">
            <Check size={14} aria-hidden="true" />
            <span>Got it — we&apos;ll email when it&apos;s back</span>
          </div>
        ) : (
          <>
            <label className={styles.notifyLabel} htmlFor={`oos-${sku}-email`}>
              <BellRing size={12} aria-hidden="true" /> Notify me
            </label>
            <div className={styles.notifyRow}>
              <Mail size={14} aria-hidden="true" className={styles.notifyIcon} />
              <input
                id={`oos-${sku}-email`}
                type="email"
                className={styles.notifyInput}
                placeholder="dean@workshopcrew.au"
                value={draftEmail}
                onChange={handleChange}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `oos-${sku}-error` : undefined}
              />
              <button type="submit" className={styles.notifyBtn}>
                Notify
              </button>
            </div>
            {error && (
              <span id={`oos-${sku}-error`} className={styles.error}>
                {error}
              </span>
            )}
          </>
        )}
      </form>
    </article>
  )
}

export default OutOfStockRow
