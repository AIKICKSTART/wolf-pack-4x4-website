import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TrainingSessionCard } from "../../components/roster/training-session-card"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Training session card | Roster",
}

export default function TrainingSessionPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.12 / Roster"
        title="Training session card"
        description="Upcoming training session — topic, trainer, date, attendees, materials. Slots into the floor briefing slot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Training session card" },
        ]}
      />
      <section className={styles.canvas}>
        <TrainingSessionCard
          topic="TIG cert refresher"
          trainer="Sophie Tan · Workshop Manager"
          dateLabel="Wed 12 Jun · 14:00 – 15:30"
          attendeeCount={4}
          capacity={6}
          detail="Refresh ahead of the audit window — Trent leads the practical block, Sophie covers documentation."
          materials={[
            { label: "TIG cert pack (PDF)", href: "#tig-cert-pack" },
            { label: "Welding torch SOP", href: "#torch-sop" },
            { label: "Audit log entry", href: "#audit-log" },
          ]}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            DashboardCard up top carries the topic + date. The body adds the
            attendee chip, a one-line detail, and a stacked materials list with
            link affordances and focus rings.
          </p>
        </div>
      </section>
    </main>
  )
}
