"use client"

import { ThemeController, ThemePresetPicker, TokenInspector } from "../../components/theming"

export function InspectorDemo() {
  return (
    <ThemeController>
      <div style={{ display: "grid", gap: 22 }}>
        <ThemePresetPicker />
        <TokenInspector />
      </div>
    </ThemeController>
  )
}
