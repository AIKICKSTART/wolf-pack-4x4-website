import type { CursorState, StickyTone } from "./whiteboard-types"
import styles from "./cursor-presence-marker.module.css"

export interface CursorPresenceMarkerProps {
  /** Collaborator display name shown in the chip. */
  name: string
  /** Tone — drives chip + pointer fill colour. */
  tone?: StickyTone
  /** State — active (full colour) or idle (faded). */
  state?: CursorState
  /** Optional className passthrough. */
  className?: string
}

const TONE_CLASS: Record<StickyTone, string> = {
  yellow: styles.toneYellow,
  pink: styles.tonePink,
  blue: styles.toneBlue,
  green: styles.toneGreen,
  purple: styles.tonePurple,
  orange: styles.toneOrange,
}

export function CursorPresenceMarker({
  name,
  tone = "blue",
  state = "active",
  className,
}: CursorPresenceMarkerProps) {
  const classes = [
    styles.marker,
    TONE_CLASS[tone],
    state === "idle" ? styles.idle : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const ariaLabel = `${name} cursor${state === "idle" ? " (idle)" : ""}`

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={classes}
      data-state={state}
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
      <span className={styles.chip}>{name}</span>
    </span>
  )
}

export default CursorPresenceMarker
