import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LunchBreakTracker } from "../../components/roster/lunch-break-tracker"
import { BREAKS } from "../roster-mock"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Lunch break tracker | Roster",
}

export default function LunchBreakPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.10 / Roster"
        title="Lunch break tracker"
        description="Per-technician break in progress with minutes remaining and an extend-break CTA when the floor needs flex."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Lunch break tracker" },
        ]}
      />
      <section className={styles.canvas}>
        <LunchBreakTracker rows={BREAKS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            ProgressLinear renders the consumed minutes; the right-side chip
            colour tracks how close to the cap they are. Trent is amber
            (2 min remaining), Jordan teal, Bec has used her full
            allowance.
          </p>
        </div>
      </section>
    </main>
  )
}
