import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../calendar.module.css"
import { DateRangeShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Date range picker | UI Primitives — Calendar",
}

export default function CalendarDateRangePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.06 / Calendar"
        title="Date range picker — reporting window"
        description="Side-by-side two-month picker with preset chips: Today, Yesterday, Last 7 days, This month, Last month, Custom. Used for invoice ranges, parts forecasting, and reporting filters."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Date range picker" },
        ]}
      />
      <section className={styles.canvas}>
        <DateRangeShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            First click sets the start. Second click sets the end and emits onChange
            with a normalised range — order does not matter, the picker swaps the
            ends if needed. Selecting any preset both fires onChange and re-pivots
            the dual-month view to the new range start.
          </p>
        </div>
      </section>
    </main>
  )
}
