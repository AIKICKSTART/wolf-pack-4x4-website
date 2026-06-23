import { Check, CheckCheck, Clock, Smile } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./message-bubble.module.css"
import type {
  MessageReaction,
  MessageSender,
  MessageStatus,
} from "./inbox-types"

interface MessageBubbleProps {
  sender: MessageSender
  content: ReactNode
  timestamp: string
  status?: MessageStatus
  authorName?: string
  reactions?: ReadonlyArray<MessageReaction>
  /** Slot for additional bubble decorations (e.g. attachment row). */
  trailing?: ReactNode
  /** Show the floating quick-reaction prompt. Defaults to true. */
  showReactionTray?: boolean
  className?: string
}

const STATUS_LABEL: Record<MessageStatus, string> = {
  sending: "Sending",
  sent: "Sent",
  delivered: "Delivered",
  read: "Read",
}

function StatusIcon({ status }: { status: MessageStatus }) {
  switch (status) {
    case "sending":
      return <Clock size={11} strokeWidth={2.3} aria-hidden="true" />
    case "sent":
      return <Check size={11} strokeWidth={2.4} aria-hidden="true" />
    case "delivered":
      return <CheckCheck size={11} strokeWidth={2.4} aria-hidden="true" />
    case "read":
    default:
      return <CheckCheck size={11} strokeWidth={2.4} aria-hidden="true" />
  }
}

export function MessageBubble({
  sender,
  content,
  timestamp,
  status,
  authorName,
  reactions,
  trailing,
  showReactionTray = true,
  className,
}: MessageBubbleProps) {
  const isMine = sender === "me"
  const classes = [
    styles.row,
    isMine ? styles.rowMine : styles.rowTheirs,
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const bubbleClasses = [styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]
    .join(" ")

  return (
    <article className={classes} aria-label={authorName ? `${authorName} message` : "Message"}>
      <div className={bubbleClasses}>
        <div className={styles.content}>{content}</div>
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
        {reactions && reactions.length > 0 ? (
          <ul className={styles.reactions} aria-label="Reactions">
            {reactions.map((reaction) => (
              <li
                key={reaction.id}
                className={[
                  styles.reaction,
                  reaction.mine ? styles.reactionMine : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={styles.reactionGlyph} aria-hidden="true">
                  {reaction.glyph}
                </span>
                <span className={styles.reactionCount}>{reaction.count}</span>
                <span className={styles.srOnly}>{reaction.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {showReactionTray ? (
          <div className={styles.reactionTray} aria-hidden="true">
            <span className={styles.trayEmoji}>👍</span>
            <span className={styles.trayEmoji}>❤️</span>
            <span className={styles.trayEmoji}>🎉</span>
            <span className={styles.trayMore}>
              <Smile size={12} strokeWidth={2.3} aria-hidden="true" />
            </span>
          </div>
        ) : null}
      </div>
      <footer className={styles.meta}>
        <time className={styles.time}>{timestamp}</time>
        {isMine && status ? (
          <span
            className={[
              styles.status,
              status === "read" ? styles.statusRead : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={STATUS_LABEL[status]}
            title={STATUS_LABEL[status]}
          >
            <StatusIcon status={status} />
          </span>
        ) : null}
      </footer>
    </article>
  )
}

export default MessageBubble
