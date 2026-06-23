"use client"

import { Chip } from "../primitives/chip"

import {
  formatAud,
  formatLedgerDate,
  reconciliationTone,
  type ReconciliationStatus,
} from "./accounting-types"
import styles from "./account-reconciliation-row.module.css"

export interface AccountReconciliationRowProps {
  /** Statement transaction date. */
  dateISO: string
  /** Bank statement description. */
  description: string
  /** Optional counterparty extracted from the description. */
  counterparty?: string
  /** Bank statement amount (positive = inflow, negative = outflow). */
  bankAmount: number
  /** Ledger amount the bookkeeper matched against. */
  ledgerAmount: number
  status: ReconciliationStatus
  /** Optional bank reference / FITID. */
  reference?: string
  className?: string
  onMatch?: () => void
  onUnmatch?: () => void
}

const STATUS_LABEL: Record<ReconciliationStatus, string> = {
  matched: "Matched",
  auto_matched: "Auto-matched",
  needs_review: "Needs review",
  unmatched: "Unmatched",
}

export function AccountReconciliationRow({
  dateISO,
  description,
  counterparty,
  bankAmount,
  ledgerAmount,
  status,
  reference,
  className,
  onMatch,
  onUnmatch,
}: AccountReconciliationRowProps) {
  const variance = bankAmount - ledgerAmount
  const matched = status === "matched" || status === "auto_matched"
  const tone = reconciliationTone(status)

  return (
    <article
      className={[styles.row, className].filter(Boolean).join(" ")}
      data-tone={tone}
      aria-label={`Reconciliation row dated ${formatLedgerDate(dateISO)}, ${STATUS_LABEL[status]}`}
    >
      <div className={styles.cell}>
        <span className={styles.label}>Date</span>
        <span className={styles.date}>{formatLedgerDate(dateISO)}</span>
        {reference ? <span className={styles.ref}>{reference}</span> : null}
      </div>

      <div className={`${styles.cell} ${styles.descCell}`}>
        <span className={styles.label}>Bank statement</span>
        <span className={styles.desc}>{description}</span>
        {counterparty ? <span className={styles.counter}>{counterparty}</span> : null}
      </div>

      <div className={`${styles.cell} ${styles.numCell}`}>
        <span className={styles.label}>Bank</span>
        <span className={bankAmount < 0 ? styles.amountNeg : styles.amount}>
          {bankAmount < 0 ? "−" : ""}
          {formatAud(Math.abs(bankAmount))}
        </span>
      </div>

      <div className={`${styles.cell} ${styles.numCell}`}>
        <span className={styles.label}>Ledger</span>
        <span className={ledgerAmount < 0 ? styles.amountNeg : styles.amount}>
          {ledgerAmount < 0 ? "−" : ""}
          {formatAud(Math.abs(ledgerAmount))}
        </span>
      </div>

      <div className={`${styles.cell} ${styles.numCell}`}>
        <span className={styles.label}>Variance</span>
        <span
          className={
            Math.abs(variance) < 0.005
              ? styles.varianceOk
              : variance > 0
                ? styles.varianceUp
                : styles.varianceDown
          }
        >
          {Math.abs(variance) < 0.005 ? "—" : formatAud(Math.abs(variance))}
        </span>
      </div>

      <div className={styles.statusCell}>
        <Chip label={STATUS_LABEL[status]} tone={tone === "neutral" ? "neutral" : tone} />
        {matched ? (
          <button type="button" className={styles.action} onClick={onUnmatch}>
            Unmatch
          </button>
        ) : (
          <button type="button" className={styles.actionPrimary} onClick={onMatch}>
            Match
          </button>
        )}
      </div>
    </article>
  )
}

export default AccountReconciliationRow
