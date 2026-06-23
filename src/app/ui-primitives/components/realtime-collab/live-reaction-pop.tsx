import { REACTION_GLYPH, REACTION_LABEL } from "../comments/comment-types"
import type { ReactionEmoji } from "../comments/comment-types"
import type { CollabUser, CursorTone } from "./realtime-collab-types"
import { defaultCursorTone } from "./realtime-collab-types"
import styles from "./live-reaction-pop.module.css"

interface LiveReactionPopProps {
  /** Reactor's user record. */
  user: CollabUser
  /** Reaction emoji kind. */
  reaction: ReactionEmoji
  /** Position over the stage as percentage (0..100). */
  position: { x: number; y: number }
  /** Optional cursor tone override for the pop background. */
  toneOverride?: CursorTone
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

export function LiveReactionPop({
  user,
  reaction,
  position,
  toneOverride,
  className,
}: LiveReactionPopProps) {
  const tone = toneOverride ?? user.cursorTone ?? defaultCursorTone(user.tone)
  const classes = [styles.pop, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")
  const left = clamp(position.x)
  const top = clamp(position.y)
  const label = `${user.name} reacted ${REACTION_LABEL[reaction]}`

  return (
    <span
      className={classes}
      style={{ left: `${left}%`, top: `${top}%` }}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.glyph} aria-hidden="true">
        {REACTION_GLYPH[reaction]}
      </span>
      <span className={styles.chip}>{user.name}</span>
    </span>
  )
}

export default LiveReactionPop
