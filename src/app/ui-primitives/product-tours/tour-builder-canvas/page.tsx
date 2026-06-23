import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TourBuilderCanvas } from "../../components/product-tours"
import { SAMPLE_QUOTE_TOUR_STEPS } from "../fixtures"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Tour builder canvas | Product tours",
  description:
    "Primitive 01 — visual flow canvas for building a multi-step tour with animated arrow connectors between steps.",
}

const SHORT_TOUR = SAMPLE_QUOTE_TOUR_STEPS.slice(0, 4).map((step) => ({
  ...step,
  selected: step.id === "qs2",
}))

export default function TourBuilderCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Builder canvas"
        title="Tour builder canvas"
        description="Visual flow editor for a Mufflermen product tour. Each node is a step; the dashed connectors show the user's path. Drives the upstream step inspector and audience rules."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Tour builder canvas" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Instant quote walk-through · 6 steps</span>
        <TourBuilderCanvas
          tourName="Instant quote walk-through"
          steps={SAMPLE_QUOTE_TOUR_STEPS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>ADR cheatsheet · 4 steps</span>
        <TourBuilderCanvas
          tourName="ADR cheatsheet — turbo-back legality"
          steps={SHORT_TOUR}
        />
      </section>
    </main>
  )
}
