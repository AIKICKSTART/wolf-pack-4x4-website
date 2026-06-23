"use client"

import { useEffect, useState } from "react"

import type { BackupScheduleInfo, BackupStatus, ScheduleFrequency } from "./backup-types"

import styles from "./backup-schedule-card.module.css"

const FREQUENCY_LABEL: Record<ScheduleFrequency, string> = {
  hourly: "Hourly",
  every_6_hours: "Every 6h",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
}

const STATUS_LABEL: Record<BackupStatus, string> = {
  successful: "Successful",
  in_progress: "In progress",
  failed: "Failed",
  expired: "Expired",
  verifying: "Verifying",
}

const STATUS_TONE_CLASS: Record<BackupStatus, string> = {
  successful: styles.toneGreen,
  in_progress: styles.toneTeal,
  failed: styles.toneRed,
  expired: styles.toneMuted,
  verifying: styles.toneAmber,
}

interface BackupScheduleCardProps {
  schedule: BackupScheduleInfo
  onEdit?: (scheduleId: string) => void
  onToggleEnabled?: (scheduleId: string, next: boolean) => void
  className?: string
}

function formatRelativeFromNow(target: Date, now: Date): string {
  const deltaSec = Math.round((target.getTime() - now.getTime()) / 1000)
  const abs = Math.abs(deltaSec)
  const prefix = deltaSec >= 0 ? "in " : ""
  const suffix = deltaSec >= 0 ? "" : " ago"
  if (abs < 60) {
    return `${prefix}${abs}s${suffix}`
  }
  if (abs < 3600) {
    return `${prefix}${Math.round(abs / 60)}m${suffix}`
  }
  if (abs < 86400) {
    return `${prefix}${Math.round(abs / 3600)}h${suffix}`
  }
  return `${prefix}${Math.round(abs / 86400)}d${suffix}`
}

export function BackupScheduleCard({
  schedule,
  onEdit,
  onToggleEnabled,
  className,
}: BackupScheduleCardProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const handle = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(handle)
  }, [])

  const nextRunDate = new Date(schedule.nextRunAt)
  const countdown = now ? formatRelativeFromNow(nextRunDate, now) : "Scheduled"
  const classes = [styles.card, !schedule.enabled ? styles.disabled : null, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Backup schedule for ${schedule.resourceName}`}
    >
      <header className={styles.head}>
        <div className={styles.titles}>
          <span className={styles.kicker}>Schedule</span>
          <h3 className={styles.title}>{schedule.resourceName}</h3>
        </div>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={schedule.enabled}
            onChange={(event) =>
              onToggleEnabled?.(schedule.id, event.currentTarget.checked)
            }
            aria-label={`${schedule.enabled ? "Disable" : "Enable"} ${schedule.resourceName} schedule`}
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>
            {schedule.enabled ? "On" : "Off"}
          </span>
        </label>
      </header>

      <div className={styles.chipRow}>
        <span className={styles.chip}>{FREQUENCY_LABEL[schedule.frequency]}</span>
        {schedule.cron ? (
          <code className={styles.cron}>{schedule.cron}</code>
        ) : null}
        <span className={styles.retentionChip}>{schedule.retentionSummary}</span>
      </div>

      <dl className={styles.statRow}>
        <div className={styles.stat}>
          <dt>Next run</dt>
          <dd>
            <time dateTime={schedule.nextRunAt}>{countdown}</time>
          </dd>
        </div>
        <div className={styles.stat}>
          <dt>Last run</dt>
          <dd>
            {schedule.lastStatus ? (
              <span
                className={[styles.statusChip, STATUS_TONE_CLASS[schedule.lastStatus]].join(" ")}
              >
                {STATUS_LABEL[schedule.lastStatus]}
              </span>
            ) : (
              <span className={styles.dim}>—</span>
            )}
            {schedule.lastRunAt ? (
              <time className={styles.dim} dateTime={schedule.lastRunAt}>
                {schedule.lastRunAt}
              </time>
            ) : null}
          </dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.editBtn}
          onClick={() => onEdit?.(schedule.id)}
        >
          Edit schedule
        </button>
      </footer>
    </article>
  )
}

export default BackupScheduleCard
