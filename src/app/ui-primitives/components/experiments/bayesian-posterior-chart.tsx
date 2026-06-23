import * as React from "react"

import { Chip } from "../primitives/chip"

import styles from "./bayesian-posterior-chart.module.css"

export type PosteriorTone = "red" | "amber" | "teal" | "green"

export interface PosteriorVariant {
  id: string
  name: string
  /** Density samples — values 0..1 representing a normalised density curve. */
  density: ReadonlyArray<number>
  /** 95% credible interval as [lo, hi] on the same x-axis (0..xMax). */
  credibleInterval: readonly [number, number]
  /** Probability this variant beats the baseline. */
  probToBeatBaseline: number
  tone: PosteriorTone
  isBaseline?: boolean
}

export interface BayesianPosteriorChartProps {
  variants: ReadonlyArray<PosteriorVariant>
  /** X-axis range — e.g. conversion rate 0..0.5 (50%). */
  xMin?: number
  xMax?: number
  xLabel?: string
  className?: string
}

const TONE_VAR: Record<PosteriorTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

function buildPath(
  density: ReadonlyArray<number>,
  width: number,
  height: number,
  padding: { top: number; bottom: number; left: number; right: number },
): { line: string; area: string } {
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const n = density.length
  if (n === 0) return { line: "", area: "" }
  const stepX = n > 1 ? innerW / (n - 1) : 0
  const max = Math.max(...density, 0.0001)
  const coords = density.map((value, idx) => {
    const x = padding.left + idx * stepX
    const y = padding.top + innerH - (value / max) * innerH
    return [x, y] as const
  })
  let line = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`
  for (let i = 1; i < coords.length; i += 1) {
    line += ` L ${coords[i][0].toFixed(2)} ${coords[i][1].toFixed(2)}`
  }
  const baselineY = (padding.top + innerH).toFixed(2)
  const area = `${line} L ${coords[coords.length - 1][0].toFixed(2)} ${baselineY} L ${coords[0][0].toFixed(2)} ${baselineY} Z`
  return { line, area }
}

export function BayesianPosteriorChart({
  variants,
  xMin = 0,
  xMax = 1,
  xLabel = "Metric",
  className,
}: BayesianPosteriorChartProps) {
  const reactId = React.useId()
  const width = 640
  const height = 240
  const padding = { top: 18, bottom: 36, left: 36, right: 16 }
  const innerW = width - padding.left - padding.right

  const range = xMax - xMin || 1
  const xScale = (value: number) =>
    padding.left + ((value - xMin) / range) * innerW

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Bayesian posterior distribution chart"
    >
      <svg
        className={styles.chart}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Posterior distributions per variant with credible intervals"
        preserveAspectRatio="none"
      >
        <title>Posterior distributions</title>
        <desc>
          {`Bayesian posterior density per variant across ${variants.length} arms.`}
        </desc>

        <defs>
          {variants.map((variant, idx) => (
            <linearGradient
              key={`${variant.id}-grad`}
              id={`${reactId}-${idx}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={TONE_VAR[variant.tone]} stopOpacity="0.5" />
              <stop offset="100%" stopColor={TONE_VAR[variant.tone]} stopOpacity="0.04" />
            </linearGradient>
          ))}
        </defs>

        {/* Baseline grid */}
        <line
          x1={padding.left}
          x2={width - padding.right}
          y1={height - padding.bottom}
          y2={height - padding.bottom}
          stroke="var(--primitive-line)"
        />

        {/* Credible intervals + densities */}
        {variants.map((variant, idx) => {
          const { line, area } = buildPath(
            variant.density,
            width,
            height,
            padding,
          )
          const [lo, hi] = variant.credibleInterval
          const xLo = xScale(lo)
          const xHi = xScale(hi)
          return (
            <g key={variant.id}>
              <rect
                x={xLo}
                y={padding.top}
                width={Math.max(1, xHi - xLo)}
                height={height - padding.top - padding.bottom}
                fill={TONE_VAR[variant.tone]}
                opacity={0.08}
              />
              <path d={area} fill={`url(#${reactId}-${idx})`} />
              <path
                d={line}
                fill="none"
                stroke={TONE_VAR[variant.tone]}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )
        })}

        <text
          x={width / 2}
          y={height - 8}
          textAnchor="middle"
          className={styles.axisLabel}
        >
          {xLabel}
        </text>
      </svg>

      <ul className={styles.legend}>
        {variants.map((variant) => (
          <li key={variant.id} className={styles.legendItem}>
            <span
              className={styles.swatch}
              style={{ background: TONE_VAR[variant.tone] }}
              aria-hidden="true"
            />
            <span className={styles.legendName}>
              {variant.name}
              {variant.isBaseline ? " (baseline)" : ""}
            </span>
            <Chip
              label={`P(beat baseline) ${Math.round(variant.probToBeatBaseline * 100)}%`}
              tone={
                variant.probToBeatBaseline > 0.95
                  ? "green"
                  : variant.probToBeatBaseline > 0.8
                    ? "teal"
                    : variant.probToBeatBaseline > 0.5
                      ? "amber"
                      : "neutral"
              }
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BayesianPosteriorChart
