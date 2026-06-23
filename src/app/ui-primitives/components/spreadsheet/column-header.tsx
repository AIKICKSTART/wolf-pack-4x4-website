"use client"

import { useState } from "react"

import type { SortDirection } from "./spreadsheet-types"
import styles from "./column-header.module.css"

export interface ColumnHeaderProps {
  /** A1 letter (A, B, C...). */
  letter: string
  /** Domain-specific header label (e.g. "SKU"). */
  label?: string
  /** Column index (1-based) for aria-colindex. */
  ariaColIndex?: number
  sort?: SortDirection
  /** Number of active filter chips applied to this column. */
  filterCount?: number
  width?: number
  frozen?: boolean
  onSortToggle?: () => void
  onFilterToggle?: () => void
  onFreezeToggle?: () => void
  onResizeStart?: () => void
}

function ArrowUp() {
  return (
    <svg viewBox="0 0 8 6" fill="currentColor" aria-hidden="true">
      <path d="M4 0L8 6H0z" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 8 6" fill="currentColor" aria-hidden="true">
      <path d="M0 0h8L4 6z" />
    </svg>
  )
}

const ARIA_SORT: Record<SortDirection, "ascending" | "descending" | "none"> = {
  asc: "ascending",
  desc: "descending",
  none: "none",
}

export function ColumnHeader({
  letter,
  label,
  ariaColIndex,
  sort = "none",
  filterCount = 0,
  width,
  frozen = false,
  onSortToggle,
  onFilterToggle,
  onFreezeToggle,
  onResizeStart,
}: ColumnHeaderProps) {
  const [filterOpen, setFilterOpen] = useState(false)

  const handleFilter = () => {
    setFilterOpen((prev) => !prev)
    onFilterToggle?.()
  }

  return (
    <div
      role="columnheader"
      aria-sort={ARIA_SORT[sort]}
      aria-colindex={ariaColIndex}
      className={`${styles.header} ${frozen ? styles.frozen : ""}`}
      style={width ? { width, minWidth: width } : undefined}
    >
      <span className={styles.letter} aria-hidden="true">
        {letter}
      </span>
      <button
        type="button"
        className={styles.label}
        onClick={onSortToggle}
        aria-label={`Sort by ${label ?? letter}`}
      >
        <span className={styles.labelText}>{label ?? letter}</span>
        <span className={styles.sortGlyph} data-active={sort}>
          <ArrowUp />
          <ArrowDown />
        </span>
      </button>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.filter}
          onClick={handleFilter}
          aria-pressed={filterOpen}
          aria-label={`Filter ${label ?? letter}${filterCount ? `, ${filterCount} active` : ""}`}
        >
          <svg viewBox="0 0 12 10" fill="currentColor" aria-hidden="true">
            <path d="M0 0h12L7 5v5l-2 -1V5z" />
          </svg>
          {filterCount > 0 ? <span className={styles.filterBadge}>{filterCount}</span> : null}
        </button>
        <button
          type="button"
          className={`${styles.freeze} ${frozen ? styles.freezeActive : ""}`}
          onClick={onFreezeToggle}
          aria-pressed={frozen}
          aria-label={`${frozen ? "Unfreeze" : "Freeze"} column ${letter}`}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M6 1v10M1 6h10M2.4 2.4l7.2 7.2M9.6 2.4l-7.2 7.2" />
          </svg>
        </button>
      </div>
      <div
        className={styles.resizeHandle}
        onMouseDown={onResizeStart}
        onTouchStart={onResizeStart}
        role="separator"
        aria-orientation="vertical"
        aria-label={`Resize column ${letter}`}
      />
      {filterOpen ? (
        <div className={styles.filterPopover} role="dialog" aria-label="Filter options">
          <span className={styles.popKicker}>Filter</span>
          <div className={styles.popChips}>
            <span className={styles.popChip}>Contains…</span>
            <span className={styles.popChip}>Top 10</span>
            <span className={styles.popChip}>Blanks</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ColumnHeader
