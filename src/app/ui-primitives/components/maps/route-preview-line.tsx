import styles from "./route-preview-line.module.css"

export interface RoutePoint {
  /** SVG viewBox X coordinate. */
  x: number
  /** SVG viewBox Y coordinate. */
  y: number
  label: string
}

export interface RoutePreviewLineProps {
  from: RoutePoint
  to: RoutePoint
  /** Distance label e.g. "12.4 km". */
  distance: string
  /** ETA label e.g. "18 min". */
  eta: string
  /** Curvature multiplier — 0 is a straight line, 1 is a gentle arc. */
  curvature?: number
}

/**
 * SVG quadratic-bezier route between two pins with an animated dash and a
 * floating distance + ETA chip at the mid-point. Renders inside a parent
 * SVG element (e.g. StaticMapCanvas).
 */
export function RoutePreviewLine({
  from,
  to,
  distance,
  eta,
  curvature = 0.3,
}: RoutePreviewLineProps) {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2
  // perpendicular offset for the control point
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.sqrt(dx * dx + dy * dy)
  const offset = length * curvature
  const nx = -dy / length
  const ny = dx / length
  const cx = midX + nx * offset
  const cy = midY + ny * offset

  const path = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
  // mid-point on a quadratic bezier at t=0.5 is the average of the three control terms
  const labelX = 0.25 * from.x + 0.5 * cx + 0.25 * to.x
  const labelY = 0.25 * from.y + 0.5 * cy + 0.25 * to.y

  return (
    <g role="group" aria-label={`Route from ${from.label} to ${to.label} — ${distance}, ${eta}`}>
      <path d={path} className={styles.casing} />
      <path d={path} className={styles.line} />

      <g transform={`translate(${from.x} ${from.y})`}>
        <circle r="6" className={styles.endpoint} />
        <circle r="2" className={styles.endpointDot} />
      </g>
      <g transform={`translate(${to.x} ${to.y})`}>
        <circle r="6" className={styles.endpoint} />
        <circle r="2" className={styles.endpointDot} />
      </g>

      <g transform={`translate(${labelX} ${labelY})`} className={styles.chip}>
        <rect x="-46" y="-14" width="92" height="28" rx="14" className={styles.chipBg} />
        <text x="-30" y="-1" className={styles.chipDistance}>
          {distance}
        </text>
        <text x="-30" y="9" className={styles.chipEta}>
          ETA {eta}
        </text>
        <circle cx="32" cy="0" r="6" className={styles.chipDot} />
      </g>
    </g>
  )
}

export default RoutePreviewLine
