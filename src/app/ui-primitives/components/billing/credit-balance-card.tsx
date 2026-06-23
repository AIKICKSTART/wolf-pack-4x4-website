"use client"

import {
  formatMoney,
  type CreditLedgerEntry,
  type MoneyAmount,
} from "./billing-types"
import styles from "./credit-balance-card.module.css"

interface CreditBalanceCardProps {
  available: MoneyAmount
  ledger: ReadonlyArray<CreditLedgerEntry>
  onApplyToInvoice?: () => void
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function CreditBalanceCard({
  available,
  ledger,
  onApplyToInvoice,
}: CreditBalanceCardProps) {
  return (
    <article className={styles.card} aria-label="Account credit balance">
      <header className={styles.hero}>
        <span className={styles.kicker}>Account credit</span>
        <p className={styles.balance}>
          <span className={styles.balanceValue}>{formatMoney(available)}</span>
          <span className={styles.balanceLabel}>available</span>
        </p>
        {onApplyToInvoice ? (
          <button type="button" className={styles.applyBtn} onClick={onApplyToInvoice}>
            Apply to next invoice
          </button>
        ) : null}
      </header>

      <section className={styles.ledgerSection} aria-label="Recent credits">
        <h4 className={styles.ledgerHead}>Recent credits</h4>
        <ul className={styles.ledger}>
          {ledger.map((entry) => (
            <li key={entry.id} className={styles.ledgerRow}>
              <span className={styles.ledgerReason}>{entry.reason}</span>
              <span className={styles.ledgerDate}>{formatDate(entry.appliedISO)}</span>
              <span className={styles.ledgerAmount}>
                {entry.amount.value >= 0 ? "+" : ""}{formatMoney(entry.amount)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default CreditBalanceCard
