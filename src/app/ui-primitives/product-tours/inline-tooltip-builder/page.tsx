"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  InlineTooltipBuilder,
  TooltipPreviewOverlay,
  type TooltipBuildState,
} from "../../components/product-tours"
import { SAMPLE_TOOLTIP_STATE } from "../fixtures"

import styles from "../product-tours.module.css"

export default function InlineTooltipBuilderScenePage() {
  const [state, setState] = useState<TooltipBuildState>(SAMPLE_TOOLTIP_STATE)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Tooltip composer"
        title="Inline tooltip builder"
        description="Compose an inline tooltip with position picker, alignment chips, close-CTA toggle, and CTA copy. The preview on the right shows the result live."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Inline tooltip builder" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Editor</span>
          <InlineTooltipBuilder
            state={state}
            onChange={(patch) => setState((prev) => ({ ...prev, ...patch }))}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Preview · live</span>
          <TooltipPreviewOverlay
            title={state.title}
            body={state.body}
            direction={state.direction}
            align={state.align}
            showCloseCta={state.closeCta}
            ctaLabel={state.ctaLabel}
            caption={`Anchored ${state.direction} · align ${state.align}`}
          />
        </section>
      </div>
    </main>
  )
}
