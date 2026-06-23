import type { Metadata } from "next"

import { EarlyStoppingCard } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Early stopping card | A/B runtime",
  description:
    "Primitive 10 — early-stopping rules card with futility, superiority, guardrail and max-duration states.",
}

export default function EarlyStoppingCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Stop rules"
        title="Early stopping card"
        description="Defines and exposes the early-stopping ladder. Each rule has a label, a threshold, a state (off / armed / triggered) and a detail line that explains the current evidence."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Early stopping card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Quote PDF redesign</span>
        <EarlyStoppingCard
          title="Stopping rules"
          minSamplesPerArm={10_000}
          rules={[
            {
              id: "superiority",
              kind: "superiority",
              threshold: "Posterior P(treatment beats control) ≥ 0.97",
              state: "armed",
              detail: "Currently 0.94 · 6 days to projected fire",
            },
            {
              id: "futility",
              kind: "futility",
              threshold: "Posterior P(lift < +1%) ≥ 0.90",
              state: "off",
              detail: "Posterior 0.04 — no futility signal",
            },
            {
              id: "guardrail",
              kind: "guardrail",
              threshold: "Quote PDF download rate drop > 5 pp",
              state: "triggered",
              detail: "PDF downloads fell 6.2 pp — guardrail tripped",
            },
            {
              id: "max-duration",
              kind: "max-duration",
              threshold: "Max 28 days",
              state: "off",
              detail: "Day 14 of 28",
            },
          ]}
        />
      </section>
    </main>
  )
}
