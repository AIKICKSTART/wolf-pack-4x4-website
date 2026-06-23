"use client"

import { AlertTriangle, ChevronRight } from "lucide-react"
import type { CSSProperties } from "react"

import {
  COLLECTION_KIND_GLYPH,
  COLLECTION_KIND_LABEL,
  COLLECTION_KIND_TONE,
  TONE_HEX,
  type CollectionRowItem,
} from "./cms-types"

import styles from "./collection-row.module.css"

export interface CollectionRowProps {
  item: CollectionRowItem
  selected?: boolean
  loading?: boolean
  error?: string
  onOpen?: (item: CollectionRowItem) => void
  className?: string
}

export function CollectionRow({
  item,
  selected = false,
  loading = false,
  error,
  onOpen,
  className,
}: CollectionRowProps) {
  if (error) {
    return (
      <div className={`${styles.error} ${className ?? ""}`} role="alert">
        <AlertTriangle size={18} strokeWidth={2} aria-hidden="true" />
        <strong>{item.name} unavailable</strong>
        <span>{error}</span>
      </div>
    )
  }

  const tone = TONE_HEX[COLLECTION_KIND_TONE[item.kind]]
  const classes = [styles.row, className].filter(Boolean).join(" ")

  if (loading) {
    return (
      <article
        className={classes}
        style={{ "--row-tone": tone } as CSSProperties}
        aria-busy="true"
        aria-label={`${item.name} loading`}
      >
        <span className={styles.glyph} aria-hidden="true">
          {COLLECTION_KIND_GLYPH[item.kind]}
        </span>
        <div className={styles.meta}>
          <span className={styles.kicker}>Loading…</span>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.loadingMeta} aria-hidden="true" />
        </div>
        <div className={styles.stats}>
          <span className={styles.statBig}>—</span>
          <span className={styles.statLabel}>Syncing</span>
        </div>
        <span className={styles.action} aria-hidden="true">
          Open <ChevronRight size={11} strokeWidth={2.4} aria-hidden="true" />
        </span>
      </article>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      style={{ "--row-tone": tone } as CSSProperties}
      aria-pressed={selected}
      aria-label={`${COLLECTION_KIND_LABEL[item.kind]} collection ${item.name}, ${item.itemCount} items`}
      onClick={() => onOpen?.(item)}
    >
      <span className={styles.glyph} aria-hidden="true">
        {COLLECTION_KIND_GLYPH[item.kind]}
      </span>
      <div className={styles.meta}>
        <span className={styles.kicker}>{COLLECTION_KIND_LABEL[item.kind]}</span>
        <span className={styles.name}>{item.name}</span>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.stats}>
        <span className={styles.statBig}>{item.itemCount.toLocaleString("en-AU")}</span>
        <span className={styles.statLabel}>Items</span>
        {item.draftCount && item.draftCount > 0 ? (
          <span className={styles.draftChip}>
            {item.draftCount} draft{item.draftCount === 1 ? "" : "s"}
          </span>
        ) : null}
        <span className={styles.statLabel}>
          Last edit · {item.lastEditedBy} · {item.lastEditedAt}
        </span>
      </div>
      <span className={styles.action} aria-hidden="true">
        Open <ChevronRight size={11} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </button>
  )
}

export default CollectionRow
