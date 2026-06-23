"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./basic-dialog.module.css"

export type BasicDialogSize = "sm" | "md" | "lg"

interface BasicDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  size?: BasicDialogSize
  showClose?: boolean
  className?: string
}

const SIZE_CLASS: Record<BasicDialogSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function BasicDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  size = "md",
  showClose = true,
  className,
}: BasicDialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          className={[styles.popup, SIZE_CLASS[size], className].filter(Boolean).join(" ")}
        >
          <header className={styles.head}>
            <div className={styles.headText}>
              <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
              {description && (
                <BaseDialog.Description className={styles.description}>
                  {description}
                </BaseDialog.Description>
              )}
            </div>
            {showClose && (
              <BaseDialog.Close className={styles.closeBtn} aria-label="Close dialog">
                <X size={16} strokeWidth={2.2} aria-hidden="true" />
              </BaseDialog.Close>
            )}
          </header>
          <div className={styles.body}>{children}</div>
          {actions && <footer className={styles.actions}>{actions}</footer>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default BasicDialog
