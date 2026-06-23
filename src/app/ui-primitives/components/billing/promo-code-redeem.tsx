"use client"

import { useId, useState } from "react"

import styles from "./promo-code-redeem.module.css"

export interface AppliedPromo {
  code: string
  description: string
  expiresISO: string
  /** "10%" or "$50". */
  benefitLabel: string
}

interface PromoCodeRedeemProps {
  initialApplied?: AppliedPromo | null
  onApply?: (code: string) => void
  onRemove?: () => void
  validCodes?: ReadonlyArray<AppliedPromo>
}

function formatExpiry(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

const DEFAULT_VALID_CODES: ReadonlyArray<AppliedPromo> = [
  { code: "MUFFLER10", description: "10% off your next billing cycle", expiresISO: "2026-12-31", benefitLabel: "10%" },
  { code: "VTVZ50", description: "$50 credit on annual upgrade", expiresISO: "2026-09-30", benefitLabel: "$50" },
]

export function PromoCodeRedeem({
  initialApplied = null,
  onApply,
  onRemove,
  validCodes = DEFAULT_VALID_CODES,
}: PromoCodeRedeemProps) {
  const inputId = useId()
  const [draft, setDraft] = useState("")
  const [applied, setApplied] = useState<AppliedPromo | null>(initialApplied)
  const [error, setError] = useState<string | null>(null)

  const handleApply = () => {
    const code = draft.trim().toUpperCase()
    if (!code) return
    const match = validCodes.find((c) => c.code === code)
    if (match) {
      setApplied(match)
      setDraft("")
      setError(null)
      onApply?.(code)
    } else {
      setError("Code not recognised")
    }
  }

  const handleRemove = () => {
    setApplied(null)
    onRemove?.()
  }

  return (
    <section className={styles.redeem} aria-label="Promotional code">
      {applied ? (
        <article className={styles.appliedRow} aria-live="polite">
          <div className={styles.appliedLeft}>
            <span className={styles.benefitChip}>{applied.benefitLabel}</span>
            <div className={styles.appliedText}>
              <span className={styles.appliedCode}>{applied.code}</span>
              <span className={styles.appliedDesc}>{applied.description}</span>
              <span className={styles.expiry}>Expires {formatExpiry(applied.expiresISO)}</span>
            </div>
          </div>
          <button type="button" className={styles.removeBtn} onClick={handleRemove}>
            Remove
          </button>
        </article>
      ) : (
        <div className={styles.entry}>
          <label className={styles.field} htmlFor={inputId}>
            <span className={styles.fieldLabel}>Promo code</span>
            <input
              id={inputId}
              className={styles.input}
              placeholder="MUFFLER10"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value.toUpperCase())
                setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleApply()
                }
              }}
              aria-invalid={Boolean(error)}
            />
          </label>
          <button type="button" className={styles.applyBtn} onClick={handleApply} disabled={!draft}>
            Apply
          </button>
        </div>
      )}
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
    </section>
  )
}

export default PromoCodeRedeem
