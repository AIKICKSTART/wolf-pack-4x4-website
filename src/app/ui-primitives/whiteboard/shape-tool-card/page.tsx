"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { ShapeToolCard } from "../../components/whiteboard"
import type { ShapeKind, ShapeSize } from "../../components/whiteboard"
import styles from "../whiteboard.module.css"

export default function ShapeToolCardPage() {
  const [shape, setShape] = useState<ShapeKind>("hexagon")
  const [size, setSize] = useState<ShapeSize>("md")
  const [fill, setFill] = useState<string>("#ffe66a")
  const [stroke, setStroke] = useState<string>("#0a0b10")

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 04"
        title="Shape tool card"
        description="Inline shape picker with rectangle, ellipse, triangle, hexagon, arrow, and star — plus size chips and fill / stroke swatch rows."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Shape tool card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>
            Active selection · shape {shape.toUpperCase()} / size {size.toUpperCase()} · fill {fill} · stroke {stroke}
          </span>
          <div className={styles.demoRowJustified}>
            <ShapeToolCard
              activeShape={shape}
              size={size}
              fill={fill}
              stroke={stroke}
              onSelectShape={setShape}
              onSelectSize={setSize}
              onSelectFill={setFill}
              onSelectStroke={setStroke}
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Six shape buttons each render an SVG glyph at a uniform 28×28. Size chips are a
            radiogroup; fill and stroke rows each render six swatches. Stroke swatches show as
            outlined circles so they read as borders.
          </p>
        </div>
      </section>
    </main>
  )
}
