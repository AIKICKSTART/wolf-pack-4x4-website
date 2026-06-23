"use client"

import type { ShapeKind } from "./whiteboard-types"
import styles from "./shape-tool-card.module.css"

export type ShapeSize = "sm" | "md" | "lg"

export interface ShapeToolCardProps {
  /** Active shape kind — highlighted. */
  activeShape: ShapeKind
  /** Active size chip. */
  size: ShapeSize
  /** Currently selected fill colour (CSS colour token or hex). */
  fill: string
  /** Currently selected stroke colour. */
  stroke: string
  /** Called when a different shape is picked. */
  onSelectShape?: (shape: ShapeKind) => void
  /** Called when size is changed. */
  onSelectSize?: (size: ShapeSize) => void
  /** Called when fill is changed (visual demo — receives the next swatch). */
  onSelectFill?: (color: string) => void
  /** Called when stroke is changed. */
  onSelectStroke?: (color: string) => void
  /** Optional className passthrough. */
  className?: string
}

const SHAPES: ReadonlyArray<{ id: ShapeKind; label: string }> = [
  { id: "rectangle", label: "Rectangle" },
  { id: "ellipse", label: "Ellipse" },
  { id: "triangle", label: "Triangle" },
  { id: "hexagon", label: "Hexagon" },
  { id: "arrow", label: "Arrow" },
  { id: "star", label: "Star" },
]

const SIZES: ReadonlyArray<ShapeSize> = ["sm", "md", "lg"]

const FILL_SWATCHES: ReadonlyArray<string> = [
  "#ffe66a",
  "#ff9fc1",
  "#8ec7ff",
  "#8ce0a4",
  "#c89cff",
  "#ffba6a",
]

const STROKE_SWATCHES: ReadonlyArray<string> = [
  "#0a0b10",
  "#e62028",
  "#40bcff",
  "#ffc14f",
  "#37d67a",
  "#ffffff",
]

interface ShapeGlyphProps {
  kind: ShapeKind
}

function ShapeGlyph({ kind }: ShapeGlyphProps) {
  if (kind === "rectangle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (kind === "ellipse") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (kind === "triangle") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="12,4 21,20 3,20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === "hexagon") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="7,4 17,4 22,12 17,20 7,20 2,12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }
  if (kind === "arrow") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polygon
        points="12,3 14.5,9 21,9.6 16,14 17.5,21 12,17.5 6.5,21 8,14 3,9.6 9.5,9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShapeToolCard({
  activeShape,
  size,
  fill,
  stroke,
  onSelectShape,
  onSelectSize,
  onSelectFill,
  onSelectStroke,
  className,
}: ShapeToolCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section role="group" aria-label="Shape picker" className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Shape</span>
        <span className={styles.activeName}>{activeShape}</span>
      </header>
      <ul className={styles.shapeGrid}>
        {SHAPES.map((shape) => {
          const active = shape.id === activeShape
          return (
            <li key={shape.id}>
              <button
                type="button"
                className={`${styles.shape} ${active ? styles.shapeActive : ""}`}
                aria-pressed={active}
                aria-label={shape.label}
                onClick={() => onSelectShape?.(shape.id)}
              >
                <ShapeGlyph kind={shape.id} />
              </button>
            </li>
          )
        })}
      </ul>
      <div className={styles.row}>
        <span className={styles.label}>Size</span>
        <div role="group" aria-label="Shape size" className={styles.sizeGroup}>
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.sizeChip} ${size === s ? styles.sizeActive : ""}`}
              aria-pressed={size === s}
              onClick={() => onSelectSize?.(s)}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Fill</span>
        <div role="group" aria-label="Shape fill" className={styles.swatchRow}>
          {FILL_SWATCHES.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.swatch} ${color === fill ? styles.swatchActive : ""}`}
              style={{ background: color }}
              aria-pressed={color === fill}
              aria-label={`Fill ${color}`}
              onClick={() => onSelectFill?.(color)}
            />
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Stroke</span>
        <div role="group" aria-label="Shape stroke" className={styles.swatchRow}>
          {STROKE_SWATCHES.map((color) => (
            <button
              key={color}
              type="button"
              className={`${styles.swatch} ${styles.strokeSwatch} ${
                color === stroke ? styles.swatchActive : ""
              }`}
              style={{ borderColor: color, color }}
              aria-pressed={color === stroke}
              aria-label={`Stroke ${color}`}
              onClick={() => onSelectStroke?.(color)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShapeToolCard
