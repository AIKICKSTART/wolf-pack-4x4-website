"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type { ReactNode } from "react"

import styles from "./popover.module.css"

export type PopoverPlacement = "top" | "right" | "bottom" | "left"
export type PopoverAlign = "start" | "center" | "end"

interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  placement?: PopoverPlacement
  align?: PopoverAlign
  sideOffset?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  contentClassName?: string
}

export function Popover({
  trigger,
  children,
  placement = "bottom",
  align = "center",
  sideOffset = 8,
  open,
  defaultOpen,
  onOpenChange,
  className,
  contentClassName,
}: PopoverProps) {
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
          <BasePopover.Popup
            className={[styles.popup, contentClassName].filter(Boolean).join(" ")}
          >
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
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}

export default Popover
