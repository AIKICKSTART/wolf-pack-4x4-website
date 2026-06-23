import { Check, CircleAlert, CircleDot, CircleMinus } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import type { CheckRow, CheckStatus, PrStatus } from "./code-diff-types"
import styles from "./pull-request-card.module.css"

export interface ReviewerSummary {
  name: string
  avatarSrc?: string
  tone?: AvatarTone
}

export interface PullRequestCardProps {
  /** PR number — rendered as #NNNN. */
  number: number
  /** PR title. */
  title: string
  /** Author display name. */
  author: string
  /** Lifecycle status — drives the status chip. */
  status: PrStatus
  /** Source branch. */
  fromBranch: string
  /** Target branch. */
  toBranch: string
  /** CI / status-check rows. */
  checks?: ReadonlyArray<CheckRow>
  /** Reviewer summaries — rendered as a stacked avatar row. */
  reviewers?: ReadonlyArray<ReviewerSummary>
  className?: string
}

const STATUS_LABEL: Record<PrStatus, string> = {
  draft: "Draft",
  open: "Open",
  "changes-requested": "Changes Requested",
  approved: "Approved",
  merged: "Merged",
  closed: "Closed",
}

const STATUS_CLASS: Record<PrStatus, string> = {
  draft: styles.statusDraft,
  open: styles.statusOpen,
  "changes-requested": styles.statusChanges,
  approved: styles.statusApproved,
  merged: styles.statusMerged,
  closed: styles.statusClosed,
}

function CheckIcon({ status }: { status: CheckStatus }) {
  const props = { "aria-hidden": true as const }
  if (status === "passing") {
    return <Check className={`${styles.checkIcon} ${styles.iconPassing}`} {...props} />
  }
  if (status === "failing") {
    return <CircleAlert className={`${styles.checkIcon} ${styles.iconFailing}`} {...props} />
  }
  if (status === "skipped") {
    return <CircleMinus className={`${styles.checkIcon} ${styles.iconSkipped}`} {...props} />
  }
  return <CircleDot className={`${styles.checkIcon} ${styles.iconPending}`} {...props} />
}

const CHECK_STATUS_LABEL: Record<CheckStatus, string> = {
  passing: "Passing",
  failing: "Failing",
  pending: "Pending",
  skipped: "Skipped",
}

export function PullRequestCard({
  number,
  title,
  author,
  status,
  fromBranch,
  toBranch,
  checks,
  reviewers,
  className,
}: PullRequestCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article
      role="region"
      aria-label={`Pull request #${number}: ${title}`}
      className={classes}
    >
      <div className={styles.head}>
        <span className={styles.number}>#{number}</span>
        <h3 className={styles.title}>{title}</h3>
        <span
          className={`${styles.statusChip} ${STATUS_CLASS[status]}`}
          aria-label={`Status: ${STATUS_LABEL[status]}`}
        >
          <span className={styles.statusDot} aria-hidden="true" />
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className={styles.meta}>
        <span className={styles.authorBlock}>
          <Avatar name={author} size="sm" tone="red" />
          <span>
            <strong>{author}</strong> wants to merge
          </span>
        </span>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.authorBlock}>
          <span>
            <strong>{fromBranch}</strong> → <strong>{toBranch}</strong>
          </span>
        </span>
      </div>
      {checks && checks.length > 0 ? (
        <div>
          <div className={styles.checksHead}>
            <span>Checks ({checks.length})</span>
          </div>
          <div className={styles.checks}>
            {checks.map((check) => (
              <div
                key={check.name}
                className={styles.checkRow}
                aria-label={`${check.name}: ${CHECK_STATUS_LABEL[check.status]}`}
              >
                <CheckIcon status={check.status} />
                <span className={styles.checkName}>{check.name}</span>
                {check.durationLabel ? (
                  <span className={styles.checkDuration}>{check.durationLabel}</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {reviewers && reviewers.length > 0 ? (
        <div className={styles.reviewers}>
          <span className={styles.reviewersLabel}>Reviewers</span>
          <span className={styles.avatarStack}>
            {reviewers.map((reviewer) => (
              <Avatar
                key={reviewer.name}
                name={reviewer.name}
                src={reviewer.avatarSrc}
                tone={reviewer.tone ?? "obsidian"}
                size="sm"
              />
            ))}
          </span>
        </div>
      ) : null}
    </article>
  )
}

export default PullRequestCard
