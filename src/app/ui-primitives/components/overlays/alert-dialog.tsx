"use client"

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { AlertOctagon } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./alert-dialog.module.css"

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  okLabel?: string
  onOk?: () => void
  icon?: ReactNode
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  okLabel = "Acknowledge",
  onOk,
  icon,
}: AlertDialogProps) {
  const handleOk = () => {
    onOk?.()
    onOpenChange(false)
  }

  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={styles.backdrop} />
        <BaseAlertDialog.Popup className={styles.popup}>
          <div className={styles.ring} aria-hidden="true">
            <div className={styles.ringInner} aria-hidden="true" />
            <div className={styles.iconCell}>
              {icon ?? <AlertOctagon size={28} strokeWidth={2} aria-hidden="true" />}
            </div>
          </div>
          <BaseAlertDialog.Title className={styles.title}>{title}</BaseAlertDialog.Title>
          <BaseAlertDialog.Description className={styles.description}>
            {description}
          </BaseAlertDialog.Description>
          <footer className={styles.actions}>
            <button type="button" className={styles.okBtn} onClick={handleOk} autoFocus>
              {okLabel}
            </button>
          </footer>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  )
}

export default AlertDialog
