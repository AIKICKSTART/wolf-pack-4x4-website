"use client"

import { Pencil, RefreshCw, SkipForward } from "lucide-react"

import styles from "./skip-retry-row-actions.module.css"

interface SkipRetryRowActionsProps {
  /** Optional label for the failed row, surfaced in aria-labels. */
  rowLabel?: string
  onSkip?: () => void
  onRetry?: () => void
  onEditAndRetry?: () => void
  className?: string
}

export function SkipRetryRowActions({
  rowLabel,
  onSkip,
  onRetry,
  onEditAndRetry,
  className,
}: SkipRetryRowActionsProps) {
  const classes = [styles.cluster, className].filter(Boolean).join(" ")
  const labelSuffix = rowLabel ? ` for ${rowLabel}` : ""
  return (
    <span
      className={classes}
      role="group"
      aria-label={`Failed row actions${labelSuffix}`}
    >
      <button
        type="button"
        className={`${styles.chip} ${styles.chipSkip}`}
        onClick={onSkip}
      >
        <span className={styles.glyph} aria-hidden="true">
          <SkipForward size={10} strokeWidth={2.4} />
        </span>
        Skip
      </button>
      <button
        type="button"
        className={`${styles.chip} ${styles.chipRetry}`}
        onClick={onRetry}
      >
        <span className={styles.glyph} aria-hidden="true">
          <RefreshCw size={10} strokeWidth={2.4} />
        </span>
        Retry
      </button>
      <button
        type="button"
        className={`${styles.chip} ${styles.chipEdit}`}
        onClick={onEditAndRetry}
      >
        <span className={styles.glyph} aria-hidden="true">
          <Pencil size={10} strokeWidth={2.4} />
        </span>
        Edit & retry
      </button>
    </span>
  )
}

export default SkipRetryRowActions
