import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import type { SelectionRect } from "./photo-editor-types"
import styles from "./selection-marquee.module.css"

export type SelectionMode = "new" | "add" | "subtract" | "intersect"

interface SelectionMarqueeProps {
  /** Marquee in canvas pixels. */
  rect: SelectionRect
  /** Canvas size in pixels — used to compute the rect's percentage layout. */
  canvasWidthPx: number
  canvasHeightPx: number
  /** Surface label rendered behind the marquee (e.g. "Bay 2 hero"). */
  surfaceLabel?: string
  /** Active boolean mode. */
  mode?: SelectionMode
}

const MODE_LABEL: Record<SelectionMode, string> = {
  new: "New",
  add: "Add",
  subtract: "Subtract",
  intersect: "Intersect",
}

function clampPx(value: number, max: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > max) return max
  return value
}

export function SelectionMarquee({
  rect,
  canvasWidthPx,
  canvasHeightPx,
  surfaceLabel = "Source",
  mode = "new",
}: SelectionMarqueeProps) {
  const w = Math.max(1, canvasWidthPx)
  const h = Math.max(1, canvasHeightPx)
  const x = clampPx(rect.xPx, w)
  const y = clampPx(rect.yPx, h)
  const width = clampPx(rect.widthPx, w - x)
  const height = clampPx(rect.heightPx, h - y)

  const marqueeVars: CSSProperties = {
    "--m-x": `${(x / w) * 100}%`,
    "--m-y": `${(y / h) * 100}%`,
    "--m-w": `${(width / w) * 100}%`,
    "--m-h": `${(height / h) * 100}%`,
  } as CSSProperties

  return (
    <section className={styles.wrap} aria-label="Selection marquee">
      <header className={styles.head}>
        <span className={styles.title}>Selection</span>
        <Chip
          label={`${Math.round(width)}×${Math.round(height)} · ${MODE_LABEL[mode]}`}
          tone="teal"
          selected
        />
      </header>

      <div className={styles.modeRow} role="radiogroup" aria-label="Boolean mode">
        {(Object.keys(MODE_LABEL) as ReadonlyArray<SelectionMode>).map((id) => {
          const isActive = id === mode
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[styles.modeBtn, isActive ? styles.modeActive : ""].join(" ")}
            >
              {MODE_LABEL[id]}
            </button>
          )
        })}
      </div>

      <div
        className={styles.canvas}
        role="img"
        aria-label={`Marching ants marquee on ${surfaceLabel} · ${Math.round(width)} by ${Math.round(height)} pixels`}
      >
        <span className={styles.proxy} aria-hidden="true">
          {surfaceLabel}
        </span>
        <div
          className={styles.marquee}
          style={marqueeVars}
          role="presentation"
        >
          <span className={styles.marqueeSideL} aria-hidden="true" />
          <span className={styles.marqueeSideR} aria-hidden="true" />
          <span className={[styles.cornerHandle, styles.handleTl].join(" ")} aria-hidden="true" />
          <span className={[styles.cornerHandle, styles.handleTr].join(" ")} aria-hidden="true" />
          <span className={[styles.cornerHandle, styles.handleBl].join(" ")} aria-hidden="true" />
          <span className={[styles.cornerHandle, styles.handleBr].join(" ")} aria-hidden="true" />
          <span className={styles.dim}>
            {Math.round(width)} × {Math.round(height)} px
          </span>
        </div>
      </div>
    </section>
  )
}
