import styles from "./edge-connection-line.module.css"
import type { ProtocolKind, TopologyTone } from "./topology-types"

interface EdgePoint {
  x: number
  y: number
}

interface EdgeConnectionLineProps {
  /** Start point in SVG coordinates. */
  from: EdgePoint
  /** End point in SVG coordinates. */
  to: EdgePoint
  /** Bezier curvature factor. Defaults to 0.42. */
  curvature?: number
  /** Tone of the flow line. */
  tone?: TopologyTone
  /** Optional bandwidth chip at midpoint — e.g. `480 Mbps`. */
  bandwidth?: string
  /** Optional protocol chip at midpoint — e.g. `https`. */
  protocol?: ProtocolKind
  /** Bidirectional edge — adds a return-flow stroke beneath the main line. */
  bidirectional?: boolean
  /** Reference width for percentage mapping. Defaults to 1000. */
  width?: number
  /** Reference height for percentage mapping. Defaults to 600. */
  height?: number
}

const TONE_CLASS: Record<TopologyTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

const PROTOCOL_LABEL: Record<ProtocolKind, string> = {
  tcp: "TCP",
  udp: "UDP",
  http: "HTTP",
  https: "HTTPS",
  grpc: "gRPC",
  icmp: "ICMP",
  any: "ANY",
}

function bezierPath(from: EdgePoint, to: EdgePoint, curvature: number): string {
  const dx = (to.x - from.x) * curvature
  const c1x = from.x + dx
  const c1y = from.y
  const c2x = to.x - dx
  const c2y = to.y
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`
}

function midpoint(from: EdgePoint, to: EdgePoint): EdgePoint {
  return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
}

export function EdgeConnectionLine({
  from,
  to,
  curvature = 0.42,
  tone = "teal",
  bandwidth,
  protocol,
  bidirectional = false,
  width = 1000,
  height = 600,
}: EdgeConnectionLineProps) {
  const d = bezierPath(from, to, curvature)
  const mid = midpoint(from, to)
  const arrowId = `tc-edge-arrow-${tone}-${Math.round(from.x)}-${Math.round(from.y)}`
  const reverseId = `tc-edge-reverse-${tone}-${Math.round(from.x)}-${Math.round(from.y)}`

  return (
    <>
      <svg
        className={[styles.svg, TONE_CLASS[tone]].join(" ")}
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
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 12 6 L 0 12 z" className={styles.arrowHead} />
          </marker>
          {bidirectional ? (
            <marker
              id={reverseId}
              viewBox="0 0 12 12"
              refX="3"
              refY="6"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 12 0 L 0 6 L 12 12 z" className={styles.arrowHead} />
            </marker>
          ) : null}
        </defs>
        <path d={d} className={styles.track} />
        {bidirectional ? (
          <path
            d={d}
            className={[styles.flow, styles.flowReverse].join(" ")}
            markerStart={`url(#${reverseId})`}
          />
        ) : null}
        <path d={d} className={styles.flow} markerEnd={`url(#${arrowId})`} />
      </svg>
      {bandwidth || protocol ? (
        <span
          className={styles.midChip}
          style={{
            left: `${(mid.x / width) * 100}%`,
            top: `${(mid.y / height) * 100}%`,
          }}
        >
          {protocol ? (
            <span className={styles.protocolPill}>{PROTOCOL_LABEL[protocol]}</span>
          ) : null}
          {bandwidth ? (
            <span className={styles.bandwidthPill}>{bandwidth}</span>
          ) : null}
        </span>
      ) : null}
    </>
  )
}
