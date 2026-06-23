"use client"

import { useCallback, useMemo, useState, type ChangeEvent } from "react"

import { Chip, type ChipTone } from "../primitives/chip"

import {
  formatPValue,
  formatSampleSize,
  formatSignificanceStars,
  significanceTier,
} from "./ab-runtime-types"

import styles from "./stat-sig-calculator.module.css"

export interface StatSigCalculatorProps {
  /** Visitors per arm. */
  defaultPerArm?: number
  /** Control conversion rate, percent (0..100). */
  defaultControlRate?: number
  /** Treatment conversion rate, percent (0..100). */
  defaultTreatmentRate?: number
  /** Significance threshold alpha. */
  defaultAlpha?: number
  className?: string
}

/** Standard normal CDF approximation (Abramowitz & Stegun 26.2.17). */
function normalCdf(z: number): number {
  if (!Number.isFinite(z)) return z > 0 ? 1 : 0
  const sign = z < 0 ? -1 : 1
  const x = Math.abs(z)
  const t = 1 / (1 + 0.2316419 * x)
  const d = 0.3989422804014327 * Math.exp(-0.5 * x * x)
  const probability =
    1 -
    d *
      t *
      (0.319381530 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
  return 0.5 * (1 + sign * (2 * probability - 1))
}

interface StatSigResult {
  /** Z-score for the two-proportion z-test. */
  z: number
  /** Two-sided p-value. */
  pValue: number
  /** Absolute lift (treatment minus control), percentage points. */
  liftAbsPct: number
  /** Relative lift (% over control). */
  liftRelPct: number
  /** Estimated statistical power for the observed effect, 0..1. */
  power: number
}

function computeStatSig(
  perArm: number,
  controlRate: number,
  treatmentRate: number,
  alpha: number,
): StatSigResult {
  const safePerArm = Math.max(1, Math.floor(perArm))
  const p1 = Math.min(0.9999, Math.max(0.0001, controlRate / 100))
  const p2 = Math.min(0.9999, Math.max(0.0001, treatmentRate / 100))
  const pooled = (p1 + p2) / 2
  const seZ = Math.sqrt((2 * pooled * (1 - pooled)) / safePerArm)
  const z = seZ === 0 ? 0 : (p2 - p1) / seZ
  const pValue = Math.min(1, 2 * (1 - normalCdf(Math.abs(z))))

  // Power for the observed effect at the given alpha.
  // SE under H1 uses per-arm variance.
  const seH1 = Math.sqrt(
    (p1 * (1 - p1)) / safePerArm + (p2 * (1 - p2)) / safePerArm,
  )
  const zAlpha = 1.96 // approx for alpha = 0.05 two-sided.
  const safeAlpha = Math.max(0.0001, Math.min(0.5, alpha))
  // Map common alpha values to z critical values; default to 1.96.
  const alphaZ: ReadonlyArray<readonly [number, number]> = [
    [0.01, 2.576],
    [0.025, 2.241],
    [0.05, 1.96],
    [0.1, 1.645],
  ]
  let critZ = zAlpha
  let critDelta = Math.abs(safeAlpha - 0.05)
  for (const [a, zVal] of alphaZ) {
    const delta = Math.abs(safeAlpha - a)
    if (delta < critDelta) {
      critZ = zVal
      critDelta = delta
    }
  }

  const effectZ = seH1 === 0 ? 0 : Math.abs(p2 - p1) / seH1
  const power = Math.min(
    1,
    Math.max(0, normalCdf(effectZ - critZ) + normalCdf(-effectZ - critZ)),
  )

  return {
    z,
    pValue,
    liftAbsPct: (p2 - p1) * 100,
    liftRelPct: p1 === 0 ? 0 : ((p2 - p1) / p1) * 100,
    power,
  }
}

function clampPositive(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

export function StatSigCalculator({
  defaultPerArm = 14_200,
  defaultControlRate = 18.4,
  defaultTreatmentRate = 22.1,
  defaultAlpha = 0.05,
  className,
}: StatSigCalculatorProps) {
  const [perArm, setPerArm] = useState<number>(defaultPerArm)
  const [controlRate, setControlRate] = useState<number>(defaultControlRate)
  const [treatmentRate, setTreatmentRate] =
    useState<number>(defaultTreatmentRate)
  const [alpha, setAlpha] = useState<number>(defaultAlpha)

  const handleNumber = useCallback(
    (setter: (n: number) => void, min: number, max: number, step = 1) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const raw = Number(event.target.value)
        if (!Number.isNaN(raw)) {
          const rounded = step >= 1 ? Math.round(raw) : Number(raw.toFixed(3))
          setter(clampPositive(rounded, min, max))
        }
      },
    [],
  )

  const result = useMemo(
    () => computeStatSig(perArm, controlRate, treatmentRate, alpha),
    [perArm, controlRate, treatmentRate, alpha],
  )

  const tier = significanceTier(result.pValue)
  const stars = formatSignificanceStars(tier)
  const sigTone: ChipTone =
    result.pValue < alpha ? "green" : result.pValue < 0.1 ? "amber" : "neutral"
  const powerTone: ChipTone =
    result.power >= 0.8 ? "green" : result.power >= 0.5 ? "amber" : "red"

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Statistical significance calculator"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Stat-sig · Two-proportion z-test</span>
        <h2 className={styles.title}>Significance calculator</h2>
      </header>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Visitors per arm</span>
          <input
            type="number"
            className={styles.input}
            min={50}
            max={5_000_000}
            step={50}
            value={perArm}
            onChange={handleNumber(setPerArm, 50, 5_000_000, 50)}
            inputMode="numeric"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Control rate (%)</span>
          <input
            type="number"
            className={styles.input}
            min={0.01}
            max={99}
            step={0.1}
            value={controlRate}
            onChange={handleNumber(setControlRate, 0.01, 99, 0.1)}
            inputMode="decimal"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Treatment rate (%)</span>
          <input
            type="number"
            className={styles.input}
            min={0.01}
            max={99}
            step={0.1}
            value={treatmentRate}
            onChange={handleNumber(setTreatmentRate, 0.01, 99, 0.1)}
            inputMode="decimal"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Alpha (α)</span>
          <input
            type="number"
            className={styles.input}
            min={0.001}
            max={0.2}
            step={0.005}
            value={alpha}
            onChange={handleNumber(setAlpha, 0.001, 0.2, 0.005)}
            inputMode="decimal"
          />
        </label>
      </div>

      <div className={styles.results} role="group" aria-label="Computed results">
        <div className={styles.metric}>
          <span className={styles.metricLabel}>P-value</span>
          <span className={styles.metricValue}>
            {result.pValue < 0.001
              ? "< 0.001"
              : result.pValue.toFixed(3)}
            {stars ? ` ${stars}` : ""}
          </span>
          <span className={styles.metricHint}>{formatPValue(result.pValue)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Z-score</span>
          <span className={styles.metricValue}>{result.z.toFixed(2)}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Lift (rel)</span>
          <span className={styles.metricValue}>
            {result.liftRelPct >= 0 ? "+" : ""}
            {result.liftRelPct.toFixed(1)}%
          </span>
          <span className={styles.metricHint}>
            {result.liftAbsPct >= 0 ? "+" : ""}
            {result.liftAbsPct.toFixed(2)} pp abs
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Power</span>
          <span className={styles.metricValue}>
            {Math.round(result.power * 100)}%
          </span>
        </div>
      </div>

      <div className={styles.chipStrip} aria-live="polite">
        <Chip
          label={`α = ${alpha.toFixed(3)}`}
          tone="neutral"
        />
        <Chip
          label={
            result.pValue < alpha
              ? `Significant ${stars || "*"}`
              : "Not significant"
          }
          tone={sigTone}
          selected={result.pValue < alpha}
        />
        <Chip
          label={`Power ${Math.round(result.power * 100)}%`}
          tone={powerTone}
        />
        <Chip
          label={`Total N ${formatSampleSize(perArm * 2)}`}
          tone="teal"
        />
      </div>
    </section>
  )
}

export default StatSigCalculator
