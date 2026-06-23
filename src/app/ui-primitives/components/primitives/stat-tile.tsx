import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import type { CSSProperties } from "react"

import styles from "./stat-tile.module.css"

export type StatTileTone = "red" | "amber" | "teal" | "green" | "neutral"
export type DeltaDirection = "up" | "down" | "flat"

interface StatTileDelta {
  value: string
  direction: DeltaDirection
  helpText?: string
}

interface StatTileProps {
  label: string
  value: string
  unit?: string
  delta?: StatTileDelta
  sparkline?: number[]
  tone?: StatTileTone
  caption?: string
  className?: string
}

const TONE_VAR: Record<StatTileTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  neutral: "var(--primitive-icon-obsidian)",
}

const DELTA_CLASS: Record<DeltaDirection, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

function DeltaIcon({ direction }: { direction: DeltaDirection }) {
  if (direction === "up") {
    return <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  if (direction === "down") {
    return <ArrowDownRight size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  return <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
}

function buildSparklinePath(points: number[], width: number, height: number): string {
  if (points.length === 0) {
    return ""
  }
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const stepX = points.length > 1 ? width / (points.length - 1) : width
  return points
    .map((point, index) => {
      const x = index * stepX
      const y = height - ((point - min) / range) * height
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

function buildSparkAreaPath(points: number[], width: number, height: number): string {
  if (points.length === 0) {
    return ""
  }
  const line = buildSparklinePath(points, width, height)
  return `${line} L ${width.toFixed(2)} ${height} L 0 ${height} Z`
}

export function StatTile({
  label,
  value,
  unit,
  delta,
  sparkline,
  tone = "teal",
  caption,
  className,
}: StatTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const sparkWidth = 120
  const sparkHeight = 32

  return (
    <article
      className={classes}
      style={{ "--tile-tone": TONE_VAR[tone] } as CSSProperties}
    >
      <header className={styles.head}>
        <span className={styles.label}>{label}</span>
        {delta && (
          <span className={`${styles.delta} ${DELTA_CLASS[delta.direction]}`}>
            <DeltaIcon direction={delta.direction} />
            <span>{delta.value}</span>
          </span>
        )}
      </header>
      <div className={styles.body}>
        <strong className={styles.value}>
          {value}
          {unit && <em className={styles.unit}>{unit}</em>}
        </strong>
        {sparkline && sparkline.length > 1 && (
          <svg
            className={styles.spark}
            viewBox={`0 0 ${sparkWidth} ${sparkHeight}`}
            width={sparkWidth}
            height={sparkHeight}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`stat-spark-${label.replace(/\W+/g, "-")}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.36" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={buildSparkAreaPath(sparkline, sparkWidth, sparkHeight)}
              fill={`url(#stat-spark-${label.replace(/\W+/g, "-")})`}
            />
            <path
              d={buildSparklinePath(sparkline, sparkWidth, sparkHeight)}
              className={styles.sparkLine}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        )}
      </div>
      {(caption || delta?.helpText) && (
        <footer className={styles.foot}>
          {caption ?? delta?.helpText}
        </footer>
      )}
    </article>
  )
}

export default StatTile
