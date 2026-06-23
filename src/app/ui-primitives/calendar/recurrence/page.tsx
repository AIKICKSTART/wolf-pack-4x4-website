import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../calendar.module.css"
import { RecurrenceShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Recurrence picker | UI Primitives — Calendar",
}

export default function CalendarRecurrencePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.09 / Calendar"
        title="Recurrence picker — repeating ADR checks"
        description="Every-N days/weeks/months with weekday chips, monthly day-of-month entry, and end conditions: never, on date, or after N occurrences. Used to schedule ADR rechecks, supplier ledgers, and stocktake jobs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Recurrence picker" },
        ]}
      />
      <section className={styles.canvas}>
        <RecurrenceShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Frequency drives which sub-control appears. Weekly exposes weekday
            chips; monthly exposes a day-of-month number input. End-condition radios
            render their own inline input — date picker for on-date, number stepper
            for after-N occurrences. Switching radios preserves the previous value
            of each branch.
          </p>
        </div>
      </section>
    </main>
  )
}
