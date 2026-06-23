import styles from "./speed-ramp-curve.module.css"
import type { SpeedRampAnchor } from "./video-editor-types"

interface SpeedRampCurveProps {
  /** Anchor points along the clip — t in 0..1, speed 0.25..4. */
  anchors: ReadonlyArray<SpeedRampAnchor>
  /** Overall width — px. Defaults to 360. */
  width?: number
  /** Overall height — px. Defaults to 120. */
  height?: number
  /** Title shown above the curve. Defaults to "Speed ramp". */
  title?: string
}

const MIN_SPEED = 0.25
const MAX_SPEED = 4

function clamp01(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 1) return 1
  return value
}

function clampSpeed(value: number): number {
  if (!Number.isFinite(value)) return 1
  if (value < MIN_SPEED) return MIN_SPEED
  if (value > MAX_SPEED) return MAX_SPEED
  return value
}

function speedToY(speed: number, h: number): number {
  // Log-scale so 1x sits at the visual midline.
  const logMin = Math.log(MIN_SPEED)
  const logMax = Math.log(MAX_SPEED)
  const logSpeed = Math.log(clampSpeed(speed))
  const normalised = (logSpeed - logMin) / (logMax - logMin)
  // Higher speed → higher on the screen, so flip.
  return h - normalised * h
}

export function SpeedRampCurve({
  anchors,
  width = 360,
  height = 120,
  title = "Speed ramp",
}: SpeedRampCurveProps) {
  const sorted = [...anchors].sort((a, b) => a.t - b.t)
  if (sorted.length === 0) {
    sorted.push({ t: 0, speed: 1 }, { t: 1, speed: 1 })
  }

  const padding = 16
  const inner = {
    x: padding,
    y: padding,
    w: width - padding * 2,
    h: height - padding * 2,
  }

  const points = sorted.map((anchor) => ({
    x: inner.x + clamp01(anchor.t) * inner.w,
    y: inner.y + speedToY(anchor.speed, inner.h),
    speed: clampSpeed(anchor.speed),
  }))

  // Smooth path via mid-point cubic beziers.
  const path = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
      const prev = points[index - 1]
      const cx1 = (prev.x + point.x) / 2
      return `C ${cx1.toFixed(2)} ${prev.y.toFixed(2)} ${cx1.toFixed(2)} ${point.y.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    })
    .join(" ")

  const midlineY = inner.y + speedToY(1, inner.h)

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.range}>0.25× → 4×</span>
      </header>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Speed ramp curve with ${points.length} anchors`}
      >
        <defs>
          <linearGradient id="speedFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-amber) 36%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-amber) 2%, transparent)" />
          </linearGradient>
        </defs>
        <rect
          x={inner.x}
          y={inner.y}
          width={inner.w}
          height={inner.h}
          className={styles.bg}
        />
        <line
          x1={inner.x}
          x2={inner.x + inner.w}
          y1={midlineY}
          y2={midlineY}
          className={styles.midline}
        />
        <path
          d={`${path} L ${points[points.length - 1].x.toFixed(2)} ${(inner.y + inner.h).toFixed(2)} L ${points[0].x.toFixed(2)} ${(inner.y + inner.h).toFixed(2)} Z`}
          fill="url(#speedFill)"
          stroke="none"
        />
        <path d={path} className={styles.curve} />
        {points.map((point, index) => (
          <g key={`anchor-${index}`} className={styles.anchor}>
            <circle cx={point.x} cy={point.y} r={5} />
            <text
              x={point.x}
              y={point.y - 10}
              textAnchor="middle"
              className={styles.anchorLabel}
            >
              {point.speed.toFixed(2)}×
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
