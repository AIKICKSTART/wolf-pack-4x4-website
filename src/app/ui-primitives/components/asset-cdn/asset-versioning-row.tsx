"use client"

import { formatBytes, type AssetVersionRow as AssetVersionRowData } from "./asset-cdn-types"

import styles from "./asset-versioning-row.module.css"

interface AssetVersioningRowProps {
  version: AssetVersionRowData
  onRevert?: (version: AssetVersionRowData) => void
  className?: string
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso)
  if (!Number.isFinite(date.getTime())) return iso
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function AssetVersioningRow({
  version,
  onRevert,
  className,
}: AssetVersioningRowProps) {
  const classes = [
    styles.row,
    version.current ? styles.rowCurrent : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Asset version ${version.label}${version.current ? ", current" : ""}`}
    >
      <span className={styles.versionTag}>
        <span className={styles.versionLabel}>{version.label}</span>
        {version.current ? (
          <span className={styles.liveBadge} aria-label="Live version">
            Live
          </span>
        ) : null}
      </span>

      <div className={styles.meta}>
        <span className={styles.note}>{version.note}</span>
        <span className={styles.byline}>
          <span className={styles.author}>{version.author}</span>
          <span className={styles.divider} aria-hidden="true">·</span>
          <time className={styles.timestamp} dateTime={version.publishedAt}>
            {formatTimestamp(version.publishedAt)}
          </time>
          <span className={styles.divider} aria-hidden="true">·</span>
          <span className={styles.size}>{formatBytes(version.size)}</span>
        </span>
      </div>

      <button
        type="button"
        className={styles.revert}
        disabled={version.current}
        aria-disabled={version.current}
        onClick={() => onRevert?.(version)}
        aria-label={version.current ? "Already live" : `Revert to ${version.label}`}
      >
        {version.current ? "Current" : "Revert"}
      </button>
    </article>
  )
}

export default AssetVersioningRow
