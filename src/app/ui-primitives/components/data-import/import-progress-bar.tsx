"use client"

import { useId } from "react"

import styles from "./import-progress-bar.module.css"

interface ImportProgressBarProps {
  label: string
  processedRows: number
  totalRows: number
  rowsPerSecond: number
  etaLabel: string
  isPaused?: boolean
  onTogglePause?: () => void
  className?: string
}

export function ImportProgressBar({
  label,
  processedRows,
  totalRows,
  rowsPerSecond,
  etaLabel,
  isPaused = false,
  onTogglePause,
  className,
}: ImportProgressBarProps) {
  const headingId = useId()
  const pct =
    totalRows > 0 ? Math.min(100, Math.round((processedRows / totalRows) * 100)) : 0

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-labelledby={headingId}
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Import</span>
          <h3 id={headingId} className={styles.heading}>
            {label}
          </h3>
        </div>
        <div className={styles.chipRow}>
          <span className={styles.chip}>
            <span className={styles.chipKey}>Rate</span>
            <span className={styles.chipValue}>
              {rowsPerSecond.toLocaleString()} rows/s
            </span>
          </span>
          <span className={styles.chip}>
            <span className={styles.chipKey}>ETA</span>
            <span className={styles.chipValue}>{etaLabel}</span>
          </span>
        </div>
      </header>

      <div className={styles.barWrap}>
        <div
          className={styles.bar}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalRows}
          aria-valuenow={processedRows}
          aria-valuetext={`${pct}% — ${processedRows.toLocaleString()} of ${totalRows.toLocaleString()} rows`}
        >
          <div
            className={[styles.fill, isPaused ? styles.fillPaused : ""]
              .filter(Boolean)
              .join(" ")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className={styles.barFoot}>
          <span className={styles.progressText}>
            {processedRows.toLocaleString()} / {totalRows.toLocaleString()} rows ·{" "}
            {pct}%
          </span>
          <button
            type="button"
            className={styles.pauseButton}
            onClick={onTogglePause}
            aria-pressed={isPaused}
          >
            <span aria-hidden="true">{isPaused ? "▶" : "II"}</span>
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ImportProgressBar
