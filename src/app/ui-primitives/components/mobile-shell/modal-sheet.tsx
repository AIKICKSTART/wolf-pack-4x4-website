"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"

import styles from "./modal-sheet.module.css"

export type ModalSheetSnap = "peek" | "half" | "full"

interface ModalSheetProps {
  open: boolean
  onClose: () => void
  snap?: ModalSheetSnap
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

const SNAP_CLASS: Record<ModalSheetSnap, string> = {
  peek: styles.snapPeek,
  half: styles.snapHalf,
  full: styles.snapFull,
}

export function ModalSheet({
  open,
  onClose,
  snap = "half",
  title,
  description,
  children,
  footer,
  className,
}: ModalSheetProps) {
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
        aria-label="Dismiss modal sheet"
        tabIndex={open ? 0 : -1}
      />
      <div
        className={[styles.sheet, SNAP_CLASS[snap]].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className={styles.handle} aria-hidden="true" />
        <header className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.foot}>{footer}</footer> : null}
      </div>
    </div>
  )
}

export default ModalSheet
