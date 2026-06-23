"use client"

import { CheckCircle2, MoreHorizontal, Reply } from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./comment-bubble.module.css"
import type { CommentAuthor, CommentStatus, ReactionSummary } from "./comment-types"
import { ReactionTray } from "./reaction-tray"

interface CommentBubbleProps {
  author: CommentAuthor
  body: ReactNode
  timestamp: string
  status?: CommentStatus
  reactions?: ReadonlyArray<ReactionSummary>
  /** Whether this bubble represents the currently focused thread. */
  highlighted?: boolean
  /** Hide the reply CTA when used inside a nested context. */
  hideReplyAction?: boolean
  /** Disable the kebab menu (e.g. in print views). */
  hideMenu?: boolean
  onReply?: () => void
  className?: string
}

export function CommentBubble({
  author,
  body,
  timestamp,
  status = "open",
  reactions,
  highlighted = false,
  hideReplyAction = false,
  hideMenu = false,
  onReply,
  className,
}: CommentBubbleProps) {
  const classes = [
    styles.bubble,
    status === "resolved" ? styles.bubbleResolved : "",
    highlighted ? styles.bubbleHighlighted : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`Comment by ${author.name}`}>
      <div className={styles.avatarCol}>
        <Avatar name={author.name} src={author.avatar} size="sm" tone="red" />
      </div>
      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.name}>{author.name}</span>
          {author.role ? <span className={styles.role}>{author.role}</span> : null}
          <time className={styles.time}>{timestamp}</time>
          {!hideMenu ? (
            <button
              type="button"
              className={styles.kebab}
              aria-label={`More actions for ${author.name}'s comment`}
            >
              <MoreHorizontal size={14} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ) : null}
        </header>
        <p className={styles.text}>{body}</p>
        <ReactionTray reactions={reactions} commentId={`comment-${author.id}`} />
        <div className={styles.actions}>
          {!hideReplyAction ? (
            <button
              type="button"
              className={styles.replyBtn}
              onClick={onReply}
            >
              <Reply size={12} strokeWidth={2.4} aria-hidden="true" />
              <span>Reply</span>
            </button>
          ) : null}
          {status === "resolved" ? (
            <span className={styles.statusBadge}>
              <CheckCircle2 size={11} strokeWidth={2.4} aria-hidden="true" />
              Resolved
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default CommentBubble
