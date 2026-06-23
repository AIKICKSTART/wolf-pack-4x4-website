"use client"

import { X } from "lucide-react"
import { useEffect, type ReactNode } from "react"

import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
} from "../../icons"
import { Reveal } from "../../motion/reveal"
import { Breadcrumb } from "../../primitives/breadcrumb"
import type { BreadcrumbItem } from "../../primitives/breadcrumb"

import styles from "./slide-up-full-takeover.module.css"

export interface SlideUpFullTakeoverProps {
  open: boolean
  onClose: () => void
  kicker: string
  title: string
  /** Breadcrumb trail rendered inside the body. */
  trail?: ReadonlyArray<BreadcrumbItem>
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function SlideUpFullTakeover({
  open,
  onClose,
  kicker,
  title,
  trail,
  children,
  footer,
  className,
}: SlideUpFullTakeoverProps) {
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

  return (
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
        aria-label="Dismiss full takeover"
        tabIndex={open ? 0 : -1}
      />
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={styles.head}>
          <div className={styles.headTitleGroup}>
            <span className={styles.headKicker}>
              <ExhaustPipeIcon size={12} tone="amber" /> {kicker}
            </span>
            <h2 className={styles.headTitle}>{title}</h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </header>

        <Reveal as="div" from="below" distance={18} className={styles.body}>
          {trail ? (
            <Breadcrumb
              items={[...trail]}
              homeIcon={<CompassRoseIcon size={12} tone="currentColor" />}
            />
          ) : null}
          {children}
        </Reveal>

        {footer ? (
          <footer className={styles.foot}>{footer}</footer>
        ) : (
          <footer className={styles.foot}>
            <ClipboardCheckIcon size={16} tone="amber" />
          </footer>
        )}
      </div>
    </div>
  )
}

export default SlideUpFullTakeover
