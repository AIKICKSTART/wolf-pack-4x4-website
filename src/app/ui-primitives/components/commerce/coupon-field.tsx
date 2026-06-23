"use client"

import { Check, X } from "lucide-react"
import { useState, type FormEvent } from "react"

import styles from "./coupon-field.module.css"

export interface AppliedCoupon {
  code: string
  description: string
  discount: number
}

interface CouponFieldProps {
  applied?: AppliedCoupon
  placeholder?: string
  onApply?: (code: string) => void
  onRemove?: () => void
  busy?: boolean
  error?: string
}

export function CouponField({
  applied,
  placeholder = "Enter coupon code",
  onApply,
  onRemove,
  busy = false,
  error,
}: CouponFieldProps) {
  const [draft, setDraft] = useState<string>("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim().toUpperCase()
    if (trimmed.length === 0 || busy) {
      return
    }
    onApply?.(trimmed)
    setDraft("")
  }

  if (applied) {
    return (
      <div className={styles.appliedRow} aria-live="polite">
        <div className={styles.appliedBadge}>
          <Check size={14} aria-hidden="true" />
          <span className={styles.appliedCode}>{applied.code}</span>
          <span className={styles.appliedSep} aria-hidden="true">·</span>
          <span className={styles.appliedDesc}>{applied.description}</span>
        </div>
        <button
          type="button"
          className={styles.removeBtn}
          aria-label={`Remove coupon ${applied.code}`}
          onClick={onRemove}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-live="polite">
      <label className={styles.field}>
        <span className={styles.visuallyHidden}>Coupon code</span>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "coupon-error" : undefined}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
        />
      </label>
      <button
        type="submit"
        className={styles.applyBtn}
        disabled={busy || draft.trim().length === 0}
      >
        {busy ? "…" : "Apply"}
      </button>
      {error && (
        <p id="coupon-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default CouponField
