"use client"

import type { CSSProperties } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { CollabUser, CursorTone } from "./collab-deep-types"
import { COLLAB_DEEP_TONE_HEX } from "./collab-deep-types"
import { defaultCursorTone } from "../realtime-collab/realtime-collab-types"
import styles from "./comment-thread-popover.module.css"

export type CommentThreadStatus = "open" | "resolved" | "reopened"

export interface CommentThreadReply {
  id: string
  author: CollabUser
  body: string
  /** Human relative timestamp e.g. "12s ago". */
  timestamp: string
}

interface CommentThreadPopoverProps {
  /** Pin number this thread is anchored to. */
  pinNumber: number
  /** Optional short title above the thread. */
  title?: string
  /** Originating comment. */
  rootAuthor: CollabUser
  rootBody: string
  rootTimestamp: string
  /** Subsequent replies. */
  replies?: ReadonlyArray<CommentThreadReply>
  status?: CommentThreadStatus
  /** Optional pixel offset / placement when anchored on a canvas. */
  anchorX?: number
  anchorY?: number
  className?: string
}

const STATUS_TONE: Record<CommentThreadStatus, "amber" | "green" | "red"> = {
  open: "amber",
  resolved: "green",
  reopened: "red",
}

const STATUS_LABEL: Record<CommentThreadStatus, string> = {
  open: "Open",
  resolved: "Resolved",
  reopened: "Reopened",
}

function authorTint(user: CollabUser): string {
  const tone: CursorTone = user.cursorTone ?? defaultCursorTone(user.tone)
  return COLLAB_DEEP_TONE_HEX[tone]
}

/** Anchored thread popover — root comment + replies + status chip. */
export function CommentThreadPopover({
  pinNumber,
  title,
  rootAuthor,
  rootBody,
  rootTimestamp,
  replies = [],
  status = "open",
  anchorX,
  anchorY,
  className,
}: CommentThreadPopoverProps) {
  const classes = [styles.popover, className].filter(Boolean).join(" ")
  const style: CSSProperties = {
    "--root-tint": authorTint(rootAuthor),
    ...(typeof anchorX === "number" ? { left: `${anchorX}%` } : null),
    ...(typeof anchorY === "number" ? { top: `${anchorY}%` } : null),
  } as CSSProperties

  return (
    <aside
      className={classes}
      style={style}
      role="dialog"
      aria-label={`Comment thread ${pinNumber}${title ? `: ${title}` : ""}`}
    >
      <header className={styles.head}>
        <span className={styles.pin}>#{pinNumber}</span>
        {title && <h3 className={styles.title}>{title}</h3>}
        <Chip
          tone={STATUS_TONE[status]}
          label={STATUS_LABEL[status]}
          className={styles.statusChip}
        />
      </header>

      <article className={styles.root}>
        <div className={styles.authorRow}>
          <Avatar
            name={rootAuthor.name}
            src={rootAuthor.avatar}
            size="sm"
            tone={rootAuthor.tone ?? "obsidian"}
          />
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>{rootAuthor.name}</span>
            <span className={styles.authorRole}>{rootAuthor.role ?? "Collaborator"}</span>
          </div>
          <time className={styles.timestamp}>{rootTimestamp}</time>
        </div>
        <p className={styles.body}>{rootBody}</p>
      </article>

      {replies.length > 0 && (
        <ol className={styles.replies}>
          {replies.map((reply) => (
            <li key={reply.id} className={styles.reply}>
              <Avatar
                name={reply.author.name}
                src={reply.author.avatar}
                size="sm"
                tone={reply.author.tone ?? "obsidian"}
              />
              <div className={styles.replyBody}>
                <div className={styles.replyHeader}>
                  <span className={styles.replyName}>{reply.author.name}</span>
                  <time className={styles.replyTime}>{reply.timestamp}</time>
                </div>
                <p className={styles.replyText}>{reply.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <footer className={styles.composer}>
        <label className={styles.composerLabel} htmlFor={`thread-${pinNumber}-input`}>
          Reply
        </label>
        <input
          id={`thread-${pinNumber}-input`}
          type="text"
          className={styles.composerInput}
          placeholder="Reply, @mention, or resolve…"
          readOnly
        />
        <button type="button" className={styles.composerSend}>
          Send
        </button>
      </footer>
    </aside>
  )
}

export default CommentThreadPopover
