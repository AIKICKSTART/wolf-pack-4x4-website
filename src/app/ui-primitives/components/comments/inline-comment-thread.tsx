import type { ReactNode } from "react"

import styles from "./inline-comment-thread.module.css"
import type { CommentRecord, CommentStatus } from "./comment-types"
import { CommentBubble } from "./comment-bubble"
import { ReplyCard } from "./reply-card"
import { ResolveToggle } from "./resolve-toggle"

interface InlineCommentThreadProps {
  /** Optional pin number rendered as the thread badge. */
  pinNumber?: number
  title: string
  rootComment: CommentRecord
  /** Composer rendered at the bottom of the thread. */
  composer: ReactNode
  /** Initial status, used to drive the resolve toggle. */
  status?: CommentStatus
  /** Highlight the root bubble (e.g. focused thread). */
  highlighted?: boolean
  className?: string
}

export function InlineCommentThread({
  pinNumber,
  title,
  rootComment,
  composer,
  status,
  highlighted = false,
  className,
}: InlineCommentThreadProps) {
  const resolved = (status ?? rootComment.status) === "resolved"
  const replies = rootComment.replies ?? []
  const classes = [
    styles.thread,
    resolved ? styles.threadResolved : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Comment thread: ${title}`}
    >
      <header className={styles.head}>
        {typeof pinNumber === "number" ? (
          <span
            className={[
              styles.pin,
              resolved ? styles.pinResolved : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {pinNumber}
          </span>
        ) : null}
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.headSpacer} aria-hidden="true" />
        <ResolveToggle
          initialStatus={status ?? rootComment.status}
          threadId={rootComment.id}
        />
      </header>

      <CommentBubble
        author={rootComment.author}
        body={rootComment.body}
        timestamp={rootComment.timestamp}
        status={status ?? rootComment.status}
        reactions={rootComment.reactions}
        highlighted={highlighted}
      />

      {replies.length > 0 ? (
        <ul className={styles.replies}>
          {replies.map((reply) => (
            <li key={reply.id}>
              <ReplyCard
                author={reply.author}
                body={reply.body}
                timestamp={reply.timestamp}
                reactions={reply.reactions}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.repliesEmpty}>No replies yet</p>
      )}

      <div className={styles.composerSlot}>{composer}</div>
    </section>
  )
}

export default InlineCommentThread
