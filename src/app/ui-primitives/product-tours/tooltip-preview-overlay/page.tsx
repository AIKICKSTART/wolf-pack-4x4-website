import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TooltipPreviewOverlay } from "../../components/product-tours"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Tooltip preview overlay | Product tours",
  description:
    "Primitive 10 — preview frame showing the tooltip anchored on a sample target with direction and align modifiers.",
}

export default function TooltipPreviewOverlayScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Preview"
        title="Tooltip preview overlay"
        description="Renders the in-progress tooltip on a sample target inside a dotted preview frame. Different direction + align modifiers shown side-by-side."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Tooltip preview overlay" },
        ]}
      />

      <div className={styles.demoTwo}>
        <TooltipPreviewOverlay
          title="Lock in your price"
          body="Quote holds 14 days. Stuart confirms by SMS within the hour."
          direction="bottom"
          align="center"
          caption="Direction: bottom · Align: center"
          tone="teal"
        />
        <TooltipPreviewOverlay
          title="ADR-legal — turbo-back"
          body="3-inch turbo-back stays under the 92 dB stationary limit when paired with our 50 mm resonator."
          direction="right"
          align="start"
          caption="Direction: right · Align: start"
          tone="amber"
        />
      </div>

      <div className={styles.demoTwo}>
        <TooltipPreviewOverlay
          title="Bay availability — Sat"
          body="Saturday morning is full. Next opening is Tuesday 4 Jun at 9am."
          direction="top"
          align="end"
          caption="Direction: top · Align: end"
          tone="violet"
        />
        <TooltipPreviewOverlay
          title="Fleet pricing tier"
          body="3+ vehicles on file unlocks fleet pricing. Add another rego under Vehicles."
          direction="left"
          align="center"
          caption="Direction: left · Align: center · no close-CTA"
          showCloseCta={false}
          ctaLabel="Add vehicle"
          tone="green"
        />
      </div>
    </main>
  )
}
