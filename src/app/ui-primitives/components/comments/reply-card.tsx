import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./reply-card.module.css"
import type { CommentAuthor, ReactionSummary } from "./comment-types"
import { ReactionTray } from "./reaction-tray"

interface ReplyCardProps {
  author: CommentAuthor
  body: ReactNode
  timestamp: string
  reactions?: ReadonlyArray<ReactionSummary>
  className?: string
}

export function ReplyCard({
  author,
  body,
  timestamp,
  reactions,
  className,
}: ReplyCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Reply by ${author.name}`}>
      <Avatar name={author.name} src={author.avatar} size="sm" tone="obsidian" />
      <div className={styles.body}>
        <header className={styles.header}>
          <span className={styles.name}>{author.name}</span>
          <time className={styles.time}>{timestamp}</time>
        </header>
        <p className={styles.text}>{body}</p>
        <ReactionTray reactions={reactions} commentId={`reply-${author.id}`} />
      </div>
    </article>
  )
}

export default ReplyCard
