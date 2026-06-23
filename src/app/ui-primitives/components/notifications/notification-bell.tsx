"use client"

import { Bell } from "lucide-react"
import { forwardRef, type ButtonHTMLAttributes } from "react"

import styles from "./notification-bell.module.css"

export type NotificationBellTone = "red" | "amber"

interface NotificationBellProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  count: number
  hasUnread?: boolean
  tone?: NotificationBellTone
  ariaLabel?: string
  maxBadge?: number
}

function formatBadge(count: number, max: number): string {
  if (count <= 0) return ""
  if (count > max) return `${max}+`
  return String(count)
}

export const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  function NotificationBell(
    {
      count,
      hasUnread = false,
      tone = "red",
      ariaLabel,
      maxBadge = 99,
      className,
      ...rest
    },
    ref,
  ) {
    const badge = formatBadge(count, maxBadge)
    const label =
      ariaLabel ??
      (count > 0
        ? `Notifications, ${count} unread`
        : "Notifications, no unread messages")
    const classes = [styles.bell, className].filter(Boolean).join(" ")

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        aria-haspopup="dialog"
        aria-label={label}
        {...rest}
      >
        <Bell size={18} strokeWidth={2} aria-hidden="true" />
        {hasUnread && count === 0 && (
          <span className={styles.pulseDot} aria-hidden="true" />
        )}
        {count > 0 && (
          <span
            className={styles.badge}
            data-tone={tone}
            aria-live="polite"
            aria-atomic="true"
          >
            {badge}
          </span>
        )}
        <span className={styles.srOnly}>{label}</span>
      </button>
    )
  },
)

export default NotificationBell
