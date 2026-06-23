"use client"

import { useState } from "react"

import {
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  type ServiceStatus,
  type StatusTone,
} from "./status-types"
import styles from "./service-map-graph.module.css"

export interface ServiceNode {
  id: string
  label: string
  status: ServiceStatus
  /** Position in viewBox units (0..100). */
  x: number
  y: number
}

export interface ServiceEdge {
  from: string
  to: string
  /** Edge tone follows worst status of either endpoint. */
  status: ServiceStatus
}

export interface ServiceMapGraphProps {
  nodes: ReadonlyArray<ServiceNode>
  edges: ReadonlyArray<ServiceEdge>
  caption?: string
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

const MIN_ZOOM = 0.6
const MAX_ZOOM = 2.4
const ZOOM_STEP = 0.2

export function ServiceMapGraph({
  nodes,
  edges,
  caption,
  className,
}: ServiceMapGraphProps) {
  const [zoom, setZoom] = useState<number>(1)

  const inc = () => setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 10) / 10))
  const dec = () => setZoom((z) => Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 10) / 10))
  const reset = () => setZoom(1)

  const nodeById = new Map<string, ServiceNode>(nodes.map((n) => [n.id, n]))
  const vbSize = 100
  const vbPad = (vbSize * (1 - 1 / zoom)) / 2
  const viewBox = `${vbPad} ${vbPad} ${vbSize / zoom} ${vbSize / zoom}`

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption ?? "Service dependency map"}
    >
      <header className={styles.head}>
        <span className={styles.caption}>{caption ?? "Service dependency map"}</span>
        <div className={styles.zoom}>
          <button
            type="button"
            onClick={dec}
            className={styles.zoomBtn}
            aria-label="Zoom out"
            disabled={zoom <= MIN_ZOOM}
          >
            −
          </button>
          <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={inc}
            className={styles.zoomBtn}
            aria-label="Zoom in"
            disabled={zoom >= MAX_ZOOM}
          >
            +
          </button>
          <button
            type="button"
            onClick={reset}
            className={styles.zoomReset}
            aria-label="Reset zoom"
          >
            Reset
          </button>
        </div>
      </header>
      <div className={styles.canvas}>
        <svg
          viewBox={viewBox}
          className={styles.svg}
          role="img"
          aria-label="Dependency edges between services"
        >
          <defs>
            <marker
              id="map-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          {edges.map((e, idx) => {
            const a = nodeById.get(e.from)
            const b = nodeById.get(e.to)
            if (!a || !b) return null
            const tone = SERVICE_STATUS_TONE[e.status]
            return (
              <line
                key={`${e.from}->${e.to}-${idx}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={[styles.edge, TONE_CLASS[tone]].join(" ")}
                markerEnd="url(#map-arrow)"
              />
            )
          })}
          {nodes.map((n) => {
            const tone = SERVICE_STATUS_TONE[n.status]
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                className={[styles.node, TONE_CLASS[tone]].join(" ")}
              >
                <title>{`${n.label} — ${SERVICE_STATUS_LABEL[n.status]}`}</title>
                <circle r="5" className={styles.nodeOuter} />
                <circle r="2.4" className={styles.nodeInner} />
                <text y="9.5" textAnchor="middle" className={styles.nodeLabel}>
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}

export default ServiceMapGraph
