"use client"

import { useState } from "react"
import { Check, MessageSquare, ShieldCheck, X } from "lucide-react"

import type { BranchProtection, ReviewVerdict } from "./code-diff-types"
import styles from "./approve-changes-button.module.css"

export interface ApproveChangesButtonProps {
  /** Initial verdict (controlled or uncontrolled start value). */
  initialVerdict?: ReviewVerdict | null
  /** Optional policy applied to the target branch — drives the required-by-policy chip. */
  policy?: BranchProtection
  /** Number of approvals still required by policy. */
  approvalsRequired?: number
  /** Change handler — called when a verdict button is pressed. */
  onVerdict?: (verdict: ReviewVerdict) => void
  className?: string
}

const POLICY_LABEL: Record<BranchProtection, string> = {
  none: "Open branch",
  "review-required": "Review required",
  "admins-only": "Admins only",
}

export function ApproveChangesButton({
  initialVerdict = null,
  policy,
  approvalsRequired,
  onVerdict,
  className,
}: ApproveChangesButtonProps) {
  const [verdict, setVerdict] = useState<ReviewVerdict | null>(initialVerdict)

  const handle = (next: ReviewVerdict) => () => {
    setVerdict(next)
    onVerdict?.(next)
  }

  const classes = [styles.group, className].filter(Boolean).join(" ")
  const showPolicy = policy === "review-required" || policy === "admins-only"
  const policyLabel = policy ? POLICY_LABEL[policy] : null

  return (
    <section
      role="group"
      aria-label="Review verdict"
      className={classes}
    >
      {showPolicy && policyLabel ? (
        <span className={styles.policyChip}>
          <ShieldCheck aria-hidden="true" />
          {policyLabel}
          {typeof approvalsRequired === "number" ? ` · ${approvalsRequired} approvals` : ""}
        </span>
      ) : null}
      <div className={styles.options}>
        <button
          type="button"
          className={`${styles.option} ${styles.optionApprove}`}
          aria-pressed={verdict === "approve"}
          onClick={handle("approve")}
        >
          <span className={styles.optionIcon}>
            <Check size={16} aria-hidden="true" />
          </span>
          <span className={styles.optionMeta}>
            <span className={styles.optionTitle}>Approve</span>
            <span className={styles.optionDesc}>Mark changes as ready to merge</span>
          </span>
        </button>
        <button
          type="button"
          className={`${styles.option} ${styles.optionRequest}`}
          aria-pressed={verdict === "request-changes"}
          onClick={handle("request-changes")}
        >
          <span className={styles.optionIcon}>
            <X size={16} aria-hidden="true" />
          </span>
          <span className={styles.optionMeta}>
            <span className={styles.optionTitle}>Request changes</span>
            <span className={styles.optionDesc}>Block merge until updated</span>
          </span>
        </button>
        <button
          type="button"
          className={`${styles.option} ${styles.optionComment}`}
          aria-pressed={verdict === "comment"}
          onClick={handle("comment")}
        >
          <span className={styles.optionIcon}>
            <MessageSquare size={16} aria-hidden="true" />
          </span>
          <span className={styles.optionMeta}>
            <span className={styles.optionTitle}>Comment</span>
            <span className={styles.optionDesc}>Leave notes without verdict</span>
          </span>
        </button>
      </div>
    </section>
  )
}

export default ApproveChangesButton
