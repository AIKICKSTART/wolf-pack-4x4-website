"use client"

import type { KeyboardEvent } from "react"

import styles from "./theme-preset-picker.module.css"
import { useThemeController } from "./theme-controller"
import {
  getStyleProfileForThemePreset,
  themePresets,
  type ThemePreset,
  type ThemePresetId,
} from "./theme-tokens"
import { STYLE_PROFILES_BY_ID } from "../../builder/theme/profiles"

const SWATCH_TOKENS = ["canvas", "panel", "red", "amber", "teal", "green"] as const

interface ThemePresetPickerProps {
  className?: string
}

export function ThemePresetPicker({ className }: ThemePresetPickerProps) {
  const { currentPresetId, setPreset } = useThemeController()
  const wrapperClass = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section className={wrapperClass} aria-label="Theme presets">
      <header className={styles.head}>
        <span className={styles.kicker}>Presets</span>
        <h2 className={styles.title}>Preset cascade</h2>
        <p className={styles.lede}>
          Selecting a preset rewrites the dashboard-root primitive tokens, so every UI primitive route
          re-skins from the same source.
        </p>
      </header>
      <div
        className={styles.grid}
        role="radiogroup"
        aria-label="Available theme presets"
      >
        {themePresets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            active={preset.id === currentPresetId}
            onSelect={setPreset}
          />
        ))}
      </div>
    </section>
  )
}

interface PresetCardProps {
  preset: ThemePreset
  active: boolean
  onSelect: (id: ThemePresetId) => void
}

function PresetCard({ preset, active, onSelect }: PresetCardProps) {
  const linkedProfile = STYLE_PROFILES_BY_ID[getStyleProfileForThemePreset(preset.id)]
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      onSelect(preset.id)
    }
  }

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      className={`${styles.card} ${active ? styles.cardActive : ""}`}
      data-theme-preset-card={preset.id}
      data-linked-style-profile={linkedProfile.id}
      onClick={() => onSelect(preset.id)}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.cardSwatches} aria-hidden="true">
        {SWATCH_TOKENS.map((tokenId) => (
          <span
            key={tokenId}
            className={styles.swatch}
            style={{ background: preset.values[tokenId] }}
          />
        ))}
      </span>
      <span className={styles.cardLabel}>{preset.label}</span>
      <span className={styles.cardDescription}>{preset.description}</span>
      <span className={styles.cardDescription}>
        Style layer: {linkedProfile.name}
      </span>
      <span className={styles.cardMeta}>
        {active ? "Active" : "Apply preset"}
      </span>
    </button>
  )
}
