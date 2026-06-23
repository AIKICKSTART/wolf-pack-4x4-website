import type { CSSProperties } from "react"

import type { AudioWaveformTone } from "./audio-types"
import styles from "./equalizer-bars.module.css"

interface EqualizerBarsProps {
  /** Number of bars to render — clamped to 4–16. Default 10. */
  bars?: number
  /** Whether the bars are actively animating. */
  active?: boolean
  /** Accent tone used for the bar fill. */
  tone?: AudioWaveformTone
  /** Height of the well in CSS pixels. Default 40. */
  height?: number
  ariaLabel?: string
  className?: string
}

const TONE_CLASS: Record<AudioWaveformTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function EqualizerBars({
  bars = 10,
  active = true,
  tone = "red",
  height = 40,
  ariaLabel,
  className,
}: EqualizerBarsProps) {
  const safeBars = Math.max(4, Math.min(16, Math.round(bars)))
  const classes = [
    styles.eq,
    TONE_CLASS[tone],
    active ? styles.active : styles.idle,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const style: CSSProperties = {
    height: `${height}px`,
  }

  return (
    <div
      className={classes}
      style={style}
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {Array.from({ length: safeBars }, (_, index) => (
        <span
          key={index}
          className={styles.bar}
          style={
            {
              animationDelay: `${(index * 80) % 720}ms`,
              animationDuration: `${800 + ((index * 73) % 380)}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default EqualizerBars
