"use client"

import { useCallback, useState } from "react"

import type { DataSourceConnection, SourceState } from "./reports-deep-types"
import styles from "./data-source-row.module.css"

interface DataSourceRowProps {
  readonly connection: DataSourceConnection
  readonly className?: string
  readonly onRefresh?: (id: string) => void
}

const STATE_LABEL: Record<SourceState, string> = {
  ok: "Healthy",
  syncing: "Syncing",
  stale: "Stale",
  failed: "Failed",
  "auth-needed": "Auth required",
}

const STATE_CLASS: Record<SourceState, string> = {
  ok: styles.stateOk,
  syncing: styles.stateSyncing,
  stale: styles.stateStale,
  failed: styles.stateFailed,
  "auth-needed": styles.stateAuth,
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value)
}

export function DataSourceRow({ connection, className, onRefresh }: DataSourceRowProps) {
  const [busy, setBusy] = useState<boolean>(false)

  const handleRefresh = useCallback(() => {
    setBusy(true)
    onRefresh?.(connection.id)
    // Simulated refresh window — visually-driven only.
    window.setTimeout(() => setBusy(false), 800)
  }, [connection.id, onRefresh])

  const effectiveState: SourceState = busy ? "syncing" : connection.state
  const classes = [styles.row, STATE_CLASS[effectiveState], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Data source: ${connection.name}`}
      data-state={effectiveState}
    >
      <div className={styles.identity}>
        <span className={styles.kindBadge}>{connection.kind}</span>
        <h3 className={styles.name}>{connection.name}</h3>
        <div className={styles.stateRow}>
          <span className={styles.stateDot} aria-hidden="true" />
          <span className={styles.stateLabel}>{STATE_LABEL[effectiveState]}</span>
        </div>
      </div>

      <div className={styles.metric}>
        <span className={styles.metricLabel}>Records</span>
        <span className={styles.metricValue}>{formatCount(connection.recordCount)}</span>
      </div>

      <div className={styles.metric}>
        <span className={styles.metricLabel}>Last sync</span>
        <span className={styles.metricValue}>{connection.lastSyncedLabel}</span>
      </div>

      <div className={styles.metric}>
        <span className={styles.metricLabel}>Next sync</span>
        <span className={styles.metricValue}>{connection.nextSyncLabel}</span>
        <span className={styles.cadence}>{connection.cadenceLabel}</span>
      </div>

      <button
        type="button"
        className={styles.refreshBtn}
        onClick={handleRefresh}
        disabled={busy}
        aria-label={`Refresh ${connection.name}`}
      >
        <span className={busy ? styles.refreshGlyphBusy : styles.refreshGlyph} aria-hidden="true">
          ↻
        </span>
        {busy ? "Syncing" : "Refresh"}
      </button>
    </article>
  )
}

export default DataSourceRow
