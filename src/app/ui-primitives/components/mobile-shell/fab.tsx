"use client"

import type { MouseEventHandler, ReactNode } from "react"

import styles from "./fab.module.css"

export type FabVariant = "icon" | "extended"
export type FabTone = "red" | "amber" | "teal" | "neutral"
export type FabPosition = "bottom-right" | "bottom-left" | "bottom-center"

interface FabProps {
  icon: ReactNode
  label: string
  variant?: FabVariant
  tone?: FabTone
  position?: FabPosition
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

const TONE_CLASS: Record<FabTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  neutral: styles.toneNeutral,
}

const POSITION_CLASS: Record<FabPosition, string> = {
  "bottom-right": styles.positionBottomRight,
  "bottom-left": styles.positionBottomLeft,
  "bottom-center": styles.positionBottomCenter,
}

export function Fab({
  icon,
  label,
  variant = "icon",
  tone = "red",
  position = "bottom-right",
  onClick,
  disabled = false,
  className,
}: FabProps) {
  const classes = [
    styles.fab,
    variant === "extended" ? styles.extended : styles.iconOnly,
    TONE_CLASS[tone],
    POSITION_CLASS[position],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={variant === "icon" ? label : undefined}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      {variant === "extended" ? <span className={styles.label}>{label}</span> : null}
    </button>
  )
}

export default Fab
