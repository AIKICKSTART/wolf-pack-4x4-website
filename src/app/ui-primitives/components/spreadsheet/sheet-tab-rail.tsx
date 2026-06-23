"use client"

import { useState } from "react"

import styles from "./sheet-tab-rail.module.css"

export interface SheetTabDescriptor {
  id: string
  label: string
  /** Optional tone marker (renders a coloured dot). */
  tone?: "amber" | "teal" | "green" | "red"
  /** Marks the tab as the currently active sheet. */
  active?: boolean
  /** Number of pending notifications / unread changes. */
  badge?: number
}

export interface SheetTabRailProps {
  tabs: ReadonlyArray<SheetTabDescriptor>
  onSelect?: (id: string) => void
  onAdd?: () => void
  onOptions?: (id: string) => void
  onReorder?: (id: string, direction: "left" | "right") => void
}

const TONE_CLASS: Record<NonNullable<SheetTabDescriptor["tone"]>, string> = {
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  red: styles.toneRed,
}

export function SheetTabRail({
  tabs,
  onSelect,
  onAdd,
  onOptions,
  onReorder,
}: SheetTabRailProps) {
  const [optionsFor, setOptionsFor] = useState<string | null>(null)

  const handleOptions = (id: string) => {
    setOptionsFor((prev) => (prev === id ? null : id))
    onOptions?.(id)
  }

  return (
    <nav className={styles.rail} aria-label="Sheet tabs">
      <ul className={styles.list} role="tablist">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`${styles.tab} ${tab.active ? styles.active : ""}`}
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              aria-selected={tab.active || false}
              className={styles.tabButton}
              onClick={() => onSelect?.(tab.id)}
            >
              {tab.tone ? <span className={`${styles.dot} ${TONE_CLASS[tab.tone]}`} /> : null}
              <span className={styles.label}>{tab.label}</span>
              {tab.badge ? <span className={styles.badge}>{tab.badge}</span> : null}
            </button>
            <div className={styles.reorder} role="group" aria-label={`Reorder ${tab.label}`}>
              <button
                type="button"
                className={styles.reorderBtn}
                onClick={() => onReorder?.(tab.id, "left")}
                aria-label={`Move ${tab.label} left`}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.reorderBtn}
                onClick={() => onReorder?.(tab.id, "right")}
                aria-label={`Move ${tab.label} right`}
              >
                ›
              </button>
              <button
                type="button"
                className={styles.options}
                onClick={() => handleOptions(tab.id)}
                aria-expanded={optionsFor === tab.id}
                aria-label={`Options for ${tab.label}`}
              >
                ⋯
              </button>
            </div>
            {optionsFor === tab.id ? (
              <div className={styles.popover} role="menu">
                <button type="button" className={styles.popItem} role="menuitem">
                  Rename
                </button>
                <button type="button" className={styles.popItem} role="menuitem">
                  Duplicate
                </button>
                <button type="button" className={styles.popItem} role="menuitem">
                  Protect
                </button>
                <button
                  type="button"
                  className={`${styles.popItem} ${styles.popItemDanger}`}
                  role="menuitem"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <button type="button" className={styles.add} onClick={onAdd} aria-label="Add new sheet">
        <span aria-hidden="true">+</span>
        New sheet
      </button>
    </nav>
  )
}

export default SheetTabRail
