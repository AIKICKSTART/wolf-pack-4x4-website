import { Avatar } from "../primitives/avatar"

import styles from "./typing-indicator.module.css"
import type { InboxPerson } from "./inbox-types"

interface TypingIndicatorProps {
  /** Person who is typing. */
  author: InboxPerson
  /** Optional override copy, defaults to "<name> is typing…". */
  label?: string
  className?: string
}

export function TypingIndicator({
  author,
  label,
  className,
}: TypingIndicatorProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const copy = label ?? `${author.name} is typing…`

  return (
    <div className={classes} role="status" aria-live="polite">
      <Avatar
        name={author.name}
        src={author.avatar}
        size="sm"
        tone={author.kind === "customer" ? "amber" : "red"}
      />
      <span className={styles.bubble}>
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.reducedDots} aria-hidden="true">
          ..
        </span>
        <span className={styles.srOnly}>{copy}</span>
      </span>
      <span className={styles.caption}>{copy}</span>
    </div>
  )
}

export default TypingIndicator
