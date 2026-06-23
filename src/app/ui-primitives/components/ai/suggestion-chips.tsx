"use client"

import { useCallback, useRef, type KeyboardEvent } from "react"

import styles from "./suggestion-chips.module.css"

export interface SuggestionChip {
  id: string
  label: string
  prompt: string
}

interface SuggestionChipsProps {
  chips: ReadonlyArray<SuggestionChip>
  onSelect: (chip: SuggestionChip) => void
  ariaLabel?: string
  className?: string
}

export function SuggestionChips({
  chips,
  onSelect,
  ariaLabel = "Suggested prompts",
  className,
}: SuggestionChipsProps) {
  const listRef = useRef<HTMLUListElement | null>(null)

  const focusAt = useCallback((index: number) => {
    const list = listRef.current
    if (!list) {
      return
    }
    const buttons = list.querySelectorAll<HTMLButtonElement>("button[data-chip]")
    const node = buttons[index]
    if (node) {
      node.focus()
    }
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      focusAt((index + 1) % chips.length)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      focusAt((index - 1 + chips.length) % chips.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      focusAt(0)
    } else if (event.key === "End") {
      event.preventDefault()
      focusAt(chips.length - 1)
    }
  }

  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <ul ref={listRef} className={styles.list} role="list">
        {chips.map((chip, index) => (
          <li key={chip.id} className={styles.item}>
            <button
              type="button"
              data-chip
              className={styles.chip}
              onClick={() => onSelect(chip)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className={styles.chipIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.chipLabel}>{chip.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SuggestionChips
