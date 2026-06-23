"use client"

import { Plus, X } from "lucide-react"
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import type { SupportTone } from "../support/support-types"

import type { ColorTag } from "./unified-inbox-types"
import styles from "./tag-manager-strip.module.css"

interface TagManagerStripProps {
  /** Tags currently attached to the conversation. */
  selected: ReadonlyArray<ColorTag>
  /** Existing tag library used to power the autocomplete menu. */
  suggestions: ReadonlyArray<ColorTag>
  /** Triggered when the operator adds or removes a tag. */
  onChange?: (tags: ReadonlyArray<ColorTag>) => void
  /** Default tone applied to net-new tags created from the input. */
  defaultTone?: SupportTone
  className?: string
}

function deriveTone(label: string, defaultTone: SupportTone): SupportTone {
  const lower = label.toLowerCase()
  if (/(urgent|breach|escalat|complaint)/.test(lower)) return "red"
  if (/(warranty|refund|hold)/.test(lower)) return "amber"
  if (/(booking|quote|paid)/.test(lower)) return "teal"
  if (/(installed|delivered|happy|positive)/.test(lower)) return "green"
  if (/(vip|premium|loyal)/.test(lower)) return "violet"
  return defaultTone
}

export function TagManagerStrip({
  selected,
  suggestions,
  onChange,
  defaultTone = "neutral",
  className,
}: TagManagerStripProps) {
  const [tags, setTags] = useState<ReadonlyArray<ColorTag>>(selected)
  const [draft, setDraft] = useState<string>("")
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const inputId = useId()
  const listboxId = useId()

  const apply = useCallback(
    (next: ReadonlyArray<ColorTag>) => {
      setTags(next)
      onChange?.(next)
    },
    [onChange],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setDraft(value)
    setMenuOpen(value.length > 0)
  }

  const commitFromDraft = () => {
    const trimmed = draft.trim()
    if (trimmed.length === 0) return
    if (tags.some((tag) => tag.label.toLowerCase() === trimmed.toLowerCase())) {
      setDraft("")
      return
    }
    const existing = suggestions.find(
      (tag) => tag.label.toLowerCase() === trimmed.toLowerCase(),
    )
    const tag: ColorTag = existing ?? {
      id: `tag-${trimmed.toLowerCase().replace(/\s+/g, "-")}`,
      label: trimmed,
      tone: deriveTone(trimmed, defaultTone),
    }
    apply([...tags, tag])
    setDraft("")
    setMenuOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      commitFromDraft()
      return
    }
    if (event.key === "Backspace" && draft.length === 0 && tags.length > 0) {
      event.preventDefault()
      apply(tags.slice(0, -1))
    }
  }

  const removeTag = (id: string) => {
    apply(tags.filter((tag) => tag.id !== id))
  }

  const filteredSuggestions = useMemo(() => {
    const lower = draft.trim().toLowerCase()
    if (lower.length === 0) return [] as ReadonlyArray<ColorTag>
    const selectedIds = new Set(tags.map((tag) => tag.id))
    return suggestions
      .filter(
        (tag) =>
          tag.label.toLowerCase().includes(lower) && !selectedIds.has(tag.id),
      )
      .slice(0, 6)
  }, [draft, suggestions, tags])

  const handlePickSuggestion = (tag: ColorTag) => {
    apply([...tags, tag])
    setDraft("")
    setMenuOpen(false)
  }

  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Tag manager">
      <div className={styles.head}>
        <label htmlFor={inputId} className={styles.label}>
          Tags
        </label>
        <span className={styles.hint}>
          Press <kbd className={styles.kbd}>Enter</kbd> to add
        </span>
      </div>
      <div className={styles.field}>
        <ul className={styles.tags} aria-label="Selected tags">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className={[styles.tag, styles[`tone_${tag.tone}`]]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.tagLabel}>{tag.label}</span>
              <button
                type="button"
                className={styles.tagRemove}
                aria-label={`Remove ${tag.label}`}
                onClick={() => removeTag(tag.id)}
              >
                <X size={11} strokeWidth={2.6} aria-hidden="true" />
              </button>
            </li>
          ))}
          <li className={styles.inputWrap}>
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
            <input
              id={inputId}
              className={styles.input}
              type="text"
              spellCheck={false}
              autoComplete="off"
              role="combobox"
              aria-controls={listboxId}
              aria-expanded={menuOpen && filteredSuggestions.length > 0}
              aria-autocomplete="list"
              value={draft}
              placeholder={tags.length === 0 ? "Add tag…" : ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setMenuOpen(draft.length > 0)}
              onBlur={() => {
                window.setTimeout(() => setMenuOpen(false), 120)
              }}
            />
          </li>
        </ul>
      </div>
      {menuOpen && filteredSuggestions.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          className={styles.suggestionMenu}
        >
          {filteredSuggestions.map((tag) => (
            <li key={tag.id}>
              <button
                type="button"
                role="option"
                aria-selected={false}
                className={styles.suggestionRow}
                onMouseDown={(event) => {
                  event.preventDefault()
                  handlePickSuggestion(tag)
                }}
              >
                <span
                  className={[styles.swatch, styles[`tone_${tag.tone}`]]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
                <span className={styles.suggestionLabel}>{tag.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default TagManagerStrip
