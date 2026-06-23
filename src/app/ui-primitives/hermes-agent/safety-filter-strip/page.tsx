import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SafetyFilterStrip } from "../../components/hermes-agent"
import type { SafetyFilterStep } from "../../components/hermes-agent"

import { HERMES_FILTERS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Safety filter strip | Hermes",
  description:
    "Primitive 11 — Hermes pre + post moderation filter chain with hit counts and pass-through rates.",
}

const ALERT_FILTERS: ReadonlyArray<SafetyFilterStep> = [
  {
    id: "a1",
    name: "PII redactor",
    phase: "pre",
    hits24h: 612,
    inspected24h: 1846,
    detail: "Spike in ABNs leaked from supplier feed.",
    tone: "amber",
  },
  {
    id: "a2",
    name: "Profanity & abuse",
    phase: "pre",
    hits24h: 84,
    inspected24h: 1846,
    detail: "Heatwave + DM raid · sweep harder.",
    tone: "red",
  },
  {
    id: "a3",
    name: "Out-of-scope advice",
    phase: "post",
    hits24h: 48,
    inspected24h: 1742,
    detail: "Customers asking for engineer sign-off · refuse + escalate.",
    tone: "red",
  },
]

const QUIET_FILTERS: ReadonlyArray<SafetyFilterStep> = HERMES_FILTERS.map(
  (filter) => ({
    ...filter,
    hits24h: Math.round(filter.hits24h * 0.18),
    tone: "green",
  }),
)

export default function SafetyFilterStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Filters"
        title="Safety filter strip"
        description="The Hermes moderation chain — pre-input PII + profanity, post-output grounding + out-of-scope + tone moderation. Each filter shows 24-hour hits, inspection rate and a per-filter pass-through chip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Safety filter strip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · steady-state · all clear</span>
        <SafetyFilterStrip
          filters={HERMES_FILTERS}
          totalInspected={1846}
          totalBlocked={52}
          totalEscalated={18}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State B · alert · spike across pre + post
        </span>
        <SafetyFilterStrip
          filters={ALERT_FILTERS}
          totalInspected={1846}
          totalBlocked={744}
          totalEscalated={56}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          State C · sunday quiet · single-digit hits
        </span>
        <SafetyFilterStrip
          filters={QUIET_FILTERS}
          totalInspected={184}
          totalBlocked={6}
          totalEscalated={1}
        />
      </section>
    </main>
  )
}
