"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, X } from "lucide-react"
import type { CSSProperties } from "react"

import styles from "./undo-bulk-banner.module.css"

interface UndoBulkBannerProps {
  /** Resource label affected by the action, e.g. "quotes", "parts". */
  resourceLabel: string
  /** Count of affected rows. */
  affectedCount: number
  /** What just happened, present-perfect tense — e.g. "archived". */
  pastTenseAction: string
  /** Countdown duration in seconds. */
  countdownSeconds?: number
  /** Render the banner with a fixed countdown — useful in showcase pages. */
  staticCountdown?: number
  onUndo?: () => void
  onDismiss?: () => void
  /** Triggered when the timer hits zero. */
  onExpire?: () => void
  className?: string
}

export function UndoBulkBanner({
  resourceLabel,
  affectedCount,
  pastTenseAction,
  countdownSeconds = 10,
  staticCountdown,
  onUndo,
  onDismiss,
  onExpire,
  className,
}: UndoBulkBannerProps) {
  const isStatic = typeof staticCountdown === "number"
  const initial = isStatic ? staticCountdown : countdownSeconds
  const [remaining, setRemaining] = useState<number>(initial)

  useEffect(() => {
    if (isStatic) {
      return
    }
    if (remaining <= 0) {
      onExpire?.()
      return
    }
    const id = window.setTimeout(() => {
      setRemaining((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearTimeout(id)
  }, [remaining, isStatic, onExpire])

  const classes = [styles.banner, className].filter(Boolean).join(" ")
  const ringProgress = countdownSeconds === 0
    ? 0
    : Math.round((remaining / countdownSeconds) * 100)
  const ringStyle = { "--ring-progress": String(ringProgress) } as CSSProperties

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className={styles.glyph} aria-hidden="true">
        <CheckCircle2 size={16} strokeWidth={2.2} />
      </span>
      <div className={styles.message}>
        <span className={styles.label}>
          <strong>{affectedCount.toLocaleString("en-US")}</strong>{" "}
          {resourceLabel} {pastTenseAction}
        </span>
        <span className={styles.subLabel}>
          Will commit in {remaining}s · undo to revert
        </span>
      </div>
      <span className={styles.countdown} aria-hidden="true">
        <span className={styles.ring} style={ringStyle} />
        {remaining}s
      </span>
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <button type="button" className={styles.undoBtn} onClick={onUndo}>
          Undo
        </button>
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <X size={12} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </span>
    </div>
  )
}

export default UndoBulkBanner
