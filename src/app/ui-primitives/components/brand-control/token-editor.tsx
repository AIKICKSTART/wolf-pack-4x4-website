"use client"

import { History, RotateCcw, Sparkles } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"
// Note: selection state is derived per-category so we avoid a setState-in-effect cascade.

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces"

import type { BrandToken, BrandTokenCategory, BrandTokenHistoryEntry } from "./brand-control-types"
import styles from "./brand-control.module.css"

const CATEGORIES: ReadonlyArray<{ id: BrandTokenCategory; label: string }> = [
  { id: "color", label: "Colour" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "shadow", label: "Shadow" },
  { id: "font", label: "Font" },
]

const CATEGORY_TONE: Record<BrandTokenCategory, "red" | "amber" | "teal" | "green" | "neutral"> = {
  color: "red",
  spacing: "teal",
  radius: "amber",
  shadow: "neutral",
  font: "green",
}

export interface TokenEditorProps {
  tokens: ReadonlyArray<BrandToken>
  history?: ReadonlyArray<BrandTokenHistoryEntry>
  defaultSelectedId?: string
  /**
   * Callback whenever the user commits a new value. The host gets a clone of
   * the affected token with the updated value — the editor itself does not
   * persist anything.
   */
  onChange?: (next: BrandToken) => void
  caption?: string
  className?: string
}

function isColorValue(value: string): boolean {
  return /^#[0-9a-f]{3,8}$/i.test(value)
}

function formatPreviewStyle(token: BrandToken): CSSProperties | undefined {
  if (token.category === "color" && isColorValue(token.value)) {
    return { background: token.value }
  }
  if (token.category === "radius") {
    return { borderRadius: token.value, background: "var(--primitive-line-strong)" }
  }
  if (token.category === "shadow") {
    return { boxShadow: token.value, background: "var(--primitive-panel-strong)" }
  }
  if (token.category === "spacing") {
    return { padding: token.value, background: "var(--primitive-line)" }
  }
  return undefined
}

/**
 * Token editor — colour/spacing/radius/shadow/font grid with a live preview
 * surface and a tiny history rail. Edits cascade through the scoped CSS
 * custom property so any descendant that reads `var(--primitive-*)` repaints.
 */
export function TokenEditor({
  tokens,
  history = [],
  defaultSelectedId,
  onChange,
  caption,
  className,
}: TokenEditorProps) {
  const [activeCategory, setActiveCategory] = useState<BrandTokenCategory>(
    tokens[0]?.category ?? "color"
  )
  const filtered = useMemo(
    () => tokens.filter((t) => t.category === activeCategory),
    [tokens, activeCategory]
  )
  const initialId = defaultSelectedId ?? filtered[0]?.id ?? tokens[0]?.id ?? ""
  const [requestedId, setRequestedId] = useState<string>(initialId)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const seed: Record<string, string> = {}
    for (const token of tokens) {
      seed[token.id] = token.value
    }
    return seed
  })
  const previewRef = useRef<HTMLDivElement | null>(null)

  // Derive the active selection so a category switch can't leave us pointing
  // at a token outside the current grid — avoids a setState-in-effect cascade.
  const selectedId =
    filtered.find((t) => t.id === requestedId)?.id ?? filtered[0]?.id ?? requestedId

  // Push current values onto the preview wrapper as inline custom props.
  useEffect(() => {
    const node = previewRef.current
    if (!node) return
    for (const token of tokens) {
      const value = values[token.id] ?? token.value
      node.style.setProperty(token.cssVar, value)
    }
  }, [tokens, values])

  const selected = useMemo(
    () => tokens.find((t) => t.id === selectedId) ?? tokens[0],
    [tokens, selectedId]
  )

  const handleValueCommit = useCallback(
    (token: BrandToken, raw: string) => {
      setValues((prev) => ({ ...prev, [token.id]: raw }))
      onChange?.({ ...token, value: raw })
    },
    [onChange]
  )

  const handleReset = useCallback(
    (token: BrandToken) => {
      handleValueCommit(token, token.value)
    },
    [handleValueCommit]
  )

  const currentValue = selected ? values[selected.id] ?? selected.value : ""

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label="Design token editor"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Sparkles size={12} aria-hidden="true" />
            Umbrella · Tokens
          </span>
          <h3 className={styles.title}>Token editor</h3>
          <p className={styles.subtitle}>
            One change cascades to every primitive that reads the token.
          </p>
        </div>
        <span className={`${styles.tag} ${styles.tagRed}`}>
          {tokens.length} tokens
        </span>
      </header>

      <div className={styles.metaRow} role="tablist" aria-label="Token category">
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            tone={CATEGORY_TONE[category.id]}
            selected={activeCategory === category.id}
            onSelect={() => setActiveCategory(category.id)}
          />
        ))}
      </div>

      <div className={styles.tokenGrid}>
        {filtered.map((token) => {
          const current = values[token.id] ?? token.value
          const isSelected = token.id === selectedId
          const cellClasses = [
            styles.tokenCell,
            isSelected && styles.tokenCellSelected,
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <button
              type="button"
              key={token.id}
              className={cellClasses}
              onClick={() => setRequestedId(token.id)}
              aria-pressed={isSelected}
              aria-label={`Select ${token.label}`}
            >
              <div className={styles.tokenCellRow}>
                <span
                  className={styles.swatch}
                  style={formatPreviewStyle({ ...token, value: current })}
                  aria-hidden="true"
                />
                <span className={styles.tokenCellLabel}>{token.label}</span>
              </div>
              <span className={styles.tokenCellValue}>{current}</span>
              <span className={styles.tinyLabel}>
                {token.consumers ?? 0} consumers
              </span>
            </button>
          )
        })}
      </div>

      {selected && (
        <GlassSurface tone="obsidian" intensity="low">
          <div className={styles.livePreview} ref={previewRef}>
            <span className={styles.tinyLabel}>Live cascade preview</span>
            <h4 className={styles.livePreviewHeading}>
              {selected.label.toUpperCase()}
            </h4>
            <p className={styles.livePreviewBody}>
              {selected.description ??
                "Edit the value below — every primitive in the cascade repaints in the same frame."}
            </p>
            <div className={styles.flex}>
              {selected.category === "color" && isColorValue(currentValue) && (
                <input
                  type="color"
                  className={styles.colorInput}
                  value={currentValue}
                  onChange={(event) => handleValueCommit(selected, event.target.value)}
                  aria-label={`${selected.label} colour value`}
                  style={{ maxWidth: 96 }}
                />
              )}
              <span className={styles.tokenChip}>
                <code>{selected.cssVar}</code>
                <strong>{currentValue}</strong>
              </span>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => handleReset(selected)}
              >
                <RotateCcw size={12} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </GlassSurface>
      )}

      {history.length > 0 && (
        <div className={styles.list} aria-label="Token edit history">
          <span className={styles.tinyLabel}>
            <History size={12} aria-hidden="true" /> Recent edits
          </span>
          {history.slice(0, 3).map((entry) => (
            <div key={entry.id} className={styles.diff}>
              <span className={styles.diffBefore}>{entry.before}</span>
              <span className={styles.diffArrow} aria-hidden="true">
                →
              </span>
              <span className={styles.diffAfter}>
                {entry.after}{" "}
                <span className={styles.tinyLabel}>· {entry.changedBy}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {caption && (
        <footer className={styles.foot}>
          <span className={styles.tinyLabel}>{caption}</span>
        </footer>
      )}
    </article>
  )
}

export default TokenEditor
