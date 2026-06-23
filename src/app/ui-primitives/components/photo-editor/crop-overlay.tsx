"use client"

import { Chip } from "../primitives/chip"

import { CROP_RATIOS } from "./photo-editor-types"
import type { CropRatioId } from "./photo-editor-types"
import styles from "./crop-overlay.module.css"

interface CropOverlayProps {
  /** Currently selected ratio id. */
  ratioId: CropRatioId
  /** Crop selection size in canvas pixels — surfaced inside the dimension chip. */
  widthPx: number
  heightPx: number
  /** Optional selection callback. */
  onRatioSelect?: (id: CropRatioId) => void
}

export function CropOverlay({
  ratioId,
  widthPx,
  heightPx,
  onRatioSelect,
}: CropOverlayProps) {
  const ratioMeta = (() => {
    const found = CROP_RATIOS.find((entry) => entry.id === ratioId)
    if (!found || found.ratio === null) {
      return "Free"
    }
    return `${found.ratio.toFixed(3)}`
  })()

  return (
    <section className={styles.wrap} aria-label="Crop overlay">
      <header className={styles.head}>
        <span className={styles.title}>Crop</span>
        <Chip label={`${ratioMeta} · ${widthPx}×${heightPx} px`} tone="amber" selected />
      </header>

      <div
        className={styles.ratios}
        role="radiogroup"
        aria-label="Crop ratio presets"
      >
        {CROP_RATIOS.map((ratio) => {
          const isActive = ratio.id === ratioId
          return (
            <button
              key={ratio.id}
              type="button"
              className={[styles.ratioBtn, isActive ? styles.ratioActive : ""].join(" ")}
              aria-checked={isActive}
              role="radio"
              onClick={() => onRatioSelect?.(ratio.id)}
            >
              <span className={styles.ratioName}>{ratio.label}</span>
              <span className={styles.ratioMeta}>
                {ratio.ratio === null ? "Freeform" : `${ratio.ratio.toFixed(3)}`}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.stage} role="presentation">
        <div
          className={styles.cropRect}
          role="img"
          aria-label={`Crop selection · ${widthPx} by ${heightPx} pixels · ${ratioMeta} ratio`}
        >
          <span className={[styles.handle, styles.handleNw].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleN].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleNe].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleW].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleE].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleSw].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleS].join(" ")} aria-hidden="true" />
          <span className={[styles.handle, styles.handleSe].join(" ")} aria-hidden="true" />
          <span className={styles.dim}>{widthPx} × {heightPx}</span>
        </div>
      </div>
    </section>
  )
}
