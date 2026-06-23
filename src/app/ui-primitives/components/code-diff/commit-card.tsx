"use client"

import { GitBranch } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import type { CommitSummary } from "./code-diff-types"
import { shortSha } from "./code-diff-types"
import styles from "./commit-card.module.css"

export interface CommitCardAction {
  label: string
  /** Click handler. Optional — actions can be visual-only. */
  onClick?: () => void
}

export interface CommitCardProps {
  /** Commit data. */
  commit: CommitSummary
  /** Tone for the avatar fallback. */
  authorTone?: AvatarTone
  /** Optional avatar image URL. */
  authorAvatarSrc?: string
  /** Trailing action buttons (Revert / Cherry-pick / View etc.). */
  actions?: ReadonlyArray<CommitCardAction>
  /** Optional className passthrough. */
  className?: string
}

export function CommitCard({
  commit,
  authorTone = "obsidian",
  authorAvatarSrc,
  actions,
  className,
}: CommitCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const sha = shortSha(commit.sha)

  return (
    <article
      role="region"
      aria-label={`Commit ${sha} by ${commit.author}`}
      className={classes}
    >
      <div className={styles.head}>
        <span className={styles.shaChip} aria-label={`Short sha ${sha}`}>
          <span className={styles.shaIcon} aria-hidden="true" />
          {sha}
        </span>
        <div className={styles.authorBlock}>
          <Avatar name={commit.author} src={authorAvatarSrc} tone={authorTone} size="sm" />
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>{commit.author}</span>
            {commit.authorEmail ? (
              <span className={styles.authorEmail}>{commit.authorEmail}</span>
            ) : null}
          </div>
        </div>
        {commit.signed ? (
          <span className={styles.signedChip} aria-label="Verified signature">
            <span className={styles.signedChipDot} aria-hidden="true" />
            Signed
          </span>
        ) : null}
      </div>
      <h3 className={styles.subject}>{commit.message}</h3>
      {commit.body ? <p className={styles.bodyText}>{commit.body}</p> : null}
      <div className={styles.metaRow}>
        {commit.branch ? (
          <span className={styles.branchChip}>
            <GitBranch aria-hidden="true" />
            {commit.branch}
          </span>
        ) : null}
        <time className={styles.timestamp} dateTime={commit.timestamp}>
          {commit.timestamp}
        </time>
        {actions && actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className={styles.action}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default CommitCard
