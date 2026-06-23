"use client"

import { Download } from "lucide-react"

import type { BulkResultCounts } from "./bulk-ops-types"
import styles from "./bulk-result-summary.module.css"

interface BulkResultSummaryProps {
  /** Heading text for the result card. */
  title: string
  counts: BulkResultCounts
  /** Plain-language impact summary. */
  impactSummary: string
  /** Optional display label for when the run completed. */
  completedAtLabel?: string
  onExportResults?: () => void
  className?: string
}

export function BulkResultSummary({
  title,
  counts,
  impactSummary,
  completedAtLabel,
  onExportResults,
  className,
}: BulkResultSummaryProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const total = counts.success + counts.skipped + counts.failed
  return (
    <section className={classes} aria-label="Bulk operation result summary">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Bulk run complete</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        {completedAtLabel ? (
          <span className={styles.completedAt}>{completedAtLabel}</span>
        ) : null}
      </header>

      <div className={styles.counts} role="group" aria-label="Result counts">
        <div className={`${styles.countTile} ${styles.success}`}>
          <span className={styles.countNum}>
            {counts.success.toLocaleString("en-US")}
          </span>
          <span className={styles.countLabel}>Succeeded</span>
        </div>
        <div className={`${styles.countTile} ${styles.skipped}`}>
          <span className={styles.countNum}>
            {counts.skipped.toLocaleString("en-US")}
          </span>
          <span className={styles.countLabel}>Skipped</span>
        </div>
        <div className={`${styles.countTile} ${styles.failed}`}>
          <span className={styles.countNum}>
            {counts.failed.toLocaleString("en-US")}
          </span>
          <span className={styles.countLabel}>Failed</span>
        </div>
      </div>

      <section className={styles.impact} aria-label="Impact summary">
        <span className={styles.impactLabel}>Impact</span>
        <p className={styles.impactText}>{impactSummary}</p>
      </section>

      <div className={styles.actions}>
        <span className={styles.note}>
          {total.toLocaleString("en-US")} rows processed in total
        </span>
        <button
          type="button"
          className={styles.exportBtn}
          onClick={onExportResults}
        >
          <Download size={12} strokeWidth={2.4} aria-hidden="true" />
          Export result
        </button>
      </div>
    </section>
  )
}

export default BulkResultSummary
