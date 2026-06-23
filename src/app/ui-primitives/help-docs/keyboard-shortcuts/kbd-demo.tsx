"use client"

import { useState } from "react"

import {
  KeyboardShortcutsOverlay,
  type KeyboardShortcutGroup,
} from "../../components/help-docs"
import styles from "../help-docs.module.css"

const groups: ReadonlyArray<KeyboardShortcutGroup> = [
  {
    id: "global",
    title: "Global",
    shortcuts: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["?"], label: "Show this shortcut overlay" },
      { keys: ["G", "Q"], label: "Go to quotes" },
      { keys: ["G", "W"], label: "Go to workshop floor" },
    ],
  },
  {
    id: "quoting",
    title: "Quoting",
    shortcuts: [
      { keys: ["N"], label: "New quote" },
      { keys: ["E"], label: "Edit selected line item" },
      { keys: ["D"], label: "Duplicate selected line" },
      { keys: ["⌘", "S"], label: "Save quote draft" },
    ],
  },
  {
    id: "floor",
    title: "Workshop floor",
    shortcuts: [
      { keys: ["J"], label: "Next job" },
      { keys: ["K"], label: "Previous job" },
      { keys: ["⇧", "A"], label: "Reassign job to a bay" },
      { keys: ["⌘", "↵"], label: "Mark job complete" },
    ],
  },
]

export function KeyboardShortcutsDemo() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className={styles.stage} style={{ minHeight: 220 }}>
      <span className={styles.stageHelp}>Open the overlay to view all shortcuts</span>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Show shortcuts
        </button>
      </div>
      <KeyboardShortcutsOverlay open={open} onClose={() => setOpen(false)} groups={groups} />
    </div>
  )
}
