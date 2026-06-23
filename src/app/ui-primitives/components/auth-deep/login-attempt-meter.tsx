"use client"

import { useId } from "react"

import { Chip } from "../primitives/chip"

import {
  LOCKOUT_TONE,
  type LockoutState,
} from "./auth-deep-types"
import styles from "./login-attempt-meter.module.css"

export interface LoginAttemptMeterProps {
  /** Principal under tracking. */
  principalLabel: string
  /** Tenant slug for context. */
  tenantLabel: string
  /** Failed attempts in the current window. */
  failedAttempts: number
  /** Threshold at which lockout is triggered. */
  lockoutThreshold: number
  /** Lockout lifecycle. */
  state: LockoutState
  /** Seconds remaining on the lockout — only relevant when state="locked" or "throttled". */
  lockoutRemainingSeconds?: number
  /** Most recent failure (ISO). */
  lastFailureIso?: string
  /** Most recent failure location, e.g. "Brisbane QLD". */
  lastFailureLocation?: string
  /** Fires when admin manually clears the lockout. */
  onClearLockout?: () => void
  /** Fires when admin force-resets the attempt counter. */
  onResetAttempts?: () => void
}

const STATE_LABEL: Record<LockoutState, string> = {
  open: "Account open",
  warning: "Approaching lockout",
  locked: "Locked out",
  throttled: "Rate limited",
}

function formatCountdown(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function formatRelative(iso?: string): string {
  if (!iso) return "—"
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export function LoginAttemptMeter({
  principalLabel,
  tenantLabel,
  failedAttempts,
  lockoutThreshold,
  state,
  lockoutRemainingSeconds,
  lastFailureIso,
  lastFailureLocation,
  onClearLockout,
  onResetAttempts,
}: LoginAttemptMeterProps) {
  const liveId = useId()
  const ratio = Math.min(1, failedAttempts / Math.max(1, lockoutThreshold))
  const ticks = Array.from({ length: lockoutThreshold })

  return (
    <article
      className={styles.wrap}
      aria-label={`Login attempt meter for ${principalLabel}`}
      data-state={state}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{tenantLabel} · Brute-force guard</span>
          <h3 className={styles.title}>{principalLabel}</h3>
        </div>
        <Chip label={STATE_LABEL[state]} tone={LOCKOUT_TONE[state]} />
      </header>

      <div className={styles.meterBlock}>
        <div className={styles.meterTop}>
          <span className={styles.meterLabel}>Failed attempts</span>
          <span className={styles.meterValue}>
            <strong className={styles.numeric}>{failedAttempts}</strong>
            <span className={styles.meterDivider}>/</span>
            <span className={styles.numeric}>{lockoutThreshold}</span>
          </span>
        </div>
        <div
          className={styles.ticks}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={lockoutThreshold}
          aria-valuenow={Math.min(failedAttempts, lockoutThreshold)}
          aria-valuetext={`${failedAttempts} of ${lockoutThreshold} attempts used`}
          style={{
            ["--ratio" as string]: ratio.toString(),
          }}
        >
          {ticks.map((_, index) => (
            <span
              key={index}
              className={styles.tick}
              data-on={index < failedAttempts}
              data-final={index === lockoutThreshold - 1}
            />
          ))}
        </div>
      </div>

      {(state === "locked" || state === "throttled") &&
      typeof lockoutRemainingSeconds === "number" ? (
        <div className={styles.countdownBlock} aria-live="polite">
          <span className={styles.countdownKicker}>
            {state === "locked" ? "Unlocks in" : "Slow-mode for"}
          </span>
          <strong className={styles.countdown}>
            {formatCountdown(lockoutRemainingSeconds)}
          </strong>
        </div>
      ) : null}

      <dl className={styles.facts}>
        <div>
          <dt>Last failure</dt>
          <dd>{formatRelative(lastFailureIso)}</dd>
        </div>
        {lastFailureLocation ? (
          <div>
            <dt>From</dt>
            <dd>{lastFailureLocation}</dd>
          </div>
        ) : null}
      </dl>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onResetAttempts}
          disabled={failedAttempts === 0}
          aria-label={`Reset failed-attempt counter for ${principalLabel}`}
        >
          Reset counter
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={onClearLockout}
          disabled={state !== "locked" && state !== "throttled"}
          aria-label={`Clear lockout for ${principalLabel}`}
        >
          Clear lockout
        </button>
      </footer>

      <span id={liveId} role="status" aria-live="polite" className={styles.srOnly}>
        {STATE_LABEL[state]} — {failedAttempts} of {lockoutThreshold} attempts.
      </span>
    </article>
  )
}

export default LoginAttemptMeter
