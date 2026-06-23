"use client"

import type { CellRange, MergeKind } from "./spreadsheet-types"
import { cellRangeLabel } from "./spreadsheet-types"
import styles from "./cell-merge-indicator.module.css"

export interface CellMergeIndicatorProps {
  range: CellRange
  kind?: MergeKind
  /** True when the range is already merged — flips the action label to "Unmerge". */
  merged?: boolean
  onMerge?: () => void
  onUnmerge?: () => void
}

const KIND_GLYPH: Record<MergeKind, string> = {
  horizontal: "↔",
  vertical: "↕",
  block: "▦",
  none: "·",
}

const KIND_LABEL: Record<MergeKind, string> = {
  horizontal: "Horizontal",
  vertical: "Vertical",
  block: "Block",
  none: "No merge",
}

export function CellMergeIndicator({
  range,
  kind = "block",
  merged = false,
  onMerge,
  onUnmerge,
}: CellMergeIndicatorProps) {
  const label = cellRangeLabel(range)
  const rows = Math.abs(range.end.row - range.start.row) + 1
  const cols = Math.abs(range.end.col - range.start.col) + 1
  const cellCount = rows * cols

  return (
    <div className={styles.indicator} role="status" aria-live="polite">
      <span className={styles.glyph} aria-hidden="true">
        {KIND_GLYPH[kind]}
      </span>
      <div className={styles.meta}>
        <span className={styles.label}>{label}</span>
        <span className={styles.detail}>
          {KIND_LABEL[kind]} · {cellCount} cells ({rows}r × {cols}c)
        </span>
      </div>
      {merged ? (
        <button type="button" className={styles.unmerge} onClick={onUnmerge}>
          Unmerge
        </button>
      ) : (
        <button type="button" className={styles.merge} onClick={onMerge}>
          Merge
        </button>
      )}
    </div>
  )
}

export default CellMergeIndicator
