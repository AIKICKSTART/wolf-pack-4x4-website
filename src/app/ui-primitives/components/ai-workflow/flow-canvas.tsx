"use client"

import {
  Bot,
  Box,
  Cpu,
  GitBranch,
  Layers,
  Minus,
  Move,
  Plus,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"

import {
  NODE_KIND_LABEL,
  NODE_KIND_TONE,
  NODE_STATUS_LABEL,
  NODE_STATUS_TONE,
  type WorkflowEdge,
  type WorkflowNode,
  type WorkflowNodeKind,
  type WorkflowTone,
} from "./ai-workflow-types"
import styles from "./flow-canvas.module.css"

interface FlowCanvasProps {
  nodes: ReadonlyArray<WorkflowNode>
  edges: ReadonlyArray<WorkflowEdge>
  /** Width/height of the virtual canvas in design units. */
  contentWidth?: number
  contentHeight?: number
  /** Optional currently-selected node id. */
  selectedNodeId?: string
  onSelectNode?: (id: string) => void
  /** Hide the minimap if the surface is small. */
  showMinimap?: boolean
  /** Label for the canvas region — required for ARIA. */
  ariaLabel: string
  className?: string
}

const KIND_GLYPH: Record<WorkflowNodeKind, typeof Bot> = {
  trigger: Zap,
  prompt: Sparkles,
  model: Cpu,
  tool: Wrench,
  vector: Layers,
  gate: ShieldCheck,
  parallel: GitBranch,
  loop: RotateCw,
  safety: ShieldCheck,
  output: Box,
}

const TONE_VAR: Record<WorkflowTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-teal)",
}

/** Bezier path between two points, biased horizontally. */
function buildEdgePath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
): string {
  const dx = Math.max(Math.abs(toX - fromX) * 0.55, 60)
  return `M ${fromX.toFixed(1)} ${fromY.toFixed(1)} C ${(fromX + dx).toFixed(1)} ${fromY.toFixed(1)} ${(toX - dx).toFixed(1)} ${toY.toFixed(1)} ${toX.toFixed(1)} ${toY.toFixed(1)}`
}

const NODE_W = 168
const NODE_H = 84

interface ViewState {
  zoom: number
  panX: number
  panY: number
}

interface PanState {
  pointerId: number
  startClientX: number
  startClientY: number
  startPanX: number
  startPanY: number
}

