"use client"

import { AlertTriangle, Search } from "lucide-react"
import { useMemo, useState } from "react"

import { Chip } from "../primitives"

import { BlockCard } from "./block-card"
import {
  BLOCK_CATEGORY_LABEL,
  type BlockCategory,
  type BlockDefinition,
} from "./cms-types"

import styles from "./block-library-panel.module.css"

const CATEGORY_ORDER: ReadonlyArray<BlockCategory | "all"> = [
  "all",
  "hero",
  "feature",
  "text",
  "media",
  "cta",
  "form",
  "embed",
]

export interface BlockLibraryPanelProps {
  blocks: ReadonlyArray<BlockDefinition>
  /** Initial category filter (defaults to `all`). */
  defaultCategory?: BlockCategory | "all"
  /** Renders skeleton placeholders inside the body. */
  loading?: boolean
  /** Renders an error block instead of the list. */
  error?: string
  /** Fired when a tile is clicked or activated via keyboard. */
  onSelectBlock?: (block: BlockDefinition) => void
  className?: string
}

export function BlockLibraryPanel({
  blocks,
  defaultCategory = "all",
  loading = false,
  error,
  onSelectBlock,
  className,
}: BlockLibraryPanelProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<BlockCategory | "all">(defaultCategory)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return blocks.filter((block) => {
      const matchesCategory = category === "all" || block.category === category
      if (!matchesCategory) {
        return false
      }
      if (!needle) {
        return true
      }
      return (
        block.name.toLowerCase().includes(needle) ||
        block.description.toLowerCase().includes(needle) ||
        BLOCK_CATEGORY_LABEL[block.category].toLowerCase().includes(needle)
      )
    })
  }, [blocks, category, query])

  const grouped = useMemo(() => {
    const map = new Map<BlockCategory, BlockDefinition[]>()
    filtered.forEach((block) => {
      const list = map.get(block.category) ?? []
      list.push(block)
      map.set(block.category, list)
    })
    return Array.from(map.entries())
  }, [filtered])

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Block library">
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.kicker}>Block library</span>
          <span className={styles.heading}>Drag a block onto the canvas</span>
        </div>
        <span className={styles.count}>
          <span aria-hidden="true">▣</span>
          {filtered.length.toString().padStart(2, "0")} / {blocks.length}
        </span>
      </header>

      <div className={styles.searchRow}>
        <Search size={14} strokeWidth={2.2} aria-hidden="true" />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search blocks — hero, parts grid, suburb panel…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search block library"
        />
      </div>

      <div className={styles.categoryRow} role="tablist" aria-label="Block category filter">
        {CATEGORY_ORDER.map((option) => {
          const label = option === "all" ? "All blocks" : BLOCK_CATEGORY_LABEL[option]
          return (
            <Chip
              key={option}
              label={label}
              tone={option === "all" ? "neutral" : "teal"}
              selected={category === option}
              onSelect={() => setCategory(option)}
            />
          )
        })}
      </div>

      <div className={styles.body}>
        {error ? (
          <div className={styles.error} role="alert">
            <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
            <strong>Library unavailable</strong>
            <span>{error}</span>
          </div>
        ) : grouped.length === 0 ? (
          <div className={styles.empty}>No blocks match those filters yet.</div>
        ) : (
          grouped.map(([groupCategory, items]) => (
            <div key={groupCategory} className={styles.group}>
              <header className={styles.groupHeader}>
                <span>{BLOCK_CATEGORY_LABEL[groupCategory]}</span>
                <span>{items.length.toString().padStart(2, "0")}</span>
              </header>
              <div className={styles.grid}>
                {items.map((block) => (
                  <BlockCard
                    key={block.id}
                    name={block.name}
                    category={block.category}
                    tone={block.tone}
                    summary={block.description}
                    glyph={block.glyph}
                    branded={block.branded}
                    loading={loading}
                    onSelect={() => onSelectBlock?.(block)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default BlockLibraryPanel
