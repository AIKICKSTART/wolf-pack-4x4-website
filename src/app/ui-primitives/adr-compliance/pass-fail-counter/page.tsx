import type { Metadata } from "next"

import { PassFailCounter } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Pass / fail counter | ADR compliance",
  description:
    "Primitive 10 — workshop pass / fail counter with today / week / month aggregates and a pass-rate radial meter.",
}

export default function PassFailCounterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Aggregate"
        title="Pass / fail counter"
        description="Composes MetricBlock + RadialMeter. Surfaces today / week / month aggregate volumes and a leading pass-rate radial meter — useful for the workshop foreman’s morning huddle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Pass / fail counter" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live counter</span>
        <PassFailCounter
          windows={[
            { label: "Today", passed: 12, failed: 1 },
            { label: "Week", passed: 64, failed: 4 },
            { label: "Month", passed: 248, failed: 18 },
          ]}
        />
      </section>
    </main>
  )
}
