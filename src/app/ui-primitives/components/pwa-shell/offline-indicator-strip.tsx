"use client"

import { CloudOff, RefreshCw, SignalLow, Wifi } from "lucide-react"

import type { PwaConnectivityState } from "./pwa-shell-types"
import styles from "./offline-indicator-strip.module.css"

interface OfflineIndicatorStripProps {
  state: PwaConnectivityState
  pendingChanges?: number
  lastSyncedAt?: string
  onRetry?: () => void
  className?: string
}

const STATE_CLASS: Record<PwaConnectivityState, string> = {
  online: styles.online,
  offline: styles.offline,
  syncing: styles.syncing,
  degraded: styles.degraded,
}

const STATE_ICON: Record<PwaConnectivityState, typeof Wifi> = {
  online: Wifi,
  offline: CloudOff,
  syncing: RefreshCw,
  degraded: SignalLow,
}

const STATE_LABEL: Record<PwaConnectivityState, string> = {
  online: "All good",
  offline: "Offline mode",
  syncing: "Syncing changes",
  degraded: "Patchy signal",
}

const ARIA_LIVE: Record<PwaConnectivityState, "polite" | "assertive"> = {
  online: "polite",
  offline: "assertive",
  syncing: "polite",
  degraded: "polite",
}

export function OfflineIndicatorStrip({
  state,
  pendingChanges,
  lastSyncedAt,
  onRetry,
  className,
}: OfflineIndicatorStripProps) {
  const classes = [styles.strip, STATE_CLASS[state], className].filter(Boolean).join(" ")
  const Icon = STATE_ICON[state]
  const label = STATE_LABEL[state]

  const meta = (() => {
    if (state === "offline") {
      return pendingChanges && pendingChanges > 0
        ? `${pendingChanges} pending`
        : "Will sync when back"
    }
    if (state === "syncing") {
      return pendingChanges && pendingChanges > 0
        ? `${pendingChanges} pending`
        : "Catching up"
    }
    if (state === "degraded") {
      return "Trying again..."
    }
    return lastSyncedAt ? `Synced ${lastSyncedAt}` : "Live"
  })()

  const showRetry = onRetry && (state === "offline" || state === "degraded")

  return (
    <div
      className={classes}
      role="status"
      aria-live={ARIA_LIVE[state]}
      aria-label={`Connectivity: ${label}`}
    >
      {state === "syncing" && <span className={styles.shimmer} aria-hidden="true" />}
      <span className={styles.dot} aria-hidden="true" />
      <Icon
        size={12}
        strokeWidth={2.4}
        aria-hidden="true"
        style={state === "syncing" ? { animation: "ptrSpin 1s linear infinite" } : undefined}
      />
      <span>{label}</span>
      <span className={styles.meta}>{meta}</span>
      {showRetry && (
        <button
          type="button"
          className={styles.action}
          onClick={onRetry}
          aria-label="Retry connection"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default OfflineIndicatorStrip
