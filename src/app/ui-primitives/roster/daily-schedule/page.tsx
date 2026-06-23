import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DailyScheduleStrip } from "../../components/roster/daily-schedule-strip"
import { TRENT_DAY } from "../roster-mock"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Daily schedule strip | Roster",
}

export default function DailySchedulePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.02 / Roster"
        title="Daily schedule strip"
        description="Horizontal day strip — a single technician's blocks across the working day, colour-coded by kind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Daily schedule strip" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stripGroup}>
          <DailyScheduleStrip
            technician="Trent Williams · Senior Tech"
            blocks={TRENT_DAY}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each block uses the EventCard primitive in compact mode. Job blocks
            tinted red, breaks amber, training teal, travel neutral. The whole
            strip scroll-snaps horizontally on small screens so the floor lead
            can swipe the day.
          </p>
        </div>
      </section>
    </main>
  )
}
