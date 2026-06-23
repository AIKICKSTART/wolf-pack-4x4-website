"use client"

import { shortSha } from "./code-diff-types"
import styles from "./commit-graph-mini.module.css"

export type CommitGraphLane = "main" | "feature" | "hotfix"

export interface CommitGraphNode {
  sha: string
  /** Lane index — drives x position. */
  lane: CommitGraphLane
  /** Optional branch label rendered next to the dot. */
  branchLabel?: string
  /** Whether this commit is a merge (renders a chevron). */
  isMerge?: boolean
}

export interface CommitGraphMiniProps {
  /** Nodes ordered oldest-first; index = y position. */
  nodes: ReadonlyArray<CommitGraphNode>
  /** Optional title shown above the chart. */
  title?: string
  className?: string
}

const LANE_INDEX: Record<CommitGraphLane, number> = {
  main: 0,
  feature: 1,
  hotfix: 2,
}

const LANE_COLOR: Record<CommitGraphLane, string> = {
  main: "var(--primitive-red)",
  feature: "var(--primitive-amber)",
  hotfix: "var(--primitive-teal)",
}

const ROW_HEIGHT = 28
const LANE_GAP = 28
const LEFT_PAD = 22
const LABEL_PAD = 18

export function CommitGraphMini({
  nodes,
  title,
  className,
}: CommitGraphMiniProps) {
  const classes = [styles.frame, className].filter(Boolean).join(" ")
  const lanesPresent = Array.from(new Set(nodes.map((node) => node.lane)))
  const maxLane = lanesPresent.reduce(
    (max, lane) => Math.max(max, LANE_INDEX[lane]),
    0,
  )
  const width = LEFT_PAD + (maxLane + 1) * LANE_GAP + 160
  const height = Math.max(nodes.length * ROW_HEIGHT + 12, ROW_HEIGHT)

  const xFor = (lane: CommitGraphLane) => LEFT_PAD + LANE_INDEX[lane] * LANE_GAP
  const yFor = (index: number) => index * ROW_HEIGHT + ROW_HEIGHT / 2

  return (
    <section
      role="region"
      aria-label={title ?? "Commit graph"}
      className={classes}
    >
      <header className={styles.head}>
        <span>{title ?? "Commit graph"}</span>
        <span>
          <strong>{nodes.length}</strong> commits
        </span>
      </header>
      <svg
        className={styles.canvas}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`Commit graph with ${nodes.length} commits across ${lanesPresent.length} lanes`}
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Lane verticals */}
        {lanesPresent.map((lane) => {
          const x = xFor(lane)
          return (
            <line
              key={`lane-${lane}`}
              x1={x}
              y1={ROW_HEIGHT / 2}
              x2={x}
              y2={(nodes.length - 1) * ROW_HEIGHT + ROW_HEIGHT / 2}
              stroke={LANE_COLOR[lane]}
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
          )
        })}
        {/* Merge chevrons & dots */}
        {nodes.map((node, index) => {
          const cx = xFor(node.lane)
          const cy = yFor(index)
          const color = LANE_COLOR[node.lane]
          const labelX = LEFT_PAD + (maxLane + 1) * LANE_GAP + LABEL_PAD
          return (
            <g key={`node-${index}-${node.sha}`}>
              {node.isMerge ? (
                <polyline
                  points={`${cx - 6},${cy + 4} ${cx},${cy - 2} ${cx + 6},${cy + 4}`}
                  fill="none"
                  stroke="var(--primitive-green)"
                  strokeWidth={1.6}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ) : (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={color}
                  stroke="color-mix(in oklab, var(--primitive-canvas) 50%, transparent)"
                  strokeWidth={1}
                />
              )}
              <text
                x={labelX}
                y={cy + 3.5}
                fill="var(--primitive-body)"
                fontFamily="var(--primitive-font-mono)"
                fontSize={10}
              >
                {shortSha(node.sha)}{node.branchLabel ? ` · ${node.branchLabel}` : ""}
              </text>
            </g>
          )
        })}
      </svg>
      <div className={styles.legend}>
        <span className={styles.legendMain}>main</span>
        <span className={styles.legendFeature}>feature</span>
        <span className={styles.legendHotfix}>hotfix</span>
        <span className={styles.legendMerge}>merge</span>
      </div>
    </section>
  )
}

export default CommitGraphMini
