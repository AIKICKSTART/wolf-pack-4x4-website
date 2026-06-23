import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { EscalationQueueCard } from "../../components/hermes-agent"
import type { EscalationQueueItem } from "../../components/hermes-agent"

import { HERMES_ESCALATIONS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Escalation queue card | Hermes",
  description:
    "Primitive 13 — Hermes escalation queue with priority lane badge, reason and handler assignment.",
}

const EMPTY_QUEUE: ReadonlyArray<EscalationQueueItem> = []

const SINGLE_P1: ReadonlyArray<EscalationQueueItem> = HERMES_ESCALATIONS.slice(0, 1)

export default function EscalationQueueCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Queue"
        title="Escalation queue card"
        description="The Hermes escalation queue — every active escalation lane with a coloured priority badge (P1 critical → P4 routine), the reason Hermes routed it out, the assigned human handler and the time waiting. Summary strip shows open + breached + resolved counts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Escalation queue card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · mixed lanes</span>
        <EscalationQueueCard
          title="Open escalations"
          items={HERMES_ESCALATIONS}
          counts={{ open: 4, breached: 1, resolved24h: 18 }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · single P1</span>
        <EscalationQueueCard
          title="P1 stack"
          items={SINGLE_P1}
          counts={{ open: 1, breached: 0, resolved24h: 4 }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · queue clear</span>
        <EscalationQueueCard
          title="Open escalations"
          items={EMPTY_QUEUE}
          counts={{ open: 0, breached: 0, resolved24h: 22 }}
        />
      </section>
    </main>
  )
}
