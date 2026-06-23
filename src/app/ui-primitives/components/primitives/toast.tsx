"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { useEffect, useRef, type ReactNode } from "react"

import styles from "./toast.module.css"

export type ToastTone = "info" | "success" | "warning" | "danger"

interface ToastProps {
  open: boolean
  tone?: ToastTone
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  duration?: number
  className?: string
  icon?: ReactNode
}

const TONE_CLASS: Record<ToastTone, string> = {
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
}

const DEFAULT_ICONS: Record<ToastTone, ReactNode> = {
  info: <Info size={16} strokeWidth={2.2} aria-hidden="true" />,
  success: <CheckCircle2 size={16} strokeWidth={2.2} aria-hidden="true" />,
  warning: <AlertTriangle size={16} strokeWidth={2.2} aria-hidden="true" />,
  danger: <XCircle size={16} strokeWidth={2.2} aria-hidden="true" />,
}

const TONE_LIVE: Record<ToastTone, "polite" | "assertive"> = {
  info: "polite",
  success: "polite",
  warning: "assertive",
  danger: "assertive",
}

export function Toast({
  open,
  tone = "info",
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  duration = 5000,
  className,
  icon,
}: ToastProps) {
  const timerRef = useRef<HTMLSpanElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const onDismissRef = useRef<typeof onDismiss>(onDismiss)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    if (!open || duration <= 0) {
      return
    }
    startRef.current = performance.now()
    if (timerRef.current) {
      timerRef.current.style.width = "100%"
    }

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const ratio = Math.max(0, 1 - elapsed / duration)
      if (timerRef.current) {
        timerRef.current.style.width = `${ratio * 100}%`
      }
      if (elapsed >= duration) {
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
  }, [open, duration])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={
            reduceMotion
              ? { duration: 0.12 }
              : { type: "spring", stiffness: 320, damping: 28 }
          }
          className={[styles.toast, TONE_CLASS[tone], className].filter(Boolean).join(" ")}
          role="status"
          aria-live={TONE_LIVE[tone]}
        >
          <span className={styles.icon} aria-hidden="true">
            {icon ?? DEFAULT_ICONS[tone]}
          </span>
          <div className={styles.body}>
            <strong className={styles.title}>{title}</strong>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <div className={styles.actions}>
            {actionLabel && onAction && (
              <button type="button" className={styles.actionBtn} onClick={onAction}>
                {actionLabel}
              </button>
            )}
            {onDismiss && (
              <button
                type="button"
                className={styles.dismissBtn}
                onClick={onDismiss}
                aria-label="Dismiss notification"
              >
                <X size={14} strokeWidth={2.2} aria-hidden="true" />
              </button>
            )}
          </div>
          {duration > 0 && (
            <span ref={timerRef} className={styles.timer} aria-hidden="true" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
