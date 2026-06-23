import type { DropOffPoint } from "./survey-types"

import styles from "./drop-off-chart.module.css"

interface DropOffChartProps {
  /** Per-question completion percentages, ordered by question index. */
  points: ReadonlyArray<DropOffPoint>
  /** Optional title rendered as the chart heading. */
  title?: string
  /** Caption shown above the chart axis. */
  caption?: string
  className?: string
}

const VIEW_WIDTH = 480
const VIEW_HEIGHT = 180
const PADDING_X = 36
const PADDING_TOP = 18
const PADDING_BOTTOM = 32

function biggestDropIndex(points: ReadonlyArray<DropOffPoint>): number {
  let worst = -1
  let worstIdx = -1
  for (let i = 1; i < points.length; i += 1) {
    const drop = points[i - 1].completion - points[i].completion
    if (drop > worst) {
      worst = drop
      worstIdx = i
    }
  }
  return worstIdx
}

export function DropOffChart({
  points,
  title = "Drop-off by question",
  caption,
  className,
}: DropOffChartProps) {
  const classes = [styles.chart, className].filter(Boolean).join(" ")
  const innerW = VIEW_WIDTH - PADDING_X * 2
  const innerH = VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM
  const step = points.length > 1 ? innerW / (points.length - 1) : 0

  const coords = points.map((p, i) => {
    const x = PADDING_X + step * i
    const y = PADDING_TOP + innerH - (p.completion / 100) * innerH
    return { x, y, point: p }
  })

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(" ")

  const areaPath = coords.length
    ? `${linePath} L${coords[coords.length - 1].x.toFixed(1)},${PADDING_TOP + innerH} L${coords[0].x.toFixed(1)},${PADDING_TOP + innerH} Z`
    : ""

  const worstIdx = biggestDropIndex(points)

  return (
    <figure
      className={classes}
      role="region"
      aria-label={title}
    >
      <figcaption className={styles.cap}>
        <span className={styles.kicker}>Analytics</span>
        <h3 className={styles.title}>{title}</h3>
        {caption ? <span className={styles.note}>{caption}</span> : null}
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className={styles.svg}
        role="img"
        aria-label={`${points.length} questions plotted by completion percentage`}
      >
        <defs>
          <linearGradient id="dropoff-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primitive-amber)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--primitive-amber)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 25, 50, 75, 100].map((tick) => {
          const y = PADDING_TOP + innerH - (tick / 100) * innerH
          return (
            <g key={tick}>
              <line
                x1={PADDING_X}
                x2={VIEW_WIDTH - PADDING_X}
                y1={y}
                y2={y}
                className={styles.gridLine}
              />
              <text x={PADDING_X - 8} y={y + 3} className={styles.axisText} textAnchor="end">
                {tick}%
              </text>
            </g>
          )
        })}

        {areaPath ? <path d={areaPath} fill="url(#dropoff-area)" /> : null}
        {linePath ? <path d={linePath} className={styles.line} fill="none" /> : null}

        {coords.map((c, i) => (
          <g key={c.point.question}>
            <circle
              cx={c.x}
              cy={c.y}
              r={i === worstIdx ? 5 : 3.2}
              className={i === worstIdx ? styles.markerWorst : styles.marker}
            />
            <text
              x={c.x}
              y={VIEW_HEIGHT - 10}
              textAnchor="middle"
              className={styles.axisText}
            >
              {c.point.question}
            </text>
          </g>
        ))}

        {worstIdx >= 0 && coords[worstIdx]?.point.annotation ? (
          <g>
            <line
              x1={coords[worstIdx].x}
              x2={coords[worstIdx].x}
              y1={PADDING_TOP}
              y2={coords[worstIdx].y - 8}
              className={styles.annotationLine}
            />
            <text
              x={coords[worstIdx].x}
              y={PADDING_TOP + 4}
              textAnchor={coords[worstIdx].x > VIEW_WIDTH / 2 ? "end" : "start"}
              className={styles.annotation}
            >
              {coords[worstIdx].point.annotation}
            </text>
          </g>
        ) : null}
      </svg>
    </figure>
  )
}
