import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { OvertimeTallyChip } from "../../components/roster/overtime-tally-chip"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Overtime tally chip | Roster",
}

export default function OvertimeTallyPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.11 / Roster"
        title="Overtime tally chip"
        description="Hours this week + hours this month against the agreed cap — green well below, amber approaching, red when breached."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Overtime tally chip" },
        ]}
      />
      <section className={styles.canvas}>
        <OvertimeTallyChip
          weekHours={8.5}
          monthHours={32.0}
          weekThreshold={10}
          monthThreshold={30}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Once either tally crosses its cap the wrapper switches to
            role=&quot;alert&quot; so the screen reader announces the breach.
            Here the month tally is over — week is still under but close enough
            to bring amber.
          </p>
        </div>
      </section>
    </main>
  )
}
