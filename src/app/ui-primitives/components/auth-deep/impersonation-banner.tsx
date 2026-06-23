"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"

import styles from "./impersonation-banner.module.css"

export interface ImpersonationBannerProps {
  /** Real admin label. */
  adminLabel: string
  /** Subject the admin is impersonating. */
  subjectLabel: string
  /** Reason ticket / case reference, e.g. "SUPPORT-2026-0184". */
  reasonRef: string
  /** Free-text reason. */
  reasonText: string
  /** When the impersonation session started (ISO). */
  startedAtIso: string
  /** Seconds until automatic exit. */
  autoExitInSeconds: number
  /** Tenant context. */
  tenantLabel: string
  /** Fires when admin clicks the explicit exit button. */
  onExit?: () => void
  /** Fires when admin extends the session. */
  onExtend?: () => void
}

function formatElapsed(iso: string): string {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime())
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "<1m"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ${mins % 60}m`
}

function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function ImpersonationBanner({
  adminLabel,
  subjectLabel,
  reasonRef,
  reasonText,
  startedAtIso,
  autoExitInSeconds,
  tenantLabel,
  onExit,
  onExtend,
}: ImpersonationBannerProps) {
  const liveId = useId()
  const urgent = autoExitInSeconds <= 60

  return (
    <aside
      className={styles.wrap}
      role="region"
      aria-label={`Impersonation session — ${adminLabel} acting as ${subjectLabel}`}
      data-urgent={urgent}
    >
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.iconCol} aria-hidden="true">
        <span className={styles.mask}>
          <span className={styles.maskEye} />
          <span className={styles.maskEye} />
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <span className={styles.kicker}>{tenantLabel} · Impersonation</span>
          <h2 className={styles.title}>
            You are {adminLabel} acting as{" "}
            <strong className={styles.subject}>{subjectLabel}</strong>
          </h2>
        </div>
        <p className={styles.reason}>
          <span className={styles.reasonRef}>{reasonRef}</span>
          <span aria-hidden="true">·</span>
          <span>{reasonText}</span>
        </p>
        <div className={styles.chipRow}>
          <Chip label={`Elapsed ${formatElapsed(startedAtIso)}`} tone="amber" />
          <Chip
            label={`Auto-exit ${formatCountdown(autoExitInSeconds)}`}
            tone={urgent ? "red" : "neutral"}
          />
        </div>
      </div>

      <div className={styles.actions} role="group" aria-label="Impersonation actions">
        <button
          type="button"
          className={styles.extendBtn}
          onClick={onExtend}
          aria-label="Extend impersonation session"
        >
          Extend 10m
        </button>
        <button
          type="button"
          className={styles.exitBtn}
          onClick={onExit}
          aria-label={`Exit impersonation and return to ${adminLabel}`}
        >
          Exit impersonation
        </button>
      </div>

      <span id={liveId} role="status" aria-live="polite" className={styles.srOnly}>
        Impersonation session by {adminLabel} as {subjectLabel}. Auto-exit in{" "}
        {formatCountdown(autoExitInSeconds)}.
      </span>
    </aside>
  )
}

export default ImpersonationBanner
