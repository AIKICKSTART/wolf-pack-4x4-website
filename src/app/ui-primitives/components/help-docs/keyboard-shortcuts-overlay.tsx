"use client"

import { useEffect } from "react"

import { Kbd, KbdGroup } from "../primitives/kbd"

import styles from "./keyboard-shortcuts-overlay.module.css"

export interface KeyboardShortcut {
  keys: ReadonlyArray<string>
  label: string
}

export interface KeyboardShortcutGroup {
  id: string
  title: string
  shortcuts: ReadonlyArray<KeyboardShortcut>
}

interface KeyboardShortcutsOverlayProps {
  open: boolean
  onClose: () => void
  groups: ReadonlyArray<KeyboardShortcutGroup>
  title?: string
  description?: string
}

export function KeyboardShortcutsOverlay({
  open,
  onClose,
  groups,
  title = "Keyboard shortcuts",
  description = "Workshop-floor shortcuts for the current app context.",
}: KeyboardShortcutsOverlayProps) {
  useEffect(() => {
    if (!open || typeof window === "undefined") {
      return
    }
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="kbd-title">
      <button
        type="button"
        className={styles.dismiss}
        aria-label="Close keyboard shortcuts"
        onClick={onClose}
      />
      <div className={styles.surface}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Reference</span>
            <h2 id="kbd-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.body}>{description}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <span aria-hidden="true">×</span>
            <span className={styles.srOnly}>Close</span>
          </button>
        </header>

        <div className={styles.groupGrid}>
          {groups.map((group) => (
            <section key={group.id} className={styles.group} aria-labelledby={`group-${group.id}`}>
              <h3 id={`group-${group.id}`} className={styles.groupTitle}>
                {group.title}
              </h3>
              <ul className={styles.list}>
                {group.shortcuts.map((shortcut, index) => (
                  <li key={`${group.id}-${index}`} className={styles.row}>
                    <span className={styles.label}>{shortcut.label}</span>
                    <KbdGroup size="sm">
                      {shortcut.keys.map((key) => (
                        <Kbd key={key} size="sm">
                          {key}
                        </Kbd>
                      ))}
                    </KbdGroup>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className={styles.foot}>
          <span>
            Press <Kbd size="sm">Esc</Kbd> to close
          </span>
        </footer>
      </div>
    </div>
  )
}

export default KeyboardShortcutsOverlay
