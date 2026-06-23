"use client"

import { ChevronRight } from "lucide-react"
import { useEffect } from "react"

import type { ComponentType } from "react"
import type { IconProps } from "../../icons"
import {
  ClipboardCheckIcon,
  EnvelopeTrailIcon,
  ExhaustPipeIcon,
  PhoneRingIcon,
  PriceTagIcon,
  ShieldTickIcon,
  SpannerIcon,
} from "../../icons"
import { MobileViewport } from "../../mobile-shell"

import styles from "./slide-up-action-sheet.module.css"

export type SlideUpActionKind =
  | "spanner"
  | "exhaust"
  | "phone"
  | "email"
  | "quote"
  | "tag"
  | "shield"

export interface SlideUpActionSheetAction {
  id: string
  label: string
  description?: string
  kind: SlideUpActionKind
  destructive?: boolean
  onSelect: () => void
}

export interface SlideUpActionSheetProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  actions: ReadonlyArray<SlideUpActionSheetAction>
  cancelLabel?: string
  /** Render in-flow inside a MobileViewport (for demo/showcase routes). */
  embedded?: boolean
  className?: string
}

const KIND_ICONS: Record<SlideUpActionKind, ComponentType<IconProps>> = {
  spanner: SpannerIcon,
  exhaust: ExhaustPipeIcon,
  phone: PhoneRingIcon,
  email: EnvelopeTrailIcon,
  quote: ClipboardCheckIcon,
  tag: PriceTagIcon,
  shield: ShieldTickIcon,
}

export function SlideUpActionSheet({
  open,
  onClose,
  title,
  description,
  actions,
  cancelLabel = "Cancel",
  embedded = false,
  className,
}: SlideUpActionSheetProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const sheetMarkup = (
    <div
      className={[styles.root, open ? styles.rootOpen : null, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Dismiss action sheet"
        tabIndex={open ? 0 : -1}
      />
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className={styles.handle} aria-hidden="true" />
        <div className={styles.group}>
          <header className={styles.head}>
            <h2>{title}</h2>
            {description ? <p>{description}</p> : null}
          </header>
          {actions.map((action) => {
            const Icon = KIND_ICONS[action.kind]
            return (
              <button
                key={action.id}
                type="button"
                className={[styles.btn, action.destructive && styles.btnDestructive]
                  .filter(Boolean)
                  .join(" ")}
                onClick={action.onSelect}
              >
                <Icon size={22} tone={action.destructive ? "red" : "amber"} />
                <span>
                  {action.label}
                  {action.description ? (
                    <span className={styles.btnDescription}>{action.description}</span>
                  ) : null}
                </span>
                <ChevronRight className={styles.chevron} aria-hidden="true" />
              </button>
            )
          })}
        </div>
        <button type="button" className={styles.cancel} onClick={onClose}>
          {cancelLabel}
        </button>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <MobileViewport label="Action sheet preview">
        <div style={{ position: "relative", height: "100%", minHeight: 520 }}>
          {sheetMarkup}
        </div>
      </MobileViewport>
    )
  }

  return sheetMarkup
}

export default SlideUpActionSheet
