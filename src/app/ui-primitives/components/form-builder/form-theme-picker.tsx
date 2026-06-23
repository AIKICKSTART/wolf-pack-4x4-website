"use client"

import { useState } from "react"

import type { FormTheme, FormThemePreset } from "./form-builder-types"
import styles from "./form-theme-picker.module.css"

interface FormThemePickerProps {
  presets: ReadonlyArray<FormThemePreset>
  /** Initial theme — defaults to the first preset. */
  initialTheme?: FormTheme
  className?: string
}

export function FormThemePicker({
  presets,
  initialTheme,
  className,
}: FormThemePickerProps) {
  const initial = initialTheme ?? presets[0]?.id ?? "minimal"
  const [active, setActive] = useState<FormTheme>(initial)

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Form theme picker">
      <header className={styles.head}>
        <span className={styles.kicker}>Form theme</span>
        <span className={styles.hint}>
          Pick how the published form looks to respondents.
        </span>
      </header>

      <div className={styles.grid} role="radiogroup" aria-label="Form themes">
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
                className={styles.swatch}
                aria-hidden="true"
                style={{
                  background: preset.paper,
                  color: preset.ink,
                  borderColor: preset.accent,
                }}
              >
                <span className={styles.swatchLabel}>Aa</span>
                <span
                  className={styles.swatchDot}
                  style={{ background: preset.accent }}
                />
                <span
                  className={styles.swatchBar}
                  style={{ background: preset.ink, opacity: 0.6 }}
                />
              </span>
              <span className={styles.tileBody}>
                <span className={styles.tileName}>{preset.name}</span>
                <span className={styles.tileDesc}>{preset.description}</span>
              </span>
              <span
                className={[styles.checkRing, isActive ? styles.checkRingOn : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              >
                {isActive ? "●" : ""}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
