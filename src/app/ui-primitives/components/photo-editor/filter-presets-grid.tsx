"use client"

import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import { durations } from "../motion/motion-tokens"

import { FILTER_PRESETS, clamp01, formatPct } from "./photo-editor-types"
import type { FilterPresetId } from "./photo-editor-types"
import styles from "./filter-presets-grid.module.css"

interface FilterPresetsGridProps {
  /** Currently selected preset id. */
  activeId: FilterPresetId
  /** Source thumbnail label (e.g. "Dyno run"). Surfaced via preset overlays. */
  sourceLabel?: string
  /** Strength of the active preset (0 – 1). */
  strength?: number
  /** Optional select callback. */
  onPresetSelect?: (id: FilterPresetId) => void
}

export function FilterPresetsGrid({
  activeId,
  sourceLabel = "Source",
  strength = 0.78,
  onPresetSelect,
}: FilterPresetsGridProps) {
  const safeStrength = clamp01(strength)
  const activePreset = FILTER_PRESETS.find((preset) => preset.id === activeId)

  return (
    <section className={styles.wrap} aria-label="Filter presets">
      <header className={styles.head}>
        <span className={styles.title}>Filter presets</span>
        <Chip
          label={`${activePreset?.label ?? "—"} · ${formatPct(safeStrength)}`}
          tone="teal"
          selected
        />
      </header>

      <div className={styles.grid} role="radiogroup" aria-label="Filter preset thumbnails">
        {FILTER_PRESETS.map((preset, index) => {
          const isActive = preset.id === activeId
          const cellVars: CSSProperties = {
            "--preset-filter": preset.filterCss,
            "--preset-label": `"${sourceLabel.toUpperCase()}"`,
            transitionDuration: `${durations.normal}ms`,
            transitionDelay: `${index * 32}ms`,
          } as CSSProperties
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[styles.cell, isActive ? styles.cellActive : ""].join(" ")}
              style={cellVars}
              onClick={() => onPresetSelect?.(preset.id)}
              aria-label={`${preset.label} · ${preset.description}`}
            >
              <span className={styles.thumb} aria-hidden="true" />
              <span className={styles.cellName}>{preset.label}</span>
              <span className={styles.cellMeta}>{preset.description}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.strengthRow} role="group" aria-label="Active preset strength">
        <span className={styles.strengthLabel}>Strength</span>
        <span
          className={styles.strengthBar}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(safeStrength * 100)}
          aria-label={`Strength ${formatPct(safeStrength)}`}
          style={{ "--strength-fill": `${safeStrength * 100}%` } as CSSProperties}
        >
          <span className={styles.strengthFill} />
        </span>
        <span className={styles.strengthValue}>{formatPct(safeStrength)}</span>
      </div>
    </section>
  )
}
