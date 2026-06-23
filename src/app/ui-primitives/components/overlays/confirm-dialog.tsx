"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { AlertTriangle, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./confirm-dialog.module.css"

export type ConfirmDialogVariant = "default" | "destructive"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: ConfirmDialogVariant
  busy?: boolean
  icon?: ReactNode
}

const VARIANT_ICON: Record<ConfirmDialogVariant, ReactNode> = {
  default: <ShieldCheck size={20} strokeWidth={2} aria-hidden="true" />,
  destructive: <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />,
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  busy = false,
  icon,
}: ConfirmDialogProps) {
  const variantClass = variant === "destructive" ? styles.variantDestructive : styles.variantDefault

  const handleConfirm = () => {
    if (busy) {
      return
    }
    onConfirm()
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={[styles.popup, variantClass].join(" ")}>
          <div className={styles.iconCell} aria-hidden="true">
            {icon ?? VARIANT_ICON[variant]}
          </div>
          <div className={styles.body}>
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            <BaseDialog.Description className={styles.description}>
              {description}
            </BaseDialog.Description>
          </div>
          <footer className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={busy}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={[
                styles.confirmBtn,
                variant === "destructive" ? styles.confirmDestructive : styles.confirmDefault,
              ].join(" ")}
              onClick={handleConfirm}
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? "Working…" : confirmLabel}
            </button>
          </footer>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default ConfirmDialog
