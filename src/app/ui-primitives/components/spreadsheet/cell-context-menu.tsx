"use client"

import type { CSSProperties } from "react"

import styles from "./cell-context-menu.module.css"

export type CellContextAction =
  | "cut"
  | "copy"
  | "paste"
  | "paste-special"
  | "insert-row"
  | "insert-column"
  | "delete-row"
  | "delete-column"
  | "format"
  | "comment"

export interface CellContextMenuProps {
  /** Position relative to the grid container — leave undefined to place inline. */
  position?: { top: number; left: number }
  /** A1 label for the focused cell, shown in the menu header. */
  cellLabel: string
  /** Hidden actions (omit from the menu). */
  disabled?: ReadonlyArray<CellContextAction>
  onAction?: (action: CellContextAction) => void
  onClose?: () => void
}

interface MenuItem {
  id: CellContextAction
  label: string
  shortcut?: string
  group: "clipboard" | "structure" | "format"
  tone?: "neutral" | "danger"
}

const MENU_ITEMS: ReadonlyArray<MenuItem> = [
  { id: "cut", label: "Cut", shortcut: "⌘X", group: "clipboard" },
  { id: "copy", label: "Copy", shortcut: "⌘C", group: "clipboard" },
  { id: "paste", label: "Paste", shortcut: "⌘V", group: "clipboard" },
  { id: "paste-special", label: "Paste special…", shortcut: "⌘⇧V", group: "clipboard" },
  { id: "insert-row", label: "Insert row above", group: "structure" },
  { id: "insert-column", label: "Insert column left", group: "structure" },
  { id: "delete-row", label: "Delete row", group: "structure", tone: "danger" },
  { id: "delete-column", label: "Delete column", group: "structure", tone: "danger" },
  { id: "format", label: "Format cells…", shortcut: "⌘1", group: "format" },
  { id: "comment", label: "Insert comment", shortcut: "⌘⇧M", group: "format" },
]

export function CellContextMenu({
  position,
  cellLabel,
  disabled = [],
  onAction,
  onClose,
}: CellContextMenuProps) {
  const disabledSet = new Set<CellContextAction>(disabled)
  const style: CSSProperties = position
    ? { position: "absolute", top: position.top, left: position.left }
    : {}

  const groups: Array<{ id: MenuItem["group"]; items: MenuItem[] }> = [
    { id: "clipboard", items: [] },
    { id: "structure", items: [] },
    { id: "format", items: [] },
  ]
  for (const item of MENU_ITEMS) {
    if (disabledSet.has(item.id)) {
      continue
    }
    const target = groups.find((g) => g.id === item.group)
    if (target) {
      target.items.push(item)
    }
  }

  return (
    <div
      className={styles.menu}
      role="menu"
      aria-label={`Cell ${cellLabel} actions`}
      style={style}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Cell</span>
        <span className={styles.label}>{cellLabel}</span>
        {onClose ? (
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        ) : null}
      </header>
      {groups.map((group, index) =>
        group.items.length === 0 ? null : (
          <div
            key={group.id}
            className={`${styles.group} ${index > 0 ? styles.groupSep : ""}`}
            role="group"
          >
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                className={`${styles.item} ${item.tone === "danger" ? styles.itemDanger : ""}`}
                onClick={() => onAction?.(item.id)}
              >
                <span>{item.label}</span>
                {item.shortcut ? <kbd className={styles.kbd}>{item.shortcut}</kbd> : null}
              </button>
            ))}
          </div>
        ),
      )}
    </div>
  )
}

export default CellContextMenu
