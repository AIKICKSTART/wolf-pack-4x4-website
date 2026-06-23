import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TechnicianProfileCard } from "../../components/roster/technician-profile-card"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Technician profile card | Roster",
}

export default function TechnicianProfilePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.01 / Roster"
        title="Technician profile card"
        description="The crew member at a glance — photo, name, role, certifications, today's bays, and live shift status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Technician profile card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.profileStack}>
          <TechnicianProfileCard
            name="Trent Williams"
            role="Senior Technician"
            avatarTone="green"
            meta="12 yrs at Oak Flats · diag specialist"
            certifications={[
              { label: "TIG · Master", tone: "green" },
              { label: "MIG · Master", tone: "green" },
              { label: "ADR sound", tone: "teal" },
              { label: "OH&S", tone: "amber" },
            ]}
            bays={["bay-1", "bay-2"]}
            status="on-shift"
          />
          <TechnicianProfileCard
            name="Jordan Pace"
            role="Apprentice Y3"
            avatarTone="teal"
            meta="Apprenticeship · 18 mo logged"
            certifications={[
              { label: "TIG · Competent", tone: "teal" },
              { label: "MIG · Competent", tone: "teal" },
              { label: "Forklift · Novice", tone: "neutral" },
            ]}
            bays={["bay-3"]}
            status="training"
          />
          <TechnicianProfileCard
            name="Sophie Tan"
            role="Workshop Manager"
            avatarTone="amber"
            meta="Floor coordinator · Bay rotation lead"
            certifications={[
              { label: "OH&S · Master", tone: "green" },
              { label: "MIG · Proficient", tone: "amber" },
              { label: "Forklift · Master", tone: "green" },
            ]}
            bays={["bay-1", "bay-2", "bay-3", "bay-4"]}
            status="on-shift"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Three live profile cards from the Oak Flats crew. Avatar tones map
            to the technician roster colour, certification chips inherit the
            level tone, and the shift-status pill on the right tracks the
            current floor state.
          </p>
        </div>
      </section>
    </main>
  )
}
