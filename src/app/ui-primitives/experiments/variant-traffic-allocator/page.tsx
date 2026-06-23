import type { Metadata } from "next"

import { VariantTrafficAllocator } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Variant traffic allocator | Experiments",
  description:
    "Primitive 03 — stacked allocation bar + per-variant sliders + sum-must-100% indicator.",
}

export default function VariantTrafficAllocatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Allocator"
        title="Variant traffic allocator"
        description="Visual + numeric variant traffic split. Stacked bar segments reflect each arm's weight. Per-variant sliders adjust weights in place. A sum-must-equal-100% chip enforces validity and the numeric VariantPicker editor is exposed in a disclosure."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Variant traffic allocator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · drag sliders to rebalance</span>
        <VariantTrafficAllocator
          variants={[
            {
              id: "control",
              name: "Save then price",
              description: "Current quote flow",
              weight: 40,
              tone: "amber",
            },
            {
              id: "live",
              name: "Live preview",
              description: "Recalculate on each line edit",
              weight: 40,
              tone: "teal",
            },
            {
              id: "live-anim",
              name: "Live + animated",
              description: "Live + price-change animation",
              weight: 20,
              tone: "green",
            },
          ]}
        />
      </section>
    </main>
  )
}
