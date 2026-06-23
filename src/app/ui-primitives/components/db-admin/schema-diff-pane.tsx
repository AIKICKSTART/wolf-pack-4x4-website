"use client"

import { useMemo } from "react"

import type { SchemaDiffChange, SchemaDiffEntry } from "./db-admin-types"
import styles from "./schema-diff-pane.module.css"

interface SchemaDiffPaneProps {
  /** Label for left-side schema — e.g. "production". */
  leftLabel: string
  /** Label for right-side schema — e.g. "staging". */
  rightLabel: string
  entries: ReadonlyArray<SchemaDiffEntry>
  className?: string
}

const ROW_CLASS: Record<SchemaDiffChange, string> = {
  added: styles.diffAdded,
  removed: styles.diffRemoved,
  changed: styles.diffChanged,
  unchanged: styles.diffUnchanged,
}

const ROW_GLYPH: Record<SchemaDiffChange, string> = {
  added: "+",
  removed: "−",
  changed: "~",
  unchanged: " ",
}

export function SchemaDiffPane({
  leftLabel,
  rightLabel,
  entries,
  className,
}: SchemaDiffPaneProps) {
  const summary = useMemo(() => {
    const counts: Record<SchemaDiffChange, number> = {
      added: 0,
      removed: 0,
      changed: 0,
      unchanged: 0,
    }
    for (const entry of entries) {
      counts[entry.change] += 1
    }
    return counts
  }, [entries])

  const classes = [styles.pane, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Schema diff between ${leftLabel} and ${rightLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Schema diff</span>
        <span className={styles.labels}>
          <span>{leftLabel}</span>
          <span aria-hidden="true">↔</span>
          <span>{rightLabel}</span>
        </span>
        <div className={styles.sumChips}>
          <span className={`${styles.sumChip} ${styles.sumAdded}`}>
            +{summary.added} added
          </span>
          <span className={`${styles.sumChip} ${styles.sumRemoved}`}>
            −{summary.removed} removed
          </span>
          <span className={`${styles.sumChip} ${styles.sumChanged}`}>
            ~{summary.changed} changed
          </span>
          <span className={`${styles.sumChip} ${styles.sumUnchanged}`}>
            {summary.unchanged} same
          </span>
        </div>
      </header>
      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.columnHead}>{leftLabel}</div>
          <div className={styles.rows}>
            {entries.map((entry) => (
              <div key={`${entry.id}-l`} className={`${styles.diffRow} ${ROW_CLASS[entry.change]}`}>
                <span className={styles.glyph} aria-hidden="true">
                  {entry.change === "added" ? " " : ROW_GLYPH[entry.change]}
                </span>
                <div className={styles.rowValue}>
                  <strong>{entry.path}</strong>
                  {entry.leftValue ? (
                    <div>{entry.leftValue}</div>
                  ) : entry.change === "added" ? (
                    <div className={styles.rowEmpty}>(absent)</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.columnHead}>{rightLabel}</div>
          <div className={styles.rows}>
            {entries.map((entry) => (
              <div key={`${entry.id}-r`} className={`${styles.diffRow} ${ROW_CLASS[entry.change]}`}>
                <span className={styles.glyph} aria-hidden="true">
                  {entry.change === "removed" ? " " : ROW_GLYPH[entry.change]}
                </span>
                <div className={styles.rowValue}>
                  <strong>{entry.path}</strong>
                  {entry.rightValue ? (
                    <div>{entry.rightValue}</div>
                  ) : entry.change === "removed" ? (
                    <div className={styles.rowEmpty}>(absent)</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SchemaDiffPane
