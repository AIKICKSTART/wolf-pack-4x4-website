"use client"

import { useMemo, useState } from "react"

import { JourneyNodeCard } from "./journey-node-card"
import styles from "./journey-canvas.module.css"
import type {
  JourneyEdgeKind,
  JourneyEdgeSpec,
  JourneyNodeSpec,
} from "./marketing-automation-types"

interface JourneyCanvasProps {
  /** Display name, e.g. "New lead · 7-day workshop intro". */
  title: string
  kicker?: string
  nodes: ReadonlyArray<JourneyNodeSpec>
  edges: ReadonlyArray<JourneyEdgeSpec>
  /** Number of grid columns. Defaults to the max col in nodes. */
  columns?: number
  /** Cell size in px. */
  cellSize?: { col: number; row: number }
  /** Live-count summary at top right, e.g. "184 in journey". */
  liveCount?: number
  className?: string
}

const EDGE_CLASS: Record<JourneyEdgeKind, string> = {
  default: styles.edgeDefault,
  yes: styles.edgeYes,
  no: styles.edgeNo,
  fallback: styles.edgeFallback,
}

interface NodeRect {
  x: number
  y: number
  cx: number
  cy: number
  w: number
  h: number
}

export function JourneyCanvas({
  title,
  kicker = "Journey canvas",
  nodes,
  edges,
  columns,
  cellSize = { col: 240, row: 132 },
  liveCount,
  className,
}: JourneyCanvasProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(
    nodes.find((n) => n.active)?.id ?? null,
  )

  const cols = columns ?? Math.max(1, ...nodes.map((n) => n.col))
  const rows = Math.max(1, ...nodes.map((n) => n.row))

  const padding = 28
  const innerW = cols * cellSize.col
  const innerH = rows * cellSize.row
  const svgW = innerW + padding * 2
  const svgH = innerH + padding * 2

  const nodeRects = useMemo<Record<string, NodeRect>>(() => {
    const result: Record<string, NodeRect> = {}
    const cardW = Math.min(220, cellSize.col - 24)
    const cardH = Math.min(112, cellSize.row - 24)
    for (const node of nodes) {
      const x = padding + (node.col - 1) * cellSize.col + (cellSize.col - cardW) / 2
      const y = padding + (node.row - 1) * cellSize.row + (cellSize.row - cardH) / 2
      result[node.id] = {
        x,
        y,
        cx: x + cardW / 2,
        cy: y + cardH / 2,
        w: cardW,
        h: cardH,
      }
    }
    return result
  }, [nodes, cellSize.col, cellSize.row])

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${title} journey canvas`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{kicker}</span>
          <h3 className={styles.title}>{title}</h3>
        </div>
        {typeof liveCount === "number" ? (
          <span className={styles.subline}>
            {liveCount.toLocaleString("en-AU")} in journey
          </span>
        ) : null}
      </header>

      <div
        className={styles.canvas}
        style={{ minHeight: svgH }}
      >
        <svg
          className={styles.svgLayer}
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map((edge, idx) => {
            const from = nodeRects[edge.from]
            const to = nodeRects[edge.to]
            if (!from || !to) return null
            const kind: JourneyEdgeKind = edge.kind ?? "default"

            // Choose anchor points: bottom of `from`, top of `to` for vertical;
            // right→left for horizontal flows.
            const horizontal = Math.abs(to.cy - from.cy) < Math.abs(to.cx - from.cx)
            const startX = horizontal ? from.x + from.w : from.cx
            const startY = horizontal ? from.cy : from.y + from.h
            const endX = horizontal ? to.x : to.cx
            const endY = horizontal ? to.cy : to.y
            const midX = horizontal ? (startX + endX) / 2 : startX
            const midY = horizontal ? startY : (startY + endY) / 2

            const d = horizontal
              ? `M ${startX} ${startY} C ${midX} ${startY} ${midX} ${endY} ${endX} ${endY}`
              : `M ${startX} ${startY} C ${startX} ${midY} ${endX} ${midY} ${endX} ${endY}`

            return (
              <g key={`${edge.from}->${edge.to}-${idx}`}>
                <path
                  d={d}
                  className={[styles.edge, EDGE_CLASS[kind]].join(" ")}
                />
                {edge.label ? (
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2 - 6}
                    textAnchor="middle"
                    className={styles.edgeLabel}
                  >
                    {edge.label}
                  </text>
                ) : null}
              </g>
            )
          })}
        </svg>

        <div
          className={styles.canvasInner}
          style={{
            width: innerW + padding * 2,
            minHeight: innerH + padding * 2,
            gridTemplateColumns: `repeat(${cols}, ${cellSize.col}px)`,
            gridAutoRows: `${cellSize.row}px`,
          }}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{
                gridColumn: node.col,
                gridRow: node.row,
                display: "grid",
                placeItems: "center",
              }}
            >
              <JourneyNodeCard
                kind={node.kind}
                title={node.title}
                subtitle={node.subtitle}
                active={activeNodeId === node.id || (activeNodeId === null && node.active === true)}
                onConfigure={() => setActiveNodeId(node.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend} aria-label="Edge legend">
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="default" /> Default
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="yes" /> Yes
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="no" /> No
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="fallback" /> Fallback
        </span>
      </div>
    </section>
  )
}

export default JourneyCanvas
