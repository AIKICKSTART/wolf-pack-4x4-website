import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BayAssignmentGrid } from "../../components/roster/bay-assignment-grid"
import { BAY_ASSIGNMENTS } from "../roster-mock"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Bay assignment grid | Roster",
}

export default function BayAssignmentGridPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.09 / Roster"
        title="Bay assignment grid"
        description="Bays 1–4 across the working day with the assigned technician chip per hour cell — empty cells stand out for quick gap-spotting."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Bay assignment grid" },
        ]}
      />
      <section className={styles.canvas}>
        <BayAssignmentGrid rows={BAY_ASSIGNMENTS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            role=&quot;grid&quot; on the matrix, each cell carries an aria-label
            of the form &quot;Bay 2 at 13:00 — Sophie Tan&quot;. Empty cells
            tone down to the muted dash so the eye lands on where assignment
            still needs to happen.
          </p>
        </div>
      </section>
    </main>
  )
}
