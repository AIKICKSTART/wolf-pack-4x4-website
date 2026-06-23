import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TicketPriorityChip } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "Ticket priority chip | Support",
  description:
    "Primitive 02 — compact priority chip with tone and a pulsing dot on P0 critical.",
}

export default function TicketPriorityChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Chip"
        title="Ticket priority chip"
        description="P0 Critical, P1 High, P2 Normal, P3 Low. Tone scales with severity. P0 carries a slow pulse so it stays visible without becoming theatrical. Short variant for dense rows, long variant for headers and read-only labels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "Priority chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Short variant · row-dense</span>
        <div className={styles.demoRow}>
          <TicketPriorityChip priority="p0" />
          <TicketPriorityChip priority="p1" />
          <TicketPriorityChip priority="p2" />
          <TicketPriorityChip priority="p3" />
        </div>
        <span className={styles.demoLabel}>Long variant · header / detail use</span>
        <div className={styles.demoRow}>
          <TicketPriorityChip priority="p0" variant="long" />
          <TicketPriorityChip priority="p1" variant="long" />
          <TicketPriorityChip priority="p2" variant="long" />
          <TicketPriorityChip priority="p3" variant="long" />
        </div>
      </section>
    </main>
  )
}
