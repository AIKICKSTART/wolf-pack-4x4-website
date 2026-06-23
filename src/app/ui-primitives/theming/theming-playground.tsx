"use client"

import {
  ThemeController,
  ThemeExportPanel,
  ThemePresetPicker,
  TokenColorPicker,
  TokenFontPicker,
  UmbrellaPreview,
  type ThemeTokenId,
} from "../components/theming"

import styles from "./theming.module.css"

const TUNABLE_COLOR_TOKENS: ReadonlyArray<ThemeTokenId> = ["red", "amber", "teal", "green", "canvas"]
const TUNABLE_FONT_TOKENS: ReadonlyArray<ThemeTokenId> = ["font-display", "font-body", "font-mono"]

export function ThemingPlayground() {
  return (
    <ThemeController>
      <div className={styles.playgroundGrid}>
        <aside className={styles.controls} aria-label="Theme controls">
          <ThemePresetPicker />
          <section className={styles.controlGroup} aria-label="Colour tokens">
            <div className={styles.controlGroupTitle}>
              <h3>Colour overrides</h3>
              <small>Scoped to controller subtree</small>
            </div>
            {TUNABLE_COLOR_TOKENS.map((id) => (
              <TokenColorPicker key={id} tokenId={id} />
            ))}
          </section>
          <section className={styles.controlGroup} aria-label="Type tokens">
            <div className={styles.controlGroupTitle}>
              <h3>Type overrides</h3>
              <small>Stacks already loaded</small>
            </div>
            {TUNABLE_FONT_TOKENS.map((id) => (
              <TokenFontPicker key={id} tokenId={id} />
            ))}
          </section>
          <ThemeExportPanel />
        </aside>
        <div>
          <UmbrellaPreview />
        </div>
      </div>
    </ThemeController>
  )
}
