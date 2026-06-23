import type { CSSProperties } from "react"

import type {
  CollabCursorPoint,
  CollabUser,
  CursorTone,
} from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./presence-cursor.module.css"

interface PresenceCursorProps {
  /** Collaborator the cursor belongs to. */
  user: CollabUser
  /** Position as percentages of the parent stage (0–100). */
  position: CollabCursorPoint
  /** Optional short activity verb shown after the name, e.g. "typing". */
  activity?: string
  /** Disable the soft floating bob (also handled by reduced-motion). */
  still?: boolean
  className?: string
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

function toneOf(user: CollabUser): CursorTone {
  return user.cursorTone ?? defaultCursorTone(user.tone)
}

/** Floating remote cursor + name label, used inside a positioned stage. */
export function PresenceCursor({
  user,
  position,
  activity,
  still = false,
  className,
}: PresenceCursorProps) {
  const tone = toneOf(user)
  const colorHex = COLLAB_DEEP_TONE_HEX[tone]
  const left = clampPercent(position.x)
  const top = clampPercent(position.y)
  const classes = [
    styles.cursor,
    still ? styles.still : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style: CSSProperties = {
    left: `${left}%`,
    top: `${top}%`,
    color: colorHex,
  }

  const description = activity
    ? `${user.name} cursor, ${activity}`
    : `${user.name} cursor`

  return (
    <div
      className={classes}
      style={style}
      role="presentation"
      aria-label={description}
      data-tone={tone}
    >
      <svg
        className={styles.pointer}
        viewBox="0 0 22 22"
        aria-hidden="true"
      >
        <path
          className={styles.pointerPath}
          d="M3 2 L19 11 L11 13 L8 20 Z"
          fill="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.label}>
        <span className={styles.name}>{user.name}</span>
        {activity && <span className={styles.activity}>{activity}</span>}
      </span>
    </div>
  )
}

export default PresenceCursor
