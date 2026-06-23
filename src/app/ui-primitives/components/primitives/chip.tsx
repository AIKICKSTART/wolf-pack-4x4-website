"use client"

import { X } from "lucide-react"
import type { KeyboardEvent, MouseEvent, ReactNode } from "react"

import styles from "./chip.module.css"

export type ChipTone = "neutral" | "red" | "amber" | "teal" | "green"

interface ChipProps {
  label: string
  icon?: ReactNode
  tone?: ChipTone
  selected?: boolean
  dismissible?: boolean
  disabled?: boolean
  onSelect?: () => void
  onDismiss?: () => void
  className?: string
}

const TONE_CLASS: Record<ChipTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function Chip({
  label,
  icon,
  tone = "neutral",
  selected = false,
  dismissible = false,
  disabled = false,
  onSelect,
  onDismiss,
  className,
}: ChipProps) {
  const classes = [
    styles.chip,
    TONE_CLASS[tone],
    selected && styles.selected,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }
    if ((event.key === "Backspace" || event.key === "Delete") && dismissible) {
      event.preventDefault()
      onDismiss?.()
    }
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onSelect?.()
  }

  const handleDismissClick = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    onDismiss?.()
  }

  const handleDismissKey = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      event.stopPropagation()
      onDismiss?.()
    }
  }

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {dismissible && (
        <span
          className={styles.dismiss}
          role="button"
          tabIndex={-1}
          aria-label={`Remove ${label}`}
          onClick={handleDismissClick}
          onKeyDown={handleDismissKey}
        >
          <X size={12} strokeWidth={2.5} aria-hidden="true" />
        </span>
      )}
    </button>
  )
}

export default Chip
