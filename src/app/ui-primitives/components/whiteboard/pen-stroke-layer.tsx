import type { PenStrokePoint } from "./whiteboard-types"
import styles from "./pen-stroke-layer.module.css"

export interface PenStrokeLayerProps {
  /** Points making up the stroke. Min 2 points. */
  points: ReadonlyArray<PenStrokePoint>
  /** Stroke colour token / hex. */
  color?: string
  /** Base stroke width — modulated by pressure when pressure is provided. */
  baseWidth?: number
  /** Optional className passthrough. */
  className?: string
  /** Optional aria-label override. */
  ariaLabel?: string
  /** Optional viewBox padding around the bounding box. */
  pad?: number
}

interface Bounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

function bounds(points: ReadonlyArray<PenStrokePoint>): Bounds {
  let minX = points[0].x
  let minY = points[0].y
  let maxX = points[0].x
  let maxY = points[0].y
  for (const p of points) {
    if (p.x < minX) minX = p.x
    if (p.y < minY) minY = p.y
    if (p.x > maxX) maxX = p.x
    if (p.y > maxY) maxY = p.y
  }
  return { minX, minY, maxX, maxY }
}

/**
 * Build a single smoothed quadratic-bezier path through every point. We use the
 * midpoint smoothing trick — each control point is the current point, and the
 * curve endpoint is the midpoint between the current and next point.
 */
function smoothedPath(points: ReadonlyArray<PenStrokePoint>): string {
  if (points.length < 2) return ""
  const segments: string[] = [`M ${points[0].x} ${points[0].y}`]
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    segments.push(`Q ${current.x} ${current.y}, ${midX} ${midY}`)
  }
  const last = points[points.length - 1]
  segments.push(`T ${last.x} ${last.y}`)
  return segments.join(" ")
}

/**
 * Pressure-sensitive path: build a polygon by tracing both sides of the
 * stroke offset by half-width (per-point pressure). This is a simple
 * isosceles approximation — good enough for visual demos.
 */
function pressurePolygon(
  points: ReadonlyArray<PenStrokePoint>,
  baseWidth: number,
): string {
  if (points.length < 2) return ""
  const top: string[] = []
  const bottom: string[] = []
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    const prev = points[i - 1] ?? p
    const next = points[i + 1] ?? p
    const dx = next.x - prev.x
    const dy = next.y - prev.y
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    const pressure = p.pressure ?? 0.6
    const half = (baseWidth * (0.35 + pressure)) / 2
    top.push(`${p.x + nx * half} ${p.y + ny * half}`)
    bottom.push(`${p.x - nx * half} ${p.y - ny * half}`)
  }
  bottom.reverse()
  return `M ${top.join(" L ")} L ${bottom.join(" L ")} Z`
}

export function PenStrokeLayer({
  points,
  color = "var(--primitive-amber)",
  baseWidth = 6,
  className,
  ariaLabel = "Pen stroke",
  pad = 12,
}: PenStrokeLayerProps) {
  if (points.length < 2) {
    return null
  }
  const b = bounds(points)
  const width = Math.max(b.maxX - b.minX, 1)
  const height = Math.max(b.maxY - b.minY, 1)
  const hasPressure = points.some((p) => typeof p.pressure === "number")
  const classes = [styles.layer, className].filter(Boolean).join(" ")

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      className={classes}
      width={width + pad * 2}
      height={height + pad * 2}
      viewBox={`${b.minX - pad} ${b.minY - pad} ${width + pad * 2} ${height + pad * 2}`}
    >
      {hasPressure ? (
        <path
          d={pressurePolygon(points, baseWidth)}
          fill={color}
          stroke="none"
        />
      ) : (
        <path
          d={smoothedPath(points)}
          fill="none"
          stroke={color}
          strokeWidth={baseWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export default PenStrokeLayer
