import type { Metadata } from "next"

import { GoalFunnelCard } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { DYNO_BOOKING_FUNNEL } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Goal funnel card | Marketing automation",
  description:
    "Primitive 08 — single-goal funnel with conversion rate, per-step drop-off and monetary value.",
}

const QUOTE_TO_FIT_FUNNEL = [
  { id: "f1", label: "Quote requested", count: 4120 },
  { id: "f2", label: "Quote viewed", count: 2680 },
  { id: "f3", label: "Cat-back configured", count: 940 },
  { id: "f4", label: "Fit booked", count: 308 },
]

const TINY_FUNNEL = [
  { id: "s1", label: "Site visit", count: 120 },
  { id: "s2", label: "Booking confirmed", count: 6 },
]

export default function GoalFunnelCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Goal funnel card"
        title="Goal funnel card"
        description="Single goal funnel — top of funnel is the inbound signal, bottom is the conversion event. Each step shows the absolute count, the cumulative bar and the drop-off vs the previous step."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Goal funnel card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Quote → Bay 2 dyno booking</h2>
        <GoalFunnelCard
          goalName="Bay 2 dyno session"
          description="Quote requested → Bay 2 booking confirmed within 14 days."
          steps={DYNO_BOOKING_FUNNEL}
          averageValue={420}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Quote → Manta cat-back fitting</h2>
        <GoalFunnelCard
          goalName="Manta cat-back fitting"
          description="Quote requested → cat-back configured → fit confirmed."
          steps={QUOTE_TO_FIT_FUNNEL}
          averageValue={1840}
          tone="amber"
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Tiny conversion (long tail)</h2>
        <GoalFunnelCard
          goalName="Website visitor → booking"
          description="Generic site→booking. Most signals never click through."
          steps={TINY_FUNNEL}
          averageValue={520}
        />
      </section>
    </main>
  )
}
