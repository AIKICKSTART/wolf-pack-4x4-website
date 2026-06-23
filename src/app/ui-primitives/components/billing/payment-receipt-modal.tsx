"use client"

import { useEffect, useId } from "react"

import {
  formatMoney,
  type CardBrand,
  type MoneyAmount,
} from "./billing-types"
import styles from "./payment-receipt-modal.module.css"

interface PaymentReceiptModalProps {
  open: boolean
  amount: MoneyAmount
  cardBrand: CardBrand
  cardLast4: string
  transactionId: string
  paidISO: string
  customerEmail: string
  onClose: () => void
  onDownloadReceipt?: () => void
  onEmailReceipt?: () => void
}

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  diners: "Diners Club",
  unknown: "Card",
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso))
}

export function PaymentReceiptModal({
  open,
  amount,
  cardBrand,
  cardLast4,
  transactionId,
  paidISO,
  customerEmail,
  onClose,
  onDownloadReceipt,
  onEmailReceipt,
}: PaymentReceiptModalProps) {
  const headingId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      onClick={onClose}
    >
      <article
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.confirmIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M4 12.5l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 id={headingId} className={styles.title}>Payment confirmed</h3>
        <p className={styles.amount}>{formatMoney(amount)}</p>
        <p className={styles.subtitle}>Charged to {BRAND_LABEL[cardBrand]} ending {cardLast4}</p>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Transaction ID</dt>
            <dd>{transactionId}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Paid</dt>
            <dd>{formatDate(paidISO)}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Receipt sent to</dt>
            <dd>{customerEmail}</dd>
          </div>
        </dl>

        <footer className={styles.actions}>
          {onDownloadReceipt ? (
            <button type="button" className={styles.primaryBtn} onClick={onDownloadReceipt}>
              Download receipt
            </button>
          ) : null}
          {onEmailReceipt ? (
            <button type="button" className={styles.ghostBtn} onClick={onEmailReceipt}>
              Email receipt
            </button>
          ) : null}
          <button type="button" className={styles.ghostBtn} onClick={onClose}>
            Close
          </button>
        </footer>
      </article>
    </div>
  )
}

export default PaymentReceiptModal
