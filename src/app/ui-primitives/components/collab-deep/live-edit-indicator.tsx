import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import type { CollabUser, CursorTone, LiveEdit } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./live-edit-indicator.module.css"

interface LiveEditIndicatorProps {
  /** The active edit on this field. */
  edit: LiveEdit
  /** Optional collapsed mode — shrinks to just the pulsing dot + name. */
  compact?: boolean
  className?: string
}

function toneHex(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Pulsing edit indicator overlaid on a live field. */
export function LiveEditIndicator({
  edit,
  compact = false,
  className,
}: LiveEditIndicatorProps) {
  const tint = toneHex(edit.user)
  const classes = [
    styles.indicator,
    compact ? styles.compact : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style: CSSProperties = {
    "--edit-tint": tint,
  } as CSSProperties

  return (
    <div
      className={classes}
      style={style}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`${edit.user.name} is editing ${edit.fieldLabel}`}
    >
      <span className={styles.pulse} aria-hidden="true">
        <span className={styles.pulseRing} />
        <span className={styles.pulseDot} />
      </span>
      <div className={styles.avatarSlot}>
        <Avatar
          name={edit.user.name}
          src={edit.user.avatar}
          size="sm"
          tone={edit.user.tone ?? "obsidian"}
        />
      </div>
      <div className={styles.copy}>
        <span className={styles.line}>
          <strong className={styles.name}>{edit.user.name}</strong>{" "}
          <span className={styles.verb}>editing</span>
        </span>
        <span className={styles.field}>{edit.fieldLabel}</span>
        {!compact && edit.preview && (
          <span className={styles.preview}>“{edit.preview}”</span>
        )}
      </div>
    </div>
  )
}

export default LiveEditIndicator
