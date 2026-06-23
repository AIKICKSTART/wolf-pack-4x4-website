import { GitFork } from "lucide-react"

import type { BranchProtection } from "./code-diff-types"
import styles from "./branch-indicator.module.css"

export interface BranchIndicatorProps {
  /** Branch name — e.g. "feature/quote-instant-pricing". */
  name: string
  /** Commits ahead of base. */
  ahead?: number
  /** Commits behind base. */
  behind?: number
  /** Protection rule applied to this branch. */
  protection?: BranchProtection
  className?: string
}

const PROTECTION_LABEL: Record<BranchProtection, string> = {
  none: "Open",
  "review-required": "Review",
  "admins-only": "Admin",
}

export function BranchIndicator({
  name,
  ahead,
  behind,
  protection = "none",
  className,
}: BranchIndicatorProps) {
  const classes = [styles.indicator, className].filter(Boolean).join(" ")
  const showCounts = typeof ahead === "number" || typeof behind === "number"
  const showProtection = protection !== "none"
  const protectionClasses = [
    styles.protection,
    protection === "admins-only" ? styles.protectionAdmins : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} role="group" aria-label={`Branch ${name}`}>
      <GitFork className={styles.forkIcon} aria-hidden="true" />
      <span className={styles.name}>{name}</span>
      {showCounts ? (
        <>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.counts}>
            {typeof ahead === "number" ? (
              <span className={styles.ahead} aria-label={`${ahead} commits ahead`}>
                <span aria-hidden="true">↑</span>
                {ahead}
              </span>
            ) : null}
            {typeof behind === "number" ? (
              <span className={styles.behind} aria-label={`${behind} commits behind`}>
                <span aria-hidden="true">↓</span>
                {behind}
              </span>
            ) : null}
          </span>
        </>
      ) : null}
      {showProtection ? (
        <span className={protectionClasses} aria-label={`Protection: ${PROTECTION_LABEL[protection]}`}>
          <span className={styles.protectionDot} aria-hidden="true" />
          {PROTECTION_LABEL[protection]}
        </span>
      ) : null}
    </span>
  )
}

export default BranchIndicator
