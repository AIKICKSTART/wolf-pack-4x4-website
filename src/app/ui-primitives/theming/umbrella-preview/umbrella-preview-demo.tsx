"use client"

import { ThemeController, ThemePresetPicker, UmbrellaPreview } from "../../components/theming"

export function UmbrellaPreviewDemo() {
  return (
    <ThemeController>
      <div style={{ display: "grid", gap: 22 }}>
        <ThemePresetPicker />
        <UmbrellaPreview />
      </div>
    </ThemeController>
  )
}
