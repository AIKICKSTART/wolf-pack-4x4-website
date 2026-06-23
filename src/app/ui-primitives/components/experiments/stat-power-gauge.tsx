import { RadialMeter, type RadialTone } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"

import styles from "./stat-power-gauge.module.css"

export interface StatPowerGaugeProps {
  /** Current power as 0..1. */
  power: number
  /** Target power as 0..1. */
  targetPower?: number
  /** Current sample size. */
  currentSampleSize: number
  /** Required N to reach targetPower. */
  requiredSampleSize: number
  /** Optional caption. */
  caption?: string
  className?: string
}

function toneFor(ratio: number): RadialTone {
  if (ratio >= 0.95) return "green"
  if (ratio >= 0.8) return "teal"
  if (ratio >= 0.6) return "amber"
  return "red"
}

function formatBig(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export function StatPowerGauge({
  power,
  targetPower = 0.8,
  currentSampleSize,
  requiredSampleSize,
  caption,
  className,
}: StatPowerGaugeProps) {
  const ratio = Math.max(0, Math.min(1, power))
  const targetRatio = Math.max(0, Math.min(1, targetPower))
  const tone = toneFor(ratio / Math.max(0.01, targetRatio))
  const remaining = Math.max(0, requiredSampleSize - currentSampleSize)
  const reachedTarget = currentSampleSize >= requiredSampleSize

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Statistical power gauge"
    >
      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuetext={`${Math.round(ratio * 100)} percent power`}
        aria-label={`Statistical power ${Math.round(ratio * 100)}%`}
      >
        <RadialMeter
          value={ratio * 100}
          label="Power"
          tone={tone}
          ariaLabel={`Current statistical power ${Math.round(ratio * 100)}%`}
          caption={caption ?? `Target ${Math.round(targetRatio * 100)}%`}
          size={140}
        />
      </div>

      <div className={styles.chips} role="status" aria-live="polite">
        <Chip label={`Target ${Math.round(targetRatio * 100)}%`} tone="teal" />
        <Chip
          label={`Current N ${formatBig(currentSampleSize)}`}
          tone="neutral"
        />
        {reachedTarget ? (
          <Chip label="Target N reached" tone="green" />
        ) : (
          <Chip label={`+${formatBig(remaining)} more for target`} tone="amber" />
        )}
      </div>
    </section>
  )
}

export default StatPowerGauge
