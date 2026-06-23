"use client"

import type { CSSProperties } from "react"

import type {
  CollabCursorPoint,
  CollabUser,
  CursorTone,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./comment-overlay-pin.module.css"

export type CommentPinStatus = "open" | "resolved" | "reopened"

interface CommentOverlayPinProps {
  /** 1-based number rendered inside the pin. */
  number: number
  /** Author of the originating comment — drives the pin tint. */
  author: CollabUser
  /** Position as percentages of the parent stage. */
  position: CollabCursorPoint
  status?: CommentPinStatus
  /** Whether this is the currently focused pin (canvas selection). */
  selected?: boolean
  /** Short label shown on hover / focus / SR. */
  tooltip?: string
  /** Number of replies — shown as a small badge when > 0. */
  replyCount?: number
  onSelect?: () => void
  className?: string
}

const STATUS_LABEL: Record<CommentPinStatus, string> = {
  open: "Open",
  resolved: "Resolved",
  reopened: "Reopened",
}

const STATUS_CLASS: Record<CommentPinStatus, string> = {
  open: styles.pinOpen,
  resolved: styles.pinResolved,
  reopened: styles.pinReopened,
}

function clampPercent(value: number): number {
  if (Number.isNaN(value)) {
    return 0
  }
  if (value < 0) {
    return 0
  }
  if (value > 100) {
    return 100
  }
  return value
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Canvas comment pin — anchored, tinted to its author, status-aware. */
export function CommentOverlayPin({
  number,
  author,
  position,
  status = "open",
  selected = false,
  tooltip,
  replyCount,
  onSelect,
  className,
}: CommentOverlayPinProps) {
  const classes = [
    styles.pin,
    STATUS_CLASS[status],
    selected ? styles.pinSelected : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style: CSSProperties = {
    left: `${clampPercent(position.x)}%`,
    top: `${clampPercent(position.y)}%`,
    "--pin-tint": toneHex(author),
  } as CSSProperties

  const ariaLabel = tooltip
    ? `Comment ${number} by ${author.name}, ${STATUS_LABEL[status]}: ${tooltip}`
    : `Comment ${number} by ${author.name}, ${STATUS_LABEL[status]}`

  return (
    <button
      type="button"
      className={classes}
      style={style}
      aria-label={ariaLabel}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.label}>{number}</span>
      {typeof replyCount === "number" && replyCount > 0 && (
        <span className={styles.replies} aria-hidden="true">
          {replyCount}
        </span>
      )}
      {tooltip && (
        <span className={styles.tooltip} aria-hidden="true">
          <span className={styles.tooltipAuthor}>{author.name}</span>
          <span className={styles.tooltipBody}>{tooltip}</span>
        </span>
      )}
    </button>
  )
}

export default CommentOverlayPin
