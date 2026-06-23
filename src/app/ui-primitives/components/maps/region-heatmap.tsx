"use client"

import { useState } from "react"

import { QuoteBubble } from "../primitives/quote-bubble"
import styles from "./region-heatmap.module.css"

export interface HeatmapCell {
  /** Column index 0-based. */
  col: number
  /** Row index 0-based. */
  row: number
  /** Intensity 0–1. */
  intensity: number
  label: string
  detail: string
}

export interface RegionHeatmapProps {
  cells: ReadonlyArray<HeatmapCell>
  cols?: number
  rows?: number
  groupLabel: string
}

const HEX_SIZE = 22

function hexPath(cx: number, cy: number, size: number): string {
  const angles = [0, 60, 120, 180, 240, 300]
  const points = angles.map((angle) => {
    const rad = (Math.PI / 180) * angle
    return `${cx + size * Math.cos(rad)},${cy + size * Math.sin(rad)}`
  })
  return `M${points.join(" L ")} Z`
}

export function RegionHeatmap({
  cells,
  cols = 15,
  rows = 10,
  groupLabel,
}: RegionHeatmapProps) {
  const [hovered, setHovered] = useState<HeatmapCell | null>(null)

  // pointy-top hex layout — odd columns offset by half a height
  const hexH = Math.sqrt(3) * HEX_SIZE
  const hexW = 2 * HEX_SIZE
  const colStep = hexW * 0.75
  const width = cols * colStep + HEX_SIZE
  const height = rows * hexH + hexH / 2

  const cellMap = new Map<string, HeatmapCell>()
  for (const cell of cells) {
    cellMap.set(`${cell.col}:${cell.row}`, cell)
  }

  return (
    <div className={styles.root}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={groupLabel}
        className={styles.svg}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const cx = c * colStep + HEX_SIZE
            const cy = r * hexH + (c % 2 === 1 ? hexH / 2 : 0) + hexH / 2
            const cell = cellMap.get(`${c}:${r}`)
            const intensity = cell?.intensity ?? 0
            const fill = `color-mix(in oklab, var(--primitive-red) ${(0.06 + intensity * 0.72) * 100}%, transparent)`

            return (
              <path
                key={`${c}:${r}`}
                d={hexPath(cx, cy, HEX_SIZE - 1.5)}
                fill={fill}
                stroke="var(--primitive-line-muted)"
                strokeWidth="1"
                className={styles.hex}
                onMouseEnter={() => cell && setHovered(cell)}
                onMouseLeave={() => setHovered((curr) => (curr === cell ? null : curr))}
                onFocus={() => cell && setHovered(cell)}
                onBlur={() => setHovered((curr) => (curr === cell ? null : curr))}
                tabIndex={cell ? 0 : -1}
                role={cell ? "button" : undefined}
                aria-label={cell ? `${cell.label} — ${cell.detail}` : undefined}
              />
            )
          })
        )}
      </svg>

      <div className={styles.tooltip} aria-live="polite">
        {hovered ? (
          <QuoteBubble tone="red" label={hovered.label}>
            <strong>{hovered.label}</strong>
            <br />
            {hovered.detail}
          </QuoteBubble>
        ) : (
          <span className={styles.tooltipHint}>Hover a hex to inspect a region</span>
        )}
      </div>

      <ol className={styles.legend} aria-label="Intensity legend">
        <li>
          <span className={styles.swatchLow} />
          Low
        </li>
        <li>
          <span className={styles.swatchMid} />
          Mid
        </li>
        <li>
          <span className={styles.swatchHigh} />
          High
        </li>
      </ol>
    </div>
  )
}

export default RegionHeatmap
