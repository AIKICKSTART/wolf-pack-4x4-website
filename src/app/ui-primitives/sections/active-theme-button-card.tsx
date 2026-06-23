"use client"

import type { CSSProperties } from "react"
import { useSyncExternalStore } from "react"

import { ActionButton } from "../components/actions/button-primitive"
import {
  DEFAULT_PRESET_ID,
  THEME_PRESET_CHANGE_EVENT,
  THEME_PRESET_STORAGE_KEY,
  getPreset,
  getThemePresetTone,
  isThemePresetId,
  presetToCssVariables,
  readStoredThemePresetId,
  type ThemePresetId,
} from "../components/theming/theme-tokens"

import styles from "../ui-primitives.module.css"

function subscribeActivePreset(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_PRESET_STORAGE_KEY && isThemePresetId(event.newValue)) {
      listener()
    }
  }

  window.addEventListener(THEME_PRESET_CHANGE_EVENT, listener)
  window.addEventListener("storage", handleStorage)

  return () => {
    window.removeEventListener(THEME_PRESET_CHANGE_EVENT, listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function readActivePreset(): ThemePresetId {
  return readStoredThemePresetId(DEFAULT_PRESET_ID)
}

function readServerPreset(): ThemePresetId {
  return DEFAULT_PRESET_ID
}

export function ActiveThemeButtonCard() {
  const presetId = useSyncExternalStore(
    subscribeActivePreset,
    readActivePreset,
    readServerPreset,
  )
  const preset = getPreset(presetId)
  const tone = getThemePresetTone(preset.id)

  return (
    <article
      className={styles.buttonThemeCard}
      data-theme-preset-tone={tone}
      style={
        {
          ...presetToCssVariables(preset),
          colorScheme: tone,
          "--foreground": "var(--primitive-text-strong)",
          "--background": "var(--primitive-canvas)",
          "--primary": "var(--primitive-red)",
          "--primary-foreground": "var(--primitive-text-on-accent)",
          "--secondary": "var(--primitive-panel)",
          "--secondary-foreground": "var(--primitive-text-strong)",
          "--accent": "var(--primitive-amber)",
          "--accent-foreground": "var(--primitive-canvas)",
          "--destructive": "var(--primitive-red-dark)",
          "--border": "var(--primitive-line)",
          "--input": "var(--primitive-line)",
          "--ring": "var(--primitive-teal)",
        } as CSSProperties
      }
    >
      <div className={styles.buttonThemeHeader}>
        <span>{preset.label}</span>
        <code>{tone}</code>
      </div>
      <p>{preset.description}</p>
      <div className={styles.buttonThemeSwatches} aria-label={`${preset.label} button tokens`}>
        <span style={{ "--swatch": "var(--primitive-red)" } as CSSProperties}>Red</span>
        <span style={{ "--swatch": "var(--primitive-amber)" } as CSSProperties}>Alt</span>
        <span style={{ "--swatch": "var(--primitive-teal)" } as CSSProperties}>Focus</span>
      </div>
      <div className={styles.buttonThemeActions}>
        <a className={`${styles.siteButton} ${styles.siteButtonRed}`} href="#button-primitives">
          Red CTA
        </a>
        <a className={`${styles.siteButton} ${styles.siteButtonChrome}`} href="#button-primitives">
          Chrome alt
        </a>
        <ActionButton variant="outline">App alt</ActionButton>
      </div>
    </article>
  )
}
