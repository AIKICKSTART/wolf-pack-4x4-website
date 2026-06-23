import * as React from "react"

import styles from "./radial-meter.module.css"

export type RadialTone = "red" | "amber" | "teal" | "green"

interface RadialMeterProps {
  /** Value in 0..max. */
  value: number
  /** Max value. Defaults to 100. */
  max?: number
  label: string
  tone?: RadialTone
  ariaLabel: string
  /** Pixel size of the square viewBox. Defaults to 120. */
  size?: number
  /** Unit suffix. Defaults to "%". */
  unit?: string
  /** Optional caption rendered under the readout. */
  caption?: string
}

const TONE_VAR: Record<RadialTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

export function RadialMeter({
  value,
  max = 100,
  label,
  tone = "teal",
  ariaLabel,
  size = 120,
  unit = "%",
  caption,
}: RadialMeterProps) {
  const safeValue = Math.max(0, Math.min(value, max))
  const ratio = safeValue / max

  const cx = size / 2
  const cy = size / 2
  const stroke = 6
  const r = size / 2 - stroke - 4
  const circumference = 2 * Math.PI * r
  const dashOn = circumference * 0.985
  const filled = ratio * dashOn
  const toneVar = TONE_VAR[tone]

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel}
        style={{ "--radial-tone": toneVar, "--radial-filled": `${filled}` } as React.CSSProperties}
      >
        <title>{ariaLabel}</title>
        <desc>{`Radial meter at ${(ratio * 100).toFixed(0)} percent.`}</desc>

        {/* Dashed track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--primitive-line)"
          strokeWidth={stroke}
          strokeDasharray="3 4"
          opacity={0.55}
        />

        {/* Filled arc — uses stroke-dashoffset for animatable reveal */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={toneVar}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dashOn} ${circumference}`}
          strokeDashoffset={dashOn - filled}
          transform={`rotate(-90 ${cx} ${cy})`}
          className={styles.arc}
        />

        {/* Glow halo behind needle endpoint */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={toneVar}
          strokeWidth={stroke + 2}
          strokeLinecap="round"
          strokeDasharray={`0.1 ${circumference}`}
          strokeDashoffset={-filled + 0.05}
          transform={`rotate(-90 ${cx} ${cy})`}
          opacity={0.32}
          filter="blur(3px)"
        />

        {/* Center readout */}
        <text x={cx} y={cy + 2} textAnchor="middle" className={styles.value}>
          {Math.round(ratio * 100)}
          <tspan className={styles.unit}>{unit}</tspan>
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" className={styles.label}>
          {label}
        </text>
      </svg>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  )
}
