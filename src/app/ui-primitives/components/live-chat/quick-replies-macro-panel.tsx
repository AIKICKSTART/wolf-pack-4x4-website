"use client"

import { MacroPicker, type MacroEntry } from "../support/macro-picker"
import { Chip } from "../primitives/chip"

import styles from "./quick-replies-macro-panel.module.css"

export interface QuickReplyShortcut {
  id: string
  label: string
  macroId: string
}

interface QuickRepliesMacroPanelProps {
  macros: ReadonlyArray<MacroEntry>
  /** Pinned shortcut chips above the picker. */
  shortcuts?: ReadonlyArray<QuickReplyShortcut>
  /** Triggered when any macro (shortcut or list) is selected for insert. */
  onInsert?: (macro: MacroEntry) => void
  className?: string
}

export function QuickRepliesMacroPanel({
  macros,
  shortcuts,
  onInsert,
  className,
}: QuickRepliesMacroPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  const handleShortcut = (shortcut: QuickReplyShortcut) => {
    const macro = macros.find((m) => m.id === shortcut.macroId)
    if (macro) {
      onInsert?.(macro)
    }
  }

  return (
    <section
      className={classes}
      role="region"
      aria-label="Quick replies and macros"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Quick replies</span>
        <h3 className={styles.title}>Macros + shortcuts</h3>
        {shortcuts && shortcuts.length > 0 ? (
          <div className={styles.shortcutsRow} aria-label="Pinned shortcuts">
            <span className={styles.shortcutLabel}>Pinned</span>
            {shortcuts.map((shortcut) => (
              <Chip
                key={shortcut.id}
                label={shortcut.label}
                tone="teal"
                onSelect={() => handleShortcut(shortcut)}
              />
            ))}
          </div>
        ) : null}
      </header>
      <MacroPicker macros={macros} onInsert={onInsert} />
    </section>
  )
}

export default QuickRepliesMacroPanel
