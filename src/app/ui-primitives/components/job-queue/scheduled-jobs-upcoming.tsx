"use client"

import { ActivityFeed, type ActivityFeedItem } from "../data-display/activity-feed"

import { JOB_KIND_LABEL, type JobKind } from "./job-queue-types"
import styles from "./scheduled-jobs-upcoming.module.css"

export interface ScheduledJob {
  id: string
  kind: JobKind
  /** Countdown rendered next to the timestamp (e.g. "in 4m 12s"). */
  countdownLabel: string
  /** Absolute time the job is scheduled to fire. */
  scheduledFor: string
  /** Optional short description (e.g. recipient or target). */
  description?: string
}

interface ScheduledJobsUpcomingProps {
  jobs: ReadonlyArray<ScheduledJob>
  onEdit?: (id: string) => void
  onCancel?: (id: string) => void
  className?: string
}

export function ScheduledJobsUpcoming({
  jobs,
  onEdit,
  onCancel,
  className,
}: ScheduledJobsUpcomingProps) {
  const items: ActivityFeedItem[] = jobs.map((job) => ({
    id: job.id,
    title: `${JOB_KIND_LABEL[job.kind]} — ${job.countdownLabel}`,
    description: job.description,
    timestamp: job.scheduledFor,
    tone: "info" as const,
    actions: (
      <div className={styles.rowActions}>
        <button
          type="button"
          className={styles.actionEdit}
          onClick={() => onEdit?.(job.id)}
          aria-label={`Edit ${job.id}`}
        >
          Edit
        </button>
        <button
          type="button"
          className={styles.actionCancel}
          onClick={() => onCancel?.(job.id)}
          aria-label={`Cancel ${job.id}`}
        >
          Cancel
        </button>
      </div>
    ),
  }))

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Upcoming scheduled jobs">
      <header className={styles.head}>
        <span className={styles.kicker}>Scheduled</span>
        <h3 className={styles.title}>{jobs.length} upcoming</h3>
      </header>
      <ActivityFeed items={items} ariaLabel="Upcoming scheduled jobs" />
    </section>
  )
}

export default ScheduledJobsUpcoming
