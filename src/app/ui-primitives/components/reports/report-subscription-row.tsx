"use client"

import type { ScheduleFrequency } from "./reports-types"
import styles from "./report-subscription-row.module.css"

const FREQUENCY_LABEL: Record<ScheduleFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  "custom-cron": "Custom",
}

interface ReportSubscriptionRowProps {
  subscriberName: string
  subscriberEmail: string
  initials: string
  frequency: ScheduleFrequency
  lastSent: string
  onUnsubscribe?: () => void
  className?: string
}

export function ReportSubscriptionRow({
  subscriberName,
  subscriberEmail,
  initials,
  frequency,
  lastSent,
  onUnsubscribe,
  className,
}: ReportSubscriptionRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} aria-label={`Subscription: ${subscriberName}`}>
      <span className={styles.avatar} aria-hidden="true">
        {initials}
      </span>
      <div className={styles.identity}>
        <span className={styles.name}>{subscriberName}</span>
        <span className={styles.email}>{subscriberEmail}</span>
      </div>
      <span className={styles.freq}>{FREQUENCY_LABEL[frequency]}</span>
      <span className={styles.lastSent}>Last sent {lastSent}</span>
      <button
        type="button"
        className={styles.unsubscribe}
        onClick={onUnsubscribe}
        aria-label={`Unsubscribe ${subscriberName}`}
      >
        Unsubscribe
      </button>
    </div>
  )
}

export default ReportSubscriptionRow
