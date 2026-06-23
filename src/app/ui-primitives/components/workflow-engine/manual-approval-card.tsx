"use client"

import { Check, Clock3, MessageSquareText, ShieldCheck, X } from "lucide-react"
import { useState } from "react"

import {
  APPROVAL_DECISION_LABEL,
  APPROVAL_DECISION_TONE,
  formatCurrency,
  formatDuration,
  type EngineApprovalDecision,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./manual-approval-card.module.css"

/**
 * Manual approval card — pauses the workflow until a named approver makes
 * a call. Renders requestor + reason + dollar context + comment field with
 * approve / reject actions. Decision state is local — visual reference
 * only, no real persistence.
 */
interface ManualApprovalCardProps {
  /** Short workflow scope label, e.g. "Refund > $200". */
  kicker?: string
  /** Decision title — e.g. "Approve Mick's refund". */
  title: string
  /** Approver display name. */
  approverName: string
  /** Approver role/team, e.g. "Workshop manager". */
  approverRole: string
  /** Optional avatar — initials or first letter. */
  approverInitials: string
  /** Reason / context for the approval ask. */
  reason: string
  /** Optional dollar amount for refund / quote approvals. */
  amount?: number
  /** Time the approval was requested, displayed verbatim. */
  requestedAtLabel: string
  /** Time-to-expiry in milliseconds — drives the urgency chip. */
  expiresInMs?: number
  /** Initial decision. */
  defaultDecision?: EngineApprovalDecision
  className?: string
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
}

export function ManualApprovalCard({
  kicker = "Manual approval",
  title,
  approverName,
  approverRole,
  approverInitials,
  reason,
  amount,
  requestedAtLabel,
  expiresInMs,
  defaultDecision = "pending",
  className,
}: ManualApprovalCardProps) {
  const [decision, setDecision] = useState<EngineApprovalDecision>(defaultDecision)
  const [comment, setComment] = useState("")
  const tone = APPROVAL_DECISION_TONE[decision]
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const urgencyTone: EngineTone =
    expiresInMs === undefined
      ? "neutral"
      : expiresInMs < 60 * 60 * 1000
        ? "red"
        : expiresInMs < 6 * 60 * 60 * 1000
          ? "amber"
          : "teal"

  return (
    <section
      className={classes}
      data-decision={decision}
      style={
        {
          "--card-tone": TONE_VAR[tone],
          "--urgency-tone": TONE_VAR[urgencyTone],
        } as Record<string, string>
      }
      aria-label={`Manual approval · ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <ShieldCheck size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.decisionChip}>
          {APPROVAL_DECISION_LABEL[decision]}
        </span>
      </header>

      <div className={styles.approverRow}>
        <span className={styles.avatar} aria-hidden="true">
          {approverInitials.slice(0, 2).toUpperCase()}
        </span>
        <div className={styles.approverText}>
          <span className={styles.approverName}>{approverName}</span>
          <span className={styles.approverRole}>{approverRole}</span>
        </div>
        <div className={styles.approverMeta}>
          {amount !== undefined ? (
            <span className={styles.amountChip}>{formatCurrency(amount)}</span>
          ) : null}
          {expiresInMs !== undefined ? (
            <span className={styles.urgencyChip}>
              <Clock3 size={11} strokeWidth={2.4} aria-hidden="true" />
              Expires in {formatDuration(expiresInMs)}
            </span>
          ) : null}
        </div>
      </div>

      <div className={styles.reasonBlock}>
        <span className={styles.reasonLabel}>Reason</span>
        <p className={styles.reasonBody}>{reason}</p>
      </div>

      <div className={styles.commentBlock}>
        <label htmlFor={`${kicker}-comment`} className={styles.commentLabel}>
          <MessageSquareText size={11} strokeWidth={2.4} aria-hidden="true" /> Comment
        </label>
        <textarea
          id={`${kicker}-comment`}
          className={styles.textarea}
          rows={3}
          spellCheck={false}
          placeholder="Add a note for the audit trail…"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>

      <footer className={styles.actions}>
        <span className={styles.requestedAt}>Requested · {requestedAtLabel}</span>
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.rejectBtn}
            onClick={() => setDecision("rejected")}
            aria-pressed={decision === "rejected"}
          >
            <X size={13} strokeWidth={2.4} aria-hidden="true" />
            Reject
          </button>
          <button
            type="button"
            className={styles.approveBtn}
            onClick={() => setDecision("approved")}
            aria-pressed={decision === "approved"}
          >
            <Check size={13} strokeWidth={2.4} aria-hidden="true" />
            Approve
          </button>
        </div>
      </footer>
    </section>
  )
}

export default ManualApprovalCard
