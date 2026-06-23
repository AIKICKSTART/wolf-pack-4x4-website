"use client"

import { ChevronRight, MessageSquare } from "lucide-react"
import { useId, useState, type ReactNode } from "react"

import { Avatar } from "../primitives/avatar"

import styles from "./thread-reply-row.module.css"
import type { ThreadReplySummary } from "./inbox-types"

interface ThreadReplyRowProps {
  summary: ThreadReplySummary
  /** Slot rendered when expanded — typically nested message bubbles. */
  panelChildren?: ReactNode
  /** When true, the panel is initially open. */
  defaultOpen?: boolean
  className?: string
}

export function ThreadReplyRow({
  summary,
  panelChildren,
  defaultOpen = false,
  className,
}: ThreadReplyRowProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const panelId = useId()
  const classes = [styles.row, open ? styles.rowOpen : "", className]
    .filter(Boolean)
    .join(" ")
  const triggerLabel =
    summary.count === 1 ? "1 reply" : `${summary.count} replies`

  return (
    <div className={classes}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MessageSquare size={13} strokeWidth={2.3} aria-hidden="true" />
        <span className={styles.label}>{triggerLabel}</span>
        <ul className={styles.replierStack} aria-hidden="true">
          {summary.repliers.slice(0, 3).map((replier) => (
            <li key={replier.id} className={styles.replierItem}>
              <Avatar
                name={replier.name}
                src={replier.avatar}
                size="sm"
                tone={replier.kind === "customer" ? "amber" : "red"}
              />
            </li>
          ))}
        </ul>
        <time className={styles.lastReply}>Last reply {summary.lastReplyAt}</time>
        <ChevronRight
          size={14}
          strokeWidth={2.3}
          aria-hidden="true"
          className={styles.chevron}
        />
      </button>
      {open ? (
        <aside
          id={panelId}
          className={styles.panel}
          aria-label="Thread replies"
        >
          {panelChildren ?? (
            <p className={styles.panelEmpty}>No replies yet.</p>
          )}
        </aside>
      ) : null}
    </div>
  )
}

export default ThreadReplyRow
