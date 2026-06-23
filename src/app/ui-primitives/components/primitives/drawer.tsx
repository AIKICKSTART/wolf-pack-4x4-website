"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./drawer.module.css"

export type DrawerSide = "left" | "right" | "top" | "bottom"
export type DrawerSize = "sm" | "md" | "lg" | "xl"

interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: DrawerSide
  size?: DrawerSize
  title?: string
  description?: string
  showClose?: boolean
  children: ReactNode
  footer?: ReactNode
  className?: string
}

const SIDE_CLASS: Record<DrawerSide, string> = {
  left: styles.sideLeft,
  right: styles.sideRight,
  top: styles.sideTop,
  bottom: styles.sideBottom,
}

const SIZE_CLASS: Record<DrawerSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
}

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  size = "md",
  title,
  description,
  showClose = true,
  children,
  footer,
  className,
}: DrawerProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup
          className={[styles.popup, SIDE_CLASS[side], SIZE_CLASS[size], className]
            .filter(Boolean)
            .join(" ")}
        >
          {(title || showClose) && (
            <header className={styles.head}>
              <div className={styles.headText}>
                {title && (
                  <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
                )}
                {description && (
                  <BaseDialog.Description className={styles.description}>
                    {description}
                  </BaseDialog.Description>
                )}
              </div>
              {showClose && (
                <BaseDialog.Close
                  className={styles.closeBtn}
                  aria-label="Close drawer"
                >
                  <X size={16} strokeWidth={2.2} aria-hidden="true" />
                </BaseDialog.Close>
              )}
            </header>
          )}
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.foot}>{footer}</footer>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default Drawer
