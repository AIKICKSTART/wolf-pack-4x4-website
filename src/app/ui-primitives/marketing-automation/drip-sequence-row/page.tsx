import type { Metadata } from "next"

import { DripSequenceRow } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { DEMO_DRIP_ROWS } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Drip sequence row | Marketing automation",
  description:
    "Primitive 03 — single drip step row with delay chip, open / click metrics and status indicator. Used inside drip-cadence editors.",
}

export default function DripSequenceRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Drip sequence row"
        title="Drip sequence row"
        description="Single step in a drip cadence — channel + delay + preview + Open/Click metrics + status chip. Composed into the full orchestrator's cadence editor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Drip sequence row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Quote-recovery cadence (live)</h2>
        <div className={styles.demoStack}>
          {DEMO_DRIP_ROWS.slice(0, 3).map((step, idx) => (
            <DripSequenceRow
              key={step.id}
              index={idx + 1}
              channel={step.channel}
              title={step.title}
              preview={step.preview}
              delayLabel={step.delayLabel}
              openRate={step.openRate}
              clickRate={step.clickRate}
              status={step.status}
              predicate={step.predicate}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Paused + draft tail</h2>
        <div className={styles.demoStack}>
          {DEMO_DRIP_ROWS.slice(3).map((step, idx) => (
            <DripSequenceRow
              key={step.id}
              index={idx + 4}
              channel={step.channel}
              title={step.title}
              preview={step.preview}
              delayLabel={step.delayLabel}
              openRate={step.openRate}
              clickRate={step.clickRate}
              status={step.status}
              predicate={step.predicate}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Minimal (no metrics yet)</h2>
        <div className={styles.demoStack}>
          <DripSequenceRow
            index={1}
            channel="webhook"
            title="Push to HubSpot · lapsed-warm tag"
            delayLabel="Immediately"
            status="draft"
          />
          <DripSequenceRow
            index={2}
            channel="voice"
            title="Call back · workshop lead"
            delayLabel="Day 2, 11:00am"
            status="draft"
            predicate="lead_score >= 80"
          />
        </div>
      </section>
    </main>
  )
}
