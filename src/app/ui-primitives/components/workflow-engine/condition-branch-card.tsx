"use client"

import { Braces, GitBranch } from "lucide-react"
import { useState } from "react"

import styles from "./condition-branch-card.module.css"

/**
 * Condition branch card — visualises an if/else gate. The expression
 * editor accepts a small JS-flavour expression (e.g. `quote.total > 200`),
 * and the two branch tiles call out the YES / NO destinations with
 * representative downstream step labels.
 */
interface ConditionBranchCardProps {
  /** Optional kicker — workflow / version scope. */
  kicker?: string
  /** Decision title — "Refund > $200?", "Roadworthy < 7 days?". */
  title: string
  /** Initial expression for the editor. */
  defaultExpression: string
  /** Label for the YES branch downstream step. */
  yesLabel: string
  /** Subtitle / service for the YES branch downstream. */
  yesService: string
  /** Label for the NO branch downstream step. */
  noLabel: string
  /** Subtitle / service for the NO branch downstream. */
  noService: string
  /** Optional hit ratio chip — drives the "X% hit YES" indicator. */
  hitRateYes?: number
  className?: string
}

export function ConditionBranchCard({
  kicker = "Condition · if / else",
  title,
  defaultExpression,
  yesLabel,
  yesService,
  noLabel,
  noService,
  hitRateYes,
  className,
}: ConditionBranchCardProps) {
  const [expression, setExpression] = useState(defaultExpression)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const yesPct = hitRateYes !== undefined ? Math.round(hitRateYes * 1000) / 10 : null
  const noPct = yesPct === null ? null : Math.round((100 - yesPct) * 10) / 10
  return (
    <section className={classes} aria-label={`Condition branch · ${title}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <GitBranch size={14} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>{kicker}</span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        {hitRateYes !== undefined ? (
          <span className={styles.rateChip}>
            {yesPct}% · YES
          </span>
        ) : null}
      </header>

      <div className={styles.editor}>
        <label htmlFor={`${title}-expr`} className={styles.editorLabel}>
          <Braces size={11} strokeWidth={2.4} aria-hidden="true" /> Expression
        </label>
        <textarea
          id={`${title}-expr`}
          className={styles.textarea}
          rows={2}
          spellCheck={false}
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
        />
      </div>

      <div className={styles.branches}>
        <article className={styles.branch} data-branch="yes" aria-label="YES branch">
          <header className={styles.branchHead}>
            <span className={styles.branchTag}>YES</span>
            {yesPct !== null ? (
              <span className={styles.branchPct}>{yesPct}%</span>
            ) : null}
          </header>
          <h5 className={styles.branchTitle}>{yesLabel}</h5>
          <span className={styles.branchService}>{yesService}</span>
        </article>
        <article className={styles.branch} data-branch="no" aria-label="NO branch">
          <header className={styles.branchHead}>
            <span className={styles.branchTag}>NO</span>
            {noPct !== null ? (
              <span className={styles.branchPct}>{noPct}%</span>
            ) : null}
          </header>
          <h5 className={styles.branchTitle}>{noLabel}</h5>
          <span className={styles.branchService}>{noService}</span>
        </article>
      </div>
    </section>
  )
}

export default ConditionBranchCard
