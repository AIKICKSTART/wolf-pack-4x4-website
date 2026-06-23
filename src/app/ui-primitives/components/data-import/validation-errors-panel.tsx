"use client"

import type { ValidationErrorClass, ValidationSeverity } from "./import-types"
import styles from "./validation-errors-panel.module.css"

interface ValidationErrorsPanelProps {
  errorClasses: ReadonlyArray<ValidationErrorClass>
  totalRows: number
  onJumpToRow?: (rowNumber: number) => void
  className?: string
}

const SEVERITY_CLASS: Record<ValidationSeverity, string> = {
  blocker: styles.classBlocker,
  warning: styles.classWarning,
  info: styles.classInfo,
}

const SEVERITY_LABEL: Record<ValidationSeverity, string> = {
  blocker: "Blocker",
  warning: "Warning",
  info: "Info",
}

export function ValidationErrorsPanel({
  errorClasses,
  totalRows,
  onJumpToRow,
  className,
}: ValidationErrorsPanelProps) {
  const totalErrors = errorClasses.reduce((sum, entry) => sum + entry.count, 0)
  const hasBlockers = errorClasses.some(
    (entry) => entry.severity === "blocker" && entry.count > 0,
  )

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      role={hasBlockers ? "alert" : "region"}
      aria-live={hasBlockers ? "assertive" : "polite"}
      aria-label="Validation errors"
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Validation</span>
          <h3 className={styles.heading}>
            {totalErrors.toLocaleString()} issues across {totalRows.toLocaleString()}{" "}
            rows
          </h3>
        </div>
        <span
          className={[
            styles.summaryChip,
            hasBlockers ? styles.summaryFail : styles.summaryWarn,
          ].join(" ")}
        >
          <span aria-hidden="true">{hasBlockers ? "✕" : "!"}</span>
          {hasBlockers ? "Cannot commit" : "Review before commit"}
        </span>
      </header>

      <ul className={styles.list}>
        {errorClasses.map((entry) => (
          <li
            key={entry.id}
            className={[styles.row, SEVERITY_CLASS[entry.severity]].join(" ")}
          >
            <div className={styles.rowText}>
              <span className={styles.severityChip}>
                {SEVERITY_LABEL[entry.severity]}
              </span>
              <span className={styles.errorLabel}>{entry.label}</span>
            </div>
            <span className={styles.countChip}>
              {entry.count.toLocaleString()} rows
            </span>
            {entry.firstRowNumber !== undefined && onJumpToRow && (
              <button
                type="button"
                onClick={() => onJumpToRow(entry.firstRowNumber ?? 0)}
                className={styles.jumpButton}
              >
                Jump to row {entry.firstRowNumber}
                <span aria-hidden="true"> →</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ValidationErrorsPanel
