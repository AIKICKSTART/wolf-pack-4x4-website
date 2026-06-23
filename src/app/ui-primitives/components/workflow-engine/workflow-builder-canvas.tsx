"use client"

import {
  Activity,
  CheckSquare,
  CornerDownRight,
  GitBranch,
  Hourglass,
  Minus,
  Move,
  Plus,
  RotateCw,
  Square,
  Zap,
} from "lucide-react"
import { useCallback, useId, useMemo, useState } from "react"
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react"

import {
  STATUS_LABEL,
  STATUS_TONE,
  STEP_KIND_LABEL,
  STEP_KIND_TONE,
  type EngineEdge,
  type EngineStep,
  type EngineStepKind,
  type EngineTone,
} from "./workflow-engine-types"
import styles from "./workflow-builder-canvas.module.css"

interface WorkflowBuilderCanvasProps {
  steps: ReadonlyArray<EngineStep>
  edges: ReadonlyArray<EngineEdge>
  /** Width/height of the virtual canvas in design units. */
  contentWidth?: number
  contentHeight?: number
  selectedStepId?: string
  onSelectStep?: (id: string) => void
  /** Hide the minimap if the surface is small. */
  showMinimap?: boolean
  /** Required for ARIA — describes what flow is on the canvas. */
  ariaLabel: string
  className?: string
}

const KIND_GLYPH: Record<EngineStepKind, typeof Activity> = {
  action: Activity,
  decision: GitBranch,
  wait: Hourglass,
  parallel: GitBranch,
  loop: RotateCw,
  approval: CheckSquare,
  trigger: Zap,
  end: Square,
}

const TONE_VAR: Record<EngineTone, string> = {
  neutral: "var(--primitive-body)",
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  violet: "var(--primitive-violet)",
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

const STEP_W = 176
const STEP_H = 88

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

export function WorkflowBuilderCanvas({
  steps,
  edges,
  contentWidth = 1240,
  contentHeight = 720,
  selectedStepId,
  onSelectStep,
  showMinimap = true,
  ariaLabel,
  className,
}: WorkflowBuilderCanvasProps) {
  const [view, setView] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 })
  const [pan, setPan] = useState<PanState | null>(null)
  const gridId = useId()

  const stepById = useMemo(() => {
    const map = new Map<string, EngineStep>()
    for (const step of steps) {
      map.set(step.id, step)
    }
    return map
  }, [steps])

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLElement && event.target.closest(`.${styles.step}`)) {
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
              width={30 * view.zoom}
              height={30 * view.zoom}
              patternUnits="userSpaceOnUse"
              x={view.panX}
              y={view.panY}
            >
              <circle cx="1" cy="1" r="1" fill="var(--primitive-surface-3)" />
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
              const fromStep = stepById.get(edge.from)
              const toStep = stepById.get(edge.to)
              if (!fromStep || !toStep) {
                return null
              }
              const fromX = fromStep.x + STEP_W
              const fromY = fromStep.y + STEP_H / 2
              const toX = toStep.x
              const toY = toStep.y + STEP_H / 2
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
                        x={midX - 38}
                        y={midY - 10}
                        width="76"
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

          {steps.map((step) => {
            const tone =
              step.status === "idle"
                ? STEP_KIND_TONE[step.kind]
                : STATUS_TONE[step.status]
            const Glyph = KIND_GLYPH[step.kind]
            const isSelected = selectedStepId === step.id
            return (
              <button
                key={step.id}
                type="button"
                className={styles.step}
                data-selected={isSelected ? "true" : "false"}
                data-running={step.status === "running" ? "true" : "false"}
                style={
                  {
                    "--step-tone": TONE_VAR[tone],
                    left: step.x,
                    top: step.y,
                    width: STEP_W,
                    height: STEP_H,
                  } as CSSProperties
                }
                onClick={() => onSelectStep?.(step.id)}
                aria-label={`${STEP_KIND_LABEL[step.kind]} · ${step.title}`}
                aria-pressed={isSelected}
              >
                <span className={styles.stepKicker}>
                  <Glyph size={11} strokeWidth={2.2} aria-hidden="true" />
                  {STEP_KIND_LABEL[step.kind]}
                </span>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepMeta}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {STATUS_LABEL[step.status]} · {step.subtitle}
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

        <div className={styles.legend} aria-hidden="true">
          <span className={styles.legendChip}>
            <CornerDownRight size={11} strokeWidth={2.4} />
            Drag canvas · click step to inspect
          </span>
        </div>

        {showMinimap ? (
          <Minimap
            steps={steps}
            contentWidth={contentWidth}
            contentHeight={contentHeight}
            view={view}
            selectedStepId={selectedStepId}
          />
        ) : null}
      </div>
    </div>
  )
}

interface MinimapProps {
  steps: ReadonlyArray<EngineStep>
  contentWidth: number
  contentHeight: number
  view: ViewState
  selectedStepId: string | undefined
}

function Minimap({
  steps,
  contentWidth,
  contentHeight,
  view,
  selectedStepId,
}: MinimapProps) {
  const mapW = 168
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
      {steps.map((step) => {
        const tone =
          step.status === "idle"
            ? STEP_KIND_TONE[step.kind]
            : STATUS_TONE[step.status]
        return (
          <span
            key={step.id}
            className={styles.minimapStep}
            data-selected={selectedStepId === step.id ? "true" : "false"}
            style={
              {
                "--step-tone": TONE_VAR[tone],
                left: (step.x / contentWidth) * mapW,
                top: (step.y / contentHeight) * mapH,
                width: (STEP_W / contentWidth) * mapW,
                height: (STEP_H / contentHeight) * mapH,
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

export default WorkflowBuilderCanvas
