import { Avatar } from "../primitives/avatar"
import type { CollabUser } from "./realtime-collab-types"
import styles from "./live-typing-indicator.module.css"

interface LiveTypingIndicatorProps {
  /** Currently-typing users (1+). */
  users: ReadonlyArray<CollabUser>
  /** Optional field label e.g. "Labour line · row 3". */
  field?: string
  /** Optional doc title e.g. "Quote #Q-1408". */
  docTitle?: string
  className?: string
}

function joinNames(users: ReadonlyArray<CollabUser>): string {
  if (users.length === 0) {
    return ""
  }
  if (users.length === 1) {
    return users[0].name
  }
  if (users.length === 2) {
    return `${users[0].name} and ${users[1].name}`
  }
  const head = users
    .slice(0, users.length - 1)
    .map((user) => user.name)
    .join(", ")
  return `${head}, and ${users[users.length - 1].name}`
}

export function LiveTypingIndicator({
  users,
  field,
  docTitle,
  className,
}: LiveTypingIndicatorProps) {
  if (users.length === 0) {
    return null
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")
  const verb = users.length === 1 ? "is typing" : "are typing"
  const onLabel = field ? ` on ${field}` : ""
  const docLabel = docTitle ? ` in ${docTitle}` : ""
  const message = `${joinNames(users)} ${verb}${onLabel}${docLabel}`

  return (
    <div className={classes} role="status" aria-live="polite" aria-atomic="true">
      <div className={styles.avatars} aria-hidden="true">
        {users.slice(0, 3).map((user) => (
          <span key={user.id} className={styles.avatarSlot}>
            <Avatar
              name={user.name}
              src={user.avatar}
              size="sm"
              tone={user.tone ?? "obsidian"}
            />
          </span>
        ))}
      </div>
      <div className={styles.bubble}>
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.reducedDots} aria-hidden="true">
          ..
        </span>
        <span className={styles.copy}>
          <span className={styles.names}>{joinNames(users)}</span>
          <span className={styles.verb}>{verb}</span>
          {field && (
            <span className={styles.field}>
              · <strong>{field}</strong>
            </span>
          )}
          {docTitle && <span className={styles.doc}>· {docTitle}</span>}
        </span>
      </div>
      <span className={styles.srOnly}>{message}</span>
    </div>
  )
}

export default LiveTypingIndicator
