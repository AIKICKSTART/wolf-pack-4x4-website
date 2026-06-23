import { MessageSquare } from "lucide-react"

import {
  CommentBubble,
  ReplyCard,
  type CommentAuthor,
  type CommentRecord,
} from "../comments"
import { Chip } from "../primitives"
import { MaterialSurface } from "../surfaces"

import {
  AUTHOR_ROLE_LABEL,
  COMMENT_STATE_LABEL,
  COMMENT_STATE_TONE,
  studioToneToChip,
  type DraftComment,
} from "./content-studio-types"
import styles from "./comment-thread-card.module.css"

interface CommentThreadCardProps {
  comment: DraftComment
  className?: string
}

function commentRecord(comment: DraftComment): CommentRecord {
  const author: CommentAuthor = {
    id: comment.author.id,
    name: comment.author.name,
    role: AUTHOR_ROLE_LABEL[comment.author.role],
  }
  return {
    id: comment.id,
    author,
    body: comment.body,
    timestamp: comment.timestamp,
    status: comment.state === "resolved" ? "resolved" : "open",
  }
}

export function CommentThreadCard({
  comment,
  className,
}: CommentThreadCardProps) {
  const tone = COMMENT_STATE_TONE[comment.state]
  const classes = [styles.card, styles[`tone_${tone}`], className]
    .filter(Boolean)
    .join(" ")
  const record = commentRecord(comment)
  const replies = comment.replies ?? []

  return (
    <MaterialSurface elevation={1} tone="surface" className={classes}>
      <section
        className={styles.shell}
        aria-label={`Editorial comment thread on ${comment.blockAnchor ?? "draft"}`}
      >
        <header className={styles.head}>
          <span className={styles.icon} aria-hidden="true">
            <MessageSquare size={13} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <div className={styles.headBody}>
            <span className={styles.anchor}>
              Anchor · <strong>{comment.blockAnchor ?? "Document"}</strong>
            </span>
            <span className={styles.timeline}>
              Opened {comment.timestamp}
              {replies.length > 0 ? ` · ${replies.length} repl${replies.length === 1 ? "y" : "ies"}` : ""}
            </span>
          </div>
          <Chip
            label={COMMENT_STATE_LABEL[comment.state]}
            tone={studioToneToChip(tone)}
            selected={comment.state === "open"}
          />
        </header>

        <div className={styles.body}>
          <CommentBubble
            author={record.author}
            body={record.body}
            timestamp={record.timestamp}
            status={record.status}
            hideReplyAction
            hideMenu
          />
          {replies.length > 0 ? (
            <ul className={styles.replies}>
              {replies.map((reply) => (
                <li key={reply.id}>
                  <ReplyCard
                    author={{
                      id: reply.author.id,
                      name: reply.author.name,
                      role: AUTHOR_ROLE_LABEL[reply.author.role],
                    }}
                    body={reply.body}
                    timestamp={reply.timestamp}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {comment.state === "resolved" && comment.resolutionNote ? (
          <footer className={styles.resolution}>
            <span className={styles.resolutionTag}>Resolved</span>
            <p>{comment.resolutionNote}</p>
          </footer>
        ) : null}
      </section>
    </MaterialSurface>
  )
}

export default CommentThreadCard
