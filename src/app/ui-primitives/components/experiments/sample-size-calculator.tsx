"use client"

import { useCallback, useMemo, useState, type ChangeEvent } from "react"

import { MetricBlock, type MetricBlockItem } from "../data-display/metric-block"
import { Chip } from "../primitives/chip"

import styles from "./sample-size-calculator.module.css"

export interface SampleSizeCalculatorProps {
  /** Baseline conversion rate (percentage 0..100). */
  defaultBaselineRate?: number
  /** Minimum detectable effect (relative percentage). */
  defaultMde?: number
  /** Target statistical power (0..1). */
  defaultPower?: number
  /** Number of variants (including control). */
  defaultVariants?: number
  /** Daily expected subjects (for time-to-detect estimate). */
  expectedDailyVolume?: number
  className?: string
}

/**
 * Rough sample-size estimate per variant for a two-sided binomial test.
 * n ≈ ((Zα/2 + Zβ)² · 2 · p · (1-p)) / (p · mde)²
 * Z₀.₉₇₅ ≈ 1.96; Zβ varies with power.
 */
function zForPower(power: number): number {
  const map: ReadonlyArray<[number, number]> = [
    [0.7, 0.524],
    [0.75, 0.674],
    [0.8, 0.842],
    [0.85, 1.036],
    [0.9, 1.282],
    [0.95, 1.645],
  ]
  let best = map[2]
  let bestDelta = Math.abs(power - best[0])
  for (const entry of map) {
    const delta = Math.abs(power - entry[0])
    if (delta < bestDelta) {
      best = entry
      bestDelta = delta
    }
  }
  return best[1]
}

function computeSampleSize(
  baselineRate: number,
  mdeRel: number,
  power: number,
): number {
  const p = Math.max(0.0001, Math.min(0.9999, baselineRate / 100))
  const mde = Math.max(0.0001, mdeRel / 100)
  const zAlpha = 1.96
  const zBeta = zForPower(power)
  const numerator = Math.pow(zAlpha + zBeta, 2) * 2 * p * (1 - p)
  const denominator = Math.pow(p * mde, 2)
  return Math.ceil(numerator / denominator)
}

function formatBig(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

function formatDays(days: number): string {
  if (!Number.isFinite(days) || days <= 0) return "—"
  if (days < 1) return `${(days * 24).toFixed(1)} h`
  if (days < 90) return `${Math.ceil(days)} d`
  return `${(days / 30).toFixed(1)} mo`
}

export function SampleSizeCalculator({
  defaultBaselineRate = 18.4,
  defaultMde = 5,
  defaultPower = 0.8,
  defaultVariants = 2,
  expectedDailyVolume = 480,
  className,
}: SampleSizeCalculatorProps) {
  const [baseline, setBaseline] = useState<number>(defaultBaselineRate)
  const [mde, setMde] = useState<number>(defaultMde)
  const [power, setPower] = useState<number>(defaultPower)
  const [variants, setVariants] = useState<number>(defaultVariants)

  const handleNumber = useCallback(
    (setter: (n: number) => void, min: number, max: number, step = 1) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const next = Number(event.target.value)
        if (!Number.isNaN(next)) {
          const rounded = step >= 1 ? Math.round(next) : Number(next.toFixed(2))
          setter(Math.max(min, Math.min(max, rounded)))
        }
      },
    [],
  )

  const perVariant = useMemo(
    () => computeSampleSize(baseline, mde, power),
    [baseline, mde, power],
  )
  const totalN = perVariant * variants
  const daysToDetect = expectedDailyVolume > 0 ? totalN / expectedDailyVolume : Infinity

  const metrics: ReadonlyArray<MetricBlockItem> = [
    {
      id: "per-variant",
      label: "Required N / variant",
      value: formatBig(perVariant),
    },
    {
      id: "total-n",
      label: "Total N",
      value: formatBig(totalN),
    },
    {
      id: "power",
      label: "Power",
      value: `${Math.round(power * 100)}%`,
    },
  ]

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Sample size calculator"
    >
      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span>Baseline conversion rate (%)</span>
          <input
            type="number"
            min={0.01}
            max={99}
            step={0.1}
            value={baseline}
            onChange={handleNumber(setBaseline, 0.01, 99, 0.1)}
            inputMode="decimal"
          />
        </label>
        <label className={styles.field}>
          <span>Minimum detectable effect (% relative)</span>
          <input
            type="number"
            min={0.1}
            max={500}
            step={0.5}
            value={mde}
            onChange={handleNumber(setMde, 0.1, 500, 0.5)}
            inputMode="decimal"
          />
        </label>
        <label className={styles.field}>
          <span>Variants (incl. control)</span>
          <input
            type="number"
            min={2}
            max={20}
            step={1}
            value={variants}
            onChange={handleNumber(setVariants, 2, 20)}
            inputMode="numeric"
          />
        </label>
        <label className={styles.field}>
          <span>
            Statistical power · <strong>{Math.round(power * 100)}%</strong>
          </span>
          <input
            type="range"
            min={70}
            max={95}
            step={5}
            value={Math.round(power * 100)}
            onChange={(event) => setPower(Number(event.target.value) / 100)}
            aria-label="Power"
          />
        </label>
      </div>

      <MetricBlock metrics={metrics} />

      <div
        className={styles.chipRow}
        role="status"
        aria-live="polite"
        aria-label="Sample size results"
      >
        <Chip label={`Required N ${formatBig(perVariant)} / variant`} tone="teal" />
        <Chip label={`Total ${formatBig(totalN)} subjects`} tone="green" />
        <Chip
          label={`ETA ${formatDays(daysToDetect)} @ ${formatBig(expectedDailyVolume)}/day`}
          tone="amber"
        />
      </div>
    </section>
  )
}

export default SampleSizeCalculator
