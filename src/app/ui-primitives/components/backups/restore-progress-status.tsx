"use client"

import type { RestoreProgressInfo } from "./backup-types"

import styles from "./restore-progress-status.module.css"

interface RestoreProgressStatusProps {
  progress: RestoreProgressInfo
  onPauseResume?: (snapshotId: string, nextPaused: boolean) => void
  className?: string
}

function formatRows(rows: number): string {
  if (rows < 1000) return rows.toString()
  if (rows < 1_000_000) return `${(rows / 1000).toFixed(rows < 10_000 ? 1 : 0)}k`
  return `${(rows / 1_000_000).toFixed(rows < 10_000_000 ? 1 : 0)}M`
}

function formatEta(sec: number): string {
  if (sec < 60) return `${sec}s`
  if (sec < 3600) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}m ${s}s`
  }
  const h = Math.floor(sec / 3600)
  const m = Math.round((sec % 3600) / 60)
  return `${h}h ${m}m`
}

export function RestoreProgressStatus({
  progress,
  onPauseResume,
  className,
}: RestoreProgressStatusProps) {
  const pct = progress.totalRows > 0 ? (progress.rowsRestored / progress.totalRows) * 100 : 0
  const pctRounded = Math.min(100, Math.max(0, Math.round(pct)))
  const classes = [
    styles.card,
    progress.paused ? styles.paused : styles.running,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`Restore progress for ${progress.resourceName}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Restore in progress</span>
        <span className={styles.resource}>{progress.resourceName}</span>
        <span className={styles.snapId}>{progress.snapshotId}</span>
      </header>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={`Restore progress for ${progress.resourceName}`}
        aria-valuenow={pctRounded}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${pctRounded} percent`}
      >
        <span
          className={[styles.progressFill, progress.paused ? styles.fillPaused : null]
            .filter(Boolean)
            .join(" ")}
          style={{ width: `${pctRounded}%` }}
        />
        <span className={styles.progressLabel}>{pctRounded}%</span>
      </div>

      <dl className={styles.stats}>
        <div>
          <dt>Rows</dt>
          <dd>
            {formatRows(progress.rowsRestored)} / {formatRows(progress.totalRows)}
          </dd>
        </div>
        <div>
          <dt>Throughput</dt>
          <dd>
            <span className={styles.throughputChip}>
              {formatRows(progress.throughputRps)} rps
            </span>
          </dd>
        </div>
        <div>
          <dt>ETA</dt>
          <dd>{formatEta(progress.etaSec)}</dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.pauseBtn}
          onClick={() => onPauseResume?.(progress.snapshotId, !progress.paused)}
        >
          {progress.paused ? "Resume" : "Pause"}
        </button>
      </footer>
    </article>
  )
}

export default RestoreProgressStatus
