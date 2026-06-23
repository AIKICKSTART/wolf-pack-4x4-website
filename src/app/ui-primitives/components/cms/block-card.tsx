"use client"

import { GripVertical } from "lucide-react"
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react"

import {
  BLOCK_CATEGORY_GLYPH,
  BLOCK_CATEGORY_LABEL,
  TONE_HEX,
  type BlockCategory,
  type BlockTone,
} from "./cms-types"

import styles from "./block-card.module.css"

export interface BlockCardProps {
  name: string
  category: BlockCategory
  tone?: BlockTone
  summary?: string
  glyph?: string
  /** Visually marks the block as a brand-locked component. */
  branded?: boolean
  /** Renders skeleton placeholders for the loading state. */
  loading?: boolean
  /** Marks the card as the currently selected block on the canvas. */
  selected?: boolean
  /** Marks the card as being dragged into a drop zone. */
  grabbed?: boolean
  /** Lightweight click handler — drag/drop simulation only. */
  onSelect?: () => void
  className?: string
}

export function BlockCard({
  name,
  category,
  tone,
  summary,
  glyph,
  branded = false,
  loading = false,
  selected = false,
  grabbed = false,
  onSelect,
  className,
}: BlockCardProps) {
  const resolvedTone: BlockTone = tone ?? "neutral"
  const resolvedGlyph = glyph ?? BLOCK_CATEGORY_GLYPH[category]

  const cssVars: CSSProperties = {
    "--block-tone": TONE_HEX[resolvedTone],
  } as CSSProperties

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault()
      return
    }
    onSelect?.()
  }

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      onSelect?.()
    }
  }

  return (
    <button
      type="button"
      className={classes}
      style={cssVars}
      data-loading={loading ? "true" : undefined}
      aria-pressed={selected}
      aria-grabbed={grabbed}
      aria-label={`${BLOCK_CATEGORY_LABEL[category]} block — ${name}`}
      onClick={handleClick}
      onKeyDown={handleKey}
      disabled={loading}
    >
      <div className={styles.thumb} aria-hidden="true">
        {loading ? <span aria-hidden="true">…</span> : resolvedGlyph}
      </div>
      <div className={styles.label}>
        <span className={styles.kicker}>{BLOCK_CATEGORY_LABEL[category]}</span>
        <span className={styles.title}>{name}</span>
        {summary ? <p className={styles.summary}>{summary}</p> : null}
      </div>
      <footer className={styles.footer}>
        <span>
          {branded ? <span className={styles.brandedDot} aria-hidden="true" /> : null}
          {branded ? "Brand-locked" : "Reusable"}
        </span>
        <span className={styles.handle} aria-hidden="true">
          <GripVertical size={10} strokeWidth={2.2} />
          Drag
        </span>
      </footer>
    </button>
  )
}

export default BlockCard
