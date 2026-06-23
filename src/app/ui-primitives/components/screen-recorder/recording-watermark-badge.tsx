"use client"

import styles from "./recording-watermark-badge.module.css"

import type { BubblePosition } from "./screen-recorder-types"

interface RecordingWatermarkBadgeProps {
  /** Customer brand text, e.g. "Oak Flats Mufflermen". */
  brand: string
  /** Sub-label rendered under the brand. */
  tagline?: string
  /** Where the watermark sits on the canvas. */
  position: BubblePosition
  /** Opacity (0-1). */
  opacity: number
  /** Optional opacity slider change handler — turns badge into a configured preview. */
  onOpacityChange?: (next: number) => void
  /** Position picker change handler. */
  onPositionChange?: (next: BubblePosition) => void
}

const POSITIONS: ReadonlyArray<{ key: BubblePosition; short: string; label: string }> = [
  { key: "top-left", short: "TL", label: "Top left" },
  { key: "top-right", short: "TR", label: "Top right" },
  { key: "bottom-left", short: "BL", label: "Bottom left" },
  { key: "bottom-right", short: "BR", label: "Bottom right" },
]

export function RecordingWatermarkBadge({
  brand,
  tagline = "Workshop tour",
  position,
  opacity,
  onOpacityChange,
  onPositionChange,
}: RecordingWatermarkBadgeProps) {
  const clampedOpacity = Math.max(0.1, Math.min(1, opacity))
  const sliderPct = ((clampedOpacity - 0.1) / 0.9) * 100

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Watermark badge preview</span>

      <div className={styles.stage}>
        <span className={styles.stageScene} aria-hidden="true">
          <span className={styles.sceneBar} style={{ width: "62%" }} />
          <span className={styles.sceneBar} style={{ width: "44%" }} />
          <span className={styles.sceneBar} style={{ width: "78%" }} />
        </span>
        <span
          className={[styles.badge, styles[`pos-${position}`]].join(" ")}
          style={{ opacity: clampedOpacity }}
          aria-label="Customer watermark"
        >
          <span className={styles.logo} aria-hidden="true">
            <span className={styles.logoArc} />
            <span className={styles.logoBolt}>M</span>
          </span>
          <span className={styles.copy}>
            <span className={styles.brand}>{brand}</span>
            <span className={styles.tagline}>{tagline}</span>
          </span>
        </span>
      </div>

      <div className={styles.chips}>
        <div className={styles.chipGroup}>
          <span className={styles.chipLabel}>Position</span>
          <div role="radiogroup" aria-label="Watermark position" className={styles.positionChips}>
            {POSITIONS.map((p) => {
              const selected = p.key === position
              return (
                <button
                  key={p.key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={p.label}
                  className={[styles.positionChip, selected ? styles.positionChipActive : ""].join(" ")}
                  onClick={() => onPositionChange?.(p.key)}
                >
                  {p.short}
                </button>
              )
            })}
          </div>
        </div>

        <label className={styles.opacityField}>
          <span className={styles.chipLabel}>Opacity · {Math.round(clampedOpacity * 100)}%</span>
          <input
            type="range"
            min={10}
            max={100}
            value={Math.round(clampedOpacity * 100)}
            onChange={(event) => onOpacityChange?.(Number(event.target.value) / 100)}
            className={styles.opacityInput}
            style={{ "--opacity-pct": `${sliderPct}%` } as React.CSSProperties}
            aria-label="Watermark opacity"
          />
        </label>
      </div>
    </div>
  )
}
