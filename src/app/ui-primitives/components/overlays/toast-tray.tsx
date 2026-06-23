"use client"

import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react"

import styles from "./toast-tray.module.css"

export type ToastTrayTone = "info" | "success" | "warning" | "danger"
export type ToastTrayPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center"

export interface ToastTrayItem {
  id: string
  tone?: ToastTrayTone
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  dismissible?: boolean
  duration?: number
}

interface ToastTrayProps {
  toasts: ReadonlyArray<ToastTrayItem>
  onDismiss: (id: string) => void
  placement?: ToastTrayPlacement
  ariaLabel?: string
}

const TONE_CLASS: Record<ToastTrayTone, string> = {
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
}

const TONE_ICON: Record<ToastTrayTone, ReactNode> = {
  info: <Info size={16} strokeWidth={2.2} aria-hidden="true" />,
  success: <CheckCircle2 size={16} strokeWidth={2.2} aria-hidden="true" />,
  warning: <AlertTriangle size={16} strokeWidth={2.2} aria-hidden="true" />,
  danger: <XCircle size={16} strokeWidth={2.2} aria-hidden="true" />,
}

const TONE_LIVE: Record<ToastTrayTone, "polite" | "assertive"> = {
  info: "polite",
  success: "polite",
  warning: "assertive",
  danger: "assertive",
}

const PLACEMENT_CLASS: Record<ToastTrayPlacement, string> = {
  "top-right": styles.placementTopRight,
  "top-left": styles.placementTopLeft,
  "bottom-right": styles.placementBottomRight,
  "bottom-left": styles.placementBottomLeft,
  "top-center": styles.placementTopCenter,
  "bottom-center": styles.placementBottomCenter,
}

function ToastTrayItemComponent({
  item,
  onDismiss,
}: {
  item: ToastTrayItem
  onDismiss: (id: string) => void
}) {
  const tone = item.tone ?? "info"
  const dismissible = item.dismissible ?? true
  const duration = item.duration ?? 5000
  const timerRef = useRef<number | null>(null)

  const dismiss = useCallback(() => {
    onDismiss(item.id)
  }, [item.id, onDismiss])

  useEffect(() => {
    if (duration <= 0) {
      return
    }
    timerRef.current = window.setTimeout(() => {
      dismiss()
    }, duration)
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [dismiss, duration])

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className={[styles.toast, TONE_CLASS[tone]].join(" ")}
      role="status"
      aria-live={TONE_LIVE[tone]}
    >
      <span className={styles.icon} aria-hidden="true">
        {TONE_ICON[tone]}
      </span>
      <div className={styles.body}>
        <strong className={styles.title}>{item.title}</strong>
        {item.description && <p className={styles.description}>{item.description}</p>}
      </div>
      <div className={styles.actions}>
        {item.actionLabel && item.onAction && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => {
              item.onAction?.()
              dismiss()
            }}
          >
            {item.actionLabel}
          </button>
        )}
        {dismissible && (
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={dismiss}
            aria-label="Dismiss notification"
          >
            <X size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        )}
      </div>
      {duration > 0 && (
        <span
          className={styles.progress}
          style={{ "--toast-duration": `${duration}ms` } as CSSProperties}
          aria-hidden="true"
        />
      )}
    </motion.li>
  )
}

export function ToastTray({
  toasts,
  onDismiss,
  placement = "top-right",
  ariaLabel = "Notifications",
}: ToastTrayProps) {
  return (
    <ol
      className={[styles.tray, PLACEMENT_CLASS[placement]].join(" ")}
      aria-label={ariaLabel}
      role="region"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastTrayItemComponent key={toast.id} item={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </ol>
  )
}

export default ToastTray
