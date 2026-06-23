"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { useEffect, useRef, type ReactNode } from "react"

import { ConfettiBurst, type ConfettiBurstHandle } from "../primitives/confetti-burst"
import styles from "./confetti-modal.module.css"

interface ConfettiModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  actions?: ReactNode
  /** "cannon" fires twin side cannons. "burst" fires a single center burst. */
  mode?: "cannon" | "burst"
}

export function ConfettiModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  mode = "cannon",
}: ConfettiModalProps) {
  const burstRef = useRef<ConfettiBurstHandle | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }
    const id = window.setTimeout(() => {
      if (mode === "cannon") {
        burstRef.current?.cannon()
      } else {
        burstRef.current?.fire()
      }
    }, 140)
    return () => window.clearTimeout(id)
  }, [open, mode])

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <span className={styles.confettiLayer} aria-hidden="true">
            <ConfettiBurst ref={burstRef} ariaLabel="Celebration confetti" />
          </span>
          <BaseDialog.Close className={styles.closeBtn} aria-label="Close celebration">
            <X size={16} strokeWidth={2.2} aria-hidden="true" />
          </BaseDialog.Close>
          <div className={styles.medal} aria-hidden="true">
            <span className={styles.medalRing} />
            <span className={styles.medalStar}>★</span>
          </div>
          <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
          {description && (
            <BaseDialog.Description className={styles.description}>
              {description}
            </BaseDialog.Description>
          )}
          {children && <div className={styles.body}>{children}</div>}
          {actions && <footer className={styles.actions}>{actions}</footer>}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default ConfettiModal
