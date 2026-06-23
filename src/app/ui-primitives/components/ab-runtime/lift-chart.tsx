import { useId } from "react"

import styles from "./lift-chart.module.css"

export interface LiftDailyPoint {
  /** Day label, e.g. "May 12". */
  label: string
  /** Observed lift, percent. */
  lift: number
  /** Lower CI bound (percent). */
  lower: number
  /** Upper CI bound (percent). */
  upper: number
}

export interface LiftChartProps {
  title?: string
  /** Series of daily lift points. */
  points: ReadonlyArray<LiftDailyPoint>
  /** Confidence level for the band, e.g. 0.95. */
  confidence?: number
  height?: number
  className?: string
}

function smoothPath(coords: ReadonlyArray<readonly [number, number]>): string {
  if (coords.length === 0) return ""
  if (coords.length === 1) {
    const [x, y] = coords[0]
    return `M ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  let d = `M ${coords[0][0].toFixed(2)} ${coords[0][1].toFixed(2)}`
  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] ?? coords[i]
    const p1 = coords[i]
    const p2 = coords[i + 1]
    const p3 = coords[i + 2] ?? p2

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d
}

export function LiftChart({
  title = "Daily lift over control",
  points,
  confidence = 0.95,
  height = 220,
  className,
}: LiftChartProps) {
  const id = useId()
  const width = 640
  const padding = { top: 16, right: 18, bottom: 30, left: 44 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  if (points.length === 0) {
    return null
  }

  const allValues = points.flatMap((p) => [p.lift, p.lower, p.upper])
  const rawMin = Math.min(0, ...allValues)
  const rawMax = Math.max(0, ...allValues)
  const span = rawMax - rawMin || 1
  const minY = rawMin - span * 0.1
  const maxY = rawMax + span * 0.1
  const yRange = maxY - minY || 1

  const stepX = points.length > 1 ? innerW / (points.length - 1) : 0

  const project = (value: number, index: number): readonly [number, number] => {
    const x = padding.left + index * stepX
    const yRatio = (value - minY) / yRange
    const y = padding.top + innerH - yRatio * innerH
    return [x, y]
  }

  const liftCoords = points.map((p, idx) => project(p.lift, idx))
  const upperCoords = points.map((p, idx) => project(p.upper, idx))
  const lowerCoordsReversed = points
    .map((p, idx) => project(p.lower, idx))
    .reverse()

  const liftPath = smoothPath(liftCoords)
  const bandPath = `${smoothPath(upperCoords)} L ${lowerCoordsReversed
    .map((coord) => coord.join(" "))
    .join(" L ")} Z`

  // Y ticks at 5 evenly spaced positions.
  const tickCount = 4
  const ticks = Array.from({ length: tickCount + 1 }, (_unused, idx) => {
    const value = minY + ((maxY - minY) * idx) / tickCount
    const yRatio = (value - minY) / yRange
    const y = padding.top + innerH - yRatio * innerH
    return { value, y }
  })

  const zeroY = padding.top + innerH - ((0 - minY) / yRange) * innerH
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const sampleLast = points[points.length - 1]
  const ariaLabel = `${title}. Series spans ${points.length} days, final observed lift ${sampleLast.lift.toFixed(1)}%.`

  return (
    <section
      className={classes}
      role="region"
      aria-label="Daily lift chart"
    >
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Daily lift · {Math.round(confidence * 100)}% CI band</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span
              className={styles.legendSwatch}
              style={{ background: "var(--primitive-teal)" }}
              aria-hidden="true"
            />
            Observed lift
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendBand} aria-hidden="true" />
            {Math.round(confidence * 100)}% CI
          </span>
        </div>
      </header>

      <div className={styles.chartSlot}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={ariaLabel}
          preserveAspectRatio="none"
        >
          <title>{title}</title>
          <desc>{ariaLabel}</desc>

          <g>
            {ticks.map((tick) => (
              <g key={`${id}-tick-${tick.y.toFixed(2)}`}>
                <line
                  x1={padding.left}
                  x2={width - padding.right}
                  y1={tick.y}
                  y2={tick.y}
                  className={styles.gridLine}
                />
                <text
                  x={padding.left - 8}
                  y={tick.y + 4}
                  className={styles.axisLabel}
                  textAnchor="end"
                >
                  {tick.value >= 0 ? "+" : ""}
                  {tick.value.toFixed(1)}%
                </text>
              </g>
            ))}
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={zeroY}
              y2={zeroY}
              className={styles.zeroLine}
            />
          </g>

          <g>
            {points.map((p, idx) => {
              const xCoord = padding.left + idx * stepX
              return (
                <text
                  key={`${id}-x-${p.label}-${idx}`}
                  x={xCoord}
                  y={padding.top + innerH + 18}
                  className={styles.axisLabel}
                  textAnchor="middle"
                >
                  {idx === 0 ||
                  idx === points.length - 1 ||
                  idx === Math.floor(points.length / 2)
                    ? p.label
                    : ""}
                </text>
              )
            })}
          </g>

          <path d={bandPath} className={styles.band} />
          <path d={liftPath} className={styles.lift} />
          {liftCoords.length > 0 ? (
            <circle
              cx={liftCoords[liftCoords.length - 1][0]}
              cy={liftCoords[liftCoords.length - 1][1]}
              r={3.5}
              className={styles.marker}
            />
          ) : null}
        </svg>
      </div>
    </section>
  )
}

export default LiftChart
