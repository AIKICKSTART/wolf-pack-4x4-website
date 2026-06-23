"use client"

import { AlertCircle, Plus } from "lucide-react"
import { useState, type FormEvent } from "react"

import type { AssetTag } from "./asset-library-types"

import styles from "./tag-manager.module.css"

interface TagManagerProps {
  tags: ReadonlyArray<AssetTag>
  duplicateSuggestions?: ReadonlyArray<{
    id: string
    /** Names of tags that should be merged. */
    names: ReadonlyArray<string>
  }>
  /** Hex colors offered in the new-tag color picker. */
  palette?: ReadonlyArray<string>
  onAdd?: (name: string, color: string) => void
  onMerge?: (suggestionId: string) => void
  className?: string
}

const DEFAULT_PALETTE: ReadonlyArray<string> = [
  "#e62028",
  "#ffc14f",
  "#40bcff",
  "#37d67a",
  "#a07bff",
  "#ff7da3",
  "#9fb1c1",
]

export function TagManager({
  tags,
  duplicateSuggestions = [],
  palette = DEFAULT_PALETTE,
  onAdd,
  onMerge,
  className,
}: TagManagerProps) {
  const [draft, setDraft] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>(palette[0] ?? "#e62028")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed) return
    onAdd?.(trimmed, selectedColor)
    setDraft("")
  }

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-label="Tag manager"
    >
      <header className={styles.header}>
        <span className={styles.kicker}>Tags</span>
        <h3 className={styles.title}>{tags.length} tags in use</h3>
      </header>

      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <span
              className={styles.tag}
              style={{
                ["--tag-color" as string]: tag.color,
              }}
            >
              <span className={styles.tagDot} aria-hidden="true" />
              <span className={styles.tagName}>{tag.name}</span>
              {typeof tag.count === "number" ? (
                <span className={styles.tagCount}>{tag.count}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <form className={styles.composer} onSubmit={handleSubmit}>
        <label className={styles.composerLabel} htmlFor="tag-manager-input">
          Add a tag
        </label>
        <div className={styles.composerRow}>
          <input
            id="tag-manager-input"
            className={styles.input}
            type="text"
            placeholder="e.g. workshop-bay-2"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={styles.addBtn}>
            <Plus size={14} strokeWidth={2.2} aria-hidden="true" />
            Add
          </button>
        </div>

        <div
          className={styles.palette}
          role="radiogroup"
          aria-label="Tag colour"
        >
          {palette.map((color) => {
            const isSelected = color === selectedColor
            return (
              <button
                key={color}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`Color ${color}`}
                className={[
                  styles.swatch,
                  isSelected ? styles.swatchSelected : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ ["--swatch-color" as string]: color }}
                onClick={() => setSelectedColor(color)}
              />
            )
          })}
        </div>
      </form>

      {duplicateSuggestions.length > 0 ? (
        <div className={styles.suggestions}>
          <span className={styles.suggestionsTitle}>
            <AlertCircle size={12} strokeWidth={2.2} aria-hidden="true" />
            Possible duplicates
          </span>
          <ul className={styles.suggestionsList}>
            {duplicateSuggestions.map((suggestion) => (
              <li key={suggestion.id} className={styles.suggestionRow}>
                <span>{suggestion.names.join(" • ")}</span>
                <button
                  type="button"
                  className={styles.mergeBtn}
                  onClick={() => onMerge?.(suggestion.id)}
                >
                  Merge
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

export default TagManager
