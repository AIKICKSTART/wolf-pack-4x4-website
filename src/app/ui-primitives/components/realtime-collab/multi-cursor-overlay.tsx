import type { ReactNode } from "react"

import type { CollabCursor, CursorTone } from "./realtime-collab-types"
import { defaultCursorTone } from "./realtime-collab-types"
import styles from "./multi-cursor-overlay.module.css"

interface MultiCursorOverlayProps {
  /** 5+ collaborator cursors with absolute positions on the stage. */
  cursors: ReadonlyArray<CollabCursor>
  /** Optional caption rendered top-left over the stage. */
  caption?: string
  /** Optional stage children (e.g. faux doc background). */
  children?: ReactNode
  /** Accessible label override. */
  ariaLabel?: string
  className?: string
}

const TONE_CLASS: Record<CursorTone, string> = {
  blue: styles.toneBlue,
  amber: styles.toneAmber,
  purple: styles.tonePurple,
  green: styles.toneGreen,
  pink: styles.tonePink,
  orange: styles.toneOrange,
}

function clamp(value: number): number {
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

export function MultiCursorOverlay({
  cursors,
  caption,
  children,
  ariaLabel = "Live collaborator cursors",
  className,
}: MultiCursorOverlayProps) {
  const classes = [styles.stage, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="img" aria-label={ariaLabel}>
      {caption && <span className={styles.caption}>{caption}</span>}
      {children && <div className={styles.background}>{children}</div>}
      <div className={styles.cursors}>
        {cursors.map((cursor) => {
          const tone = cursor.user.cursorTone ?? defaultCursorTone(cursor.user.tone)
          const left = clamp(cursor.position.x)
          const top = clamp(cursor.position.y)
          return (
            <span
              key={cursor.id}
              className={`${styles.cursor} ${TONE_CLASS[tone]}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              data-name={cursor.user.name}
            >
              <svg
                className={styles.pointer}
                viewBox="0 0 22 22"
                aria-hidden="true"
              >
                <path
                  className={styles.pointerStroke}
                  d="M3 2 L19 11 L11 13 L8 20 Z"
                  fill="currentColor"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.label}>
                <span className={styles.name}>{cursor.user.name}</span>
                {cursor.hint && <span className={styles.hint}>{cursor.hint}</span>}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default MultiCursorOverlay
