import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../calendar.module.css"
import { TimeRangeShowcase } from "./showcase"

export const metadata: Metadata = {
  title: "Time range picker | UI Primitives — Calendar",
}

export default function CalendarTimeRangePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14.08 / Calendar"
        title="Time range picker — bay hours"
        description="From / To time pickers stitched into one panel with a live duration readout. When To is not after From, the duration block flips to a red invalid state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Calendar", href: "/ui-primitives/calendar" },
          { label: "Time range picker" },
        ]}
      />
      <section className={styles.canvas}>
        <TimeRangeShowcase />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The picker emits onChange whenever either end moves. Validation is
            purely visual — the duration footer goes red and the arrow goes red
            when the range is invalid. Submission gates live in the consuming form.
          </p>
        </div>
      </section>
    </main>
  )
}
