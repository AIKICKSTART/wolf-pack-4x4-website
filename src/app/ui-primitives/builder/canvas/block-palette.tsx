"use client"

import { useMemo, useState, type DragEvent } from "react"

import type { BlockCategory, BlockManifest } from "../model"
import styles from "./canvas.module.css"
import { PALETTE_DRAG_MIME } from "./drag-mime"

interface BlockPaletteProps {
  manifests: readonly BlockManifest[]
  /** Add a block to the end of the canvas (keyboard / click path). */
  onAdd: (manifest: BlockManifest) => void
  /** Notify the canvas a palette drag has begun, so it can show drop zones. */
  onDragManifest: (manifestType: string | null) => void
}

/**
 * The block palette: every demo block from the data model, grouped by category,
 * each draggable onto the canvas via native HTML5 drag-and-drop and addable via
 * keyboard (Enter/Space) for a no-pointer path.
 */
export function BlockPalette({ manifests, onAdd, onDragManifest }: BlockPaletteProps) {
  const [query, setQuery] = useState("")

  const grouped = useMemo(() => {
    const filtered = manifests.filter((m) => {
      if (!query.trim()) return true
      const haystack = `${m.name} ${m.summary} ${(m.tags ?? []).join(" ")}`.toLowerCase()
      return haystack.includes(query.trim().toLowerCase())
    })
    const map = new Map<BlockCategory, BlockManifest[]>()
    for (const m of filtered) {
      const list = map.get(m.category) ?? []
      list.push(m)
      map.set(m.category, list)
    }
    return Array.from(map.entries())
  }, [manifests, query])

  function handleDragStart(event: DragEvent<HTMLButtonElement>, type: string): void {
    event.dataTransfer.setData(PALETTE_DRAG_MIME, type)
    event.dataTransfer.effectAllowed = "copy"
    onDragManifest(type)
  }

  return (
    <aside className={styles.palette} aria-label="Block palette">
      <div className={styles.paletteHead}>
        <h2 className={styles.panelTitle}>Blocks</h2>
        <p className={styles.panelHint}>Drag onto the canvas or press Enter to add.</p>
      </div>
      <div className={styles.searchWrap}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search blocks"
          aria-label="Search blocks"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={styles.paletteScroll}>
        {grouped.length === 0 ? (
          <p className={styles.emptyHint}>No blocks match “{query}”.</p>
        ) : (
          grouped.map(([category, items]) => (
            <section key={category} className={styles.paletteGroup}>
              <h3 className={styles.paletteGroupTitle}>{category}</h3>
              <ul className={styles.paletteList}>
                {items.map((manifest) => (
                  <li key={manifest.type}>
                    <button
                      type="button"
                      className={styles.paletteItem}
                      draggable
                      onDragStart={(event) => handleDragStart(event, manifest.type)}
                      onDragEnd={() => onDragManifest(null)}
                      onClick={() => onAdd(manifest)}
                      aria-label={`Add ${manifest.name} block`}
                    >
                      <span className={styles.paletteItemName}>{manifest.name}</span>
                      <span className={styles.paletteItemSummary}>{manifest.summary}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </aside>
  )
}
