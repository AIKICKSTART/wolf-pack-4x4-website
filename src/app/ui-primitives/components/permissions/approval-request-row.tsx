"use client"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import type { RoleTone } from "./permission-types"
import { RoleBadge } from "./role-badge"
import styles from "./approval-request-row.module.css"

export interface ApprovalRequest {
  readonly id: string
  readonly requesterName: string
  readonly requesterRole: string
  readonly avatarTone?: AvatarTone
  /** Role being requested. */
  readonly requestedRole: string
  readonly requestedRoleTone: RoleTone
  readonly reason: string
  readonly submittedAt: string
  /** Hint like "Expires in 38m" or "Scope: Oak Flats". */
  readonly hint?: string
}

interface ApprovalRequestRowProps {
  request: ApprovalRequest
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  onSnooze?: (id: string) => void
  className?: string
}

function formatSubmitted(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ApprovalRequestRow({
  request,
  onApprove,
  onReject,
  onSnooze,
  className,
}: ApprovalRequestRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Approval request from ${request.requesterName}`}>
      <header className={styles.head}>
        <Avatar
          name={request.requesterName}
          tone={request.avatarTone ?? "obsidian"}
          size="md"
        />
        <div className={styles.headBody}>
          <span className={styles.requester}>
            <strong>{request.requesterName}</strong>
            <span className={styles.requesterRole}>{request.requesterRole}</span>
          </span>
          <span className={styles.action}>
            requests <RoleBadge label={request.requestedRole} tone={request.requestedRoleTone} size="sm" />
          </span>
        </div>
        <time className={styles.timestamp} dateTime={request.submittedAt}>
          {formatSubmitted(request.submittedAt)}
        </time>
      </header>

      <blockquote className={styles.reason}>
        <p>{request.reason}</p>
      </blockquote>

      {request.hint && <span className={styles.hint}>{request.hint}</span>}

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.btnSnooze}
          onClick={() => onSnooze?.(request.id)}
        >
          Snooze
        </button>
        <button
          type="button"
          className={styles.btnReject}
          onClick={() => onReject?.(request.id)}
        >
          Reject
        </button>
        <button
          type="button"
          className={styles.btnApprove}
          onClick={() => onApprove?.(request.id)}
        >
          Approve
        </button>
      </footer>
    </article>
  )
}

export default ApprovalRequestRow
