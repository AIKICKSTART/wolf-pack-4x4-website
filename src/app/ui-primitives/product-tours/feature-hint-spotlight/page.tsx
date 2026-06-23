import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FeatureHintSpotlight } from "../../components/product-tours"
import { DismissableFeatureHintDemos } from "../_interactive-demos"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Feature hint spotlight | Product tours",
  description:
    "Primitive 14 — bigger-than-coach-mark feature hint with an animated halo and 'what's new' badge.",
}

export default function FeatureHintSpotlightScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Feature hint"
        title="Feature hint spotlight"
        description="Bigger-than-coach-mark hint. Animated halo, badge, deeper copy and a CTA. Used to introduce a feature that deserves more than a tooltip but less than a modal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Feature hint spotlight" },
        ]}
      />

      <section className={styles.demoStack}>
        <DismissableFeatureHintDemos />

        <FeatureHintSpotlight
          badge="Just shipped"
          title="ADR cheatsheet for turbo-back"
          body="One-tap ADR 80/04 confidence check on every cat-back and turbo-back quote. We pre-fill noise and emissions notes so you can answer the customer's question on the spot."
          ctaLabel="Open the cheatsheet"
          tone="green"
          glyph="✓"
        />
      </section>
    </main>
  )
}
