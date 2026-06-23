"use client"

import { Pause, Play, X } from "lucide-react"

import type { BulkOperationProgressState } from "./bulk-ops-types"
import styles from "./bulk-operation-progress.module.css"

interface BulkOperationProgressProps {
  /** Display name of the operation, e.g. "Archive overdue quotes". */
  operationLabel: string
  state: BulkOperationProgressState
  /** Triggered when the operator pauses or resumes. */
  onTogglePause?: () => void
  /** Triggered when the operator cancels the run. */
  onCancel?: () => void
  className?: string
}

function formatEta(seconds: number): string {
  if (seconds < 60) {
    return `${Math.max(1, Math.round(seconds))}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remaining = Math.round(seconds % 60)
  if (minutes < 60) {
    return remaining === 0 ? `${minutes}m` : `${minutes}m ${remaining}s`
  }
  const hours = Math.floor(minutes / 60)
  const minRem = minutes % 60
  return minRem === 0 ? `${hours}h` : `${hours}h ${minRem}m`
}

export function BulkOperationProgress({
  operationLabel,
  state,
  onTogglePause,
  onCancel,
  className,
}: BulkOperationProgressProps) {
  const ratio = state.total === 0 ? 0 : state.processed / state.total
  const pct = Math.min(100, Math.max(0, ratio * 100))
  const isPaused = Boolean(state.paused)
  const classes = [styles.strip, isPaused ? styles.paused : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={`${operationLabel} progress`}>
      <header className={styles.head}>
        <div className={styles.title}>
          <span className={styles.kicker}>
            {isPaused ? "Paused" : "In progress"}
          </span>
          <span className={styles.label}>{operationLabel}</span>
        </div>
        <div className={styles.counts}>
          <span className={styles.countsLabel}>Processed</span>
          <span>
            {state.processed.toLocaleString("en-US")} /{" "}
            {state.total.toLocaleString("en-US")}
          </span>
        </div>
      </header>

      <div
        role="progressbar"
        aria-valuenow={state.processed}
        aria-valuemin={0}
        aria-valuemax={state.total}
        aria-label={`${operationLabel}: ${state.processed} of ${state.total} processed`}
        className={styles.barWrap}
      >
        <span
          className={styles.bar}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.meta}>
          <span>
            <strong>{pct.toFixed(1)}%</strong> complete
          </span>
          {typeof state.etaSeconds === "number" ? (
            <span>
              ETA <strong>{formatEta(state.etaSeconds)}</strong>
            </span>
          ) : null}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrlBtn}
            onClick={onTogglePause}
          >
            {isPaused ? (
              <>
                <Play size={11} strokeWidth={2.4} aria-hidden="true" />
                Resume
              </>
            ) : (
              <>
                <Pause size={11} strokeWidth={2.4} aria-hidden="true" />
                Pause
              </>
            )}
          </button>
          <button
            type="button"
            className={`${styles.ctrlBtn} ${styles.cancelBtn}`}
            onClick={onCancel}
          >
            <X size={11} strokeWidth={2.4} aria-hidden="true" />
            Cancel
          </button>
        </div>
      </footer>
    </section>
  )
}

export default BulkOperationProgress
