"use client"

import { useState } from "react"
import type { ChangeEvent } from "react"

import styles from "./find-replace-bar.module.css"

export type FindScope = "sheet" | "workbook" | "selection"

export interface FindReplaceBarProps {
  /** Show the bar in collapsed (slide-in) state. */
  open?: boolean
  initialFind?: string
  initialReplace?: string
  initialScope?: FindScope
  initialCaseSensitive?: boolean
  resultsCount?: number
  onReplace?: (find: string, replace: string) => void
  onReplaceAll?: (find: string, replace: string) => void
  onClose?: () => void
}

const SCOPE_LABEL: Record<FindScope, string> = {
  sheet: "Sheet",
  workbook: "Workbook",
  selection: "Selection",
}

export function FindReplaceBar({
  open = true,
  initialFind = "",
  initialReplace = "",
  initialScope = "sheet",
  initialCaseSensitive = false,
  resultsCount,
  onReplace,
  onReplaceAll,
  onClose,
}: FindReplaceBarProps) {
  const [find, setFind] = useState(initialFind)
  const [replace, setReplace] = useState(initialReplace)
  const [scope, setScope] = useState<FindScope>(initialScope)
  const [caseSensitive, setCaseSensitive] = useState(initialCaseSensitive)

  const cycleScope = () => {
    setScope((current) => {
      if (current === "sheet") {
        return "workbook"
      }
      if (current === "workbook") {
        return "selection"
      }
      return "sheet"
    })
  }

  const handleFind = (event: ChangeEvent<HTMLInputElement>) => {
    setFind(event.target.value)
  }

  const handleReplace = (event: ChangeEvent<HTMLInputElement>) => {
    setReplace(event.target.value)
  }

  return (
    <div className={`${styles.bar} ${open ? styles.open : ""}`} role="search" aria-label="Find and replace">
      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Find</span>
          <input
            className={styles.input}
            value={find}
            onChange={handleFind}
            placeholder="Search…"
            aria-label="Find term"
          />
          {typeof resultsCount === "number" ? (
            <span className={styles.results}>{resultsCount} matches</span>
          ) : null}
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Replace</span>
          <input
            className={styles.input}
            value={replace}
            onChange={handleReplace}
            placeholder="Replacement…"
            aria-label="Replacement term"
          />
        </label>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.toggle} ${caseSensitive ? styles.toggleActive : ""}`}
          onClick={() => setCaseSensitive((prev) => !prev)}
          aria-pressed={caseSensitive}
        >
          Aa
        </button>
        <button
          type="button"
          className={styles.scope}
          onClick={cycleScope}
          aria-label={`Scope: ${SCOPE_LABEL[scope]}`}
        >
          {SCOPE_LABEL[scope]}
        </button>
        <button
          type="button"
          className={styles.actionSecondary}
          onClick={() => onReplace?.(find, replace)}
        >
          Replace
        </button>
        <button
          type="button"
          className={styles.actionPrimary}
          onClick={() => onReplaceAll?.(find, replace)}
        >
          Replace all
        </button>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close find and replace"
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FindReplaceBar
