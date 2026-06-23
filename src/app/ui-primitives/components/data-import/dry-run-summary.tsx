"use client"

import styles from "./dry-run-summary.module.css"

export type DryRunImpactTone = "neutral" | "positive" | "warning" | "negative"

interface DryRunOutcomeCount {
  label: string
  count: number
  tone: "create" | "update" | "skip" | "fail"
}

interface DryRunSummaryProps {
  title?: string
  totalRows: number
  outcomes: ReadonlyArray<DryRunOutcomeCount>
  impactLabel: string
  impactTone: DryRunImpactTone
  commitLabel: string
  disabled?: boolean
  onCommit?: () => void
  className?: string
}

const OUTCOME_CLASS: Record<DryRunOutcomeCount["tone"], string> = {
  create: styles.tileCreate,
  update: styles.tileUpdate,
  skip: styles.tileSkip,
  fail: styles.tileFail,
}

const IMPACT_CLASS: Record<DryRunImpactTone, string> = {
  neutral: styles.impactNeutral,
  positive: styles.impactPositive,
  warning: styles.impactWarning,
  negative: styles.impactNegative,
}

export function DryRunSummary({
  title = "Dry-run summary",
  totalRows,
  outcomes,
  impactLabel,
  impactTone,
  commitLabel,
  disabled,
  onCommit,
  className,
}: DryRunSummaryProps) {
  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label={title}
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Dry-run</span>
          <h3 className={styles.heading}>{title}</h3>
          <p className={styles.subline}>
            {totalRows.toLocaleString()} rows evaluated · no writes performed yet
          </p>
        </div>
        <span className={[styles.impactChip, IMPACT_CLASS[impactTone]].join(" ")}>
          {impactLabel}
        </span>
      </header>

      <ul className={styles.tiles}>
        {outcomes.map((outcome) => (
          <li
            key={outcome.label}
            className={[styles.tile, OUTCOME_CLASS[outcome.tone]].join(" ")}
          >
            <span className={styles.tileCount}>
              {outcome.count.toLocaleString()}
            </span>
            <span className={styles.tileLabel}>{outcome.label}</span>
          </li>
        ))}
      </ul>

      <footer className={styles.foot}>
        <p className={styles.warning}>
          Committing will write all create/update rows. Failed rows will be
          quarantined.
        </p>
        <button
          type="button"
          className={styles.commitButton}
          onClick={onCommit}
          disabled={disabled}
        >
          {commitLabel}
          <span aria-hidden="true"> →</span>
        </button>
      </footer>
    </section>
  )
}

export type { DryRunOutcomeCount }
export default DryRunSummary
