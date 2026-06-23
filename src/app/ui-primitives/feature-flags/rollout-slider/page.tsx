import type { Metadata } from "next"

import { RolloutSlider } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Rollout slider | Feature flags",
  description:
    "Primitive 03 — 0-100% rollout slider with tone-shifting fill and snap points at 0/25/50/75/100.",
}

export default function RolloutSliderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Slider"
        title="Rollout slider"
        description="Slider control for percent-based rollouts. role=slider with aria-valuenow, full keyboard support (arrow keys ±1, Shift+Arrow ±10, PageDown/PageUp jumps between snap points, Home/End to bounds). Fill colour shifts neutral → teal → amber → red → green as percent rises."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Rollout slider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · drag, click or arrow keys to change</span>
        <div className={styles.demoStack}>
          <RolloutSlider defaultValue={0} label="quote-instant-pricing — Production" />
          <RolloutSlider defaultValue={25} label="parts-3d-viewer — Production" />
          <RolloutSlider defaultValue={50} label="workshop-bay-availability-realtime — Production" />
          <RolloutSlider defaultValue={85} label="compliance-receipt-qr — Production" snap />
          <RolloutSlider defaultValue={100} label="muffler-discount-banner — Production" />
        </div>
      </section>
    </main>
  )
}
