import type { Metadata } from "next"

import { AllocationSlider } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Allocation slider | A/B runtime",
  description:
    "Primitive 04 — variant traffic allocation slider with live percent total + stacked allocation bar.",
}

export default function AllocationSliderScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Allocation"
        title="Allocation slider"
        description="Per-arm allocation slider with a live stacked bar and a must-sum-to-100 indicator. Pulls the same arm tone vocabulary as the dashboard card and chips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Allocation slider" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign · 3-arm</span>
        <AllocationSlider
          arms={[
            { id: "control", name: "Legacy PDF", tone: "neutral" },
            { id: "treatment-a", name: "Brand header v2", tone: "teal" },
            { id: "treatment-b", name: "Brand header + price callout", tone: "amber" },
          ]}
          defaultAllocations={{
            control: 40,
            "treatment-a": 30,
            "treatment-b": 30,
          }}
        />
      </section>
    </main>
  )
}
