"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { StepConfigPane, type StepConfig } from "../../components/product-tours"
import { SAMPLE_STEP_CONFIG } from "../fixtures"

import styles from "../product-tours.module.css"

export default function StepConfigPaneScenePage() {
  const [step, setStep] = useState<StepConfig>(SAMPLE_STEP_CONFIG)
  const [stepTwo, setStepTwo] = useState<StepConfig>({
    ...SAMPLE_STEP_CONFIG,
    id: "qs5",
    index: 5,
    total: 6,
    shape: "tooltip",
    title: "Lock in price + book bay",
    body:
      "Locked-in prices hold for 14 days. Tap a bay to reserve it — Stuart confirms by SMS within the hour.",
    primaryLabel: "Book a bay",
    direction: "right",
    align: "start",
    delayMs: 1500,
    skippable: false,
    tone: "green",
  })

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Step inspector"
        title="Step config pane"
        description="Right-side inspector for the selected step. Target selector, body copy, direction/align, auto-advance delay, and a skip toggle — wired to local state so you can edit them live."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Step config pane" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Spotlight step · skippable</span>
          <StepConfigPane
            step={step}
            onChange={(patch) => setStep((prev) => ({ ...prev, ...patch }))}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Tooltip step · auto-advance</span>
          <StepConfigPane
            step={stepTwo}
            onChange={(patch) => setStepTwo((prev) => ({ ...prev, ...patch }))}
          />
        </section>
      </div>
    </main>
  )
}
