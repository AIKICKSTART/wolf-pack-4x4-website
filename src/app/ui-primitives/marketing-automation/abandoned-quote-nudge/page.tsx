import type { Metadata } from "next"

import { AbandonedQuoteNudge } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { DEMO_ABANDONED_NUDGE } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Abandoned quote nudge | Marketing automation",
  description:
    "Primitive 06 — quote-abandonment recovery card with the SMS / email / call cadence and incentive footnote.",
}

const HIGH_VALUE_NUDGE = [
  {
    id: "hv1",
    waitLabel: "+15 min",
    channel: "voice" as const,
    title: "Workshop lead calls back · personalised",
    status: "sent" as const,
  },
  {
    id: "hv2",
    waitLabel: "+1 hr",
    channel: "sms" as const,
    title: "Locking in your dyno tune?",
    status: "sent" as const,
  },
  {
    id: "hv3",
    waitLabel: "Day 2",
    channel: "email" as const,
    title: "Bay 2 hours · personalised booking link",
    status: "queued" as const,
  },
]

const DRAFT_NUDGE = [
  {
    id: "dr1",
    waitLabel: "+2 hr",
    channel: "sms" as const,
    title: "Quick reminder · save your build",
    status: "queued" as const,
  },
]

export default function AbandonedQuoteNudgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Abandoned quote nudge"
        title="Abandoned quote nudge"
        description="Recovery card fired by the quote-abandonment trigger. Shows the SMS → email → call cadence, current incentive, and per-step status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Abandoned quote nudge" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Standard recovery cadence</h2>
        <AbandonedQuoteNudge
          reference="QT-2026-04193"
          amount={2840}
          abandonedAt="32 min ago · Mon 6:42pm"
          schedule={DEMO_ABANDONED_NUDGE}
          incentive="Free roadworthy with service booked in 7 days"
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · High-value VIP cadence</h2>
        <AbandonedQuoteNudge
          reference="QT-2026-04201"
          amount={8200}
          abandonedAt="6 min ago · Tue 11:18am"
          schedule={HIGH_VALUE_NUDGE}
          incentive="Free dyno baseline run + complimentary Manta cap"
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Draft cadence (1 step queued)</h2>
        <AbandonedQuoteNudge
          reference="QT-2026-04215"
          amount={920}
          abandonedAt="Pending review"
          schedule={DRAFT_NUDGE}
          incentive="10% off cat-back fit booked within 14 days"
        />
      </section>
    </main>
  )
}
