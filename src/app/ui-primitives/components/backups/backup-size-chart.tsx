import type { BackupSizeSample } from "./backup-types"

import styles from "./backup-size-chart.module.css"

interface BackupSizeChartProps {
  samples: ReadonlyArray<BackupSizeSample>
  /** Index into samples marking the retention horizon (older days expire). */
  retentionHorizonIndex?: number
  /** Bytes — projected size at end of next period. */
  growthProjectionBytes?: number
  /** Title rendered in the chart header. */
  title?: string
  className?: string
}

const VIEW_WIDTH = 640
const VIEW_HEIGHT = 220
const PAD_TOP = 18
const PAD_BOTTOM = 32
const PAD_LEFT = 44
const PAD_RIGHT = 14

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let v = bytes / 1024
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i += 1
  }
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${units[i]}`
}

function buildStackedAreaPath(
  samples: ReadonlyArray<BackupSizeSample>,
  layer: "full" | "diff" | "incremental",
  maxTotal: number,
): string {
  if (samples.length === 0 || maxTotal <= 0) return ""
  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM
  const step = samples.length > 1 ? plotWidth / (samples.length - 1) : 0
  const points: Array<{ x: number; yTop: number; yBottom: number }> = []

  samples.forEach((sample, idx) => {
    const x = PAD_LEFT + idx * step
    let lowerStackBytes = 0
    let upperStackBytes = 0
    if (layer === "full") {
      upperStackBytes = sample.fullBytes
    } else if (layer === "diff") {
      lowerStackBytes = sample.fullBytes
      upperStackBytes = sample.fullBytes + sample.diffBytes
    } else {
      lowerStackBytes = sample.fullBytes + sample.diffBytes
      upperStackBytes = sample.fullBytes + sample.diffBytes + sample.incrementalBytes
    }
    const yBottom = PAD_TOP + plotHeight - (lowerStackBytes / maxTotal) * plotHeight
    const yTop = PAD_TOP + plotHeight - (upperStackBytes / maxTotal) * plotHeight
    points.push({ x, yTop, yBottom })
  })

  const top = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.yTop}`).join(" ")
  const bottom = points
    .slice()
    .reverse()
    .map((p) => `L${p.x},${p.yBottom}`)
    .join(" ")
  return `${top} ${bottom} Z`
}

export function BackupSizeChart({
  samples,
  retentionHorizonIndex,
  growthProjectionBytes,
  title = "Backup size over time",
  className,
}: BackupSizeChartProps) {
  const maxTotal = samples.reduce(
    (max, s) => Math.max(max, s.fullBytes + s.diffBytes + s.incrementalBytes),
    0,
  )
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((p) => p * maxTotal)
  const plotWidth = VIEW_WIDTH - PAD_LEFT - PAD_RIGHT
  const plotHeight = VIEW_HEIGHT - PAD_TOP - PAD_BOTTOM
  const step = samples.length > 1 ? plotWidth / (samples.length - 1) : 0

  const horizonX =
    retentionHorizonIndex !== undefined && retentionHorizonIndex >= 0
      ? PAD_LEFT + retentionHorizonIndex * step
      : null

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <figure className={classes}>
      <figcaption className={styles.head}>
        <span className={styles.kicker}>Size trend</span>
        <h3 className={styles.title}>{title}</h3>
        {growthProjectionBytes !== undefined ? (
          <span className={styles.projChip}>
            Projected → {formatBytes(growthProjectionBytes)}
          </span>
        ) : null}
      </figcaption>

      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-label={`${title}. ${samples.length} days plotted.`}
      >
        <g className={styles.gridLines}>
          {yTicks.map((tick, i) => {
            const y = PAD_TOP + plotHeight - (tick / (maxTotal || 1)) * plotHeight
            return (
              <g key={i}>
                <line x1={PAD_LEFT} y1={y} x2={VIEW_WIDTH - PAD_RIGHT} y2={y} />
                <text x={PAD_LEFT - 8} y={y + 3} textAnchor="end">
                  {formatBytes(tick)}
                </text>
              </g>
            )
          })}
        </g>

        <path
          d={buildStackedAreaPath(samples, "full", maxTotal)}
          className={styles.areaFull}
        />
        <path
          d={buildStackedAreaPath(samples, "diff", maxTotal)}
          className={styles.areaDiff}
        />
        <path
          d={buildStackedAreaPath(samples, "incremental", maxTotal)}
          className={styles.areaIncremental}
        />

        {horizonX !== null ? (
          <g>
            <line
              x1={horizonX}
              x2={horizonX}
              y1={PAD_TOP}
              y2={VIEW_HEIGHT - PAD_BOTTOM}
              className={styles.horizon}
            />
            <text x={horizonX + 4} y={PAD_TOP + 10} className={styles.horizonLabel}>
              Retention horizon
            </text>
          </g>
        ) : null}

        <g className={styles.xLabels}>
          {samples.map((sample, idx) => {
            if (idx % Math.max(1, Math.floor(samples.length / 6)) !== 0) return null
            const x = PAD_LEFT + idx * step
            return (
              <text key={sample.date} x={x} y={VIEW_HEIGHT - 10} textAnchor="middle">
                {sample.date.slice(5)}
              </text>
            )
          })}
        </g>
      </svg>

      <ul className={styles.legend} aria-label="Layers">
        <li>
          <span className={[styles.swatch, styles.swatchFull].join(" ")} aria-hidden="true" />
          Full
        </li>
        <li>
          <span className={[styles.swatch, styles.swatchDiff].join(" ")} aria-hidden="true" />
          Differential
        </li>
        <li>
          <span
            className={[styles.swatch, styles.swatchIncremental].join(" ")}
            aria-hidden="true"
          />
          Incremental
        </li>
      </ul>
    </figure>
  )
}

export default BackupSizeChart
