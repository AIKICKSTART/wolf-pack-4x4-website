import type { Metadata } from "next"

import { ScheduleCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import {
  SCHEDULED_DPF_QA,
  SCHEDULED_DYNO_TUESDAY,
  SCHEDULED_MANTA_LAUNCH,
} from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Schedule card | Live broadcast",
  description:
    "Primitive 04 — upcoming broadcast tile with countdown, host badge, RSVP count, and add-to-calendar action.",
}

export default function ScheduleCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Schedule card"
        title="Schedule card"
        description="Compact tile used in the schedule rail and broadcast roundup. The next-up state lifts the card with a glow to distinguish it from later sessions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Schedule card" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Up next · highlighted</span>
          <ScheduleCard
            broadcast={SCHEDULED_DYNO_TUESDAY}
            countdownLabel="3d 21h"
            isNextUp
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Standard · 2 weeks out</span>
          <ScheduleCard
            broadcast={SCHEDULED_MANTA_LAUNCH}
            countdownLabel="14d 02h"
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Standard · 3 weeks out</span>
          <ScheduleCard
            broadcast={SCHEDULED_DPF_QA}
            countdownLabel="21d 04h"
          />
        </div>
      </section>
    </main>
  )
}
