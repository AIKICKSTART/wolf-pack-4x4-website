import { GripVertical } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./sticky-note.module.css"
import type { CommentAuthor, StickyNoteTone } from "./comment-types"

interface StickyNoteProps {
  author: CommentAuthor
  body: ReactNode
  tone?: StickyNoteTone
  /** Short footer label, e.g. "Bay 3 floor plan". */
  context?: string
  /** Optional timestamp shown in the footer. */
  timestamp?: string
  className?: string
}

const TONE_CLASS: Record<StickyNoteTone, string> = {
  yellow: styles.toneYellow,
  pink: styles.tonePink,
  teal: styles.toneTeal,
  amber: styles.toneAmber,
}

export function StickyNote({
  author,
  body,
  tone = "yellow",
  context,
  timestamp,
  className,
}: StickyNoteProps) {
  const classes = [styles.note, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      role="note"
      aria-label={`Sticky note by ${author.name}`}
    >
      <header className={styles.author}>
        <span className={styles.authorDot} aria-hidden="true" />
        <span>{author.name}</span>
      </header>
      <p className={styles.body}>{body}</p>
      <footer className={styles.foot}>
        {context ? <span>{context}</span> : null}
        {timestamp ? <span>{timestamp}</span> : null}
        <span className={styles.dragHandle} aria-hidden="true">
          <GripVertical size={12} strokeWidth={2.4} />
          drag
        </span>
      </footer>
    </article>
  )
}

export default StickyNote
