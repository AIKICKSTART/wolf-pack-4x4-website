import type { CompressedSizeInfo } from "./backup-types"

import styles from "./compressed-size-badge.module.css"

interface CompressedSizeBadgeProps {
  info: CompressedSizeInfo
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let v = bytes / 1024
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i += 1
  }
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${units[i]}`
}

export function CompressedSizeBadge({ info, className }: CompressedSizeBadgeProps) {
  const ratio = info.rawBytes > 0 ? info.compressedBytes / info.rawBytes : 1
  const ratioPct = Math.round((1 - ratio) * 100)
  const classes = [styles.badge, className].filter(Boolean).join(" ")
  return (
    <span
      className={classes}
      aria-label={`Compressed from ${formatBytes(info.rawBytes)} to ${formatBytes(info.compressedBytes)} — ${ratioPct} percent savings`}
    >
      <span className={styles.raw}>{formatBytes(info.rawBytes)}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
      <span className={styles.compressed}>{formatBytes(info.compressedBytes)}</span>
      <span className={styles.ratio}>−{ratioPct}%</span>
    </span>
  )
}

export default CompressedSizeBadge
