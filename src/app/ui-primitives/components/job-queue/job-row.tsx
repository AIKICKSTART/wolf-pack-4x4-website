"use client"

import { Eye, Repeat } from "lucide-react"

import { Chip } from "../primitives/chip"

import { JOB_KIND_LABEL, STATUS_TONE, type JobKind, type JobStatus } from "./job-queue-types"
import styles from "./job-row.module.css"

export interface JobRowItem {
  id: string
  kind: JobKind
  status: JobStatus
  /** Wall-clock duration in milliseconds. */
  durationMs: number
  attempt: number
  maxAttempts: number
  /** Queue name (priority lane). */
  queue: string
}

interface JobRowProps {
  job: JobRowItem
  onViewPayload?: (id: string) => void
  onRetry?: (id: string) => void
  className?: string
}

const STATUS_LABEL: Record<JobStatus, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  failed: "Failed",
  retrying: "Retrying",
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`
  const minutes = Math.floor(ms / 60_000)
  const seconds = Math.floor((ms % 60_000) / 1000)
  return `${minutes}m ${seconds}s`
}

export function JobRow({ job, onViewPayload, onRetry, className }: JobRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const canRetry = job.status === "failed" || job.status === "retrying"
  const isAttemptWarn = job.attempt > 1

  return (
    <tr className={classes} data-status={job.status}>
      <td className={styles.cellId}>
        <code className={styles.id}>{job.id}</code>
        <span className={styles.queue}>{job.queue}</span>
      </td>
      <td className={styles.cellKind}>
        <Chip label={JOB_KIND_LABEL[job.kind]} tone="neutral" />
      </td>
      <td className={styles.cellStatus}>
        <Chip label={STATUS_LABEL[job.status]} tone={STATUS_TONE[job.status]} />
      </td>
      <td className={styles.cellDuration}>
        <Chip label={formatDuration(job.durationMs)} tone="neutral" />
      </td>
      <td className={styles.cellAttempt}>
        <Chip
          label={`${job.attempt}/${job.maxAttempts}`}
          tone={isAttemptWarn ? "amber" : "neutral"}
        />
      </td>
      <td className={styles.cellActions}>
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => onViewPayload?.(job.id)}
          aria-label={`View payload for ${job.id}`}
        >
          <Eye size={12} strokeWidth={2.4} aria-hidden="true" />
          <span>Payload</span>
        </button>
        {canRetry && (
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.actionRetry}`}
            onClick={() => onRetry?.(job.id)}
            aria-label={`Retry job ${job.id}`}
          >
            <Repeat size={12} strokeWidth={2.4} aria-hidden="true" />
            <span>Retry</span>
          </button>
        )}
      </td>
    </tr>
  )
}

export default JobRow
