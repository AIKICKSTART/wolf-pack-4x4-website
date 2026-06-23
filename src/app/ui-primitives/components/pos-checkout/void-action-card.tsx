"use client"

import styles from "./void-action-card.module.css"

interface VoidActionCardProps {
  /** Receipt or transaction reference being voided. */
  transactionRef: string
  /** Operator who initiated. */
  operator: string
  /** Total being voided inc GST in AUD. */
  amount: number
  /** PIN length required (default 4). */
  pinLength?: number
  /** Current PIN draft. */
  pin: string
  /** Optional error message (e.g. "Manager PIN incorrect"). */
  errorMessage?: string
  /** Fires when a digit is appended. */
  onDigit?: (digit: string) => void
  /** Fires when the last digit should be removed. */
  onBackspace?: () => void
  /** Fires when the operator cancels. */
  onCancel?: () => void
  /** Fires when the operator confirms. */
  onConfirm?: () => void
}

const KEYS: ReadonlyArray<string> = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"]

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function VoidActionCard({
  transactionRef,
  operator,
  amount,
  pinLength = 4,
  pin,
  errorMessage,
  onDigit,
  onBackspace,
  onCancel,
  onConfirm,
}: VoidActionCardProps) {
  const dots = Array.from({ length: pinLength }, (_, index) => index)
  const isComplete = pin.length === pinLength
  const hasError = Boolean(errorMessage)

  const handleKey = (token: string) => {
    if (token === "clear") {
      for (let i = 0; i < pin.length; i++) {
        onBackspace?.()
      }
      return
    }
    if (token === "back") {
      onBackspace?.()
      return
    }
    if (pin.length >= pinLength) return
    onDigit?.(token)
  }

  return (
    <section className={styles.card} aria-label={`Void ${transactionRef}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Void · manager approval</span>
        <h2 className={styles.title}>Void transaction</h2>
      </header>

      <div className={styles.context}>
        <div className={styles.contextRow}>
          <span>Transaction</span>
          <strong>{transactionRef}</strong>
        </div>
        <div className={styles.contextRow}>
          <span>Operator</span>
          <strong>{operator}</strong>
        </div>
        <div className={styles.contextRow}>
          <span>Void total</span>
          <strong>{formatAud(amount)}</strong>
        </div>
      </div>

      <div className={styles.pinHead}>
        <span className={styles.pinLabel}>Manager PIN</span>
        <span className={styles.pinHint}>{pin.length} / {pinLength}</span>
      </div>

      <div className={styles.pinDots} role="group" aria-label="Manager PIN">
        {dots.map((index) => {
          const filled = index < pin.length
          const dotClass = `${styles.pinDot}${
            filled ? ` ${styles.pinDotFilled}` : ""
          }${hasError ? ` ${styles.pinDotError}` : ""}`
          return (
            <span key={index} className={dotClass} aria-hidden="true">
              {filled ? "•" : ""}
            </span>
          )
        })}
      </div>

      <div className={styles.keypad} role="group" aria-label="PIN keypad">
        {KEYS.map((token) => (
          <button
            key={token}
            type="button"
            className={`${styles.key}${token === "clear" || token === "back" ? ` ${styles.keyMuted}` : ""}`}
            onClick={() => handleKey(token)}
            aria-label={
              token === "clear" ? "Clear PIN" : token === "back" ? "Delete last digit" : `Digit ${token}`
            }
          >
            {token === "back" ? "←" : token === "clear" ? "Clr" : token}
          </button>
        ))}
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnCancel}`}
          onClick={() => onCancel?.()}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnConfirm}`}
          onClick={() => onConfirm?.()}
          disabled={!isComplete}
        >
          Confirm void
        </button>
      </div>
    </section>
  )
}

export default VoidActionCard
