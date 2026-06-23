"use client"

import { useEffect, useId, useMemo, useState } from "react"

import { Chip } from "../primitives/chip"

import {
  PASSWORD_TIER_TONE,
  type PasswordTier,
} from "./auth-deep-types"
import styles from "./password-strength-meter.module.css"

export interface PasswordStrengthMeterProps {
  /** Current password value (controlled). */
  value: string
  /** Whether this password has been seen in known breach corpora (Have I Been Pwned k-anonymity check). */
  breachHits?: number
  /** True while the breach check is in flight. */
  breachCheckPending?: boolean
  /** Fires when the computed strength tier changes. */
  onTierChange?: (tier: PasswordTier, score: number) => void
  /** Caption label, defaults to "Password strength". */
  label?: string
}

interface Rule {
  id: string
  label: string
  test: (value: string) => boolean
}

const RULES: ReadonlyArray<Rule> = [
  { id: "length", label: "12+ characters", test: (v) => v.length >= 12 },
  {
    id: "mixed-case",
    label: "Upper + lower",
    test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { id: "digit", label: "Number", test: (v) => /\d/.test(v) },
  { id: "symbol", label: "Symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
  {
    id: "no-common",
    label: "Not a common pattern",
    test: (v) => {
      const lower = v.toLowerCase()
      if (lower.length === 0) return false
      const banned = ["password", "12345", "qwerty", "letmein", "mufflermen"]
      return !banned.some((b) => lower.includes(b))
    },
  },
]

const TIER_BY_SCORE: ReadonlyArray<PasswordTier> = [
  "empty",
  "weak",
  "weak",
  "fair",
  "good",
  "strong",
]

const TIER_LABEL: Record<PasswordTier, string> = {
  empty: "Empty",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
  breached: "Breached",
}

interface Computed {
  metByRule: Record<string, boolean>
  score: number
  baseTier: PasswordTier
}

function evaluate(value: string): Computed {
  const metByRule: Record<string, boolean> = {}
  for (const rule of RULES) {
    metByRule[rule.id] = rule.test(value)
  }
  if (value.length === 0) {
    return { metByRule, score: 0, baseTier: "empty" }
  }
  const score = Object.values(metByRule).filter(Boolean).length
  const tier = TIER_BY_SCORE[score] ?? "weak"
  return { metByRule, score, baseTier: tier }
}

export function PasswordStrengthMeter({
  value,
  breachHits,
  breachCheckPending,
  onTierChange,
  label = "Password strength",
}: PasswordStrengthMeterProps) {
  const liveId = useId()
  const [shown, setShown] = useState(false)

  const computed = useMemo(() => evaluate(value), [value])
  const breached = (breachHits ?? 0) > 0
  const tier: PasswordTier = breached ? "breached" : computed.baseTier

  useEffect(() => {
    onTierChange?.(tier, computed.score)
  }, [tier, computed.score, onTierChange])

  return (
    <div
      className={styles.wrap}
      aria-describedby={liveId}
      data-tier={tier}
    >
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <span className={styles.tierBadge} data-tier={tier}>
          {TIER_LABEL[tier]}
        </span>
      </div>

      <div className={styles.fieldRow}>
        <input
          type={shown ? "text" : "password"}
          value={value}
          readOnly
          aria-label="Current password value (masked)"
          className={styles.field}
        />
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShown((s) => !s)}
          aria-pressed={shown}
          aria-label={shown ? "Hide password" : "Reveal password"}
        >
          {shown ? "Hide" : "Show"}
        </button>
      </div>

      <div className={styles.bars}>
        {[0, 1, 2, 3, 4].map((index) => (
          <span
            key={index}
            className={styles.bar}
            data-on={breached ? false : index < computed.score}
            data-breached={breached}
          />
        ))}
      </div>

      <div className={styles.chipRow}>
        <Chip
          label={breached ? "BREACHED" : TIER_LABEL[tier].toUpperCase()}
          tone={PASSWORD_TIER_TONE[tier]}
        />
        {breachCheckPending ? (
          <Chip label="HIBP check…" tone="amber" />
        ) : null}
        {breached ? (
          <Chip
            label={`Found in ${breachHits?.toLocaleString("en-AU")} breaches`}
            tone="red"
          />
        ) : null}
      </div>

      <ul className={styles.rules} aria-label="Strength rules">
        {RULES.map((rule) => (
          <li
            key={rule.id}
            className={styles.rule}
            data-met={computed.metByRule[rule.id]}
          >
            <span className={styles.ruleBullet} aria-hidden="true" />
            {rule.label}
          </li>
        ))}
      </ul>

      <span id={liveId} className={styles.srOnly} role="status" aria-live="polite">
        {TIER_LABEL[tier]} password
        {breached ? `, found in ${breachHits} known breaches` : ""}.
      </span>
    </div>
  )
}

export default PasswordStrengthMeter
