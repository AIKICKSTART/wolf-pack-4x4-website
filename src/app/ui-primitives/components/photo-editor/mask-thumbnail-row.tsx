import type { CSSProperties } from "react"

import { FileTypeIcon } from "../file-browser/file-type-icon"

import { clamp01, formatPct } from "./photo-editor-types"
import type { MaskThumbnail } from "./photo-editor-types"
import styles from "./mask-thumbnail-row.module.css"

interface MaskThumbnailRowProps {
  /** Mask entries — one per layer. */
  thumbs: ReadonlyArray<MaskThumbnail>
  /** Selected layer id. */
  activeLayerId?: string
}

/** Deterministic centre offset per layer so thumbnails feel placed. */
function centreFor(layerId: string): { x: number; y: number } {
  let hash = 0
  for (let i = 0; i < layerId.length; i += 1) {
    hash = (hash * 31 + layerId.charCodeAt(i)) | 0
  }
  const xt = Math.abs(hash % 100) / 100
  const yt = Math.abs((hash >> 8) % 100) / 100
  // Keep the centre away from the edges (10–90%).
  return { x: 10 + xt * 80, y: 10 + yt * 80 }
}

export function MaskThumbnailRow({ thumbs, activeLayerId }: MaskThumbnailRowProps) {
  return (
    <section className={styles.wrap} aria-label="Layer mask thumbnails">
      <header className={styles.head}>
        <span className={styles.title}>
          <FileTypeIcon kind="image" size="sm" />
          Layer masks
        </span>
        <span className={styles.kicker}>{thumbs.length} masks</span>
      </header>

      <div className={styles.row} role="list">
        {thumbs.map((thumb) => {
          const density = clamp01(thumb.density)
          const centre = centreFor(thumb.layerId)
          const isActive = thumb.layerId === activeLayerId
          const vars: CSSProperties = {
            "--mask-density": density,
            "--mask-density-mid": density * 0.6,
            "--mask-cx": `${centre.x}%`,
            "--mask-cy": `${centre.y}%`,
          } as CSSProperties

          return (
            <button
              key={thumb.layerId}
              type="button"
              role="listitem"
              className={[styles.cell, isActive ? styles.cellActive : ""].join(" ")}
              aria-label={`${thumb.layerName} mask · ${thumb.region} · ${formatPct(density)} density${thumb.inverted ? " · inverted" : ""}`}
            >
              <span className={styles.thumb} aria-hidden="true">
                <span
                  className={[
                    styles.thumbMask,
                    thumb.inverted ? styles.thumbMaskInverted : "",
                  ].join(" ")}
                  style={vars}
                />
                <span className={styles.thumbScrim} />
                <span className={styles.regionChip}>{thumb.region}</span>
                <span className={styles.densityChip}>{formatPct(density)}</span>
                {thumb.inverted ? <span className={styles.invertedTag}>Inv</span> : null}
              </span>
              <span className={styles.layerName}>{thumb.layerName}</span>
              <span className={styles.meta}>
                <span>{thumb.region}</span>
                <span aria-hidden="true">·</span>
                <span>{formatPct(density)}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
