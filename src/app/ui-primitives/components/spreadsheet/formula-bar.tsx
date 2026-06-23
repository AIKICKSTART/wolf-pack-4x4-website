"use client"

import { useRef, useState } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"

import styles from "./formula-bar.module.css"

export interface FormulaBarProps {
  /** A1 reference of the active cell (e.g. "C7"). */
  cellRef: string
  /** Initial formula or value. */
  value?: string
  /** Quick-pick functions shown in the helper rail. */
  functions?: ReadonlyArray<string>
  /** Disable input + commit. */
  readOnly?: boolean
  onCommit?: (next: string) => void
  onCancel?: () => void
  onFunctionPick?: (fn: string) => void
}

const DEFAULT_FUNCTIONS: ReadonlyArray<string> = [
  "SUM",
  "AVERAGE",
  "VLOOKUP",
  "IF",
  "TEXT",
  "ROUND",
]

export function FormulaBar({
  cellRef,
  value = "",
  functions = DEFAULT_FUNCTIONS,
  readOnly = false,
  onCommit,
  onCancel,
  onFunctionPick,
}: FormulaBarProps) {
  const [draftState, setDraftState] = useState({ sourceValue: value, draft: value })
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  let draft = draftState.draft

  if (draftState.sourceValue !== value) {
    draft = value
    setDraftState({ sourceValue: value, draft: value })
  }

  const setDraft = (next: string) => {
    setDraftState({ sourceValue: value, draft: next })
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(event.target.value)
  }

  const handleKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onCommit?.(draft)
    }
    if (event.key === "Escape") {
      event.preventDefault()
      setDraft(value)
      onCancel?.()
    }
  }

  const handleFunctionClick = (fn: string) => {
    onFunctionPick?.(fn)
    const next = draft ? `${draft}${fn}(` : `=${fn}(`
    setDraft(next)
    textareaRef.current?.focus()
  }

  return (
    <div className={styles.bar} role="group" aria-label="Formula bar">
      <div className={styles.refChip} aria-label={`Active cell ${cellRef}`}>
        <span className={styles.refLetter}>A1</span>
        <span className={styles.refValue}>{cellRef}</span>
      </div>
      <span className={styles.fx} aria-hidden="true">
        fx
      </span>
      <textarea
        ref={textareaRef}
        className={styles.input}
        rows={1}
        value={draft}
        onChange={handleChange}
        onKeyDown={handleKey}
        readOnly={readOnly}
        spellCheck={false}
        placeholder="Enter value or =FORMULA(...)"
        aria-label={`Value or formula for ${cellRef}`}
      />
      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.action} ${styles.cancel}`}
          onClick={() => {
            setDraft(value)
            onCancel?.()
          }}
          aria-label="Cancel edit"
          disabled={readOnly}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.action} ${styles.commit}`}
          onClick={() => onCommit?.(draft)}
          aria-label="Commit edit"
          disabled={readOnly}
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M2 6.5l3 3 5-7" />
          </svg>
        </button>
      </div>
      <div className={styles.helper}>
        <span className={styles.helperLabel}>Quick fn</span>
        <div className={styles.helperList}>
          {functions.map((fn) => (
            <button
              key={fn}
              type="button"
              className={styles.helperChip}
              onClick={() => handleFunctionClick(fn)}
            >
              {fn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FormulaBar
