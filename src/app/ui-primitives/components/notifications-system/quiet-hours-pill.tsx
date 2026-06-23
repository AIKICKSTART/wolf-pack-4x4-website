"use client"

import { Moon, Pencil, Sun } from "lucide-react"

import styles from "./notifications-system.module.css"

type QuietHoursState = "active" | "inactive" | "scheduled"

interface QuietHoursPillProps {
  state: QuietHoursState
  /** Time window summary e.g. "19:00 – 07:00". */
  windowLabel: string
  /** Days summary e.g. "Mon–Fri" */
  daysLabel: string
  onEdit?: () => void
  className?: string
}

const STATE_CLASS: Record<QuietHoursState, string> = {
  active: styles.qhActive,
  inactive: styles.qhInactive,
  scheduled: styles.qhScheduled,
}

const STATE_TEXT: Record<QuietHoursState, string> = {
  active: "Quiet hours on",
  inactive: "Quiet hours off",
  scheduled: "Quiet hours queued",
}

export function QuietHoursPill({
  state,
  windowLabel,
  daysLabel,
  onEdit,
  className,
}: QuietHoursPillProps) {
  const classes = [styles.qhPill, STATE_CLASS[state], className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className={styles.qhIcon} aria-hidden="true">
        {state === "active" ? (
          <Moon size={12} strokeWidth={2.4} />
        ) : (
          <Sun size={12} strokeWidth={2.4} />
        )}
      </span>
      <span className={styles.qhText}>{STATE_TEXT[state]}</span>
      <span className={styles.qhDivider} aria-hidden="true">
        ·
      </span>
      <span className={styles.qhWindow}>{windowLabel}</span>
      <span className={styles.qhDivider} aria-hidden="true">
        ·
      </span>
      <span className={styles.qhDays}>{daysLabel}</span>
      {onEdit && (
        <button
          type="button"
          className={styles.qhEdit}
          onClick={onEdit}
          aria-label={`Edit quiet hours (${windowLabel}, ${daysLabel})`}
        >
          <Pencil size={11} strokeWidth={2.4} aria-hidden="true" />
          Edit
        </button>
      )}
    </div>
  )
}

export default QuietHoursPill
