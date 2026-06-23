"use client"

import { CheckCircle2, Sparkles, Tag, X } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"

import type { CouponApplication } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./coupon-input-card.module.css"

interface CouponInputCardProps {
  applied?: ReadonlyArray<CouponApplication>
  suggestion?: { code: string; label: string }
  onApply?: (code: string) => Promise<CouponApplication | null> | CouponApplication | null
  onRemove?: (code: string) => void
  currency?: string
  locale?: string
  title?: string
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function CouponInputCard({
  applied,
  suggestion,
  onApply,
  onRemove,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  title = "Promo code",
}: CouponInputCardProps) {
  const [draft, setDraft] = useState<string>("")
  const [pending, setPending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value.toUpperCase())
    if (error) {
      setError(null)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (trimmed.length < 3) {
      setError("Code must be at least 3 characters")
      return
    }
    setPending(true)
    try {
      const result = await Promise.resolve(onApply?.(trimmed) ?? null)
      if (!result) {
        setError("That code isn't valid")
      } else {
        setDraft("")
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <section className={styles.card} aria-labelledby="coupon-card-title">
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Tag size={12} aria-hidden="true" /> Promo
        </span>
        <h2 id="coupon-card-title" className={styles.title}>
          {title}
        </h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formLabel} htmlFor="coupon-code">
          Enter code
        </label>
        <div className={styles.row}>
          <input
            id="coupon-code"
            type="text"
            className={styles.input}
            placeholder="MUFFLER10"
            value={draft}
            disabled={pending}
            onChange={handleChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "coupon-error" : undefined}
          />
          <button type="submit" className={styles.applyBtn} disabled={pending}>
            {pending ? "Applying…" : "Apply"}
          </button>
        </div>
        {error && (
          <span id="coupon-error" className={styles.error}>
            {error}
          </span>
        )}
      </form>

      {suggestion && (
        <button
          type="button"
          className={styles.suggestionRow}
          onClick={() => onApply?.(suggestion.code)}
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>
            Try <strong>{suggestion.code}</strong> — {suggestion.label}
          </span>
        </button>
      )}

      {applied && applied.length > 0 && (
        <ul className={styles.appliedList}>
          {applied.map((coupon) => (
            <li key={coupon.code} className={styles.appliedRow}>
              <CheckCircle2 size={14} aria-hidden="true" className={styles.appliedIcon} />
              <div className={styles.appliedBody}>
                <span className={styles.appliedCode}>{coupon.code}</span>
                <span className={styles.appliedLabel}>{coupon.label}</span>
              </div>
              <span className={styles.appliedAmount}>
                −{formatCurrency(coupon.discount, currency, locale)}
              </span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove?.(coupon.code)}
                aria-label={`Remove ${coupon.code}`}
              >
                <X size={12} aria-hidden="true" />
              </button>
              {coupon.autoApplied && (
                <span className={styles.autoChip} aria-hidden="true">
                  Auto
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CouponInputCard
