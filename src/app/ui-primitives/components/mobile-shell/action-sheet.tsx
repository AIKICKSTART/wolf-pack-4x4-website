"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"

import styles from "./action-sheet.module.css"

export type ActionSheetItemTone = "default" | "destructive"

export interface ActionSheetItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  tone?: ActionSheetItemTone
  onSelect: () => void
}

interface ActionSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  items: ReadonlyArray<ActionSheetItem>
  cancelLabel?: string
  className?: string
}

export function ActionSheet({
  open,
  onClose,
  title,
  description,
  items,
  cancelLabel = "Cancel",
  className,
}: ActionSheetProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  return (
    <div
      className={[styles.root, open ? styles.rootOpen : "", className].filter(Boolean).join(" ")}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Dismiss action sheet"
        tabIndex={open ? 0 : -1}
      />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label={title ?? "Actions"}>
        <section className={styles.group}>
          {title || description ? (
            <header className={styles.header}>
              {title ? <strong className={styles.title}>{title}</strong> : null}
              {description ? <p className={styles.description}>{description}</p> : null}
            </header>
          ) : null}
          <ul className={styles.list}>
            {items.map((item, index) => {
              const isDestructive = item.tone === "destructive"
              const buttonClasses = [
                styles.item,
                isDestructive ? styles.itemDestructive : "",
                index === 0 && !(title || description) ? styles.itemTop : "",
              ]
                .filter(Boolean)
                .join(" ")
              return (
                <li key={item.id} className={styles.itemWrap}>
                  <button
                    type="button"
                    className={buttonClasses}
                    onClick={() => {
                      item.onSelect()
                      onClose()
                    }}
                  >
                    {item.icon ? (
                      <span className={styles.itemIcon} aria-hidden="true">
                        {item.icon}
                      </span>
                    ) : null}
                    <span className={styles.itemBody}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.description ? (
                        <span className={styles.itemSub}>{item.description}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
        <button type="button" className={styles.cancel} onClick={onClose}>
          {cancelLabel}
        </button>
      </div>
    </div>
  )
}

export default ActionSheet
