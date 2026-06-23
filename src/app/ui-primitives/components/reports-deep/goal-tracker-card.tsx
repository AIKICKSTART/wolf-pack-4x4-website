import {
  formatAud,
  formatCount,
  formatPercent,
} from "./reports-deep-types"
import type { GoalProgress } from "./reports-deep-types"
import styles from "./goal-tracker-card.module.css"

interface GoalTrackerCardProps {
  readonly goal: GoalProgress
  readonly className?: string
}

const CADENCE_LABEL: Record<GoalProgress["cadence"], string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  annual: "Annual",
}

function formatGoalValue(value: number, formatter: GoalProgress["formatter"]): string {
  switch (formatter) {
    case "aud":
      return formatAud(value)
    case "percent":
      return formatPercent(value)
    case "count":
      return formatCount(value)
    default:
      return formatCount(value)
  }
}

function statusFor(current: number, projected: number, target: number):
  | "ahead"
  | "on-track"
  | "behind" {
  if (projected >= target * 1.02) return "ahead"
  if (projected >= target * 0.98) return "on-track"
  return "behind"
}

const STATUS_LABEL: Record<"ahead" | "on-track" | "behind", string> = {
  ahead: "Ahead of pace",
  "on-track": "On track",
  behind: "Behind pace",
}

const STATUS_CLASS: Record<"ahead" | "on-track" | "behind", string> = {
  ahead: styles.statusAhead,
  "on-track": styles.statusOn,
  behind: styles.statusBehind,
}

export function GoalTrackerCard({ goal, className }: GoalTrackerCardProps) {
  const clampedCurrent = Math.max(0, Math.min(goal.target, goal.current))
  const currentRatio = goal.target > 0 ? clampedCurrent / goal.target : 0
  const projectedRatio = goal.target > 0
    ? Math.max(0, Math.min(1.2, goal.projected / goal.target))
    : 0
  const variance = goal.projected - goal.target
  const status = statusFor(goal.current, goal.projected, goal.target)

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Goal: ${goal.label}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>
          {CADENCE_LABEL[goal.cadence]} · {goal.daysRemaining}d remaining
        </span>
        <h3 className={styles.title}>{goal.label}</h3>
        <span className={`${styles.status} ${STATUS_CLASS[status]}`}>{STATUS_LABEL[status]}</span>
      </header>

      <div className={styles.values}>
        <div className={styles.valueBlock}>
          <span className={styles.valueLabel}>Current</span>
          <span className={styles.valueText}>
            {formatGoalValue(goal.current, goal.formatter)}
          </span>
        </div>
        <div className={styles.valueBlock}>
          <span className={styles.valueLabel}>Target</span>
          <span className={styles.valueText}>
            {formatGoalValue(goal.target, goal.formatter)}
          </span>
        </div>
        <div className={styles.valueBlock}>
          <span className={styles.valueLabel}>Projected</span>
          <span className={`${styles.valueText} ${styles.valueProjected}`}>
            {formatGoalValue(goal.projected, goal.formatter)}
          </span>
        </div>
      </div>

      <div
        className={styles.bar}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal.target}
        aria-valuenow={goal.current}
        aria-label={`${goal.label} progress`}
      >
        <div className={styles.barTrack}>
          <div
            className={styles.barProjected}
            style={{ width: `${Math.min(100, projectedRatio * 100).toFixed(1)}%` }}
          />
          <div
            className={styles.barCurrent}
            style={{ width: `${Math.min(100, currentRatio * 100).toFixed(1)}%` }}
          />
        </div>
        <div className={styles.scale}>
          <span>0</span>
          <span>{Math.round(goal.target / 2).toLocaleString()}</span>
          <span>{Math.round(goal.target).toLocaleString()}</span>
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.varianceLabel}>Variance</span>
        <span
          className={`${styles.variance} ${
            variance >= 0 ? styles.variancePositive : styles.varianceNegative
          }`}
        >
          {variance >= 0 ? "+" : ""}
          {formatGoalValue(Math.abs(variance), goal.formatter)}
        </span>
        <span className={styles.varianceHint}>vs target · {goal.unit}</span>
      </footer>
    </article>
  )
}

export default GoalTrackerCard
