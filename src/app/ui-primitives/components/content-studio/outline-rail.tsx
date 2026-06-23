"use client"

import { ChevronDown, ChevronUp, Hash } from "lucide-react"
import { useId } from "react"

import { GlassSurface } from "../surfaces"

import type { OutlineEntry } from "./content-studio-types"
import styles from "./outline-rail.module.css"

interface OutlineRailProps {
  entries: ReadonlyArray<OutlineEntry>
  totalWordCount?: number
  /** Optional id pre-selected as active. Falls back to entry.active === true. */
  activeId?: string
  /** Optional click handler — caller may scroll the editor. */
  onJump?: (id: string) => void
  /** Optional reorder handler. */
  onReorder?: (id: string, direction: "up" | "down") => void
  className?: string
}

export function OutlineRail({
  entries,
  totalWordCount,
  activeId,
  onJump,
  onReorder,
  className,
}: OutlineRailProps) {
  const railId = useId()
  const sumWords = totalWordCount ?? entries.reduce((acc, entry) => acc + entry.wordCount, 0)
  const classes = [styles.rail, className].filter(Boolean).join(" ")
  const activeKey =
    activeId ?? entries.find((entry) => entry.active)?.id ?? entries[0]?.id

  return (
    <GlassSurface tone="obsidian" intensity="low" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <span className={styles.kicker}>Outline</span>
          <span className={styles.total}>
            <strong>{sumWords.toLocaleString("en-AU")}</strong> words
          </span>
        </header>
        <ol className={styles.list} aria-label="Article outline" id={railId}>
          {entries.map((entry, idx) => {
            const isActive = entry.id === activeKey
            return (
              <li
                key={entry.id}
                className={[
                  styles.item,
                  styles[`level_${entry.level}`],
                  isActive ? styles.itemActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className={styles.jump}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Jump to ${entry.label}, ${entry.wordCount} words`}
                  onClick={() => onJump?.(entry.id)}
                >
                  <span className={styles.itemRow}>
                    <Hash size={11} strokeWidth={2.4} aria-hidden="true" className={styles.hash} />
                    <span className={styles.label}>{entry.label}</span>
                  </span>
                  <span className={styles.count}>{entry.wordCount}</span>
                </button>
                <span className={styles.reorder} aria-hidden="true">
                  <button
                    type="button"
                    className={styles.reorderBtn}
                    aria-label={`Move ${entry.label} up`}
                    disabled={idx === 0}
                    onClick={() => onReorder?.(entry.id, "up")}
                  >
                    <ChevronUp size={11} strokeWidth={2.6} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.reorderBtn}
                    aria-label={`Move ${entry.label} down`}
                    disabled={idx === entries.length - 1}
                    onClick={() => onReorder?.(entry.id, "down")}
                  >
                    <ChevronDown size={11} strokeWidth={2.6} aria-hidden="true" />
                  </button>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </GlassSurface>
  )
}

export default OutlineRail
