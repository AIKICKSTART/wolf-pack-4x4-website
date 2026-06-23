import type { ReactNode } from "react"

import type { CanvasPoint, ConnectorCap, ConnectorShape } from "./whiteboard-types"
import styles from "./connector-line-tool.module.css"

export interface ConnectorLineToolProps {
  /** Start point in canvas coordinates. */
  start: CanvasPoint
  /** End point in canvas coordinates. */
  end: CanvasPoint
  /** Line shape — straight, orthogonal (right angles), or curved bezier. */
  shape: ConnectorShape
  /** Start cap. */
  startCap?: ConnectorCap
  /** End cap. */
  endCap?: ConnectorCap
  /** Optional inline label slot rendered mid-line. */
  label?: ReactNode
  /** Stroke colour token / hex. */
  color?: string
  /** Stroke width. */
  strokeWidth?: number
  /** Dashed line. */
  dashed?: boolean
  /** Optional className passthrough. */
  className?: string
  /** Optional accessible label. */
  ariaLabel?: string
}

function bbox(start: CanvasPoint, end: CanvasPoint): {
  minX: number
  minY: number
  width: number
  height: number
  pad: number
} {
  const pad = 32
  const minX = Math.min(start.x, end.x) - pad
  const minY = Math.min(start.y, end.y) - pad
  const width = Math.abs(end.x - start.x) + pad * 2
  const height = Math.abs(end.y - start.y) + pad * 2
  return { minX, minY, width, height, pad }
}

function pathFor(
  shape: ConnectorShape,
  start: CanvasPoint,
  end: CanvasPoint,
): string {
  if (shape === "straight") {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`
  }
  if (shape === "orthogonal") {
    const midX = (start.x + end.x) / 2
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`
  }
  const dx = end.x - start.x
  const c1x = start.x + dx * 0.45
  const c2x = end.x - dx * 0.45
  return `M ${start.x} ${start.y} C ${c1x} ${start.y}, ${c2x} ${end.y}, ${end.x} ${end.y}`
}

function midpoint(start: CanvasPoint, end: CanvasPoint): CanvasPoint {
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  }
}

function CapMarkers({ color }: { color: string }) {
  return (
    <defs>
      <marker
        id="wb-connector-arrow"
        viewBox="0 0 12 12"
        refX="11"
        refY="6"
        markerWidth="9"
        markerHeight="9"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L12 6 L0 12 Z" fill={color} />
      </marker>
      <marker
        id="wb-connector-dot"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        markerWidth="7"
        markerHeight="7"
      >
        <circle cx="6" cy="6" r="5" fill={color} />
      </marker>
      <marker
        id="wb-connector-diamond"
        viewBox="0 0 14 14"
        refX="12"
        refY="7"
        markerWidth="9"
        markerHeight="9"
        orient="auto"
      >
        <path d="M2 7 L7 1 L13 7 L7 13 Z" fill={color} />
      </marker>
    </defs>
  )
}

function capUrl(cap: ConnectorCap): string | undefined {
  if (cap === "arrow") return "url(#wb-connector-arrow)"
  if (cap === "dot") return "url(#wb-connector-dot)"
  if (cap === "diamond") return "url(#wb-connector-diamond)"
  return undefined
}

export function ConnectorLineTool({
  start,
  end,
  shape,
  startCap = "none",
  endCap = "arrow",
  label,
  color = "var(--primitive-teal)",
  strokeWidth = 2,
  dashed = false,
  className,
  ariaLabel = "Connector line",
}: ConnectorLineToolProps) {
  const box = bbox(start, end)
  const path = pathFor(shape, start, end)
  const mid = midpoint(start, end)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const dashArray = dashed ? "6 5" : undefined

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={classes}
      data-shape={shape}
      style={{
        width: box.width,
        height: box.height,
      }}
    >
      <svg
        viewBox={`${box.minX} ${box.minY} ${box.width} ${box.height}`}
        width="100%"
        height="100%"
      >
        <CapMarkers color={color} />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashArray}
          markerStart={capUrl(startCap)}
          markerEnd={capUrl(endCap)}
        />
      </svg>
      {label ? (
        <span
          className={styles.label}
          style={{
            left: `${((mid.x - box.minX) / box.width) * 100}%`,
            top: `${((mid.y - box.minY) / box.height) * 100}%`,
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  )
}

export default ConnectorLineTool
