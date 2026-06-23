import {
  SYNC_CADENCE_LABEL,
  type SyncCadence,
} from "./connectors-types"
import styles from "./sync-schedule-card.module.css"

export interface SyncScheduleCardProps {
  /** Job name, e.g. "Hourly supplier sync". */
  jobName: string
  cadence: SyncCadence
  /** Cron expression, e.g. "0 * * * *". */
  cronExpression: string
  /** Timezone label, e.g. "Australia/Sydney". */
  timezone: string
  /** Last successful run, e.g. "2026-05-29 09:00 AEST". */
  lastRun?: string
  /** Next scheduled run, e.g. "2026-05-29 10:00 AEST". */
  nextRun: string
  /** Recent run outcomes — most recent first. */
  recentOutcomes: ReadonlyArray<"success" | "fail" | "skipped" | "pending">
  /** True to mark the schedule as paused. */
  paused?: boolean
  className?: string
}

const OUTCOME_CLASS: Record<NonNullable<SyncScheduleCardProps["recentOutcomes"][number]>, string> = {
  success: styles.dotSuccess,
  fail: styles.dotFail,
  skipped: styles.dotSkipped,
  pending: styles.dotPending,
}

const OUTCOME_LABEL: Record<NonNullable<SyncScheduleCardProps["recentOutcomes"][number]>, string> = {
  success: "Success",
  fail: "Failed",
  skipped: "Skipped",
  pending: "Pending",
}

export function SyncScheduleCard({
  jobName,
  cadence,
  cronExpression,
  timezone,
  lastRun,
  nextRun,
  recentOutcomes,
  paused = false,
  className,
}: SyncScheduleCardProps) {
  const classes = [styles.card, paused ? styles.cardPaused : "", className]
    .filter(Boolean)
    .join(" ")
  return (
    <article
      className={classes}
      role="region"
      aria-label={`${jobName} schedule — ${SYNC_CADENCE_LABEL[cadence]}${paused ? " (paused)" : ""}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Schedule</span>
          <h3 className={styles.jobName}>{jobName}</h3>
        </div>
        <span className={[styles.statusChip, paused ? styles.statusPaused : styles.statusActive].join(" ")}>
          <span className={styles.statusDot} aria-hidden="true" />
          {paused ? "Paused" : "Active"}
        </span>
      </header>

      <div className={styles.cronBlock}>
        <span className={styles.cronKicker}>Cron · {timezone}</span>
        <code className={styles.cron}>{cronExpression}</code>
        <span className={styles.cadence}>{SYNC_CADENCE_LABEL[cadence]}</span>
      </div>

      <dl className={styles.timeline}>
        <div className={styles.timelineItem}>
          <dt className={styles.timelineLabel}>Last run</dt>
          <dd className={styles.timelineValue}>{lastRun ?? "—"}</dd>
        </div>
        <div className={styles.timelineItem}>
          <dt className={styles.timelineLabel}>Next run</dt>
          <dd className={[styles.timelineValue, styles.nextRun].join(" ")}>{nextRun}</dd>
        </div>
      </dl>

      <div className={styles.recent} aria-label="Recent outcomes (most recent first)">
        <span className={styles.recentLabel}>Recent</span>
        <ol className={styles.recentList}>
          {recentOutcomes.map((outcome, index) => (
            <li
              key={`${outcome}-${index}`}
              className={[styles.dot, OUTCOME_CLASS[outcome]].join(" ")}
              title={`Run ${index + 1} · ${OUTCOME_LABEL[outcome]}`}
              aria-label={`Run ${index + 1}: ${OUTCOME_LABEL[outcome]}`}
            />
          ))}
        </ol>
      </div>
    </article>
  )
}

export default SyncScheduleCard
