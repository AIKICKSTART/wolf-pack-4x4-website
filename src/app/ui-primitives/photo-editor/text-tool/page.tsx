import type { Metadata } from "next"

import { TextToolOverlay } from "../../components/photo-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../photo-editor.module.css"

export const metadata: Metadata = {
  title: "Text tool | Photo editor",
  description:
    "Primitive 08 — text tool overlay with font / size / weight / fill controls and a live caret on the surface preview.",
}

export default function TextToolScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Text tool"
        title="Text tool overlay"
        description="Live preview with dashed marquee outlines the bounding box. The controls section surfaces font family, size in pixels, a weight radio row and a fill colour chip. The caret blinks under steady motion preferences."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor", href: "/ui-primitives/photo-editor" },
          { label: "Text tool" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux dyno run · 412 kW headline · 800 weight · amber</span>
        <TextToolOverlay
          state={{
            text: "412 kW",
            fontFamily: "Inter, sans-serif",
            sizePx: 88,
            weight: 800,
            hex: "#ffc14f",
            letterSpacing: 0.02,
          }}
          surfaceLabel="Hilux dyno run"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Manta cat-back · workshop caption · 600 weight</span>
        <TextToolOverlay
          state={{
            text: "Manta cat-back",
            fontFamily: "Inter, sans-serif",
            sizePx: 56,
            weight: 600,
            hex: "#ffffff",
            letterSpacing: 0.08,
          }}
          surfaceLabel="Manta exhaust closeup"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bay 2 hero · OAK FLATS bold · 900 weight · red</span>
        <TextToolOverlay
          state={{
            text: "OAK FLATS",
            fontFamily: "Inter, sans-serif",
            sizePx: 64,
            weight: 900,
            hex: "#e62028",
            letterSpacing: 0.12,
          }}
          surfaceLabel="Bay 2 hero"
        />
      </section>
    </main>
  )
}
