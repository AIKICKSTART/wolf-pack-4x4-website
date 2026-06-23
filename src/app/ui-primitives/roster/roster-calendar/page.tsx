import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RosterCalendarOverlay } from "../../components/roster/roster-calendar-overlay"
import {
  BAY_AVAILABILITY,
  COVERAGE,
  REF_TODAY,
  TECH_TINTS,
  WEEK_EVENTS,
} from "../roster-mock"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Roster calendar overlay | Roster",
}

export default function RosterCalendarPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.07 / Roster"
        title="Roster calendar overlay"
        description="Week calendar with technician-tinted shift blocks and a per-day coverage strip stacked above the grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Roster calendar overlay" },
        ]}
      />
      <section className={styles.canvas}>
        <RosterCalendarOverlay
          reference={REF_TODAY}
          today={REF_TODAY}
          events={WEEK_EVENTS}
          technicians={TECH_TINTS}
          coverage={COVERAGE}
          bays={BAY_AVAILABILITY}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Coverage strip up top reveals Wed and Thu are below quota. Each
            shift block uses the technician tone, the legend keys them by
            name, and the bay availability rows below close the loop on the
            physical floor.
          </p>
        </div>
      </section>
    </main>
  )
}
