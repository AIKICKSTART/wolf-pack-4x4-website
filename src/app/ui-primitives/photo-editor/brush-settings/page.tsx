import type { Metadata } from "next"

import { BrushSettings } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Brush settings | Photo editor",
  description:
    "Primitive 05 — brush settings panel with tip preview, size / hardness / flow sliders and a colour bar with a six-swatch quick-pick row.",
}

export default function BrushSettingsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Brush settings"
        title="Brush settings"
        description="Tip preview reacts to hardness (radial gradient stop) and flow (opacity). Three sliders cover size, hardness, flow. Colour bar surfaces the active hex with a six-swatch quick-pick row of canonical workshop tones."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Brush settings" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Soft brush · 96 px · 30% hardness · 64% flow · workshop amber</span>
        <div className={styles.demoInline}>
          <BrushSettings state={{ sizePx: 96, hardness: 0.3, flow: 0.64, hex: "#ffc14f" }} />
          <BrushSettings state={{ sizePx: 24, hardness: 0.95, flow: 1, hex: "#e62028" }} />
          <BrushSettings state={{ sizePx: 220, hardness: 0.1, flow: 0.32, hex: "#40bcff" }} />
        </div>
      </section>
    </main>
  )
}
