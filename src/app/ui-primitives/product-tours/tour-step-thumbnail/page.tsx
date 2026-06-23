"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { TourStepThumbnail } from "../../components/product-tours"
import { SAMPLE_THUMB_STEPS } from "../fixtures"

import styles from "../product-tours.module.css"

export default function TourStepThumbnailScenePage() {
  const [selectedId, setSelectedId] = useState<string>("thumb3")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Step thumbnail"
        title="Tour step thumbnail"
        description="Thumbnail card representing a single step in the builder's left-side step list. Highlight state, shape glyph, target selector code, and delay label."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Tour step thumbnail" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Builder step list · select to inspect</span>
        <div className={styles.demoStack}>
          {SAMPLE_THUMB_STEPS.map((step) => (
            <TourStepThumbnail
              key={step.id}
              index={step.index}
              title={step.title}
              excerpt={step.excerpt}
              shape={step.shape}
              targetSelector={step.targetSelector}
              delayLabel={step.delayLabel}
              tone={step.tone}
              selected={selectedId === step.id}
              onClick={() => setSelectedId(step.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
