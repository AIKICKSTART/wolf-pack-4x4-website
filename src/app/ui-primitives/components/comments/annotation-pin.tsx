"use client"

import styles from "./annotation-pin.module.css"
import type { AnnotationPosition, CommentStatus } from "./comment-types"

interface AnnotationPinProps {
  /** 1-based number shown inside the pin. */
  number: number
  /** Position as percentages of the parent overlay. */
  position: AnnotationPosition
  status?: CommentStatus
  /** Whether the pin represents the currently selected annotation. */
  selected?: boolean
  /** Optional hover/focus tooltip text. */
  tooltip?: string
  onClick?: () => void
  className?: string
}

export function AnnotationPin({
  number,
  position,
  status = "open",
  selected = false,
  tooltip,
  onClick,
  className,
}: AnnotationPinProps) {
  const statusClass =
    status === "resolved"
      ? styles.pinResolved
      : status === "reopened"
        ? styles.pinReopened
        : ""
  const classes = [
    styles.pin,
    statusClass,
    selected ? styles.pinSelected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label={
        tooltip
          ? `Annotation ${number}: ${tooltip}`
          : `Annotation ${number}`
      }
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className={styles.label}>{number}</span>
      {tooltip ? (
        <span className={styles.tooltip} aria-hidden="true">
          {tooltip}
        </span>
      ) : null}
    </button>
  )
}

export default AnnotationPin
