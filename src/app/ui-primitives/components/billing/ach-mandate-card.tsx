"use client"

import { useId, useState } from "react"

import { mandateStatusToLabel, type MandateStatus } from "./billing-types"
import styles from "./ach-mandate-card.module.css"

interface AchMandateCardProps {
  bsb: string
  accountLast4: string
  bankName: string
  accountHolder: string
  mandateId: string
  status: MandateStatus
  /** When provided, mandate signing surface is shown until signed. */
  onSign?: (signature: string) => void
  onRevoke?: () => void
}

const STATUS_CLASS: Record<MandateStatus, string> = {
  pending: styles.statusPending,
  active: styles.statusActive,
  revoked: styles.statusRevoked,
  failed: styles.statusFailed,
}

const MANDATE_TEXT = `By signing below, I authorise Oak Flats Mufflermen Pty Ltd (User ID 408291) to debit the bank account nominated. This authority remains in force until I cancel it in writing. Debits will appear as "OAKFLATS MUFFLER" on my statement. See the Direct Debit Service Agreement at mufflermen.com.au/dda for full terms.`

export function AchMandateCard({
  bsb,
  accountLast4,
  bankName,
  accountHolder,
  mandateId,
  status,
  onSign,
  onRevoke,
}: AchMandateCardProps) {
  const sigId = useId()
  const [signature, setSignature] = useState("")

  return (
    <article className={styles.card} aria-label={`Direct debit mandate ${mandateId}`}>
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Direct debit mandate</span>
          <h3 className={styles.bank}>{bankName}</h3>
          <span className={styles.mandateId}>Mandate ID · {mandateId}</span>
        </div>
        <span className={`${styles.status} ${STATUS_CLASS[status]}`}>
          {mandateStatusToLabel(status)}
        </span>
      </header>

      <dl className={styles.bankDetails}>
        <div className={styles.detail}>
          <dt>BSB</dt>
          <dd>{bsb}</dd>
        </div>
        <div className={styles.detail}>
          <dt>Account ending</dt>
          <dd>•••• {accountLast4}</dd>
        </div>
        <div className={styles.detail}>
          <dt>Account holder</dt>
          <dd>{accountHolder}</dd>
        </div>
      </dl>

      <section className={styles.terms} aria-labelledby={`${mandateId}-terms`}>
        <h4 id={`${mandateId}-terms`} className={styles.termsHead}>Direct debit service agreement</h4>
        <p className={styles.termsText}>{MANDATE_TEXT}</p>
      </section>

      {status === "active" ? (
        <footer className={styles.footer}>
          <span className={styles.signedNote}>Authorised on file</span>
          {onRevoke ? (
            <button type="button" className={styles.revokeBtn} onClick={onRevoke}>
              Revoke mandate
            </button>
          ) : null}
        </footer>
      ) : (
        <footer className={styles.footerSign}>
          <label className={styles.sigLabel} htmlFor={sigId}>
            <span className={styles.sigLabelText}>Type your full name to authorise</span>
            <input
              id={sigId}
              className={styles.sigInput}
              placeholder="Daniel Fleuren"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </label>
          <button
            type="button"
            className={styles.signBtn}
            disabled={signature.trim().length < 3}
            onClick={() => onSign?.(signature.trim())}
          >
            Sign mandate
          </button>
        </footer>
      )}
    </article>
  )
}

export default AchMandateCard
