import type { Metadata } from "next"

import { ExportOptionsCard } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Export options | Photo editor",
  description:
    "Primitive 11 — export options card with format radio (JPG / PNG / WebP), quality slider, long-edge size slider with presets and an estimated filesize summary.",
}

export default function ExportOptionsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Export options"
        title="Export options card"
        description="Format radio drives whether the quality slider is shown — PNG hides it (lossless), JPG/WebP surface a 0–1 slider with percent readout. Long-edge slider tracks 64 – 8192 px with four presets. Estimated filesize and primary CTA sit in the summary."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Export options" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>WebP · 2400 px · 78% quality · hero card</span>
        <ExportOptionsCard
          state={{ format: "webp", quality: 0.78, longEdgePx: 2400 }}
          estimatedSizeLabel="312 KB"
          documentName="hilux-dyno-run.webp"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>JPG · 1600 px · 92% quality · catalogue thumb</span>
        <ExportOptionsCard
          state={{ format: "jpg", quality: 0.92, longEdgePx: 1600 }}
          estimatedSizeLabel="468 KB"
          documentName="manta-closeup.jpg"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>PNG · 3840 px · lossless · social hero</span>
        <ExportOptionsCard
          state={{ format: "png", quality: 1, longEdgePx: 3840 }}
          estimatedSizeLabel="6.4 MB"
          documentName="bay-2-hero.png"
        />
      </section>
    </main>
  )
}
