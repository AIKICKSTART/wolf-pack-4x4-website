"use client"

import { useEffect, useRef, useState } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

import type { CellTone, CellValueType } from "./spreadsheet-types"
import styles from "./spreadsheet-cell.module.css"

export interface SpreadsheetCellProps {
  /** Logical cell value to display when not editing. */
  value: string
  /** Drives display formatting + edit-mode keyboard semantics. */
  type?: CellValueType
  /** Optional raw formula (string starting with =). */
  formula?: string
  /** Tone overlay applied as a tinted background — supports conditional formatting. */
  tone?: CellTone
  /** Show the cell with a focus ring (currently-active cell). */
  focused?: boolean
  /** Show the cell as part of a selected range. */
  selected?: boolean
  /** Start in edit mode. */
  editing?: boolean
  /** A1 reference, used as aria-label fallback. */
  cellRef?: string
  /** Visual row index (1-based) for aria-rowindex. */
  ariaRowIndex?: number
  /** Visual column index (1-based) for aria-colindex. */
  ariaColIndex?: number
  /** Right-align numeric/currency by default; this overrides. */
  align?: "left" | "right" | "center"
  /** Called when the user commits a new value (Enter/blur). */
  onCommit?: (next: string) => void
  /** Called when the user cancels (Escape). */
  onCancel?: () => void
}

const TONE_CLASS: Record<CellTone, string> = {
  neutral: "",
  amber: styles.toneAmber,
  green: styles.toneGreen,
  red: styles.toneRed,
  teal: styles.toneTeal,
}

const ALIGN_CLASS: Record<NonNullable<SpreadsheetCellProps["align"]>, string> = {
  left: "",
  right: styles.alignRight,
  center: styles.alignCenter,
}

function defaultAlign(type: CellValueType): "left" | "right" | "center" {
  if (type === "number" || type === "currency") {
    return "right"
  }
  if (type === "boolean") {
    return "center"
  }
  return "left"
}

export function SpreadsheetCell({
  value,
  type = "text",
  formula,
  tone = "neutral",
  focused = false,
  selected = false,
  editing: editingProp = false,
  cellRef,
  ariaRowIndex,
  ariaColIndex,
  align,
  onCommit,
  onCancel,
}: SpreadsheetCellProps) {
  const [editingState, setEditingState] = useState({
    sourceEditing: editingProp,
    editing: editingProp,
  })
  const [draft, setDraft] = useState(formula ?? value)
  const inputRef = useRef<HTMLInputElement | null>(null)

  let editing = editingState.editing

  if (editingState.sourceEditing !== editingProp) {
    editing = editingProp
    setEditingState({ sourceEditing: editingProp, editing: editingProp })
  }

  const setEditing = (next: boolean) => {
    setEditingState({ sourceEditing: editingProp, editing: next })
  }

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const resolvedAlign = align ?? defaultAlign(type)
  const cellClass = [
    styles.cell,
    TONE_CLASS[tone],
    ALIGN_CLASS[resolvedAlign],
    selected ? styles.selected : "",
    focused ? styles.focused : "",
    editing ? styles.editing : "",
    type === "formula" || formula ? styles.formula : "",
  ]
    .filter(Boolean)
    .join(" ")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value)
  }

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      setEditing(false)
      onCommit?.(draft)
    }
    if (event.key === "Escape") {
      event.preventDefault()
      setEditing(false)
      setDraft(formula ?? value)
      onCancel?.()
    }
  }

  const handleBlur = () => {
    setEditing(false)
    onCommit?.(draft)
  }

  const ariaLabel = cellRef ? `Cell ${cellRef}` : undefined

  return (
    <div
      role="gridcell"
      aria-selected={selected || undefined}
      aria-current={focused ? "true" : undefined}
      aria-rowindex={ariaRowIndex}
      aria-colindex={ariaColIndex}
      aria-label={ariaLabel}
      className={cellClass}
      data-type={type}
      data-tone={tone}
      tabIndex={focused ? 0 : -1}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles.input}
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKey}
          onBlur={handleBlur}
          inputMode={type === "number" || type === "currency" ? "decimal" : "text"}
          aria-label={ariaLabel ? `${ariaLabel} value` : "Cell value"}
        />
      ) : (
        <span className={styles.display}>
          {formula ? <span className={styles.formulaGlyph}>fx</span> : null}
          {value}
        </span>
      )}
    </div>
  )
}

export default SpreadsheetCell
