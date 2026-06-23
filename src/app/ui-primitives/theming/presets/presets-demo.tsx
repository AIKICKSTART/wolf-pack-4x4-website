"use client"

import { ThemeController, ThemePresetPicker, UmbrellaPreview } from "../../components/theming"

export function PresetsDemo() {
  return (
    <ThemeController>
      <div style={{ display: "grid", gap: 22 }}>
        <ThemePresetPicker />
        <UmbrellaPreview />
      </div>
    </ThemeController>
  )
}
