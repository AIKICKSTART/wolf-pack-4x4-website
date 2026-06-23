import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CoverageGapWarning } from "../../components/roster/coverage-gap-warning"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Coverage gap warning | Roster",
}

export default function CoverageGapPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.08 / Roster"
        title="Coverage gap warning"
        description="A specific window of the week where required hours exceed actual rostered hours, calling for the manager's attention."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Coverage gap warning" },
        ]}
      />
      <section className={styles.canvas}>
        <CoverageGapWarning
          window="Thu 5 Jun · 13:00 – 16:00"
          actualHours={6}
          requiredHours={12}
          detail="Bay 2 + Bay 3 both unstaffed for the post-lunch block. Customer drop-offs for Hilux N80 and Patrol Y62 already booked into that window."
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            role=&quot;alert&quot; on the wrapper so screen readers announce it
            on entry. The DashboardCard primitive carries the headline gap
            number, the chip row underneath quantifies required vs actual, and
            assign-cover routes back to the bay assignment grid.
          </p>
        </div>
      </section>
    </main>
  )
}
