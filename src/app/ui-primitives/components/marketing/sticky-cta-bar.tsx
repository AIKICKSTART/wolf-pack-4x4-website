"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./sticky-cta-bar.module.css"

export type StickyCtaBarPosition = "top" | "bottom"

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export interface StickyCtaBarAction {
  label: string
  href: string
}

export interface StickyCtaBarProps {
  message: string
  /** Optional small kicker badge shown beside the message. */
  badge?: string
  primaryAction: StickyCtaBarAction
  secondaryAction?: StickyCtaBarAction
  /** Whether the bar sits at the top of the viewport (default) or the bottom. */
  position?: StickyCtaBarPosition
  /** Pixel threshold before the bar starts reacting to scroll. */
  threshold?: number
  className?: string
}

export function StickyCtaBar({
  message,
  badge,
  primaryAction,
  secondaryAction,
  position = "top",
  threshold = 120,
  className,
}: StickyCtaBarProps) {
  const lastScrollY = useRef(0)
  const [reduce] = useState<boolean>(() => prefersReducedMotion())
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState<boolean>(reduce)

  useEffect(() => {
    if (reduce) {
      return
    }

    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > threshold)
      if (y < threshold) {
        setVisible(true)
        lastScrollY.current = y
        return
      }
      const goingDown = y > lastScrollY.current
      setVisible(!goingDown)
      lastScrollY.current = y
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold, reduce])

  const classes = [
    styles.bar,
    position === "bottom" ? styles.positionBottom : styles.positionTop,
    visible ? styles.visible : styles.hidden,
    scrolled ? styles.elevated : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <aside className={classes} role="region" aria-label="Sticky call to action">
      <div className={styles.inner}>
        <div className={styles.copy}>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
          <span className={styles.message}>{message}</span>
        </div>
        <div className={styles.actions}>
          {secondaryAction ? (
            <a className={`${styles.action} ${styles.actionGhost}`} href={secondaryAction.href}>
              {secondaryAction.label}
            </a>
          ) : null}
          <a className={`${styles.action} ${styles.actionPrimary}`} href={primaryAction.href}>
            <span>{primaryAction.label}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  )
}

export default StickyCtaBar
