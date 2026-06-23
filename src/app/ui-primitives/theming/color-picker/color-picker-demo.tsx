"use client"

import {
  ThemeController,
  TokenColorPicker,
  UmbrellaPreview,
  type ThemeTokenId,
} from "../../components/theming"
import styles from "../theming.module.css"

const COLOR_TOKENS: ReadonlyArray<ThemeTokenId> = [
  "canvas",
  "panel",
  "panel-strong",
  "line",
  "line-strong",
  "body",
  "muted",
  "red",
  "red-dark",
  "amber",
  "teal",
  "green",
]

export function ColorPickerDemo() {
  return (
    <ThemeController>
      <div className={styles.demoGrid}>
        <div className={styles.demoControls}>
          {COLOR_TOKENS.map((id) => (
            <TokenColorPicker key={id} tokenId={id} />
          ))}
        </div>
        <UmbrellaPreview />
      </div>
    </ThemeController>
  )
}
