import * as React from "react"

import styles from "./signal-strength.module.css"

export type SignalTone = "red" | "amber" | "teal" | "green"

interface SignalStrengthProps {
  /** Bars filled, 0..5. */
  level: 0 | 1 | 2 | 3 | 4 | 5
  tone?: SignalTone
  ariaLabel: string
  /** Pixel size of the square viewBox. Defaults to 24. */
  size?: number
}

const TONE_VAR: Record<SignalTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

const BAR_COUNT = 5

export function SignalStrength({ level, tone = "teal", ariaLabel, size = 24 }: SignalStrengthProps) {
  const toneVar = TONE_VAR[tone]
  const gap = 1.2
  const totalGap = gap * (BAR_COUNT - 1)
  const barWidth = (size - totalGap) / BAR_COUNT

  return (
    <svg
      className={styles.signal}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={ariaLabel}
      style={{ "--signal-tone": toneVar } as React.CSSProperties}
    >
      <title>{ariaLabel}</title>
      <desc>{`Signal strength ${level} of ${BAR_COUNT}.`}</desc>
      {Array.from({ length: BAR_COUNT }).map((_, idx) => {
        const minH = size * 0.18
        const stepH = (size - minH) / (BAR_COUNT - 1)
        const h = minH + stepH * idx
        const x = idx * (barWidth + gap)
        const y = size - h
        const filled = idx < level
        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={barWidth}
            height={h}
            rx={0.8}
            className={styles.bar}
            data-on={filled ? "true" : "false"}
            style={{ animationDelay: `${idx * 70}ms` }}
          />
        )
      })}
    </svg>
  )
}
