import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StepProgressDots } from "../../components/product-tours"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Step progress dots | Product tours",
  description:
    "Primitive 12 — end-user progress indicator for an active tour: dots, bars, or counter variants.",
}

export default function StepProgressDotsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Progress"
        title="Step progress dots"
        description="The end-user-facing progress indicator inside an active tour. Dots for compact bars, bars for explicit weight, counter for noisy tours."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Step progress dots" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Dots · 4 / 6 — teal</span>
        <div className={styles.demoInline}>
          <StepProgressDots currentStep={4} totalSteps={6} variant="dots" tone="teal" />
          <StepProgressDots currentStep={2} totalSteps={6} variant="dots" tone="violet" />
          <StepProgressDots currentStep={6} totalSteps={6} variant="dots" tone="green" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bars · 3 / 5 — amber</span>
        <div className={styles.demoInline}>
          <StepProgressDots currentStep={3} totalSteps={5} variant="bars" tone="amber" />
          <StepProgressDots currentStep={1} totalSteps={4} variant="bars" tone="teal" />
          <StepProgressDots currentStep={5} totalSteps={5} variant="bars" tone="green" />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Counter · 02 / 12 — neutral</span>
        <div className={styles.demoInline}>
          <StepProgressDots currentStep={2} totalSteps={12} variant="counter" />
          <StepProgressDots currentStep={7} totalSteps={12} variant="counter" tone="violet" />
          <StepProgressDots currentStep={12} totalSteps={12} variant="counter" tone="green" />
        </div>
      </section>
    </main>
  )
}
