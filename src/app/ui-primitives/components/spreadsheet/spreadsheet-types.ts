/**
 * Shared types for the spreadsheet primitive group.
 *
 * Used by every component under `spreadsheet/` so cell payloads, sort state,
 * merges, conditional-formatting rules, and validation rules speak a single
 * vocabulary without leaking `any`.
 */

export type CellValueType = "text" | "number" | "currency" | "date" | "formula" | "boolean"

export type SortDirection = "asc" | "desc" | "none"

export type MergeKind = "horizontal" | "vertical" | "block" | "none"

export type ConditionalFormatKind =
  | "background-tone"
  | "text-color"
  | "icon-set"
  | "data-bar"

export type ValidationRuleKind = "list" | "range" | "regex" | "date" | "custom-formula"

export interface CellRef {
  /** Column index, 0 = A. */
  col: number
  /** Row index, 0 = row 1. */
  row: number
}

export interface CellRange {
  start: CellRef
  end: CellRef
}

export type CellTone = "neutral" | "amber" | "green" | "red" | "teal"

/**
 * Convert a 0-based column index into A1 notation (A, B, ..., Z, AA, AB...).
 */
export function columnLabel(col: number): string {
  if (col < 0) {
    return ""
  }
  let n = col
  let label = ""
  while (n >= 0) {
    label = String.fromCharCode(65 + (n % 26)) + label
    n = Math.floor(n / 26) - 1
  }
  return label
}

/** Convert a cell reference into A1 notation. */
export function cellRefLabel(ref: CellRef): string {
  return `${columnLabel(ref.col)}${ref.row + 1}`
}

/** Convert a range into A1:A2 notation. */
export function cellRangeLabel(range: CellRange): string {
  const a = cellRefLabel(range.start)
  const b = cellRefLabel(range.end)
  if (a === b) {
    return a
  }
  return `${a}:${b}`
}
