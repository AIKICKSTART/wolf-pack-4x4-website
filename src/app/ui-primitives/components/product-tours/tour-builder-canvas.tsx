"use client"

import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import { GlassSurface } from "../surfaces/glass-surface"
import {
  STEP_SHAPE_LABEL,
  TONE_VAR,
  TOUR_TONE_TO_CHIP,
  type TourStepShape,
  type TourTone,
} from "./tour-types"
import styles from "./tour-builder-canvas.module.css"

export interface TourCanvasStep {
  id: string
  /** Short title shown in the node. */
  title: string
  /** Optional CSS-selector target hint. */
  targetSelector?: string
  /** Step shape — drives the node glyph. */
  shape: TourStepShape
  /** Column in the canvas grid (1-based). */
  column: number
  /** Row in the canvas grid (1-based). */
  row: number
  /** Tone hint. */
  tone?: TourTone
  /** Is this step currently selected in the builder? */
  selected?: boolean
}

interface TourBuilderCanvasProps {
  tourName: string
  steps: ReadonlyArray<TourCanvasStep>
  /** Optional callback when a node is activated. */
  onSelectStep?: (stepId: string) => void
  /** Total columns the grid lays out. */
  columns?: number
  /** Total rows the grid lays out. */
  rows?: number
  className?: string
}

const SHAPE_GLYPH: Record<TourStepShape, string> = {
  tooltip: "◉",
  modal: "▣",
  spotlight: "◎",
  hint: "✦",
  announcement: "✉",
}

function buildArrowPath(
  from: TourCanvasStep,
  to: TourCanvasStep,
  cellWidth: number,
  cellHeight: number,
  nodeWidth: number,
  nodeHeight: number,
): string {
  const fromCx = (from.column - 0.5) * cellWidth
  const fromCy = (from.row - 0.5) * cellHeight
  const toCx = (to.column - 0.5) * cellWidth
  const toCy = (to.row - 0.5) * cellHeight

  const dx = toCx - fromCx
  const dy = toCy - fromCy

  let startX = fromCx
  let startY = fromCy
  let endX = toCx
  let endY = toCy

  if (Math.abs(dx) >= Math.abs(dy)) {
    // Horizontal-dominant — exit/enter on sides.
    startX = fromCx + (dx > 0 ? nodeWidth / 2 : -nodeWidth / 2)
    endX = toCx + (dx > 0 ? -nodeWidth / 2 : nodeWidth / 2)
  } else {
    // Vertical-dominant — exit/enter on top/bottom.
    startY = fromCy + (dy > 0 ? nodeHeight / 2 : -nodeHeight / 2)
    endY = toCy + (dy > 0 ? -nodeHeight / 2 : nodeHeight / 2)
  }

  const midX = (startX + endX) / 2
  // Slight S-curve via a cubic with offset perpendicular midpoint.
  const ctrl1X = midX
  const ctrl1Y = startY
  const ctrl2X = midX
  const ctrl2Y = endY

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${ctrl1X.toFixed(1)} ${ctrl1Y.toFixed(1)}, ${ctrl2X.toFixed(1)} ${ctrl2Y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`
}

export function TourBuilderCanvas({
  tourName,
  steps,
  onSelectStep,
  columns,
  rows,
  className,
}: TourBuilderCanvasProps) {
  const maxColumn = columns ?? Math.max(1, ...steps.map((s) => s.column))
  const maxRow = rows ?? Math.max(1, ...steps.map((s) => s.row))
  const cellWidth = 180
  const cellHeight = 132
  const nodeWidth = 152
  const nodeHeight = 96
  const canvasWidth = cellWidth * maxColumn
  const canvasHeight = cellHeight * maxRow

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Tour builder canvas for ${tourName} with ${steps.length} steps`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Tour builder</span>
        <h3 className={styles.title}>{tourName}</h3>
        <span className={styles.stepCount}>
          {steps.length} step{steps.length === 1 ? "" : "s"}
        </span>
      </header>

      <GlassSurface tone="obsidian" intensity="low" className={styles.canvasSurface}>
        <div
          className={styles.canvas}
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
          }}
        >
          <svg
            className={styles.connectorLayer}
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            preserveAspectRatio="none"
            role="presentation"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="tour-arrow-head"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 0 L 10 5 L 0 10 z"
                  fill="var(--primitive-teal, #40bcff)"
                />
              </marker>
            </defs>
            {steps.slice(0, -1).map((from, index) => {
              const to = steps[index + 1]
              if (!to) return null
              const d = buildArrowPath(from, to, cellWidth, cellHeight, nodeWidth, nodeHeight)
              return (
                <path
                  key={`${from.id}-${to.id}`}
                  d={d}
                  className={styles.connector}
                  markerEnd="url(#tour-arrow-head)"
                />
              )
            })}
          </svg>

          {steps.map((step, index) => {
            const tone: TourTone = step.tone ?? "teal"
            const left = (step.column - 1) * cellWidth + (cellWidth - nodeWidth) / 2
            const top = (step.row - 1) * cellHeight + (cellHeight - nodeHeight) / 2

            return (
              <button
                key={step.id}
                type="button"
                className={[
                  styles.node,
                  step.selected ? styles.nodeSelected : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${nodeWidth}px`,
                  height: `${nodeHeight}px`,
                  "--node-tone": TONE_VAR[tone],
                } as CSSProperties}
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-pressed={step.selected ?? false}
                onClick={() => onSelectStep?.(step.id)}
              >
                <span className={styles.nodeIndex} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.nodeGlyph} aria-hidden="true">
                  {SHAPE_GLYPH[step.shape]}
                </span>
                <span className={styles.nodeTitle}>{step.title}</span>
                <span className={styles.nodeShape}>
                  <Chip
                    label={STEP_SHAPE_LABEL[step.shape]}
                    tone={TOUR_TONE_TO_CHIP[tone]}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </GlassSurface>
    </section>
  )
}

export default TourBuilderCanvas
