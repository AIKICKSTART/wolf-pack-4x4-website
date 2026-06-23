import styles from "./slo-dashboard-tile.module.css"
import type { StatusTone } from "./status-types"

export type SloWindow = "30d" | "90d"

export interface SloDashboardTileProps {
  /** Objective name, e.g. "Quote engine availability". */
  name: string
  /** Target as a fraction, e.g. 0.9995 = 99.95%. */
  objective: number
  /** Actual achieved value as a fraction. */
  actual: number
  /** Remaining error budget as a fraction of total budget, 0..1. */
  remainingBudget: number
  window: SloWindow
  className?: string
}

const WINDOW_LABEL: Record<SloWindow, string> = {
  "30d": "30-day",
  "90d": "90-day",
}

function formatPercent(value: number, digits: number = 3): string {
  return `${(value * 100).toFixed(digits)}%`
}

function tileTone(actual: number, objective: number): StatusTone {
  if (actual >= objective) return "green"
  if (actual >= objective - 0.001) return "amber"
  return "red"
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function SloDashboardTile({
  name,
  objective,
  actual,
  remainingBudget,
  window,
  className,
}: SloDashboardTileProps) {
  const tone = tileTone(actual, objective)
  const classes = [styles.tile, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")
  const clampedBudget = Math.min(Math.max(remainingBudget, 0), 1)
  const meeting = actual >= objective

  return (
    <article className={classes} aria-label={`SLO tile — ${name}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Objective</span>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.windowChip}>{WINDOW_LABEL[window]}</span>
      </header>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Target</span>
          <span className={styles.metricValue}>{formatPercent(objective)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Actual</span>
          <span className={[styles.metricValue, styles.metricStrong].join(" ")}>
            {formatPercent(actual)}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Status</span>
          <span className={styles.statusChip}>
            {meeting ? "Meeting" : "At risk"}
          </span>
        </div>
      </div>

      <div className={styles.budget}>
        <div className={styles.budgetHead}>
          <span className={styles.budgetLabel}>Error budget remaining</span>
          <span className={styles.budgetValue}>
            {formatPercent(clampedBudget, 1)}
          </span>
        </div>
        <div
          className={styles.meter}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clampedBudget * 100)}
          aria-label={`Error budget remaining ${formatPercent(clampedBudget, 1)}`}
        >
          <span
            className={styles.meterFill}
            style={{ width: `${clampedBudget * 100}%` }}
          />
        </div>
      </div>
    </article>
  )
}

export default SloDashboardTile
