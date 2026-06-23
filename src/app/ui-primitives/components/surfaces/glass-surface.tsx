import type { ReactNode } from "react"

import styles from "./glass-surface.module.css"

export type GlassTone = "chrome" | "obsidian" | "amber"
export type GlassIntensity = "low" | "med" | "high"

interface GlassSurfaceProps {
  tone?: GlassTone
  intensity?: GlassIntensity
  className?: string
  children: ReactNode
}

const TONE_CLASS: Record<GlassTone, string> = {
  chrome: styles.toneChrome,
  obsidian: styles.toneObsidian,
  amber: styles.toneAmber,
}

const INTENSITY_CLASS: Record<GlassIntensity, string> = {
  low: styles.intensityLow,
  med: styles.intensityMed,
  high: styles.intensityHigh,
}

export function GlassSurface({
  tone = "obsidian",
  intensity = "med",
  className,
  children,
}: GlassSurfaceProps) {
  const classes = [styles.surface, TONE_CLASS[tone], INTENSITY_CLASS[intensity], className]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}
