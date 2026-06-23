"use client"

import { PaymentBrandLogo, type PaymentBrand } from "./payment-brand-logo"
import styles from "./payment-method-card.module.css"

interface PaymentMethodCardProps {
  brand: PaymentBrand
  label: string
  maskedNumber: string
  expiry?: string
  holder?: string
  isDefault?: boolean
  onEdit?: () => void
  onRemove?: () => void
  onSetDefault?: () => void
}

function formatMasked(value: string): string {
  return value.replace(/(\d{4})(?=\d)/g, "$1 ")
}

export function PaymentMethodCard({
  brand,
  label,
  maskedNumber,
  expiry,
  holder,
  isDefault = false,
  onEdit,
  onRemove,
  onSetDefault,
}: PaymentMethodCardProps) {
  return (
    <article
      className={`${styles.card} ${isDefault ? styles.cardDefault : ""}`}
      aria-label={`${label} — ${maskedNumber}${isDefault ? ", default payment method" : ""}`}
    >
      <header className={styles.head}>
        <span className={styles.logoWrap}>
          <PaymentBrandLogo brand={brand} width={48} height={32} />
        </span>
        <span className={styles.label}>{label}</span>
        {isDefault && <span className={styles.defaultChip}>Default</span>}
      </header>

      <p className={styles.number} aria-label={`Card number ending in ${maskedNumber.slice(-4)}`}>
        {formatMasked(maskedNumber)}
      </p>

      <footer className={styles.foot}>
        {holder && (
          <span className={styles.holder}>
            <span className={styles.holderLabel}>Holder</span>
            <span className={styles.holderValue}>{holder}</span>
          </span>
        )}
        {expiry && (
          <span className={styles.expiry}>
            <span className={styles.holderLabel}>Expires</span>
            <span className={styles.holderValue}>{expiry}</span>
          </span>
        )}
        <div className={styles.actions}>
          {!isDefault && onSetDefault && (
            <button type="button" className={styles.actionBtn} onClick={onSetDefault}>
              Set default
            </button>
          )}
          {onEdit && (
            <button type="button" className={styles.actionBtn} onClick={onEdit}>
              Edit
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.removeBtn}`}
              onClick={onRemove}
            >
              Remove
            </button>
          )}
        </div>
      </footer>
    </article>
  )
}

export default PaymentMethodCard
