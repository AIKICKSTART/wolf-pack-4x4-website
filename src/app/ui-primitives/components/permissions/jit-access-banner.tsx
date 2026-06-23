"use client"

import { useEffect, useMemo, useState } from "react"

import type { RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./jit-access-banner.module.css"

interface JitAccessBannerProps {
  /** Role label currently elevated to. */
  role: string
  roleTone?: RoleTone
  /** ISO date when elevation expires. */
  expiresAt: string
  /** Description of the elevation scope. */
  scope: string
  onRevoke?: () => void
  className?: string
}

interface Remaining {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly expired: boolean
}

function computeRemaining(target: Date): Remaining {
  const diffMs = target.getTime() - Date.now()
  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { hours, minutes, seconds, expired: false }
}

function pad(value: number): string {
  return value.toString().padStart(2, "0")
}

export function JitAccessBanner({
  role,
  roleTone = "admin",
  expiresAt,
  scope,
  onRevoke,
  className,
}: JitAccessBannerProps) {
  const target = useMemo<Date>(() => new Date(expiresAt), [expiresAt])
  const [tick, setTick] = useState<number>(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1)
    }, 1000)
    return () => window.clearInterval(interval)
  }, [target])

  // Recompute on every render — cheap, and resets cleanly when `target` changes.
  // The `tick` state is what re-triggers the render each second.
  void tick
  const remaining = computeRemaining(target)

  const classes = [styles.banner, className].filter(Boolean).join(" ")
  const countdownText = remaining.expired
    ? "Expired"
    : `${pad(remaining.hours)}h ${pad(remaining.minutes)}m ${pad(remaining.seconds)}s`

  return (
    <aside className={classes} role="status" aria-live="polite">
      <span className={styles.glyph} aria-hidden="true">
        ⚡
      </span>
      <div className={styles.body}>
        <span className={styles.kicker}>Just-in-time access</span>
        <p className={styles.copy}>
          You are elevated to <RoleBadge label={role} tone={roleTone} size="sm" /> for {scope}.
        </p>
      </div>
      <div className={styles.timer} data-expired={remaining.expired ? "true" : "false"}>
        <span className={styles.timerLabel}>Expires in</span>
        <span className={styles.timerValue}>{countdownText}</span>
      </div>
      <button
        type="button"
        className={styles.revokeBtn}
        onClick={onRevoke}
        aria-label="Revoke just-in-time access now"
      >
        Revoke now
      </button>
    </aside>
  )
}

export default JitAccessBanner
