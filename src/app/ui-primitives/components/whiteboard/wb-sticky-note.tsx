import type { StickyTone } from "./whiteboard-types"
import styles from "./wb-sticky-note.module.css"

export interface WbStickyNoteProps {
  /** Body text on the sticky. */
  content: string
  /** Author display name. */
  author: string
  /** Author initials for the chip. */
  authorInitials: string
  /** Paper tone. */
  tone?: StickyTone
  /** Tilt rotation in degrees — typically -8..8. */
  rotation?: number
  /** Number of net votes — supports negative. */
  votes?: number
  /** Optional creation timestamp shown bottom right (e.g. "May 26"). */
  timestamp?: string
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

function clampRotation(input: number): number {
  if (input > 12) return 12
  if (input < -12) return -12
  return input
}

function excerpt(text: string, max = 60): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1)}…`
}

export function WbStickyNote({
  content,
  author,
  authorInitials,
  tone = "yellow",
  rotation = 0,
  votes,
  timestamp,
  className,
}: WbStickyNoteProps) {
  const classes = [styles.note, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const tilt = clampRotation(rotation)
  const style = { transform: `rotate(${tilt}deg)` }
  const ariaLabel = `Sticky note by ${author}: ${excerpt(content)}`
  const voteLabel =
    typeof votes === "number"
      ? `${votes > 0 ? "+" : ""}${votes} vote${Math.abs(votes) === 1 ? "" : "s"}`
      : null

  return (
    <article
      role="note"
      aria-label={ariaLabel}
      className={classes}
      style={style}
      data-tone={tone}
    >
      <p className={styles.body}>{content}</p>
      <footer className={styles.foot}>
        <span className={styles.author}>
          <span className={styles.avatar} aria-hidden="true">
            {authorInitials}
          </span>
          <span>{author}</span>
        </span>
        {voteLabel ? (
          <span
            className={`${styles.votes} ${
              typeof votes === "number" && votes < 0 ? styles.votesNeg : ""
            }`}
            aria-label={voteLabel}
          >
            {voteLabel}
          </span>
        ) : null}
        {timestamp ? <span className={styles.stamp}>{timestamp}</span> : null}
      </footer>
    </article>
  )
}

export default WbStickyNote
