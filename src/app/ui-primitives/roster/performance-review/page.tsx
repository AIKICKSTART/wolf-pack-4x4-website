import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PerformanceReviewRow } from "../../components/roster/performance-review-row"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Performance review row | Roster",
}

export default function PerformanceReviewPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.13 / Roster"
        title="Performance review row"
        description="Roster row primitive — technician, last review date, rating chip, open-for-review CTA. Stack them in a list for the review backlog."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Performance review row" },
        ]}
      />
      <section className={styles.canvas}>
        <ul className={styles.reviewList} role="list" aria-label="Performance review backlog">
          <PerformanceReviewRow
            technicianName="Trent Williams"
            role="Senior Technician"
            lastReviewDate="14 Feb 2026"
            rating="exceeds"
            avatarTone="green"
          />
          <PerformanceReviewRow
            technicianName="Sophie Tan"
            role="Workshop Manager"
            lastReviewDate="03 Mar 2026"
            rating="meets"
            avatarTone="amber"
          />
          <PerformanceReviewRow
            technicianName="Jordan Pace"
            role="Apprentice Y3"
            lastReviewDate="22 Apr 2026"
            rating="developing"
            avatarTone="teal"
          />
          <PerformanceReviewRow
            technicianName="Bec Lawson"
            role="Front Desk"
            lastReviewDate="11 Jan 2026"
            rating="needs-attention"
            avatarTone="red"
          />
        </ul>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each row uses the Avatar primitive on the left and a Chip for the
            rating. The open-for-review CTA tints amber on hover so it stands
            out from neutral list rows.
          </p>
        </div>
      </section>
    </main>
  )
}
