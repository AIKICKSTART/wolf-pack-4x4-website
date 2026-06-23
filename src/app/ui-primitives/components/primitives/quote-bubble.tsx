import type { ReactNode } from "react"

import styles from "./quote-bubble.module.css"

export type QuoteBubbleSide = "top" | "right" | "bottom" | "left"
export type QuoteBubbleTone = "obsidian" | "amber" | "teal" | "red"

interface QuoteBubbleProps {
  children: ReactNode
  side?: QuoteBubbleSide
  tone?: QuoteBubbleTone
  className?: string
  label?: string
}

const SIDE_CLASS: Record<QuoteBubbleSide, string> = {
  top: styles.sideTop,
  right: styles.sideRight,
  bottom: styles.sideBottom,
  left: styles.sideLeft,
}

const TONE_CLASS: Record<QuoteBubbleTone, string> = {
  obsidian: styles.toneObsidian,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  red: styles.toneRed,
}

export function QuoteBubble({
  children,
  side = "top",
  tone = "obsidian",
  className,
  label,
}: QuoteBubbleProps) {
  const classes = [styles.bubble, SIDE_CLASS[side], TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={classes} role="note" aria-label={label}>
      <span className={styles.body}>{children}</span>
      <span className={styles.tail} aria-hidden="true" />
    </span>
  )
}

export default QuoteBubble
