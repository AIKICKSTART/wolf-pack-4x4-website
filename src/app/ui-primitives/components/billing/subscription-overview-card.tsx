"use client"

import {
  formatMoney,
  statusToLabel,
  type BillingInterval,
  type MoneyAmount,
  type SubscriptionStatus,
} from "./billing-types"
import styles from "./subscription-overview-card.module.css"

interface ManageAction {
  label: string
  onClick?: () => void
  variant?: "primary" | "ghost" | "danger"
}

interface SubscriptionOverviewCardProps {
  planName: string
  status: SubscriptionStatus
  interval: BillingInterval
  amount: MoneyAmount
  nextRenewalISO: string
  customerName: string
  seatsUsed?: number
  seatsIncluded?: number
  actions?: ReadonlyArray<ManageAction>
}

const STATUS_TO_CLASS: Record<SubscriptionStatus, string> = {
  active: styles.statusActive,
  trial: styles.statusTrial,
  past_due: styles.statusPastDue,
  cancelled: styles.statusCancelled,
  paused: styles.statusPaused,
  incomplete: styles.statusIncomplete,
}

const INTERVAL_LABEL: Record<BillingInterval, string> = {
  monthly: "per month",
  quarterly: "per quarter",
  annual: "per year",
}

function formatRenewalDate(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d)
}

export function SubscriptionOverviewCard({
  planName,
  status,
  interval,
  amount,
  nextRenewalISO,
  customerName,
  seatsUsed,
  seatsIncluded,
  actions,
}: SubscriptionOverviewCardProps) {
  return (
    <article className={styles.card} aria-label={`Subscription for ${customerName}`}>
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Current subscription</span>
          <h3 className={styles.plan}>{planName}</h3>
          <span className={styles.customer}>{customerName}</span>
        </div>
        <span
          className={`${styles.status} ${STATUS_TO_CLASS[status]}`}
          aria-label={`Status: ${statusToLabel(status)}`}
        >
          <span className={styles.statusDot} aria-hidden="true" />
          {statusToLabel(status)}
        </span>
      </header>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Amount</dt>
          <dd className={styles.factValue}>
            <span className={styles.money}>{formatMoney(amount)}</span>
            <span className={styles.interval}>{INTERVAL_LABEL[interval]}</span>
          </dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Next renewal</dt>
          <dd className={styles.factValue}>
            <span className={styles.renewal}>{formatRenewalDate(nextRenewalISO)}</span>
          </dd>
        </div>
        {typeof seatsUsed === "number" && typeof seatsIncluded === "number" ? (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Seats</dt>
            <dd className={styles.factValue}>
              <span className={styles.seats}>
                {seatsUsed} <span className={styles.seatsOf}>of</span> {seatsIncluded}
              </span>
            </dd>
          </div>
        ) : null}
      </dl>

      {actions && actions.length > 0 ? (
        <footer className={styles.actions}>
          {actions.map((action) => {
            const variantClass =
              action.variant === "primary"
                ? styles.actionPrimary
                : action.variant === "danger"
                  ? styles.actionDanger
                  : styles.actionGhost
            return (
              <button
                key={action.label}
                type="button"
                className={`${styles.action} ${variantClass}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )
          })}
        </footer>
      ) : null}
    </article>
  )
}

export default SubscriptionOverviewCard
