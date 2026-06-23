import type { Metadata } from "next"

import { ToolPalette } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Tool palette | Photo editor",
  description:
    "Primitive 02 — left vertical tool palette with eight tools (Select / Crop / Brush / Eraser / Text / Shape / Heal / Clone), keyboard shortcuts and a foreground/background colour slot.",
}

export default function ToolPaletteScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Tool palette"
        title="Tool palette"
        description="Vertical palette housing the eight workshop tools. Active tool is highlighted with the teal accent and shortcut chip. The colour slot at the foot shows the current foreground / background pair."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Tool palette" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Brush active · foreground #FFC14F · workshop amber</span>
        <div className={styles.demoInline}>
          <ToolPalette activeTool="brush" foregroundHex="#ffc14f" backgroundHex="#0b0c12" />
          <ToolPalette activeTool="crop" foregroundHex="#40bcff" backgroundHex="#0b0c12" />
          <ToolPalette activeTool="text" foregroundHex="#ffffff" backgroundHex="#37d67a" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Heal · clone · eraser — close-up retouch on Manta closeup</span>
        <div className={styles.demoInline}>
          <ToolPalette activeTool="heal" />
          <ToolPalette activeTool="clone" />
          <ToolPalette activeTool="eraser" />
          <ToolPalette activeTool="shape" foregroundHex="#e62028" />
        </div>
      </section>
    </main>
  )
}
