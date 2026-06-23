"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

import styles from "./bottom-nav-bar.module.css"

export interface BottomNavItem {
  id: string
  label: string
  icon: ReactNode
  badge?: number
}

interface BottomNavBarProps {
  items: ReadonlyArray<BottomNavItem>
  activeId: string
  onSelect: (id: string) => void
  variant?: "pill" | "underline"
  className?: string
}

const PILL_LAYOUT_ID = "mufflermen-bottom-nav-pill"

export function BottomNavBar({
  items,
  activeId,
  onSelect,
  variant = "pill",
  className,
}: BottomNavBarProps) {
  const classes = [
    styles.nav,
    variant === "underline" ? styles.variantUnderline : styles.variantPill,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav className={classes} aria-label="Primary mobile navigation">
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className={styles.item}>
              <button
                type="button"
                className={styles.tab}
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                {isActive && variant === "pill" ? (
                  <motion.span
                    layoutId={PILL_LAYOUT_ID}
                    className={styles.pill}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span className={styles.icon} aria-hidden="true">
                  {item.icon}
                </span>
                <span className={styles.label}>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className={styles.badge} aria-label={`${item.badge} unread`}>
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                ) : null}
                {isActive && variant === "underline" ? (
                  <motion.span
                    layoutId={PILL_LAYOUT_ID}
                    className={styles.underline}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNavBar
