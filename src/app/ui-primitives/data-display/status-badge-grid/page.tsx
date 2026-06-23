import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StatusBadgeGrid } from "../../components/data-display"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Status badge grid | UI Primitives — Data display",
}

const workshopBadges = [
  { tone: "info" as const, label: "Booked" },
  { tone: "success" as const, label: "Complete" },
  { tone: "warn" as const, label: "On hold" },
  { tone: "error" as const, label: "Recalled" },
  { tone: "neutral" as const, label: "Draft" },
  { tone: "brand" as const, label: "VIP" },
]

export default function StatusBadgeGridShowcase() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.06 / Data display"
        title="Status badge grid — full catalogue"
        description="Every supported badge style as a single reference surface. Six tones × three sizes × three shapes, all driven by tokens."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Status badge grid" },
        ]}
      />
      <section className={styles.canvas}>
        <StatusBadgeGrid badges={workshopBadges} />
        <div className={styles.note}>
          <span>Reference</span>
          <p>
            Pull the individual StatusBadge primitive directly from the data-display barrel when
            embedding a single badge inside another surface (table cell, kanban card, etc.).
          </p>
        </div>
      </section>
    </main>
  )
}
