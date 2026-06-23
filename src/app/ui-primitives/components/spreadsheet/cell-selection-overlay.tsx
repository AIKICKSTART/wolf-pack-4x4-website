"use client"

import type { CSSProperties } from "react"

import AutofillDragHandle from "./autofill-drag-handle"
import { cellRangeLabel } from "./spreadsheet-types"
import type { CellRange } from "./spreadsheet-types"
import styles from "./cell-selection-overlay.module.css"

export interface CellSelectionOverlayProps {
  /** Logical range — used as the aria-label. */
  range: CellRange
  /** Absolute position over the grid (in px relative to grid container). */
  rect: { top: number; left: number; width: number; height: number }
  /** Show the autofill drag handle in the bottom-right corner. */
  showAutofill?: boolean
  /** Display a small label plate showing range + cell count. */
  showLabel?: boolean
  onAutofillStart?: () => void
}

export function CellSelectionOverlay({
  range,
  rect,
  showAutofill = true,
  showLabel = true,
  onAutofillStart,
}: CellSelectionOverlayProps) {
  const label = cellRangeLabel(range)
  const rows = Math.abs(range.end.row - range.start.row) + 1
  const cols = Math.abs(range.end.col - range.start.col) + 1
  const cellCount = rows * cols

  const style: CSSProperties = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }

  return (
    <div
      className={styles.overlay}
      style={style}
      role="presentation"
      aria-label={`Selected range ${label}`}
    >
      <span className={styles.ring} aria-hidden="true" />
      {showLabel ? (
        <span className={styles.plate}>
          {label}
          <span className={styles.plateMeta}>{cellCount} cells</span>
        </span>
      ) : null}
      {showAutofill ? (
        <div className={styles.handleAnchor}>
          <AutofillDragHandle onDragStart={onAutofillStart} />
        </div>
      ) : null}
    </div>
  )
}

export default CellSelectionOverlay
