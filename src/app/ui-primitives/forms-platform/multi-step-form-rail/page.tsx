import type { Metadata } from "next"

import { MultiStepFormRail } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { WIZARD_STEPS } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Multi-step form rail | Forms platform",
  description:
    "Primitive 08 — the multi-step wizard rail with per-step progress, current ring, and overall percent.",
}

export default function MultiStepFormRailScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Multi-step form rail"
        title="Multi-step form rail"
        description="Five-step Book-a-Service wizard. Steps 1 and 2 are complete, step 3 is current at 60%, the deposit-payment step and review step are upcoming. The overall percent in the header is derived from the per-step states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Multi-step form rail" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Book-a-Service wizard
        </span>
        <MultiStepFormRail
          title="Book a Service · 5 steps"
          steps={WIZARD_STEPS}
        />
      </section>
    </main>
  )
}
