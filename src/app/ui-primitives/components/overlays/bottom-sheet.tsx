"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./bottom-sheet.module.css"

export type BottomSheetHeight = "auto" | "half" | "full"

interface BottomSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  height?: BottomSheetHeight
  showClose?: boolean
}

const HEIGHT_CLASS: Record<BottomSheetHeight, string> = {
  auto: styles.heightAuto,
  half: styles.heightHalf,
  full: styles.heightFull,
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  height = "auto",
  showClose = true,
}: BottomSheetProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={[styles.popup, HEIGHT_CLASS[height]].join(" ")}>
          <span className={styles.handle} aria-hidden="true" />
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
              <BaseDialog.Close className={styles.closeBtn} aria-label="Close bottom sheet">
                <X size={16} strokeWidth={2.2} aria-hidden="true" />
              </BaseDialog.Close>
            )}
          </header>
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.foot}>{footer}</footer>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default BottomSheet
