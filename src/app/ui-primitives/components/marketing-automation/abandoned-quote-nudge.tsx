import { AlertCircle } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import styles from "./abandoned-quote-nudge.module.css"
import {
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type AutomationChannel,
  type AutomationTone,
} from "./marketing-automation-types"

export type NudgeStepStatus = "sent" | "queued" | "skipped"

export interface AbandonedNudgeStep {
  id: string
  waitLabel: string
  channel: AutomationChannel
  title: string
  status: NudgeStepStatus
}

interface AbandonedQuoteNudgeProps {
  /** Quote identifier or customer reference. */
  reference: string
  /** Quote total in AUD. */
  amount: number
  /** When the quote was first viewed. */
  abandonedAt: string
  /** Recovery schedule. */
  schedule: ReadonlyArray<AbandonedNudgeStep>
  /** Incentive description, e.g. "Free roadworthy with service booked in 7 days". */
  incentive: string
  className?: string
}

const STATUS_TONE: Record<NudgeStepStatus, AutomationTone> = {
  sent: "green",
  queued: "amber",
  skipped: "red",
}

const STATUS_LABEL: Record<NudgeStepStatus, string> = {
  sent: "Sent",
  queued: "Queued",
  skipped: "Skipped",
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function AbandonedQuoteNudge({
  reference,
  amount,
  abandonedAt,
  schedule,
  incentive,
  className,
}: AbandonedQuoteNudgeProps): ReactNode {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Abandoned quote ${reference} recovery card`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>
            <AlertCircle size={13} strokeWidth={2.4} aria-hidden="true" />
            Quote abandoned · {abandonedAt}
          </span>
          <h3 className={styles.title}>Recovery cadence · {reference}</h3>
          <p className={styles.subline}>
            Trigger fired when quote was viewed but not booked within 30 minutes.
          </p>
        </div>
        <div className={styles.value}>
          <span className={styles.valueLabel}>Quote value</span>
          <span className={styles.valueAmount}>{formatAud(amount)}</span>
          <Chip label="Recoverable" tone="amber" />
        </div>
      </header>

      <div className={styles.schedule}>
        <span className={styles.scheduleLabel}>Cadence</span>
        {schedule.map((step) => (
          <div key={step.id} className={styles.scheduleRow}>
            <span className={styles.scheduleWait}>{step.waitLabel}</span>
            <div className={styles.scheduleAction}>
              <span className={styles.scheduleKind}>
                {CHANNEL_LABEL[step.channel]}
              </span>
              <span className={styles.scheduleTitle}>{step.title}</span>
              <Chip
                label={CHANNEL_LABEL[step.channel]}
                tone={CHANNEL_TONE[step.channel]}
              />
            </div>
            <span
              className={styles.scheduleStatus}
              data-tone={STATUS_TONE[step.status]}
            >
              {STATUS_LABEL[step.status]}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.incentive}>
        <span className={styles.incentiveLabel}>Incentive</span>
        <span className={styles.incentiveBody}>{incentive}</span>
      </div>
    </article>
  )
}

export default AbandonedQuoteNudge
