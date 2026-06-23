import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import {
  temperatureForScore,
  type LeadTemperature,
  type SignalDirection,
} from "./sales-leads-types"

import styles from "./lead-score-breakdown.module.css"

export interface LeadScoreSignal {
  id: string
  label: string
  points: number
  direction: SignalDirection
  /** Short rationale chip — e.g. "Manta cat-back fitment", "Toyota Hilux". */
  reasoning: ReadonlyArray<string>
}

interface LeadScoreBreakdownProps {
  total: number
  signals: ReadonlyArray<LeadScoreSignal>
  /** Optional max score (default 100). */
  max?: number
  className?: string
}

const TEMPERATURE_LABEL: Record<LeadTemperature, string> = {
  cold: "Cold",
  warm: "Warm",
  hot: "Hot",
  blazing: "Blazing",
}

const TEMPERATURE_TONE: Record<
  LeadTemperature,
  "teal" | "amber" | "red" | "green"
> = {
  cold: "teal",
  warm: "amber",
  hot: "amber",
  blazing: "red",
}

const PROGRESS_TONE: Record<
  LeadTemperature,
  "teal" | "amber" | "red" | "green"
> = {
  cold: "teal",
  warm: "amber",
  hot: "red",
  blazing: "red",
}

export function LeadScoreBreakdown({
  total,
  signals,
  max = 100,
  className,
}: LeadScoreBreakdownProps) {
  const safeTotal = Math.max(0, Math.min(max, Math.round(total)))
  const temperature = temperatureForScore(safeTotal)
  const positives = signals.filter((s) => s.direction === "positive")
  const negatives = signals.filter((s) => s.direction === "negative")

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Lead score ${safeTotal} out of ${max}, ${TEMPERATURE_LABEL[temperature]}`}
    >
      <header className={styles.head}>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreLabel}>Lead score</span>
          <strong className={styles.scoreValue}>
            {safeTotal}
            <em>/{max}</em>
          </strong>
        </div>
        <Chip
          label={TEMPERATURE_LABEL[temperature]}
          tone={TEMPERATURE_TONE[temperature]}
        />
      </header>

      <ProgressLinear
        value={safeTotal}
        max={max}
        tone={PROGRESS_TONE[temperature]}
        label={`${safeTotal}/${max}`}
      />

      <div className={styles.lists}>
        {positives.length > 0 ? (
          <section className={styles.column} aria-label="Positive signals">
            <span className={styles.columnLabel}>+ Positive signals</span>
            <ul className={styles.signalList}>
              {positives.map((signal) => (
                <li key={signal.id} className={styles.signalRow} data-dir="positive">
                  <span className={styles.signalLabel}>{signal.label}</span>
                  <span className={styles.signalPoints}>+{signal.points}</span>
                  <div className={styles.reasoningRow}>
                    {signal.reasoning.map((reason) => (
                      <span key={reason} className={styles.reasonChip}>
                        {reason}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {negatives.length > 0 ? (
          <section className={styles.column} aria-label="Negative signals">
            <span className={styles.columnLabel}>− Negative signals</span>
            <ul className={styles.signalList}>
              {negatives.map((signal) => (
                <li key={signal.id} className={styles.signalRow} data-dir="negative">
                  <span className={styles.signalLabel}>{signal.label}</span>
                  <span className={styles.signalPoints}>−{signal.points}</span>
                  <div className={styles.reasoningRow}>
                    {signal.reasoning.map((reason) => (
                      <span key={reason} className={styles.reasonChip}>
                        {reason}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  )
}

export default LeadScoreBreakdown
