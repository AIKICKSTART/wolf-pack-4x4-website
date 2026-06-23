"use client"

import * as React from "react"

import styles from "../ui-primitives.module.css"

export type GaugeTone = "red" | "amber" | "teal" | "green"

interface GaugeProps {
  label: string
  value: number
  max: number
  unit?: string
  redline?: number
  tone?: GaugeTone
}

const COLOR_TONE: Record<GaugeTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

export function ConicGauge({ label, value, max, unit = "", redline, tone = "red" }: GaugeProps) {
  const safeValue = Math.max(0, Math.min(value, max))
  const ratio = safeValue / max
  const sweepDegrees = ratio * 270
  const redlineDegrees = typeof redline === "number" ? (redline / max) * 270 : null
  const toneColor = COLOR_TONE[tone]
  const ticks = React.useMemo(() => Array.from({ length: 12 }, (_, index) => index), [])

  return (
    <div
      className={styles.gauge}
      style={
        {
          "--gauge-sweep": `${sweepDegrees}deg`,
          "--gauge-tone": toneColor,
        } as React.CSSProperties
      }
    >
      <div className={styles.gaugeDial} aria-hidden="true">
        <div className={styles.gaugeArc} />
        <div className={styles.gaugeFill} />
        {redlineDegrees !== null && (
          <div
            className={styles.gaugeRedline}
            style={
              {
                "--gauge-redline": `${redlineDegrees}deg`,
              } as React.CSSProperties
            }
          />
        )}
        <div className={styles.gaugeTicks}>
          {ticks.map((tick) => (
            <span key={tick} style={{ transform: `rotate(${(tick / 11) * 270 - 135}deg)` }} />
          ))}
        </div>
        <div className={styles.gaugeNeedle} aria-hidden="true" />
        <div className={styles.gaugeHub} aria-hidden="true" />
      </div>
      <div className={styles.gaugeReadout}>
        <span className={styles.kicker}>{label}</span>
        <strong>
          {safeValue.toFixed(unit === "%" ? 0 : 1)}
          <em>{unit}</em>
        </strong>
      </div>
    </div>
  )
}
