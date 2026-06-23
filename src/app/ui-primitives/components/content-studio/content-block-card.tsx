"use client"

import { Plus } from "lucide-react"

import { Chip } from "../primitives"
import { NeuoSurface } from "../surfaces"

import {
  studioToneToChip,
  type BlockSnippet,
} from "./content-studio-types"
import styles from "./content-block-card.module.css"

interface ContentBlockCardProps {
  snippet: BlockSnippet
  /** Compact variant fits in a side rail. */
  compact?: boolean
  /** Action handler — caller wires to insert / preview. */
  onInsert?: (id: string) => void
  className?: string
}

const KIND_GLYPH: Record<BlockSnippet["kind"], string> = {
  callout: "!",
  "lead-magnet": "✦",
  diagram: "▢",
  "quote-block": "“",
  "stat-block": "≡",
}

const KIND_LABEL: Record<BlockSnippet["kind"], string> = {
  callout: "Callout",
  "lead-magnet": "Lead magnet",
  diagram: "Diagram",
  "quote-block": "Pull quote",
  "stat-block": "Stat block",
}

export function ContentBlockCard({
  snippet,
  compact = false,
  onInsert,
  className,
}: ContentBlockCardProps) {
  const classes = [
    styles.card,
    styles[`tone_${snippet.tone}`],
    compact ? styles.compact : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <NeuoSurface tone="obsidian" className={classes}>
      <article
        className={styles.shell}
        aria-label={`Reusable block: ${snippet.label}`}
      >
        <header className={styles.head}>
          <span className={styles.glyph} aria-hidden="true">
            {KIND_GLYPH[snippet.kind]}
          </span>
          <div className={styles.meta}>
            <span className={styles.kind}>{KIND_LABEL[snippet.kind]}</span>
            <h3 className={styles.title}>{snippet.label}</h3>
          </div>
          <Chip
            label={`${snippet.usageCount}×`}
            tone={studioToneToChip(snippet.tone)}
          />
        </header>
        <p className={styles.body}>{snippet.body}</p>
        <footer className={styles.foot}>
          <button
            type="button"
            className={styles.insert}
            onClick={() => onInsert?.(snippet.id)}
            aria-label={`Insert ${snippet.label} into the current draft`}
          >
            <Plus size={11} strokeWidth={2.6} aria-hidden="true" />
            <span>Insert into draft</span>
          </button>
        </footer>
      </article>
    </NeuoSurface>
  )
}

export default ContentBlockCard
