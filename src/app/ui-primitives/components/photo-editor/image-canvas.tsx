import type { CSSProperties, ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { StatusBadge } from "../data-display/status-badge-grid"

import type { CanvasSize, CursorMode } from "./photo-editor-types"
import { clamp01, formatPct } from "./photo-editor-types"
import styles from "./image-canvas.module.css"

interface ImageCanvasProps {
  /** Display name for the document being edited. */
  name: string
  /** Working canvas size in pixels. */
  size: CanvasSize
  /** Current zoom multiplier (0.1 – 8). */
  zoom: number
  /** Pan offset in canvas pixels relative to centre. */
  panXPx?: number
  panYPx?: number
  /** Cursor coordinate readout (canvas px). */
  cursorXPx?: number
  cursorYPx?: number
  /** Cursor mode chip — drives status footer. */
  cursorMode?: CursorMode
  /** Optional overlay content rendered above the proxy. */
  children?: ReactNode
  /** Optional explicit aspect override (`16 / 10`). Defaults to size.widthPx / size.heightPx. */
  aspect?: number
}

const CURSOR_LABEL: Record<CursorMode, string> = {
  default: "Move",
  crosshair: "Paint",
  move: "Pan",
  zoom: "Zoom",
  eyedrop: "Eyedrop",
}

const CURSOR_TONE: Record<CursorMode, "neutral" | "teal" | "amber" | "red" | "green"> = {
  default: "neutral",
  crosshair: "amber",
  move: "teal",
  zoom: "teal",
  eyedrop: "green",
}

function clampZoom(value: number): number {
  if (!Number.isFinite(value) || value < 0.1) return 0.1
  if (value > 8) return 8
  return value
}

export function ImageCanvas({
  name,
  size,
  zoom,
  panXPx = 0,
  panYPx = 0,
  cursorXPx,
  cursorYPx,
  cursorMode = "default",
  children,
  aspect,
}: ImageCanvasProps) {
  const safeZoom = clampZoom(zoom)
  const ratio = aspect ?? (size.widthPx / Math.max(size.heightPx, 1))

  // Pan track — normalised so a small drift shows movement clearly.
  const panSpan = 400
  const panProgressX = clamp01((panXPx + panSpan) / (panSpan * 2))
  const trackWidth = 0.18
  const trackLeft = clamp01(panProgressX - trackWidth / 2)

  const stageVars: CSSProperties = {
    "--canvas-aspect": `${ratio}`,
    "--zoom": safeZoom,
    "--pan-x": `${panXPx}px`,
    "--pan-y": `${panYPx}px`,
    "--pan-track-left": `${trackLeft * 100}%`,
    "--pan-track-width": `${trackWidth * 100}%`,
  } as CSSProperties

  const coordsLabel = (() => {
    if (typeof cursorXPx !== "number" || typeof cursorYPx !== "number") {
      return `${size.widthPx} × ${size.heightPx} px`
    }
    return `X ${Math.round(cursorXPx)} · Y ${Math.round(cursorYPx)} px`
  })()

  return (
    <section
      className={styles.canvas}
      role="region"
      aria-roledescription="image canvas"
      aria-label={`Photo canvas — ${name}`}
    >
      <header className={styles.head}>
        <div>
          <strong className={styles.name}>{name}</strong>
          <div className={styles.size}>
            {size.widthPx} × {size.heightPx} px · {formatPct(safeZoom / 8)} fit
          </div>
        </div>
        <Chip
          label={CURSOR_LABEL[cursorMode]}
          tone={CURSOR_TONE[cursorMode]}
          selected
        />
        <span className={styles.zoomChip} aria-label={`Zoom ${(safeZoom * 100).toFixed(0)}%`}>
          Zoom {(safeZoom * 100).toFixed(0)}%
        </span>
      </header>

      <div className={styles.stage} style={stageVars}>
        <div
          className={styles.frame}
          role="img"
          aria-label={`${name} preview at ${(safeZoom * 100).toFixed(0)}% zoom`}
        >
          <span className={styles.proxy}>{name}</span>
          {children}
        </div>
      </div>

      <footer className={styles.foot}>
        <span className={styles.coords}>{coordsLabel}</span>
        <span
          className={styles.panTrack}
          role="presentation"
          aria-hidden="true"
        >
          <span className={styles.panFill} />
        </span>
        <span className={styles.mode}>
          <StatusBadge tone="brand" size="sm" shape="dot" label={CURSOR_LABEL[cursorMode]} />
        </span>
      </footer>
    </section>
  )
}
