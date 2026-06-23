import { Crown, Pause } from "lucide-react"

import styles from "./creative-variant-card.module.css"
import type { WinnerSignal } from "./marketing-automation-types"

interface CreativeVariantCardProps {
  variant: string
  subject: string
  body: string
  /** Open rate %. */
  openRate: number
  /** Click rate %. */
  clickRate: number
  /** Conversion rate %. */
  conversionRate: number
  /** Traffic weight %. */
  weight: number
  /** Winner indicator. */
  signal: WinnerSignal
  className?: string
}

const SIGNAL_LABEL: Record<WinnerSignal, string> = {
  winner: "Winner",
  loser: "Loser",
  running: "Running",
  tied: "Tied",
}

export function CreativeVariantCard({
  variant,
  subject,
  body,
  openRate,
  clickRate,
  conversionRate,
  weight,
  signal,
  className,
}: CreativeVariantCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      data-winner={signal}
      aria-label={`Variant ${variant} · ${SIGNAL_LABEL[signal]}`}
    >
      <header className={styles.head}>
        <span className={styles.variantLetter} aria-hidden="true">
          {variant}
        </span>
        <span className={styles.statusChip} data-tone={signal}>
          {signal === "winner" ? (
            <Crown size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : signal === "loser" ? (
            <Pause size={11} strokeWidth={2.4} aria-hidden="true" />
          ) : null}
          {SIGNAL_LABEL[signal]}
        </span>
      </header>

      <div className={styles.subject}>{subject}</div>
      <div className={styles.body}>{body}</div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Open</span>
          <span className={styles.metricValue}>{openRate.toFixed(1)}%</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Click</span>
          <span className={styles.metricValue}>{clickRate.toFixed(1)}%</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Convert</span>
          <span className={styles.metricValue}>
            {conversionRate.toFixed(1)}%
          </span>
        </div>
      </div>

      <div className={styles.weight}>
        <span className={styles.weightLabel}>
          <span>Traffic split</span>
          <span>{weight}%</span>
        </span>
        <span className={styles.weightTrack} aria-hidden="true">
          <span
            className={styles.weightFill}
            style={{ width: `${Math.max(2, Math.min(weight, 100))}%` }}
          />
        </span>
      </div>
    </article>
  )
}

export default CreativeVariantCard
