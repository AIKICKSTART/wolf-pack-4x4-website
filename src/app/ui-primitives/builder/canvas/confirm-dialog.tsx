"use client"

import { TriangleAlert, X } from "lucide-react"
import { useEffect, useRef, type ReactNode } from "react"

import styles from "./dialog.module.css"

// Lucide writes `size` to the SVG width/height *attribute*, which rejects
// `var()`. Sizing via `style` lets the central `--primitive-icon-*` tokens
// resolve through CSS (which wins over the presentation attribute).
const ICON_STYLE_MD = {
  width: "var(--primitive-icon-md)",
  height: "var(--primitive-icon-md)",
  strokeWidth: "var(--primitive-icon-stroke)",
}
const ICON_STYLE_SM = {
  width: "var(--primitive-icon-sm)",
  height: "var(--primitive-icon-sm)",
  strokeWidth: "var(--primitive-icon-stroke)",
}

interface ConfirmDialogProps {
  open: boolean
  title: string
  /** Body content (string or nodes). */
  children: ReactNode
  confirmLabel: string
  cancelLabel?: string
  /** When true, the confirm button uses the danger tone. */
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/**
 * A focus-trapped, escapable confirmation modal. Used for delete-with-confirm
 * and the gated publish request (which never publishes — it only records the
 * approval-required intent). Respects reduced motion via CSS.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    confirmRef.current?.focus()

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        event.preventDefault()
        onCancel()
        return
      }
      if (event.key !== "Tab") return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className={styles.dialogScrim}
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel()
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-body"
      >
        <div className={styles.dialogHead}>
          {destructive ? (
            <span className={styles.dialogIconDanger} aria-hidden>
              <TriangleAlert style={ICON_STYLE_MD} aria-hidden />
            </span>
          ) : null}
          <h2 id="confirm-title" className={styles.dialogTitle}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={onCancel}
            aria-label="Close dialog"
          >
            <X style={ICON_STYLE_SM} aria-hidden />
          </button>
        </div>
        <div id="confirm-body" className={styles.dialogBody}>
          {children}
        </div>
        <div className={styles.dialogActions}>
          <button type="button" className={styles.ghostBtn} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            className={destructive ? styles.dangerBtn : styles.confirmBtn}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
