import type { Metadata } from "next"

import { PenStrokeLayer } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export const metadata: Metadata = {
  title: "Pen stroke layer | UI Primitives - Whiteboard",
}

const pressureStroke = [
  { x: 10, y: 80, pressure: 0.2 },
  { x: 60, y: 28, pressure: 0.5 },
  { x: 120, y: 54, pressure: 0.9 },
  { x: 190, y: 22, pressure: 0.7 },
  { x: 260, y: 68, pressure: 0.35 },
]

export default function PenStrokeLayerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 11"
        title="Pen stroke layer"
        description="SVG stroke layer from canvas points, with optional pressure-sensitive filled stroke polygon."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Pen stroke layer" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Smoothed path and pressure path</span>
          <div className={styles.demoRowJustified}>
            <PenStrokeLayer
              points={[
                { x: 0, y: 80 },
                { x: 60, y: 24 },
                { x: 140, y: 74 },
                { x: 220, y: 32 },
                { x: 300, y: 58 },
              ]}
              color="var(--primitive-teal)"
            />
            <PenStrokeLayer points={pressureStroke} color="var(--primitive-amber)" baseWidth={14} />
          </div>
        </div>
      </section>
    </main>
  )
}
