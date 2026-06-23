"use client"

import type { ImportHistoryEntry, ImportStatus } from "./import-types"
import styles from "./import-history-row.module.css"

interface ImportHistoryRowProps {
  entry: ImportHistoryEntry
  onRollback?: (id: string) => void
  onInspect?: (id: string) => void
  className?: string
}

const STATUS_LABEL: Record<ImportStatus, string> = {
  queued: "Queued",
  running: "Running",
  paused: "Paused",
  success: "Success",
  warn: "Warnings",
  failed: "Failed",
  "rolled-back": "Rolled back",
}

const STATUS_CLASS: Record<ImportStatus, string> = {
  queued: styles.statusQueued,
  running: styles.statusRunning,
  paused: styles.statusPaused,
  success: styles.statusSuccess,
  warn: styles.statusWarn,
  failed: styles.statusFailed,
  "rolled-back": styles.statusRolledBack,
}

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  if (remainder === 0) {
    return `${minutes}m`
  }
  return `${minutes}m ${remainder}s`
}

export function ImportHistoryRow({
  entry,
  onRollback,
  onInspect,
  className,
}: ImportHistoryRowProps) {
  return (
    <article
      className={[styles.row, className].filter(Boolean).join(" ")}
      aria-label={`Import ${entry.filename}`}
    >
      <header className={styles.identity}>
        <span className={styles.glyph} aria-hidden="true">
          ⌗
        </span>
        <div className={styles.identityText}>
          <button
            type="button"
            className={styles.filenameButton}
            onClick={() => onInspect?.(entry.id)}
          >
            {entry.filename}
          </button>
          <span className={styles.timestamp}>{entry.startedAt}</span>
        </div>
      </header>
      <dl className={styles.metrics}>
        <div className={styles.metric}>
          <dt>Rows</dt>
          <dd>{entry.rows.toLocaleString()}</dd>
        </div>
        <div className={styles.metric}>
          <dt>Duration</dt>
          <dd>{formatDuration(entry.durationSeconds)}</dd>
        </div>
      </dl>
      <span className={[styles.statusChip, STATUS_CLASS[entry.status]].join(" ")}>
        {STATUS_LABEL[entry.status]}
      </span>
      {entry.rollbackAvailable ? (
        <button
          type="button"
          className={styles.rollbackChip}
          onClick={() => onRollback?.(entry.id)}
        >
          ↺ rollback
        </button>
      ) : (
        <span className={styles.rollbackChipMuted}>rollback expired</span>
      )}
    </article>
  )
}

export default ImportHistoryRow
