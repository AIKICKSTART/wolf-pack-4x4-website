"use client"

import {
  formatMoney,
  type DunningStage,
  type MoneyAmount,
} from "./billing-types"
import styles from "./dunning-notice-card.module.css"

interface DunningNoticeCardProps {
  stage: DunningStage
  amountDue: MoneyAmount
  invoiceNumber: string
  daysPastDue: number
  retryNextISO: string
  graceEndsISO: string
  onUpdatePaymentMethod?: () => void
  onPayNow?: () => void
}

const STAGE_LABEL: Record<DunningStage, string> = {
  first_notice: "First notice",
  retry_scheduled: "Retry scheduled",
  final_notice: "Final notice",
  service_suspended: "Service suspended",
}

const STAGE_INTRO: Record<DunningStage, string> = {
  first_notice: "Your most recent invoice could not be charged.",
  retry_scheduled: "We will retry your card automatically.",
  final_notice: "This is a final reminder before service is suspended.",
  service_suspended: "Account access has been paused pending payment.",
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
  }).format(new Date(iso))
}

export function DunningNoticeCard({
  stage,
  amountDue,
  invoiceNumber,
  daysPastDue,
  retryNextISO,
  graceEndsISO,
  onUpdatePaymentMethod,
  onPayNow,
}: DunningNoticeCardProps) {
  return (
    <article
      className={`${styles.notice} ${styles[`stage_${stage}`]}`}
      role="alert"
      aria-labelledby={`dunning-${invoiceNumber}-head`}
    >
      <header className={styles.head}>
        <span className={styles.stripe} aria-hidden="true" />
        <div className={styles.headText}>
          <span className={styles.stageChip}>{STAGE_LABEL[stage]}</span>
          <h3 id={`dunning-${invoiceNumber}-head`} className={styles.title}>
            Invoice {invoiceNumber} is past due
          </h3>
          <p className={styles.intro}>{STAGE_INTRO[stage]}</p>
        </div>
        <span className={styles.amount}>{formatMoney(amountDue)}</span>
      </header>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>Past due</dt>
          <dd>{daysPastDue} days</dd>
        </div>
        <div className={styles.fact}>
          <dt>Next retry</dt>
          <dd>{formatDate(retryNextISO)}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Grace ends</dt>
          <dd>{formatDate(graceEndsISO)}</dd>
        </div>
      </dl>

      <footer className={styles.actions}>
        {onPayNow ? (
          <button type="button" className={styles.payBtn} onClick={onPayNow}>
            Pay {formatMoney(amountDue)} now
          </button>
        ) : null}
        {onUpdatePaymentMethod ? (
          <button type="button" className={styles.updateBtn} onClick={onUpdatePaymentMethod}>
            Update payment method
          </button>
        ) : null}
      </footer>
    </article>
  )
}

export default DunningNoticeCard
