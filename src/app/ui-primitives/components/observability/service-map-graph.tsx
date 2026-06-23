"use client"

import { useId, useState } from "react"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { StatusTone } from "../status-page/status-types"
import { GlassSurface } from "../surfaces/glass-surface"

import styles from "./service-map-graph.module.css"

export type ServiceMapNodeKind = "internal" | "external" | "datastore" | "queue"

export interface ObservabilityServiceNode {
  id: string
  label: string
  /** Position in viewBox units (0..100). */
  x: number
  y: number
  kind: ServiceMapNodeKind
  /** Requests per second (display only). */
  rps?: number
  /** Error rate 0..1. */
  errorRate?: number
  /** p95 latency ms. */
  p95Ms?: number
  tone?: StatusTone
}

export interface ObservabilityServiceEdge {
  from: string
  to: string
  /** Edge tone (e.g. error rate driven). */
  tone?: StatusTone
  /** Requests per second on this edge. */
  rps?: number
}

export interface ServiceMapGraphProps {
  nodes: ReadonlyArray<ObservabilityServiceNode>
  edges: ReadonlyArray<ObservabilityServiceEdge>
  caption?: string
  /** Notify when a node is selected. */
  onSelect?: (id: string | null) => void
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

const KIND_LABEL: Record<ServiceMapNodeKind, string> = {
  internal: "svc",
  external: "ext",
  datastore: "db",
  queue: "queue",
}

const KIND_CHIP_TONE: Record<ServiceMapNodeKind, ChipTone> = {
  internal: "teal",
  external: "neutral",
  datastore: "amber",
  queue: "green",
}

export function ServiceMapGraph({
  nodes,
  edges,
  caption,
  onSelect,
  className,
}: ServiceMapGraphProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const markerId = useId()

  const handleNodeClick = (id: string) => {
    const next = selectedId === id ? null : id
    setSelectedId(next)
    onSelect?.(next)
  }

  const nodeById = new Map<string, ObservabilityServiceNode>(nodes.map((n) => [n.id, n]))
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <section
        role="region"
        aria-label={caption ?? "Observability service dependency map"}
        className={styles.inner}
      >
        <header className={styles.head}>
          <span className={styles.caption}>{caption ?? "Service dependency map"}</span>
          <div className={styles.legend} aria-hidden="true">
            <span className={[styles.legendDot, styles.toneGreen].join(" ")} />
            <span>Healthy</span>
            <span className={[styles.legendDot, styles.toneAmber].join(" ")} />
            <span>Degraded</span>
            <span className={[styles.legendDot, styles.toneRed].join(" ")} />
            <span>Erroring</span>
          </div>
        </header>

        <div className={styles.canvas}>
          <svg
            viewBox="0 0 100 100"
            className={styles.svg}
            role="img"
            aria-label="Service dependency edges with throughput labels"
          >
            <defs>
              <marker
                id={`${markerId}-arrow`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            {edges.map((edge, idx) => {
              const a = nodeById.get(edge.from)
              const b = nodeById.get(edge.to)
              if (!a || !b) return null
              const tone: StatusTone = edge.tone ?? "neutral"
              const mx = (a.x + b.x) / 2
              const my = (a.y + b.y) / 2
              return (
                <g key={`${edge.from}-${edge.to}-${idx}`} className={TONE_CLASS[tone]}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={styles.edge}
                    markerEnd={`url(#${markerId}-arrow)`}
                  />
                  {edge.rps !== undefined ? (
                    <text x={mx} y={my - 1.6} className={styles.edgeLabel} textAnchor="middle">
                      {edge.rps} rps
                    </text>
                  ) : null}
                </g>
              )
            })}
            {nodes.map((node) => {
              const tone: StatusTone = node.tone ?? "green"
              const isSelected = selectedId === node.id
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x} ${node.y})`}
                  className={[
                    styles.node,
                    TONE_CLASS[tone],
                    isSelected ? styles.nodeActive : "",
                  ].filter(Boolean).join(" ")}
                >
                  <title>
                    {`${node.label}${node.rps !== undefined ? ` — ${node.rps} rps` : ""}${node.p95Ms !== undefined ? ` p95 ${node.p95Ms}ms` : ""}`}
                  </title>
                  <rect
                    x={-9}
                    y={-4.5}
                    rx={2}
                    ry={2}
                    width={18}
                    height={9}
                    className={styles.nodeBox}
                    onClick={() => handleNodeClick(node.id)}
                  />
                  <text y={1.2} textAnchor="middle" className={styles.nodeLabel}>
                    {node.label}
                  </text>
                  <text y={7.4} textAnchor="middle" className={styles.nodeMeta}>
                    {KIND_LABEL[node.kind]}
                    {node.p95Ms !== undefined ? ` · ${node.p95Ms}ms` : ""}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {selectedId ? (() => {
          const node = nodeById.get(selectedId)
          if (!node) return null
          return (
            <footer className={styles.detail} aria-label={`${node.label} detail`}>
              <div className={styles.detailIdentity}>
                <h4 className={styles.detailTitle}>{node.label}</h4>
                <Chip label={KIND_LABEL[node.kind]} tone={KIND_CHIP_TONE[node.kind]} />
              </div>
              <dl className={styles.detailMetrics}>
                <div className={styles.detailCell}>
                  <dt>RPS</dt>
                  <dd>{node.rps ?? "—"}</dd>
                </div>
                <div className={styles.detailCell}>
                  <dt>p95</dt>
                  <dd>{node.p95Ms !== undefined ? `${node.p95Ms}ms` : "—"}</dd>
                </div>
                <div className={styles.detailCell}>
                  <dt>Errors</dt>
                  <dd>
                    {node.errorRate !== undefined
                      ? `${(node.errorRate * 100).toFixed(2)}%`
                      : "—"}
                  </dd>
                </div>
              </dl>
            </footer>
          )
        })() : null}
      </section>
    </GlassSurface>
  )
}

export default ServiceMapGraph
