import type { Metadata } from "next"

import { CropOverlay } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Crop overlay | Photo editor",
  description:
    "Primitive 04 — crop overlay with Freeform / 1:1 / 4:5 / 16:9 / 9:16 ratio picker, draggable corner + side handles, rule-of-thirds grid and a centred dimension chip.",
}

export default function CropOverlayScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Crop overlay"
        title="Crop overlay"
        description="Ratio picker drives the marquee aspect — Freeform leaves it free, fixed presets lock the rectangle. Eight handles (four corners + four sides) cover both axis and corner drags, with a rule-of-thirds grid and current pixel dimensions surfaced via a chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Crop overlay" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · 16:9 hero crop · 3840×2160</span>
        <CropOverlay ratioId="16:9" widthPx={3840} heightPx={2160} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta exhaust closeup · 4:5 portrait · 1920×2400</span>
        <CropOverlay ratioId="4:5" widthPx={1920} heightPx={2400} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · 9:16 story tile · 1080×1920</span>
        <CropOverlay ratioId="9:16" widthPx={1080} heightPx={1920} />
      </section>
    </main>
  )
}
