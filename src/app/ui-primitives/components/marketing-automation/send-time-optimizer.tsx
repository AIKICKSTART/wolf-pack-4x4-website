import { Clock } from "lucide-react"

import styles from "./send-time-optimizer.module.css"

export type ConfidenceBand = "high" | "medium" | "low"

export interface SendTimeRecipient {
  id: string
  name: string
  email: string
  /** Predicted best slot, e.g. "Tue 6:42pm". */
  bestSlot: string
  /** Previous send time, e.g. "Wed 10:00am". */
  previousSlot?: string
  /** Confidence score 0-100. */
  confidence: number
}

interface SendTimeOptimizerProps {
  /** Display title. */
  title?: string
  /** Aggregate confidence band for the recommendation set. */
  band: ConfidenceBand
  /** Per-recipient predictions. */
  recipients: ReadonlyArray<SendTimeRecipient>
  className?: string
}

function confidenceBand(score: number): ConfidenceBand {
  if (score >= 75) return "high"
  if (score >= 50) return "medium"
  return "low"
}

const BAND_LABEL: Record<ConfidenceBand, string> = {
  high: "High confidence",
  medium: "Mixed signal",
  low: "Low confidence",
}

export function SendTimeOptimizer({
  title = "Per-recipient send-time predictor",
  band,
  recipients,
  className,
}: SendTimeOptimizerProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <section className={classes} role="region" aria-label={title}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Send-time optimizer</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <span className={styles.confidence} data-band={band}>
          <Clock size={12} strokeWidth={2.4} aria-hidden="true" />
          {BAND_LABEL[band]}
        </span>
      </header>

      <div className={styles.recipients}>
        {recipients.map((recipient) => {
          const recipientBand = confidenceBand(recipient.confidence)
          return (
            <div key={recipient.id} className={styles.recipient}>
              <div className={styles.identity}>
                <span className={styles.name}>{recipient.name}</span>
                <span className={styles.email}>{recipient.email}</span>
              </div>
              <span className={styles.bestSlot}>
                <Clock size={11} strokeWidth={2.4} aria-hidden="true" />
                {recipient.bestSlot}
              </span>
              <span className={styles.previousSlot}>
                {recipient.previousSlot
                  ? `Was · ${recipient.previousSlot}`
                  : "New contact"}
              </span>
              <span className={styles.confChip} data-band={recipientBand}>
                {recipient.confidence}%
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SendTimeOptimizer
