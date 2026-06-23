"use client"

import { useEffect, useId, useMemo } from "react"
import type { CSSProperties } from "react"

import styles from "./password-strength-meter.module.css"

export type PasswordStrength = "empty" | "weak" | "fair" | "good" | "strong"

export interface PasswordStrengthMeterProps {
  value: string
  onStrengthChange?: (strength: PasswordStrength, score: number) => void
  className?: string
  label?: string
}

interface EntropyRule {
  id: string
  label: string
  test: (value: string) => boolean
}

const RULES: EntropyRule[] = [
  { id: "length", label: "8+ characters", test: (v) => v.length >= 8 },
  { id: "case", label: "Upper + lower", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "digit", label: "Number", test: (v) => /\d/.test(v) },
  { id: "symbol", label: "Symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
]

const STRENGTH_BY_SCORE: PasswordStrength[] = ["empty", "weak", "fair", "good", "strong"]

const TONE_BY_STRENGTH: Record<PasswordStrength, { color: string; glow: string }> = {
  empty: { color: "color-mix(in oklab, var(--primitive-muted) 50%, transparent)", glow: "transparent" },
  weak: { color: "var(--primitive-red)", glow: "color-mix(in oklab, var(--primitive-red) 55%, transparent)" },
  fair: { color: "var(--primitive-amber)", glow: "color-mix(in oklab, var(--primitive-amber) 55%, transparent)" },
  good: { color: "var(--primitive-teal)", glow: "color-mix(in oklab, var(--primitive-teal) 55%, transparent)" },
  strong: { color: "var(--primitive-green)", glow: "color-mix(in oklab, var(--primitive-green) 65%, transparent)" },
}

const STRENGTH_COPY: Record<PasswordStrength, string> = {
  empty: "Empty",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
}

interface EvaluatedStrength {
  score: number
  strength: PasswordStrength
  metByRule: Record<string, boolean>
}

function evaluate(value: string): EvaluatedStrength {
  const metByRule = RULES.reduce<Record<string, boolean>>((acc, rule) => {
    acc[rule.id] = rule.test(value)
    return acc
  }, {})

  if (value.length === 0) {
    return { score: 0, strength: "empty", metByRule }
  }

  const metCount = Object.values(metByRule).filter(Boolean).length
  const strength = STRENGTH_BY_SCORE[metCount] ?? "weak"
  return { score: metCount, strength, metByRule }
}

export function PasswordStrengthMeter({
  value,
  onStrengthChange,
  className,
  label = "Strength",
}: PasswordStrengthMeterProps) {
  const liveRegionId = useId()
  const { score, strength, metByRule } = useMemo(() => evaluate(value), [value])
  const tone = TONE_BY_STRENGTH[strength]

  useEffect(() => {
    onStrengthChange?.(strength, score)
  }, [strength, score, onStrengthChange])

  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const valueStyle = {
    "--strength-tone": tone.color,
  } as CSSProperties

  return (
    <div className={classes} aria-describedby={liveRegionId}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value} style={valueStyle}>
          {STRENGTH_COPY[strength]}
        </span>
      </div>

      <div className={styles.bars}>
        {[0, 1, 2, 3].map((index) => {
          const on = score > index
          const barStyle = {
            "--strength-tone": on ? tone.color : "var(--primitive-line-strong)",
            "--strength-glow": on ? tone.glow : "transparent",
          } as CSSProperties
          return (
            <span
              key={index}
              className={styles.bar}
              data-on={on}
              style={barStyle}
              aria-hidden="true"
            >
              <span className={styles.fill} />
            </span>
          )
        })}
      </div>

      <ul className={styles.hints} aria-hidden="true">
        {RULES.map((rule) => (
          <li key={rule.id} className={styles.hint} data-met={metByRule[rule.id]}>
            {rule.label}
          </li>
        ))}
      </ul>

      <span id={liveRegionId} role="status" aria-live="polite" style={{ position: "absolute", clipPath: "inset(50%)", width: 1, height: 1, overflow: "hidden" }}>
        Password strength: {STRENGTH_COPY[strength]}
      </span>
    </div>
  )
}

export default PasswordStrengthMeter
