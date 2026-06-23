import styles from "./connection-line.module.css"

type ConnectionTone = "neutral" | "red" | "amber" | "teal" | "green"

export interface ConnectionPoint {
  x: number
  y: number
}

interface ConnectionLineProps {
  from: ConnectionPoint
  to: ConnectionPoint
  /** Bezier curvature. 0.4 by default. */
  curvature?: number
  tone?: ConnectionTone
  /** Optional midpoint label rendered as a chip. */
  label?: string
  /** Optional explicit chip tone — defaults to line tone. */
  labelTone?: ConnectionTone
  /** Container reference size in px for coordinate mapping. Defaults to 1000x600. */
  width?: number
  height?: number
}

const TONE_CLASS: Record<ConnectionTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

const LABEL_TONE_CLASS: Record<ConnectionTone, string> = {
  neutral: "",
  red: styles.labelChipRed,
  amber: styles.labelChipAmber,
  teal: styles.labelChipTeal,
  green: styles.labelChipGreen,
}

function bezierPath(from: ConnectionPoint, to: ConnectionPoint, curvature: number): string {
  const dx = (to.x - from.x) * curvature
  const c1x = from.x + dx
  const c1y = from.y
  const c2x = to.x - dx
  const c2y = to.y
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`
}

function midpoint(from: ConnectionPoint, to: ConnectionPoint): ConnectionPoint {
  return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
}

export function ConnectionLine({
  from,
  to,
  curvature = 0.4,
  tone = "neutral",
  label,
  labelTone,
  width = 1000,
  height = 600,
}: ConnectionLineProps) {
  const d = bezierPath(from, to, curvature)
  const mid = midpoint(from, to)
  const labelToneClass = LABEL_TONE_CLASS[labelTone ?? tone]
  const arrowId = `cl-arrow-${tone}`

  return (
    <>
      <svg
        className={[styles.line, TONE_CLASS[tone]].join(" ")}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id={arrowId}
            viewBox="0 0 12 12"
            refX="9"
            refY="6"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 12 6 L 0 12 z" className={styles.arrowHead} />
          </marker>
        </defs>
        <path d={d} className={styles.track} />
        <path d={d} className={styles.flow} markerEnd={`url(#${arrowId})`} />
      </svg>
      {label ? (
        <span
          className={[styles.labelChip, labelToneClass].filter(Boolean).join(" ")}
          style={{
            left: `${(mid.x / width) * 100}%`,
            top: `${(mid.y / height) * 100}%`,
          }}
        >
          {label}
        </span>
      ) : null}
    </>
  )
}

export type { ConnectionTone }
