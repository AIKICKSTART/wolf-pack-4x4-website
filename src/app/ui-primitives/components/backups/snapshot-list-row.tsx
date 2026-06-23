"use client"

import type { BackupStatus, SnapshotRecord } from "./backup-types"

import styles from "./snapshot-list-row.module.css"

const STATUS_LABEL: Record<BackupStatus, string> = {
  successful: "Successful",
  in_progress: "In progress",
  failed: "Failed",
  expired: "Expired",
  verifying: "Verifying",
}

const STATUS_TONE: Record<BackupStatus, string> = {
  successful: styles.toneGreen,
  in_progress: styles.toneTeal,
  failed: styles.toneRed,
  expired: styles.toneMuted,
  verifying: styles.toneAmber,
}

interface SnapshotListRowProps {
  snapshot: SnapshotRecord
  onRestore?: (snapshotId: string) => void
  onDelete?: (snapshotId: string) => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  const units = ["KB", "MB", "GB", "TB"]
  let value = bytes / 1024
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`
}

function formatDuration(durationSec: number): string {
  if (durationSec < 60) {
    return `${durationSec}s`
  }
  if (durationSec < 3600) {
    const m = Math.floor(durationSec / 60)
    const s = durationSec % 60
    return `${m}m ${s}s`
  }
  const h = Math.floor(durationSec / 3600)
  const m = Math.round((durationSec % 3600) / 60)
  return `${h}h ${m}m`
}

export function SnapshotListRow({
  snapshot,
  onRestore,
  onDelete,
  className,
}: SnapshotListRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <tr className={classes} aria-label={`Snapshot ${snapshot.id}`}>
      <td className={styles.idCell}>
        <span className={styles.id}>{snapshot.id}</span>
        <span className={styles.resource}>{snapshot.resourceName}</span>
      </td>
      <td className={styles.timeCell}>
        <time dateTime={snapshot.createdAt}>{snapshot.createdAt}</time>
      </td>
      <td className={styles.sizeCell}>{formatBytes(snapshot.sizeBytes)}</td>
      <td className={styles.durationCell}>{formatDuration(snapshot.durationSec)}</td>
      <td className={styles.statusCell}>
        <span
          className={[styles.statusChip, STATUS_TONE[snapshot.status]].join(" ")}
          role="status"
        >
          {STATUS_LABEL[snapshot.status]}
        </span>
      </td>
      <td className={styles.actionsCell}>
        <button
          type="button"
          className={styles.restoreBtn}
          onClick={() => onRestore?.(snapshot.id)}
          disabled={snapshot.status !== "successful"}
          aria-label={`Restore from ${snapshot.id}`}
        >
          Restore
        </button>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => onDelete?.(snapshot.id)}
          aria-label={`Delete ${snapshot.id}`}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default SnapshotListRow
