"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type { ReactNode } from "react"

import styles from "./popover-rich.module.css"

export type PopoverRichPlacement = "top" | "right" | "bottom" | "left"
export type PopoverRichAlign = "start" | "center" | "end"

interface PopoverRichProps {
  trigger: ReactNode
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
  placement?: PopoverRichPlacement
  align?: PopoverRichAlign
  sideOffset?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function PopoverRich({
  trigger,
  header,
  children,
  footer,
  placement = "bottom",
  align = "center",
  sideOffset = 10,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: PopoverRichProps) {
  return (
    <BasePopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <BasePopover.Trigger
        render={(props) => (
          <span {...props} className={[styles.trigger, className].filter(Boolean).join(" ")}>
            {trigger}
          </span>
        )}
        nativeButton={false}
      />
      <BasePopover.Portal>
        <BasePopover.Positioner
          className={styles.positioner}
          side={placement}
          align={align}
          sideOffset={sideOffset}
        >
          <BasePopover.Popup className={styles.popup}>
            <BasePopover.Arrow className={styles.arrow}>
              <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
                <path
                  d="M0 0 L6 8 L12 0 Z"
                  fill="var(--primitive-panel-strong)"
                  stroke="var(--primitive-line-strong)"
                  strokeWidth="1"
                />
              </svg>
            </BasePopover.Arrow>
            {header && <header className={styles.head}>{header}</header>}
            <div className={styles.body}>{children}</div>
            {footer && <footer className={styles.foot}>{footer}</footer>}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}

export default PopoverRich
