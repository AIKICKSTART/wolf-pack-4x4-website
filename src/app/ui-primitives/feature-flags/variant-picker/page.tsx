import type { Metadata } from "next"

import { VariantPicker } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Variant picker | Feature flags",
  description:
    "Primitive 04 — A/B/C variant picker with weight inputs and sum-must-100% indicator.",
}

export default function VariantPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Variants"
        title="Variant picker"
        description="Fieldset of named variants with numeric weight inputs (0–100%). A live total indicator turns green when the weights sum to 100% and red otherwise, with a precise 'X off' hint. Each row also displays a tone-coded dot for visual differentiation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Variant picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · type weights · totals update</span>
        <div className={styles.demoSplit}>
          <VariantPicker
            label="quote-instant-pricing variants"
            variants={[
              {
                id: "control",
                name: "Control",
                description: "Save-then-price (current behaviour).",
                weight: 50,
                tone: "teal",
              },
              {
                id: "live",
                name: "Live preview",
                description: "Recalculate on each line edit.",
                weight: 50,
                tone: "amber",
              },
            ]}
          />
          <VariantPicker
            label="parts-3d-viewer variants"
            variants={[
              {
                id: "flat",
                name: "Flat",
                description: "Existing image carousel.",
                weight: 60,
                tone: "teal",
              },
              {
                id: "viewer",
                name: "3D viewer",
                description: "GLB-backed WebGL viewer.",
                weight: 25,
                tone: "amber",
              },
              {
                id: "ar",
                name: "AR overlay",
                description: "Phone camera + WebXR overlay.",
                weight: 15,
                tone: "red",
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
