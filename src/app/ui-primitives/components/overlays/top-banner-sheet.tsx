"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Megaphone, X } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./top-banner-sheet.module.css"

export type TopBannerTone = "info" | "warning" | "danger"

interface TopBannerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  message: string
  tone?: TopBannerTone
  actions?: ReactNode
  icon?: ReactNode
  showClose?: boolean
}

const TONE_CLASS: Record<TopBannerTone, string> = {
  info: styles.toneInfo,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
}

export function TopBannerSheet({
  open,
  onOpenChange,
  title,
  message,
  tone = "info",
  actions,
  icon,
  showClose = true,
}: TopBannerSheetProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={[styles.popup, TONE_CLASS[tone]].join(" ")}>
          <span className={styles.toneStripe} aria-hidden="true" />
          <div className={styles.iconCell} aria-hidden="true">
            {icon ?? <Megaphone size={18} strokeWidth={2.2} aria-hidden="true" />}
          </div>
          <div className={styles.body}>
            <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
            <BaseDialog.Description className={styles.message}>{message}</BaseDialog.Description>
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
          {showClose && (
            <BaseDialog.Close className={styles.closeBtn} aria-label="Dismiss banner">
              <X size={14} strokeWidth={2.2} aria-hidden="true" />
            </BaseDialog.Close>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default TopBannerSheet
