import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../calendar.module.css"
import { TimePickerShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Time picker | UI Primitives — Calendar",
}

export default function CalendarTimePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.07 / Calendar"
        title="Time picker — drop-off & pickup"
        description="Scrollable hour and minute columns with a 12h/24h toggle. Arrow keys walk options inside each column; Enter selects."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Time picker" },
        ]}
      />
      <section className={styles.canvas}>
        <TimePickerShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The 24h display renders zero-padded hours (00–23). The 12h display
            renders 1–12 with explicit AM/PM chips so it can express both 12:00 AM
            and 12:00 PM without ambiguity. Hour selection in 12h mode preserves the
            current half-of-day; flipping AM/PM is a separate action.
          </p>
        </div>
      </section>
    </main>
  )
}
