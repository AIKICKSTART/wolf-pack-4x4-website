"use client"

import { useState } from "react"

import type { ThemePreset, ThemePresetSpec } from "./email-builder-types"
import styles from "./email-theme-picker.module.css"

interface EmailThemePickerProps {
  presets: ReadonlyArray<ThemePresetSpec>
  /** Initial theme — defaults to the first preset. */
  initialTheme?: ThemePreset
  className?: string
}

export function EmailThemePicker({
  presets,
  initialTheme,
  className,
}: EmailThemePickerProps) {
  const initial = initialTheme ?? presets[0]?.id ?? "workshop-dark"
  const [active, setActive] = useState<ThemePreset>(initial)

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Email theme picker">
      <header className={styles.head}>
        <span className={styles.kicker}>Email theme</span>
        <span className={styles.hint}>
          A starting point for tone, typography, and accent.
        </span>
      </header>

      <div className={styles.grid} role="radiogroup" aria-label="Email themes">
        {presets.map((preset) => {
          const isActive = preset.id === active
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[styles.tile, isActive ? styles.tileActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActive(preset.id)}
            >
              <span
                className={styles.thumb}
                aria-hidden="true"
                style={{
                  background: preset.paper,
                  color: preset.ink,
                  borderColor: preset.accent,
                }}
              >
                <span className={styles.thumbBlock} style={{ background: preset.accent }} />
                <span
                  className={styles.thumbLine}
                  style={{ background: preset.ink, opacity: 0.85 }}
                />
                <span
                  className={styles.thumbLine}
                  style={{ background: preset.ink, opacity: 0.45 }}
                />
                <span
                  className={styles.thumbButton}
                  style={{ background: preset.accent, color: preset.paper }}
                >
                  CTA
                </span>
              </span>
              <span className={styles.body}>
                <span className={styles.name}>{preset.name}</span>
                <span className={styles.desc}>{preset.description}</span>
              </span>
              {isActive ? <span className={styles.tick} aria-hidden="true">●</span> : null}
            </button>
          )
        })}
      </div>
    </section>
  )
}
