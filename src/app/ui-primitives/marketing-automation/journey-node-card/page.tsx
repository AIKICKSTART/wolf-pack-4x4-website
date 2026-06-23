import type { Metadata } from "next"

import { JourneyNodeCard } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { ConfigurableJourneyNodeDemos } from "../_interactive-demos"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Journey node card | Marketing automation",
  description:
    "Primitive 02 — single trigger / wait / condition / action / goal / exit node card with title, subtitle, configure CTA and active highlight.",
}

export default function JourneyNodeCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Journey node card"
        title="Journey node card"
        description="Single node used by the journey canvas. Each kind has a glyph, tone and accent — trigger amber, wait neutral, condition teal, action green, goal amber, exit red."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Journey node card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Trigger / wait / condition</h2>
        <div className={styles.variantGrid}>
          <JourneyNodeCard
            kind="trigger"
            title="Quote abandoned"
            subtitle="Workshop form webhook"
            active
          />
          <JourneyNodeCard
            kind="wait"
            title="Wait 24 hours"
            subtitle="Reduce SMS fatigue"
          />
          <JourneyNodeCard
            kind="condition"
            title="Opened welcome email?"
            subtitle="Branch: yes / no / fallback"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Action / goal / exit</h2>
        <ConfigurableJourneyNodeDemos />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Compact stack (canvas inline)</h2>
        <div className={styles.variantGrid}>
          <JourneyNodeCard kind="trigger" title="New lead created" />
          <JourneyNodeCard kind="wait" title="Wait 5 min" />
          <JourneyNodeCard kind="action" title="Email welcome" active />
        </div>
      </section>
    </main>
  )
}
