import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ClockInOutWidget } from "../../components/roster/clock-in-out-widget"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Clock in/out widget | Roster",
}

export default function ClockInOutPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.05 / Roster"
        title="Clock in/out widget"
        description="The on-floor time clock — big clock-in / clock-out buttons, elapsed shift readout, and a live break tracker."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Clock in/out widget" },
        ]}
      />
      <section className={styles.canvas}>
        <ClockInOutWidget
          initialState="clocked-in"
          elapsedLabel="06:42"
          breakLabel="12 of 30 min"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            role=&quot;status&quot; with aria-live=&quot;polite&quot; so the
            elapsed time updates announce to screen readers without
            interrupting. The button row swaps between clock-in and the
            break+clock-out pair based on internal state.
          </p>
        </div>
      </section>
    </main>
  )
}
