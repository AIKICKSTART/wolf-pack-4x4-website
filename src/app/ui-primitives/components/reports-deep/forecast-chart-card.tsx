import { useId, useMemo } from "react"

import { formatAudCompact } from "./reports-deep-types"
import type { ForecastPoint } from "./reports-deep-types"
import styles from "./forecast-chart-card.module.css"

interface ForecastChartCardProps {
  readonly title: string
  readonly kicker: string
  readonly points: ReadonlyArray<ForecastPoint>
  readonly summaryValue: string
  readonly summaryDelta: string
  readonly confidence: string
  readonly className?: string
}

interface PlotState {
  readonly viewBox: string
  readonly actualPath: string
  readonly forecastPath: string
  readonly bandPath: string
  readonly yTicks: ReadonlyArray<{ readonly y: number; readonly label: string }>
  readonly xTicks: ReadonlyArray<{ readonly x: number; readonly label: string }>
  readonly splitX: number
}

const WIDTH = 640
const HEIGHT = 240
const PAD_T = 16
const PAD_R = 18
const PAD_B = 32
const PAD_L = 48

function buildSmoothPath(coords: ReadonlyArray<readonly [number, number]>): string {
  if (coords.length === 0) return ""
  let d = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`
  for (let index = 0; index < coords.length - 1; index += 1) {
    const p0 = coords[index - 1] ?? coords[index]
    const p1 = coords[index]
    const p2 = coords[index + 1]
    const p3 = coords[index + 2] ?? p2
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d
}

function computePlot(points: ReadonlyArray<ForecastPoint>): PlotState {
  const innerW = WIDTH - PAD_L - PAD_R
  const innerH = HEIGHT - PAD_T - PAD_B
  const n = points.length

  let minY = Infinity
  let maxY = -Infinity
  for (const point of points) {
    if (typeof point.actual === "number") {
      minY = Math.min(minY, point.actual)
      maxY = Math.max(maxY, point.actual)
    }
    minY = Math.min(minY, point.lowerBound)
    maxY = Math.max(maxY, point.upperBound)
  }
  if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
    minY = 0
    maxY = 1
  }
  const range = maxY - minY || 1

  const step = n > 1 ? innerW / (n - 1) : 0
  const xAt = (i: number): number => PAD_L + i * step
  const yAt = (value: number): number => PAD_T + (1 - (value - minY) / range) * innerH

  const actualCoords: Array<[number, number]> = []
  const forecastCoords: Array<[number, number]> = []
  const bandTop: Array<[number, number]> = []
  const bandBottom: Array<[number, number]> = []

  let splitIndex = -1
  for (let i = 0; i < n; i += 1) {
    const point = points[i]
    const x = xAt(i)
    if (typeof point.actual === "number") {
      actualCoords.push([x, yAt(point.actual)])
      forecastCoords.push([x, yAt(point.actual)])
    } else {
      if (splitIndex < 0) splitIndex = i
      forecastCoords.push([x, yAt(point.forecast)])
    }
    bandTop.push([x, yAt(point.upperBound)])
    bandBottom.push([x, yAt(point.lowerBound)])
  }

  const bandTopPath = buildSmoothPath(bandTop)
  const bandBottomReverse = [...bandBottom].reverse()
  const bandBottomPath = bandBottomReverse
    .map(([x, y], idx) => (idx === 0 ? `L ${x.toFixed(2)} ${y.toFixed(2)}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`))
    .join(" ")

  const bandPath = `${bandTopPath} ${bandBottomPath} Z`

  const yTickCount = 4
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, idx) => {
    const ratio = idx / yTickCount
    const value = minY + (maxY - minY) * (1 - ratio)
    return { y: PAD_T + ratio * innerH, label: formatAudCompact(value) }
  })

  const xTickStep = Math.max(1, Math.ceil(n / 8))
  const xTicks: Array<{ x: number; label: string }> = []
  for (let i = 0; i < n; i += xTickStep) {
    xTicks.push({ x: xAt(i), label: points[i]?.label ?? "" })
  }
  if (n > 0) {
    xTicks.push({ x: xAt(n - 1), label: points[n - 1]?.label ?? "" })
  }

  const splitX = splitIndex >= 0 ? xAt(splitIndex) : PAD_L + innerW

  return {
    viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
    actualPath: buildSmoothPath(actualCoords),
    forecastPath: buildSmoothPath(forecastCoords),
    bandPath,
    yTicks,
    xTicks,
    splitX,
  }
}

export function ForecastChartCard({
  title,
  kicker,
  points,
  summaryValue,
  summaryDelta,
  confidence,
  className,
}: ForecastChartCardProps) {
  const reactId = useId()
  const plot = useMemo<PlotState>(() => computePlot(points), [points])
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Forecast: ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.summary}>
          <span className={styles.summaryValue}>{summaryValue}</span>
          <span className={styles.summaryDelta}>{summaryDelta}</span>
        </div>
        <span className={styles.confidence}>{confidence}</span>
      </header>

      <div className={styles.chartWrap}>
        <svg
          className={styles.chart}
          viewBox={plot.viewBox}
          role="img"
          aria-label={`${title} forecast chart`}
          preserveAspectRatio="none"
        >
          <title>{title}</title>
          <defs>
            <linearGradient id={`forecast-band-${reactId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primitive-teal)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primitive-teal)" stopOpacity="0.04" />
            </linearGradient>
            <pattern
              id={`forecast-hatch-${reactId}`}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--primitive-teal)" strokeWidth="1" />
            </pattern>
          </defs>

          {plot.yTicks.map((tick, index) => (
            <g key={`y-${index}`}>
              <line
                x1={PAD_L}
                y1={tick.y}
                x2={WIDTH - PAD_R}
                y2={tick.y}
                className={styles.gridLine}
              />
              <text x={PAD_L - 8} y={tick.y + 3} className={styles.axisText} textAnchor="end">
                {tick.label}
              </text>
            </g>
          ))}

          {plot.xTicks.map((tick, index) => (
            <text
              key={`x-${index}`}
              x={tick.x}
              y={HEIGHT - 8}
              className={styles.axisText}
              textAnchor="middle"
            >
              {tick.label}
            </text>
          ))}

          <path d={plot.bandPath} fill={`url(#forecast-band-${reactId})`} />

          <line
            x1={plot.splitX}
            y1={PAD_T}
            x2={plot.splitX}
            y2={HEIGHT - PAD_B}
            className={styles.splitLine}
            strokeDasharray="4 4"
          />

          <path d={plot.forecastPath} className={styles.forecastPath} fill="none" />
          <path d={plot.actualPath} className={styles.actualPath} fill="none" />
        </svg>
      </div>

      <footer className={styles.legend}>
        <span className={styles.legendItemActual}>Actual</span>
        <span className={styles.legendItemForecast}>Forecast</span>
        <span className={styles.legendItemBand}>Confidence band</span>
      </footer>
    </article>
  )
}

export default ForecastChartCard
