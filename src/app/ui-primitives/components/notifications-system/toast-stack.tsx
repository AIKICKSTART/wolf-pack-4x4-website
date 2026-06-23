"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useMemo, useState } from "react"

import type { ToastDescriptor, ToastPlacement } from "./notifications-system-types"
import { ToastCard } from "./toast-card"
import styles from "./notifications-system.module.css"

interface ToastStackProps {
  toasts: ReadonlyArray<ToastDescriptor>
  placement?: ToastPlacement
  /** When the stack is collapsed it shows N latest toasts. */
  collapsedCount?: number
  onDismiss?: (id: string) => void
  onAction?: (id: string) => void
  className?: string
}

const PLACEMENT_CLASS: Record<ToastPlacement, string> = {
  "top-left": styles.stackTopLeft,
  "top-right": styles.stackTopRight,
  "top-center": styles.stackTopCenter,
  "bottom-left": styles.stackBottomLeft,
  "bottom-right": styles.stackBottomRight,
  "bottom-center": styles.stackBottomCenter,
}

export function ToastStack({
  toasts,
  placement = "top-right",
  collapsedCount = 2,
  onDismiss,
  onAction,
  className,
}: ToastStackProps) {
  const [collapsed, setCollapsed] = useState<boolean>(toasts.length > collapsedCount)
  const overflow = Math.max(0, toasts.length - collapsedCount)

  const visible = useMemo(() => {
    if (!collapsed) return toasts
    return toasts.slice(0, collapsedCount)
  }, [collapsed, collapsedCount, toasts])

  const classes = [styles.toastStack, PLACEMENT_CLASS[placement], className]
    .filter(Boolean)
    .join(" ")

  return (
    <aside
      className={classes}
      aria-label="Notifications"
      role="region"
    >
      {visible.map((toast) => (
        <ToastCard
          key={toast.id}
          tone={toast.tone}
          title={toast.title}
          description={toast.description}
          actionLabel={toast.actionLabel}
          onAction={onAction ? () => onAction(toast.id) : undefined}
          onDismiss={onDismiss ? () => onDismiss(toast.id) : undefined}
          durationMs={toast.durationMs ?? 0}
        />
      ))}
      {overflow > 0 && (
        <button
          type="button"
          className={styles.toastCollapse}
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <>
              <ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" />
              <span>
                Show <span className={styles.toastNum}>{overflow}</span> more
              </span>
            </>
          ) : (
            <>
              <ChevronUp size={14} strokeWidth={2.4} aria-hidden="true" />
              <span>Collapse stack</span>
            </>
          )}
        </button>
      )}
    </aside>
  )
}

export default ToastStack
