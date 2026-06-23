"use client"

import { Filter, X } from "lucide-react"

import type { BulkSelectionSummary } from "./bulk-ops-types"
import styles from "./bulk-select-header.module.css"

interface BulkSelectHeaderProps {
  summary: BulkSelectionSummary
  /** Label describing the unit being selected (e.g. "quote", "part"). */
  itemLabel?: string
  onSelectAll?: () => void
  onClearSelection?: () => void
  onCloseSelectionMode?: () => void
  className?: string
}

export function BulkSelectHeader({
  summary,
  itemLabel = "row",
  onSelectAll,
  onClearSelection,
  onCloseSelectionMode,
  className,
}: BulkSelectHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")
  const plural = summary.selected === 1 ? itemLabel : `${itemLabel}s`

  return (
    <section className={classes} aria-label="Bulk selection header">
      <div className={styles.countCluster}>
        <span className={styles.countChip}>
          <span className={styles.countNum}>
            {summary.selected.toLocaleString("en-US")}
          </span>
          selected
        </span>
        <span className={styles.ofTotal}>
          of {summary.totalInView.toLocaleString("en-US")} {plural}
        </span>
      </div>

      <div className={styles.center}>
        <button type="button" className={styles.linkBtn} onClick={onSelectAll}>
          Select all
        </button>
        <span className={styles.divider} aria-hidden="true" />
        <button
          type="button"
          className={styles.linkBtn}
          onClick={onClearSelection}
        >
          Clear
        </button>
        {summary.filterLabel ? (
          <>
            <span className={styles.divider} aria-hidden="true" />
            <span className={styles.filterChip}>
              <Filter size={11} strokeWidth={2.2} aria-hidden="true" />
              {summary.filterLabel}
            </span>
          </>
        ) : null}
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.close}
          aria-label="Exit selection mode"
          onClick={onCloseSelectionMode}
        >
          <X size={14} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default BulkSelectHeader
