import type { Metadata } from "next"

import { HypothesisStatementCard } from "../../components/experiments"
import { PageHeader } from "../../components/page-header"

import styles from "../experiments.module.css"

export const metadata: Metadata = {
  title: "Hypothesis statement | Experiments",
  description:
    "Primitive 02 — chip-pickable Because/We believe/Will cause/Measured by/Of at least hypothesis editor.",
}

export default function HypothesisStatementScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Editor"
        title="Hypothesis statement editor"
        description="Enforces a falsifiable hypothesis sentence — Because [observation] we believe [change] will cause [outcome] measured by [metric] of at least [threshold]. Each clause is a chip-pickable swap so the test of record is structured and reviewable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Experiments", href: "/ui-primitives/experiments" },
          { label: "Hypothesis statement" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · click any chunk to swap</span>
        <HypothesisStatementCard
          observations={[
            { id: "o1", label: "70% of quotes are saved before pricing" },
            { id: "o2", label: "Parts page bounces at 62% on mobile" },
            { id: "o3", label: "Bay utilisation drops on Wednesdays" },
          ]}
          changes={[
            { id: "c1", label: "Inline live pricing on quote build" },
            { id: "c2", label: "Replace carousel with 3D GLB viewer" },
            { id: "c3", label: "Surface realtime bay tile in hero" },
          ]}
          outcomes={[
            { id: "out1", label: "More quotes converted to bookings" },
            { id: "out2", label: "More parts added to active quotes" },
            { id: "out3", label: "More same-day Wed bookings" },
          ]}
          metrics={[
            { id: "m1", label: "Quote → booking conversion rate" },
            { id: "m2", label: "AUD ARPV per quote" },
            { id: "m3", label: "Booking completion rate" },
          ]}
          thresholds={[
            { id: "t1", label: "+8% relative" },
            { id: "t2", label: "+$45 AUD ARPV" },
            { id: "t3", label: "+12% relative" },
          ]}
          defaultValue={{
            observationId: "o1",
            changeId: "c1",
            outcomeId: "out1",
            metricId: "m1",
            thresholdId: "t1",
          }}
        />
      </section>
    </main>
  )
}
