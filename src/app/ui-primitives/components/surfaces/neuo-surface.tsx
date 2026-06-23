import type { ReactNode } from "react"

import styles from "./neuo-surface.module.css"

export type NeuoTone = "obsidian" | "ash" | "amber"

interface NeuoSurfaceProps {
  pressed?: boolean
  tone?: NeuoTone
  className?: string
  children: ReactNode
}

const TONE_CLASS: Record<NeuoTone, string> = {
  obsidian: styles.toneObsidian,
  ash: styles.toneAsh,
  amber: styles.toneAmber,
}

export function NeuoSurface({
  pressed = false,
  tone = "obsidian",
  className,
  children,
}: NeuoSurfaceProps) {
  const classes = [styles.surface, TONE_CLASS[tone], pressed && styles.pressed, className]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}
