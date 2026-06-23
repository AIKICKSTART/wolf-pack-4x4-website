"use client"

import {
  ThemeController,
  TokenFontPicker,
  UmbrellaPreview,
  type ThemeTokenId,
} from "../../components/theming"
import styles from "../theming.module.css"

const FONT_TOKENS: ReadonlyArray<ThemeTokenId> = [
  "font-display",
  "font-display-alt",
  "font-body",
  "font-mono",
  "font-mono-techno",
]

export function FontPickerDemo() {
  return (
    <ThemeController>
      <div className={styles.demoGrid}>
        <div className={styles.demoControls}>
          {FONT_TOKENS.map((id) => (
            <TokenFontPicker key={id} tokenId={id} />
          ))}
        </div>
        <UmbrellaPreview />
      </div>
    </ThemeController>
  )
}
