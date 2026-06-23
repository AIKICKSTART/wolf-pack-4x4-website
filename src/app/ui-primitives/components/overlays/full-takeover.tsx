"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Minimize2, X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./full-takeover.module.css"

interface FullTakeoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  eyebrow?: string
  children: ReactNode
  onMinimize?: () => void
  toolbar?: ReactNode
}

export function FullTakeover({
  open,
  onOpenChange,
  title,
  eyebrow,
  children,
  onMinimize,
  toolbar,
}: FullTakeoverProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <header className={styles.bar}>
            <div className={styles.barLeft}>
              {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
              <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            </div>
            <div className={styles.barRight}>
              {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
              {onMinimize && (
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={onMinimize}
                  aria-label="Minimize to compact"
                >
                  <Minimize2 size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>
              )}
              <BaseDialog.Close className={styles.iconBtn} aria-label="Close takeover">
                <X size={16} strokeWidth={2.2} aria-hidden="true" />
              </BaseDialog.Close>
            </div>
          </header>
          <div className={styles.body}>{children}</div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default FullTakeover
