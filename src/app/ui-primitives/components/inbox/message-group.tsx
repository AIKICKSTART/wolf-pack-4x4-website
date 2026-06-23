import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./message-group.module.css"
import type { InboxPerson, MessageSender } from "./inbox-types"

interface MessageGroupProps {
  author: InboxPerson
  /** Whether the group is the viewer's messages (right-aligned) or other's. */
  sender: MessageSender
  /** Timestamp shown above the first bubble. */
  timestamp: string
  /** Bubbles rendered inside the group. */
  children: ReactNode
  className?: string
}

export function MessageGroup({
  author,
  sender,
  timestamp,
  children,
  className,
}: MessageGroupProps) {
  const isMine = sender === "me"
  const classes = [
    styles.group,
    isMine ? styles.groupMine : styles.groupTheirs,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={`Messages from ${author.name}`}>
      <header className={styles.head}>
        <Avatar
          name={author.name}
          src={author.avatar}
          size="sm"
          tone={author.kind === "customer" ? "amber" : "red"}
        />
        <span className={styles.identity}>
          <strong className={styles.name}>{author.name}</strong>
          {author.role ? (
            <span className={styles.role}>{author.role}</span>
          ) : null}
        </span>
        <time className={styles.time}>{timestamp}</time>
      </header>
      <ol className={styles.stack} aria-label="Messages">
        {children}
      </ol>
    </section>
  )
}

export default MessageGroup
