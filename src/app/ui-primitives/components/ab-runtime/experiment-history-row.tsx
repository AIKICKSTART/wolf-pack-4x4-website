import {
  HISTORY_OUTCOME_LABEL,
  formatLiftPercent,
  type AbHistoryOutcome,
} from "./ab-runtime-types"

import styles from "./experiment-history-row.module.css"

export interface ExperimentHistoryRowProps {
  /** Experiment name. */
  name: string
  /** ISO date string for ran-from. */
  ranFrom: string
  /** ISO date string for ran-to. */
  ranTo: string
  /** Final lift, percent. */
  finalLiftPct?: number
  /** Outcome bucket. */
  outcome: AbHistoryOutcome
  /** Optional key learning sentence. */
  learning?: string
  /** Optional duration string (e.g. "21d"). */
  durationLabel?: string
  className?: string
}

const OUTCOME_CLASS: Record<AbHistoryOutcome, string> = {
  shipped: "outcomeShipped",
  iterated: "outcomeIterated",
  killed: "outcomeKilled",
  inconclusive: "outcomeInconclusive",
}

function liftClass(value: number | undefined): string {
  if (value === undefined) return styles.liftFlat
  if (value > 0) return styles.liftUp
  if (value < 0) return styles.liftDown
  return styles.liftFlat
}

function computeDuration(from: string, to: string): string {
  const fromTime = new Date(from).getTime()
  const toTime = new Date(to).getTime()
  if (Number.isNaN(fromTime) || Number.isNaN(toTime)) return "—"
  const days = Math.max(0, Math.round((toTime - fromTime) / (1000 * 60 * 60 * 24)))
  if (days < 90) return `${days}d`
  return `${(days / 30).toFixed(1)}mo`
}

export function ExperimentHistoryRow({
  name,
  ranFrom,
  ranTo,
  finalLiftPct,
  outcome,
  learning,
  durationLabel,
  className,
}: ExperimentHistoryRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const outcomeClass = [styles.outcome, styles[OUTCOME_CLASS[outcome] as keyof typeof styles]]
    .filter(Boolean)
    .join(" ")

  const finalLabel =
    finalLiftPct !== undefined ? formatLiftPercent(finalLiftPct) : "—"

  return (
    <article
      className={classes}
      aria-label={`Past experiment ${name}, outcome ${HISTORY_OUTCOME_LABEL[outcome]}, final lift ${finalLabel}`}
    >
      <div className={styles.head}>
        <span className={styles.dates}>
          {ranFrom} → {ranTo}
        </span>
        <span className={styles.name}>{name}</span>
        {learning ? <span className={styles.learning}>{learning}</span> : null}
      </div>
      <span className={`${styles.lift} ${liftClass(finalLiftPct)}`}>
        {finalLabel}
      </span>
      <span className={outcomeClass}>{HISTORY_OUTCOME_LABEL[outcome]}</span>
      <span className={styles.duration}>
        {durationLabel ?? computeDuration(ranFrom, ranTo)}
      </span>
    </article>
  )
}

export default ExperimentHistoryRow
