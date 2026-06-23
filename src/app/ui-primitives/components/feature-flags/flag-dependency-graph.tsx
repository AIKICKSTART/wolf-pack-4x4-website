"use client"

import { useMemo } from "react"

import styles from "./flag-dependency-graph.module.css"

export interface FlagDependencyNode {
  id: string
  label: string
  /** Display column 0..N (left to right). */
  layer: number
  /** Optional tone affecting node colour. */
  tone?: "neutral" | "red" | "amber" | "teal" | "green"
  /** Whether node is killed; rendered with hazard styling. */
  killed?: boolean
}

export interface FlagDependencyEdge {
  /** id of the parent flag. */
  from: string
  /** id of the dependent flag. */
  to: string
}

export interface FlagDependencyGraphProps {
  nodes: ReadonlyArray<FlagDependencyNode>
  edges: ReadonlyArray<FlagDependencyEdge>
  /** SVG canvas height. Width is responsive. */
  height?: number
  className?: string
}

const TONE_CLASS: Record<NonNullable<FlagDependencyNode["tone"]>, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

interface LaidOutNode extends FlagDependencyNode {
  x: number
  y: number
}

function hasCycle(
  nodes: ReadonlyArray<FlagDependencyNode>,
  edges: ReadonlyArray<FlagDependencyEdge>,
): boolean {
  const adjacency = new Map<string, string[]>()
  for (const node of nodes) adjacency.set(node.id, [])
  for (const edge of edges) {
    const list = adjacency.get(edge.from)
    if (list) list.push(edge.to)
  }
  const WHITE = 0
  const GRAY = 1
  const BLACK = 2
  const color = new Map<string, number>()
  for (const node of nodes) color.set(node.id, WHITE)

  const visit = (id: string): boolean => {
    color.set(id, GRAY)
    const neighbors = adjacency.get(id) ?? []
    for (const next of neighbors) {
      const c = color.get(next)
      if (c === GRAY) return true
      if (c === WHITE && visit(next)) return true
    }
    color.set(id, BLACK)
    return false
  }

  for (const node of nodes) {
    if (color.get(node.id) === WHITE && visit(node.id)) return true
  }
  return false
}

function layoutNodes(
  nodes: ReadonlyArray<FlagDependencyNode>,
  width: number,
  height: number,
): ReadonlyArray<LaidOutNode> {
  if (nodes.length === 0) return []
  const layers = new Map<number, FlagDependencyNode[]>()
  for (const node of nodes) {
    const layer = layers.get(node.layer)
    if (layer) {
      layer.push(node)
    } else {
      layers.set(node.layer, [node])
    }
  }
  const sortedLayers = Array.from(layers.keys()).sort((a, b) => a - b)
  const placed: LaidOutNode[] = []
  const layerCount = sortedLayers.length
  for (let i = 0; i < sortedLayers.length; i += 1) {
    const layerIndex = sortedLayers[i]
    const layerNodes = layers.get(layerIndex) ?? []
    const xRatio = layerCount === 1 ? 0.5 : i / (layerCount - 1)
    const x = 60 + xRatio * (width - 120)
    for (let j = 0; j < layerNodes.length; j += 1) {
      const yRatio = layerNodes.length === 1 ? 0.5 : j / (layerNodes.length - 1)
      const y = 40 + yRatio * (height - 80)
      placed.push({ ...layerNodes[j], x, y })
    }
  }
  return placed
}

export function FlagDependencyGraph({
  nodes,
  edges,
  height = 280,
  className,
}: FlagDependencyGraphProps) {
  const width = 720
  const laidOut = useMemo(() => layoutNodes(nodes, width, height), [nodes, height])
  const nodeMap = useMemo(() => {
    const map = new Map<string, LaidOutNode>()
    for (const node of laidOut) map.set(node.id, node)
    return map
  }, [laidOut])
  const cycleDetected = useMemo(() => hasCycle(nodes, edges), [nodes, edges])

  return (
    <div className={[styles.graph, className].filter(Boolean).join(" ")} role="figure" aria-label="Flag dependency graph">
      {cycleDetected ? (
        <p className={styles.cycleChip} role="alert">
          Cycle detected — fix before deploying
        </p>
      ) : null}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className={styles.svg}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <marker
            id="ff-arrowhead"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {edges.map((edge) => {
          const from = nodeMap.get(edge.from)
          const to = nodeMap.get(edge.to)
          if (!from || !to) return null
          const midX = (from.x + to.x) / 2
          return (
            <path
              key={`${edge.from}->${edge.to}`}
              d={`M ${from.x + 14} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x - 14} ${to.y}`}
              className={styles.edge}
              markerEnd="url(#ff-arrowhead)"
              fill="none"
            />
          )
        })}

        {laidOut.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className={[
              styles.node,
              TONE_CLASS[node.tone ?? "neutral"],
              node.killed ? styles.nodeKilled : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <circle r={14} className={styles.nodeCircle} />
            <text
              x={20}
              y={5}
              className={styles.nodeLabel}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default FlagDependencyGraph
