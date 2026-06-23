"use client"

import { RefreshCw, SkipForward } from "lucide-react"

import type { BulkRowStatus } from "./bulk-ops-types"
import styles from "./per-row-status-cell.module.css"

interface PerRowStatusCellProps {
  status: BulkRowStatus
  /** Optional message — e.g. "VIN mismatch" for failed rows. */
  message?: string
  /** Display row actions for failed rows. */
  showActions?: boolean
  onRetry?: () => void
  onSkip?: () => void
  className?: string
}

const STATUS_LABEL: Record<BulkRowStatus, string> = {
  queued: "Queued",
  in_progress: "In progress",
  done: "Done",
  skipped: "Skipped",
  failed: "Failed",
}

const STATUS_CLASS: Record<BulkRowStatus, string> = {
  queued: "queued",
  in_progress: "inProgress",
  done: "done",
  skipped: "skipped",
  failed: "failed",
}

export function PerRowStatusCell({
  status,
  message,
  showActions = false,
  onRetry,
  onSkip,
  className,
}: PerRowStatusCellProps) {
  const classes = [styles.cell, className].filter(Boolean).join(" ")
  const chipClass = [styles.chip, styles[STATUS_CLASS[status]]].join(" ")

  return (
    <span className={classes}>
      <span className={chipClass}>
        <span className={styles.dot} aria-hidden="true" />
        {STATUS_LABEL[status]}
      </span>
      {message ? <span className={styles.message}>{message}</span> : null}
      {showActions && status === "failed" ? (
        <span className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onRetry}
            aria-label="Retry this row"
          >
            <RefreshCw size={10} strokeWidth={2.4} aria-hidden="true" />
            Retry
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onSkip}
            aria-label="Skip this row"
          >
            <SkipForward size={10} strokeWidth={2.4} aria-hidden="true" />
            Skip
          </button>
        </span>
      ) : null}
    </span>
  )
}

export default PerRowStatusCell
