"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./side-sheet.module.css"

export type SideSheetSide = "left" | "right"
export type SideSheetWidth = "sm" | "md" | "lg"

interface SideSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  side?: SideSheetSide
  width?: SideSheetWidth
  children: ReactNode
  footer?: ReactNode
  showClose?: boolean
}

const SIDE_CLASS: Record<SideSheetSide, string> = {
  left: styles.sideLeft,
  right: styles.sideRight,
}

const WIDTH_CLASS: Record<SideSheetWidth, string> = {
  sm: styles.widthSm,
  md: styles.widthMd,
  lg: styles.widthLg,
}

export function SideSheet({
  open,
  onOpenChange,
  title,
  subtitle,
  side = "right",
  width = "md",
  children,
  footer,
  showClose = true,
}: SideSheetProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          className={[styles.popup, SIDE_CLASS[side], WIDTH_CLASS[width]].join(" ")}
        >
          <header className={styles.head}>
            <div className={styles.headText}>
              <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
              {subtitle && (
                <BaseDialog.Description className={styles.subtitle}>
                  {subtitle}
                </BaseDialog.Description>
              )}
            </div>
            {showClose && (
              <BaseDialog.Close className={styles.closeBtn} aria-label="Close side sheet">
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

export default SideSheet
