"use client"

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { useEffect, useRef, type ReactNode } from "react"

import type { NotificationTone } from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface ToastCardProps {
  tone: NotificationTone
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  /** Duration in ms. 0 disables the countdown. */
  durationMs?: number
  /** Visible meta line (timestamp etc.). */
  metaLine?: string
  icon?: ReactNode
  className?: string
}

const TONE_CLASS: Record<NotificationTone, string> = {
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
}

const DEFAULT_ICONS: Record<NotificationTone, ReactNode> = {
  info: <Info size={16} strokeWidth={2.2} aria-hidden="true" />,
  success: <CheckCircle2 size={16} strokeWidth={2.2} aria-hidden="true" />,
  warning: <AlertTriangle size={16} strokeWidth={2.2} aria-hidden="true" />,
  danger: <XCircle size={16} strokeWidth={2.2} aria-hidden="true" />,
}

const TONE_LIVE: Record<NotificationTone, "polite" | "assertive"> = {
  info: "polite",
  success: "polite",
  warning: "assertive",
  danger: "assertive",
}

const TONE_ROLE: Record<NotificationTone, "status" | "alert"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
}

export function ToastCard({
  tone,
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  durationMs = 6000,
  metaLine,
  icon,
  className,
}: ToastCardProps) {
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const onDismissRef = useRef<typeof onDismiss>(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    if (durationMs <= 0) {
      return
    }
    startRef.current = performance.now()
    if (fillRef.current) {
      fillRef.current.style.width = "100%"
    }

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const ratio = Math.max(0, 1 - elapsed / durationMs)
      if (fillRef.current) {
        fillRef.current.style.width = `${ratio * 100}%`
      }
      if (elapsed >= durationMs) {
        onDismissRef.current?.()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [durationMs])

  const classes = [styles.toastCard, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role={TONE_ROLE[tone]}
      aria-live={TONE_LIVE[tone]}
      aria-atomic="true"
    >
      <span className={styles.toastIcon} aria-hidden="true">
        {icon ?? DEFAULT_ICONS[tone]}
      </span>
      <div className={styles.toastBody}>
        <strong className={styles.toastTitle}>{title}</strong>
        {description && <p className={styles.toastDescription}>{description}</p>}
        {metaLine && (
          <p className={styles.toastMeta} aria-hidden="true">
            {metaLine}
          </p>
        )}
      </div>
      <div className={styles.toastActions}>
        {actionLabel && onAction && (
          <button type="button" className={styles.toastActionBtn} onClick={onAction}>
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            className={styles.toastDismissBtn}
            onClick={onDismiss}
            aria-label={`Dismiss ${title}`}
          >
            <X size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}
      </div>
      {durationMs > 0 && (
        <span ref={fillRef} className={styles.toastCountdown} aria-hidden="true" />
      )}
    </div>
  )
}

export default ToastCard
