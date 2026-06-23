"use client"

import { X } from "lucide-react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react"

import styles from "./mobile-drawer.module.css"

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  width?: "narrow" | "default"
  className?: string
}

const SWIPE_DISMISS_THRESHOLD_PX = 64

export function MobileDrawer({
  open,
  onClose,
  title,
  children,
  footer,
  width = "default",
  className,
}: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [dragOffset, setDragOffset] = useState<number>(0)
  const dragStartRef = useRef<number | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const handlePointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) {
      return
    }
    const delta = event.clientX - dragStartRef.current
    setDragOffset(Math.min(0, delta))
  }, [])

  const handlePointerUp = useCallback(() => {
    if (dragStartRef.current !== null && dragOffset < -SWIPE_DISMISS_THRESHOLD_PX) {
      onClose()
    }
    dragStartRef.current = null
    setDragOffset(0)
  }, [dragOffset, onClose])

  const handleBackdropKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClose()
    }
  }

  const panelClasses = [
    styles.panel,
    width === "narrow" ? styles.panelNarrow : styles.panelDefault,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={[styles.root, open ? styles.rootOpen : ""].filter(Boolean).join(" ")}
      aria-hidden={!open}
    >
      <div
        className={styles.backdrop}
        role="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close drawer"
        onClick={onClose}
        onKeyDown={handleBackdropKey}
      />
      <div
        ref={panelRef}
        className={panelClasses}
        style={{ transform: open ? `translateX(${dragOffset}px)` : undefined }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <header className={styles.head}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.foot}>{footer}</footer> : null}
      </div>
    </div>
  )
}

export default MobileDrawer
