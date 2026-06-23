"use client"

import styles from "./row-header.module.css"

export interface RowHeaderProps {
  /** 1-based row number to display. */
  number: number
  /** 1-based aria-rowindex. */
  ariaRowIndex?: number
  selected?: boolean
  frozen?: boolean
  /** Override pixel height (rendered as inline style on the host row). */
  height?: number
  onSelect?: () => void
  onFreezeToggle?: () => void
  onResizeStart?: () => void
}

export function RowHeader({
  number,
  ariaRowIndex,
  selected = false,
  frozen = false,
  height,
  onSelect,
  onFreezeToggle,
  onResizeStart,
}: RowHeaderProps) {
  const classes = [
    styles.header,
    selected ? styles.selected : "",
    frozen ? styles.frozen : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      role="rowheader"
      aria-rowindex={ariaRowIndex}
      aria-selected={selected || undefined}
      className={classes}
      style={height ? { height, minHeight: height } : undefined}
    >
      <button
        type="button"
        className={styles.number}
        onClick={onSelect}
        aria-label={`Select row ${number}`}
      >
        {number}
      </button>
      <button
        type="button"
        className={`${styles.freeze} ${frozen ? styles.freezeActive : ""}`}
        onClick={onFreezeToggle}
        aria-pressed={frozen}
        aria-label={`${frozen ? "Unfreeze" : "Freeze"} row ${number}`}
      >
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M5 1v8M1 5h8" />
        </svg>
      </button>
      <div
        className={styles.resizeHandle}
        onMouseDown={onResizeStart}
        onTouchStart={onResizeStart}
        role="separator"
        aria-orientation="horizontal"
        aria-label={`Resize row ${number}`}
      />
    </div>
  )
}

export default RowHeader
