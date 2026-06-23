import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LiveAnnotationOverlay } from "../../components/screen-recorder"

import styles from "../screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Live annotation overlay | Screen recorder",
  description:
    "Primitive 13 — live annotation overlay shown over the recording canvas with pen / arrow / box / text tools, colour swatches and a clear-frame chip.",
}

export default function LiveAnnotationOverlayScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Live annotation overlay"
        title="Live annotation overlay"
        description="During-record markup — pen for free strokes, arrows for pointers, box for callouts, text for short labels. A swatch row picks the colour, and clear-frame wipes the current page without ending the recording."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder", href: "/ui-primitives/screen-recorder" },
          { label: "Live annotation overlay" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Box tool · red — Bay 2 ADR pipe callout</span>
        <LiveAnnotationOverlay activeTool="box" activeColor="var(--primitive-red)" />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Arrow tool · amber</span>
        <LiveAnnotationOverlay activeTool="arrow" activeColor="var(--primitive-amber)" />
      </section>
    </main>
  )
}
