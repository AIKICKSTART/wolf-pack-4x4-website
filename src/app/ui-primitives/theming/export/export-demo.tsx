"use client"

import { ThemeController, ThemeExportPanel, ThemePresetPicker } from "../../components/theming"

export function ExportDemo() {
  return (
    <ThemeController>
      <div style={{ display: "grid", gap: 22 }}>
        <ThemePresetPicker />
        <ThemeExportPanel />
      </div>
    </ThemeController>
  )
}
