import type { Metadata } from "next"

import { RsvpCard } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import {
  SCHEDULED_DPF_QA,
  SCHEDULED_DYNO_TUESDAY,
  SCHEDULED_MANTA_LAUNCH,
} from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "RSVP card | Live broadcast",
  description:
    "Primitive 03 — RSVP card with calendar add, 30-minute reminder toggle, share, going-state, and countdown banner.",
}

export default function RsvpCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / RSVP card"
        title="RSVP card"
        description="Promotional card asking the viewer to RSVP to an upcoming workshop broadcast. Includes calendar add, reminder toggle, share, and a going-state when the viewer has already RSVP'd."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "RSVP card" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoDouble].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Fresh card · not RSVP&rsquo;d · no reminder</span>
          <RsvpCard broadcast={SCHEDULED_DYNO_TUESDAY} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>RSVP&rsquo;d + reminder set · imminent countdown</span>
          <RsvpCard
            broadcast={SCHEDULED_MANTA_LAUNCH}
            reminderInitial
            countdownLabel="2h 14m"
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Distant broadcast · long countdown</span>
          <RsvpCard
            broadcast={SCHEDULED_DPF_QA}
            countdownLabel="21d 04h"
          />
        </div>
      </section>
    </main>
  )
}