export function FlowCanvas({
  nodes,
  edges,
  contentWidth = 1200,
  contentHeight = 720,
  selectedNodeId,
  onSelectNode,
  showMinimap = true,
  ariaLabel,
  className,
}: FlowCanvasProps) {
  const [view, setView] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 })
  const [pan, setPan] = useState<PanState | null>(null)
  const gridId = useId()

  const nodeById = useMemo(() => {
    const map = new Map<string, WorkflowNode>()
    for (const node of nodes) {
      map.set(node.id, node)
    }
    return map
  }, [nodes])

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLElement && event.target.closest(`.${styles.node}`)) {
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      setPan({
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startPanX: view.panX,
        startPanY: view.panY,
      })
    },
    [view.panX, view.panY],
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!pan || pan.pointerId !== event.pointerId) {
        return
      }
      const dx = event.clientX - pan.startClientX
      const dy = event.clientY - pan.startClientY
      setView((current) => ({
        ...current,
        panX: pan.startPanX + dx,
        panY: pan.startPanY + dy,
      }))
    },
    [pan],
  )

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (pan && pan.pointerId === event.pointerId) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId)
        } catch {
          // Pointer already released — ignore.
        }
        setPan(null)
      }
    },
    [pan],
  )

  const zoomDelta = useCallback((delta: number) => {
    setView((current) => {
      const next = Math.max(0.5, Math.min(1.6, current.zoom + delta))
      return { ...current, zoom: Math.round(next * 100) / 100 }
    })
  }, [])

  const handleReset = useCallback(() => {
    setView({ zoom: 1, panX: 0, panY: 0 })
  }, [])

  const transform = `translate(${view.panX}px, ${view.panY}px) scale(${view.zoom})`

  return (
    <div
      className={[styles.shell, className].filter(Boolean).join(" ")}
      role="application"
      aria-label={ariaLabel}
    >
      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-panning={pan ? "true" : "false"}
      >
        <svg
          aria-hidden="true"
          className={styles.gridSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={gridId}
              width={28 * view.zoom}
              height={28 * view.zoom}
              patternUnits="userSpaceOnUse"
              x={view.panX}
              y={view.panY}
            >
              <circle cx="1" cy="1" r="1" fill="color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`} />
        </svg>

        <div
          className={styles.world}
          style={
            {
              transform,
              width: contentWidth,
              height: contentHeight,
            } as CSSProperties
          }
        >
          <svg
            className={styles.edges}
            viewBox={`0 0 ${contentWidth} ${contentHeight}`}
            width={contentWidth}
            height={contentHeight}
            aria-hidden="true"
          >
            {edges.map((edge) => {
              const fromNode = nodeById.get(edge.from)
              const toNode = nodeById.get(edge.to)
              if (!fromNode || !toNode) {
                return null
              }
              const fromX = fromNode.x + NODE_W
              const fromY = fromNode.y + NODE_H / 2
              const toX = toNode.x
              const toY = toNode.y + NODE_H / 2
              const tone = TONE_VAR[edge.tone ?? "neutral"]
              const midX = (fromX + toX) / 2
              const midY = (fromY + toY) / 2
              return (
                <g key={edge.id} className={styles.edgeGroup}>
                  <path
                    d={buildEdgePath(fromX, fromY, toX, toY)}
                    fill="none"
                    stroke={tone}
                    strokeWidth={1.6}
                    strokeDasharray={edge.dashed ? "4 5" : undefined}
                    className={styles.edgePath}
                  />
                  <circle cx={toX - 4} cy={toY} r="3" fill={tone} />
                  {edge.label ? (
                    <g>
                      <rect
                        x={midX - 36}
                        y={midY - 10}
                        width="72"
                        height="20"
                        rx="6"
                        ry="6"
                        fill="color-mix(in oklab, var(--primitive-canvas) 92%, transparent)"
                        stroke={tone}
                        strokeOpacity="0.35"
                      />
                      <text
                        x={midX}
                        y={midY + 4}
                        textAnchor="middle"
                        className={styles.edgeLabel}
                        fill={tone}
                      >
                        {edge.label}
                      </text>
                    </g>
                  ) : null}
                </g>
              )
            })}
          </svg>

          {nodes.map((node) => {
            const tone = node.status === "idle"
              ? NODE_KIND_TONE[node.kind]
              : NODE_STATUS_TONE[node.status]
            const Glyph = KIND_GLYPH[node.kind]
            const isSelected = selectedNodeId === node.id
            return (
              <button
                key={node.id}
                type="button"
                className={styles.node}
                data-selected={isSelected ? "true" : "false"}
                data-running={node.status === "running" ? "true" : "false"}
                style={
                  {
                    "--node-tone": TONE_VAR[tone],
                    left: node.x,
                    top: node.y,
                    width: NODE_W,
                    height: NODE_H,
                  } as CSSProperties
                }
                onClick={() => onSelectNode?.(node.id)}
                aria-label={`${NODE_KIND_LABEL[node.kind]} · ${node.title}`}
                aria-pressed={isSelected}
              >
                <span className={styles.nodeKicker}>
                  <Glyph size={11} strokeWidth={2.2} aria-hidden="true" />
                  {NODE_KIND_LABEL[node.kind]}
                </span>
                <span className={styles.nodeTitle}>{node.title}</span>
                <span className={styles.nodeMeta}>
                  <span
                    className={styles.statusDot}
                    aria-hidden="true"
                  />
                  {NODE_STATUS_LABEL[node.status]} · {node.subtitle}
                </span>
                <span className={styles.portIn} aria-hidden="true" />
                <span className={styles.portOut} aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <div className={styles.controls} aria-label="Canvas controls">
          <button
            type="button"
            className={styles.ctrl}
            onClick={() => zoomDelta(0.1)}
            aria-label="Zoom in"
          >
            <Plus size={13} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className={styles.zoomReadout} aria-live="polite">
            {Math.round(view.zoom * 100)}%
          </span>
          <button
            type="button"
            className={styles.ctrl}
            onClick={() => zoomDelta(-0.1)}
            aria-label="Zoom out"
          >
            <Minus size={13} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.ctrl}
            onClick={handleReset}
            aria-label="Reset view"
          >
            <Move size={13} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>

        {showMinimap ? (
          <Minimap
            nodes={nodes}
            contentWidth={contentWidth}
            contentHeight={contentHeight}
            view={view}
            selectedNodeId={selectedNodeId}
          />
        ) : null}
      </div>
    </div>
  )
}

interface MinimapProps {
  nodes: ReadonlyArray<WorkflowNode>
  contentWidth: number
  contentHeight: number
  view: ViewState
  selectedNodeId: string | undefined
}

function Minimap({
  nodes,
  contentWidth,
  contentHeight,
  view,
  selectedNodeId,
}: MinimapProps) {
  const mapW = 160
  const mapH = Math.round((mapW / contentWidth) * contentHeight)
  const viewportW = mapW / view.zoom
  const viewportH = mapH / view.zoom
  const viewportX = ((-view.panX) / contentWidth) * mapW
  const viewportY = ((-view.panY) / contentHeight) * mapH

  return (
    <div
      className={styles.minimap}
      style={{ width: mapW, height: mapH }}
      aria-label="Canvas overview"
      role="img"
    >
      {nodes.map((node) => {
        const tone =
          node.status === "idle"
            ? NODE_KIND_TONE[node.kind]
            : NODE_STATUS_TONE[node.status]
        return (
          <span
            key={node.id}
            className={styles.minimapNode}
            data-selected={selectedNodeId === node.id ? "true" : "false"}
            style={
              {
                "--node-tone": TONE_VAR[tone],
                left: (node.x / contentWidth) * mapW,
                top: (node.y / contentHeight) * mapH,
                width: (NODE_W / contentWidth) * mapW,
                height: (NODE_H / contentHeight) * mapH,
              } as CSSProperties
            }
          />
        )
      })}
      <span
        className={styles.minimapViewport}
        style={{
          width: Math.min(viewportW, mapW),
          height: Math.min(viewportH, mapH),
          left: Math.max(0, Math.min(mapW - 8, viewportX)),
          top: Math.max(0, Math.min(mapH - 8, viewportY)),
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default FlowCanvas
