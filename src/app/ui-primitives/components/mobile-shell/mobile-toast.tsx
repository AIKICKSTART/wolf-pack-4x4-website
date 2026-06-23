"use client"

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./mobile-toast.module.css"

export type MobileToastTone = "info" | "success" | "warning" | "error"

interface MobileToastProps {
  open: boolean
  tone?: MobileToastTone
  title: string
  description?: string
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}

const TONE_CLASS: Record<MobileToastTone, string> = {
  info: styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  error: styles.toneError,
}

function ToneIcon({ tone }: { tone: MobileToastTone }) {
  switch (tone) {
    case "success":
      return <CheckCircle2 size={18} strokeWidth={2.2} aria-hidden="true" />
    case "warning":
      return <AlertTriangle size={18} strokeWidth={2.2} aria-hidden="true" />
    case "error":
      return <XCircle size={18} strokeWidth={2.2} aria-hidden="true" />
    case "info":
    default:
      return <Info size={18} strokeWidth={2.2} aria-hidden="true" />
  }
}

export function MobileToast({
  open,
  tone = "info",
  title,
  description,
  action,
  onDismiss,
  className,
}: MobileToastProps) {
  const classes = [
    styles.toast,
    TONE_CLASS[tone],
    open ? styles.toastOpen : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={styles.host} aria-hidden={!open}>
      <div className={classes} role="status" aria-live="polite">
        <span className={styles.icon}>
          <ToneIcon tone={tone} />
        </span>
        <div className={styles.body}>
          <strong className={styles.title}>{title}</strong>
          {description ? <span className={styles.description}>{description}</span> : null}
        </div>
        {action ? <div className={styles.action}>{action}</div> : null}
        {onDismiss ? (
          <button
            type="button"
            className={styles.close}
            onClick={onDismiss}
            aria-label="Dismiss toast"
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default MobileToast
