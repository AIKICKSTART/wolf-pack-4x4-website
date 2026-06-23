"use client"

import { useState } from "react"
import { X } from "lucide-react"

import type { BulkTagSuggestion } from "./bulk-ops-types"
import styles from "./bulk-tag-apply.module.css"

type ApplyMode = "add" | "replace"

interface BulkTagApplyProps {
  /** Display label for the scope. */
  scopeLabel: string
  /** Initial tag chips. */
  initialTags?: ReadonlyArray<string>
  /** Suggestions surfaced beneath the input. */
  suggestions: ReadonlyArray<BulkTagSuggestion>
  defaultMode?: ApplyMode
  onApply?: (params: { tags: ReadonlyArray<string>; mode: ApplyMode }) => void
  className?: string
}

export function BulkTagApply({
  scopeLabel,
  initialTags = [],
  suggestions,
  defaultMode = "add",
  onApply,
  className,
}: BulkTagApplyProps) {
  const [tags, setTags] = useState<ReadonlyArray<string>>(initialTags)
  const [draft, setDraft] = useState<string>("")
  const [mode, setMode] = useState<ApplyMode>(defaultMode)
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  const addTag = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    if (tags.includes(trimmed)) {
      return
    }
    setTags([...tags, trimmed])
  }

  const removeTag = (value: string) => {
    setTags(tags.filter((entry) => entry !== value))
  }

  return (
    <section className={classes} aria-label="Bulk tag apply">
      <header className={styles.head}>
        <span className={styles.kicker}>Bulk tag</span>
        <h2 className={styles.title}>Apply tags to selection</h2>
      </header>

      <div className={styles.modeRow} role="group" aria-label="Apply mode">
        <button
          type="button"
          className={styles.modeBtn}
          aria-pressed={mode === "add"}
          onClick={() => setMode("add")}
        >
          Add
        </button>
        <button
          type="button"
          className={styles.modeBtn}
          aria-pressed={mode === "replace"}
          onClick={() => setMode("replace")}
        >
          Replace
        </button>
      </div>

      <div className={styles.input}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            {tag}
            <button
              type="button"
              aria-label={`Remove tag ${tag}`}
              onClick={() => removeTag(tag)}
            >
              <X size={10} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          type="text"
          className={styles.entry}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault()
              addTag(draft)
              setDraft("")
            } else if (event.key === "Backspace" && draft.length === 0 && tags.length > 0) {
              removeTag(tags[tags.length - 1])
            }
          }}
          placeholder="Type tag and press Enter"
          aria-label="Add tag"
        />
      </div>

      <div className={styles.suggestions}>
        <span className={styles.suggestionsLabel}>Existing tags</span>
        <div className={styles.suggestionList}>
          {suggestions.map((suggestion) => {
            const alreadyAdded = tags.includes(suggestion.label)
            return (
              <button
                key={suggestion.label}
                type="button"
                className={styles.suggestionBtn}
                disabled={alreadyAdded}
                onClick={() => addTag(suggestion.label)}
              >
                {suggestion.label}
                <span className={styles.usage}>{suggestion.usage}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.actions}>
        <span className={styles.scopeHint}>Scope · {scopeLabel}</span>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => onApply?.({ tags, mode })}
        >
          {mode === "replace" ? "Replace tags" : "Add tags"}
        </button>
      </div>
    </section>
  )
}

export default BulkTagApply
