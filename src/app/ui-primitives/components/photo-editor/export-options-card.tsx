import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import { clamp01, formatPct } from "./photo-editor-types"
import type { ExportFormat, ExportState } from "./photo-editor-types"
import styles from "./export-options-card.module.css"

interface ExportOptionsCardProps {
  /** Current export state. */
  state: ExportState
  /** Long-edge presets shown in the size picker. */
  longEdgePresets?: ReadonlyArray<number>
  /** Estimated output filesize label (e.g. "2.4 MB"). */
  estimatedSizeLabel: string
  /** Document title used in the CTA. */
  documentName: string
}

const FORMAT_META: Record<ExportFormat, { label: string; description: string }> = {
  jpg: { label: "JPG", description: "8-bit · sRGB" },
  png: { label: "PNG", description: "24-bit · alpha" },
  webp: { label: "WebP", description: "Lossy · alpha" },
}

const DEFAULT_PRESETS: ReadonlyArray<number> = [1080, 1600, 2400, 3840]

function clampLong(value: number): number {
  if (!Number.isFinite(value) || value < 64) return 64
  if (value > 8192) return 8192
  return value
}

export function ExportOptionsCard({
  state,
  longEdgePresets = DEFAULT_PRESETS,
  estimatedSizeLabel,
  documentName,
}: ExportOptionsCardProps) {
  const quality = clamp01(state.quality)
  const longEdge = clampLong(state.longEdgePx)
  const showQuality = state.format !== "png"
  const longEdgePct = longEdge / 4000

  const sliderStyle: CSSProperties = {
    "--bar-fill": `${quality * 100}%`,
  } as CSSProperties

  const sizeStyle: CSSProperties = {
    "--bar-fill": `${clamp01(longEdgePct) * 100}%`,
  } as CSSProperties

  return (
    <section className={styles.card} aria-label={`Export options for ${documentName}`}>
      <header className={styles.head}>
        <span className={styles.title}>Export</span>
        <Chip
          label={`${FORMAT_META[state.format].label} · ${longEdge}px · ${showQuality ? formatPct(quality) : "lossless"}`}
          tone="amber"
          selected
        />
      </header>

      <div className={styles.formats} role="radiogroup" aria-label="Export format">
        {(Object.keys(FORMAT_META) as ReadonlyArray<ExportFormat>).map((format) => {
          const isActive = format === state.format
          return (
            <button
              key={format}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[styles.formatBtn, isActive ? styles.formatActive : ""].join(" ")}
            >
              <span className={styles.formatName}>{FORMAT_META[format].label}</span>
              <span className={styles.formatMeta}>{FORMAT_META[format].description}</span>
            </button>
          )
        })}
      </div>

      {showQuality ? (
        <div className={styles.sliderField}>
          <div className={styles.sliderHead}>
            <span className={styles.label}>Quality</span>
            <span className={styles.value}>{formatPct(quality)}</span>
          </div>
          <span
            className={styles.bar}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(quality * 100)}
            aria-label={`Quality ${formatPct(quality)}`}
            style={sliderStyle}
          >
            <span className={styles.barFill} />
          </span>
        </div>
      ) : null}

      <div className={styles.sliderField}>
        <div className={styles.sliderHead}>
          <span className={styles.label}>Long edge</span>
          <span className={styles.value}>{longEdge} px</span>
        </div>
        <span
          className={styles.bar}
          role="slider"
          aria-valuemin={64}
          aria-valuemax={8192}
          aria-valuenow={longEdge}
          aria-label={`Long edge ${longEdge} pixels`}
          style={sizeStyle}
        >
          <span className={styles.barFill} />
        </span>
        <div className={styles.sizePresets} role="radiogroup" aria-label="Size presets">
          {longEdgePresets.map((preset) => {
            const isActive = preset === longEdge
            return (
              <button
                key={preset}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={[styles.sizeBtn, isActive ? styles.sizeActive : ""].join(" ")}
              >
                {preset}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.summary}>
        <div>
          <span className={styles.summaryLabel}>Estimated</span>
          <div className={styles.summarySize}>{estimatedSizeLabel}</div>
        </div>
        <button type="button" className={styles.cta}>
          Export {FORMAT_META[state.format].label}
        </button>
      </div>
    </section>
  )
}
