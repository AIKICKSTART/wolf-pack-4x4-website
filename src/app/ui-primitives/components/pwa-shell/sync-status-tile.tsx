"use client"

import { Cloud, CloudOff, RefreshCw, RotateCw } from "lucide-react"

import type { PwaSyncEntity } from "./pwa-shell-types"
import styles from "./sync-status-tile.module.css"

type SyncState = "idle" | "syncing" | "error" | "offline"

interface SyncStatusTileProps {
  state: SyncState
  entities: ReadonlyArray<PwaSyncEntity>
  lastSyncedAt?: string
  nextSyncAt?: string
  onRetry?: () => void
  className?: string
}

const STATE_LABEL: Record<SyncState, string> = {
  idle: "All synced",
  syncing: "Syncing",
  error: "Sync failed",
  offline: "Offline queue",
}

const STATE_ICON: Record<SyncState, typeof Cloud> = {
  idle: Cloud,
  syncing: RefreshCw,
  error: CloudOff,
  offline: CloudOff,
}

const STATE_PILL: Record<SyncState, string> = {
  idle: styles.statePillIdle,
  syncing: styles.statePillSyncing,
  error: styles.statePillError,
  offline: styles.statePillError,
}

export function SyncStatusTile({
  state,
  entities,
  lastSyncedAt = "4m ago",
  nextSyncAt,
  onRetry,
  className,
}: SyncStatusTileProps) {
  const Icon = STATE_ICON[state]
  const totalPending = entities.reduce((sum, entity) => sum + entity.pending, 0)
  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Sync status: ${STATE_LABEL[state]}`}
      aria-live="polite"
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Icon
            size={18}
            strokeWidth={2.2}
            style={state === "syncing" ? { animation: "ptrSpin 1s linear infinite" } : undefined}
          />
        </span>
        <div className={styles.titles}>
          <h2 className={styles.title}>Crew sync</h2>
          <span className={styles.subtitle}>
            {totalPending > 0 ? `${totalPending} change${totalPending === 1 ? "" : "s"} queued` : "Nothing pending"}
          </span>
        </div>
        <span className={[styles.statePill, STATE_PILL[state]].join(" ")}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} aria-hidden="true" />
          {STATE_LABEL[state]}
        </span>
      </header>
      <ul className={styles.entities}>
        {entities.map((entity) => {
          const pendingClass = entity.pending === 0 ? styles.pendingZero : ""
          return (
            <li key={entity.id} className={styles.entity}>
              <div className={styles.entityLabel}>
                <span className={styles.entityName}>{entity.label}</span>
                <span className={styles.entityMeta}>Synced {entity.lastSyncedAt}</span>
              </div>
              <span className={[styles.pending, pendingClass].join(" ")}>
                {entity.pending} pending
              </span>
              <span className={styles.entityDot} aria-hidden="true" />
            </li>
          )
        })}
      </ul>
      <footer className={styles.footer}>
        <div className={styles.footerMeta}>
          <span className={styles.footerLabel}>Last sync</span>
          <span className={styles.footerValue}>{lastSyncedAt}</span>
        </div>
        {nextSyncAt && (
          <div className={styles.footerMeta}>
            <span className={styles.footerLabel}>Next try</span>
            <span className={styles.footerValue}>{nextSyncAt}</span>
          </div>
        )}
        <button
          type="button"
          className={styles.retryBtn}
          onClick={onRetry}
          disabled={state === "syncing"}
          aria-label="Retry sync now"
        >
          <RotateCw size={12} strokeWidth={2.4} aria-hidden="true" />
          {state === "syncing" ? "Working" : "Retry now"}
        </button>
      </footer>
    </section>
  )
}

export default SyncStatusTile
