"use client"

import { AlertTriangle } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { CollabUser } from "./realtime-collab-types"
import styles from "./co-edit-conflict-banner.module.css"

interface CoEditConflictBannerProps {
  /** Field with conflicting edits. */
  fieldLabel: string
  /** Viewer's pending value. */
  myValue: string
  /** Other collaborator who edited. */
  otherUser: CollabUser
  /** Other collaborator's value. */
  otherValue: string
  /** Optional human-relative time the conflict began. */
  conflictAt?: string
  /** Use my version handler. */
  onKeepMine?: () => void
  /** Use their version handler. */
  onKeepTheirs?: () => void
  /** Merge / open compare handler. */
  onMerge?: () => void
  className?: string
}

export function CoEditConflictBanner({
  fieldLabel,
  myValue,
  otherUser,
  otherValue,
  conflictAt,
  onKeepMine,
  onKeepTheirs,
  onMerge,
  className,
}: CoEditConflictBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="alert" aria-live="assertive">
      <header className={styles.head}>
        <span className={styles.iconWrap} aria-hidden="true">
          <AlertTriangle size={14} strokeWidth={2.4} />
        </span>
        <div className={styles.headCopy}>
          <h4 className={styles.title}>Conflicting edits on this field</h4>
          <p className={styles.subtitle}>
            <span className={styles.fieldChip}>{fieldLabel}</span>
            {conflictAt && <span className={styles.timestamp}>· {conflictAt}</span>}
          </p>
        </div>
      </header>

      <div className={styles.versions}>
        <article className={styles.version} data-side="mine">
          <div className={styles.versionHead}>
            <Chip label="Yours" tone="teal" />
          </div>
          <p className={styles.value}>{myValue}</p>
          {onKeepMine && (
            <button
              type="button"
              className={`${styles.cta} ${styles.ctaPrimary}`}
              onClick={onKeepMine}
            >
              Keep my version
            </button>
          )}
        </article>

        <article className={styles.version} data-side="theirs">
          <div className={styles.versionHead}>
            <Avatar
              name={otherUser.name}
              src={otherUser.avatar}
              size="sm"
              tone={otherUser.tone ?? "amber"}
            />
            <Chip label={`${otherUser.name}'s`} tone="amber" />
          </div>
          <p className={styles.value}>{otherValue}</p>
          {onKeepTheirs && (
            <button
              type="button"
              className={styles.cta}
              onClick={onKeepTheirs}
            >
              Keep their version
            </button>
          )}
        </article>
      </div>

      {onMerge && (
        <footer className={styles.foot}>
          <button type="button" className={styles.mergeBtn} onClick={onMerge}>
            Merge in compare view
          </button>
        </footer>
      )}
    </div>
  )
}

export default CoEditConflictBanner
