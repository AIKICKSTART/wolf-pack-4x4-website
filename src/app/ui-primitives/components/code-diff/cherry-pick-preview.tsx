"use client"

import { CherryIcon, GitBranch } from "lucide-react"

import type { CommitSummary } from "./code-diff-types"
import { shortSha } from "./code-diff-types"
import styles from "./cherry-pick-preview.module.css"

export type ConflictPrediction = "clean" | "predicted" | "unknown"

export interface CherryPickPreviewProps {
  /** Commit being cherry-picked. */
  commit: CommitSummary
  /** Target branch for the cherry-pick. */
  targetBranch: string
  /** Predicted conflict state. */
  conflictPrediction: ConflictPrediction
  /** Apply handler. */
  onApply?: () => void
  /** Cancel handler. */
  onCancel?: () => void
  className?: string
}

const CONFLICT_LABEL: Record<ConflictPrediction, string> = {
  clean: "Clean apply",
  predicted: "Conflict predicted",
  unknown: "Conflict unknown",
}

const CONFLICT_CLASS: Record<ConflictPrediction, string> = {
  clean: styles.conflictClean,
  predicted: styles.conflictPredicted,
  unknown: styles.conflictUnknown,
}

export function CherryPickPreview({
  commit,
  targetBranch,
  conflictPrediction,
  onApply,
  onCancel,
  className,
}: CherryPickPreviewProps) {
  const classes = [styles.preview, className].filter(Boolean).join(" ")
  const sha = shortSha(commit.sha)
  return (
    <section
      role="region"
      aria-label={`Cherry-pick preview for ${sha} onto ${targetBranch}`}
      className={classes}
    >
      <header className={styles.head}>
        <CherryIcon aria-hidden="true" />
        Cherry-pick preview
      </header>
      <div className={styles.commitSummary}>
        <div className={styles.shaRow}>
          <span className={styles.sha}>{sha}</span>
          <span className={styles.author}>{commit.author}</span>
        </div>
        <h3 className={styles.subject}>{commit.message}</h3>
      </div>
      <div className={styles.targetRow}>
        <span className={styles.targetLabel}>Target</span>
        <span className={styles.targetChip}>
          <GitBranch aria-hidden="true" />
          {targetBranch}
        </span>
        <span className={`${styles.conflictChip} ${CONFLICT_CLASS[conflictPrediction]}`}>
          {CONFLICT_LABEL[conflictPrediction]}
        </span>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.apply} onClick={onApply}>
          Apply cherry-pick
        </button>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </section>
  )
}

export default CherryPickPreview
