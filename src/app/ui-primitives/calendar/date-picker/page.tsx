import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../calendar.module.css"
import { DatePickerShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Mini date picker | UI Primitives — Calendar",
}

export default function CalendarDatePickerPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.05 / Calendar"
        title="Mini date picker — booking slot"
        description="Compact month picker for booking forms. Arrow keys move the focus cell, Enter selects, Escape blurs. Today shows an amber ring; selected pops red."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Mini date picker" },
        ]}
      />
      <section className={styles.canvas}>
        <DatePickerShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Keyboard navigation: arrow keys move the focus cell across days and rows
            (with month rollover), Enter or Space selects, Escape blurs. The selected
            date persists across month changes; the today ring tracks the runtime
            reference passed via prop.
          </p>
        </div>
      </section>
    </main>
  )
}
