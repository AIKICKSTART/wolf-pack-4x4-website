"use client"

import { ChevronLeft } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./top-app-bar.module.css"

export type TopAppBarVariant = "solid" | "transparent"

interface TopAppBarProps {
  title: string
  subtitle?: string
  onBack?: () => void
  backLabel?: string
  leading?: ReactNode
  trailing?: ReactNode
  variant?: TopAppBarVariant
  compact?: boolean
  className?: string
}

const VARIANT_CLASS: Record<TopAppBarVariant, string> = {
  solid: styles.variantSolid,
  transparent: styles.variantTransparent,
}

export function TopAppBar({
  title,
  subtitle,
  onBack,
  backLabel = "Back",
  leading,
  trailing,
  variant = "solid",
  compact = false,
  className,
}: TopAppBarProps) {
  const classes = [styles.bar, VARIANT_CLASS[variant], compact && styles.compact, className]
    .filter(Boolean)
    .join(" ")
  return (
    <header className={classes}>
      <div className={styles.leading}>
        {onBack ? (
          <button type="button" className={styles.iconBtn} onClick={onBack} aria-label={backLabel}>
            <ChevronLeft size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
        ) : leading ? (
          <div className={styles.leadingSlot}>{leading}</div>
        ) : null}
      </div>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </div>
      <div className={styles.trailing}>{trailing}</div>
    </header>
  )
}

export default TopAppBar
