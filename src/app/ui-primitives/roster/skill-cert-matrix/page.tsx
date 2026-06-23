import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SkillCertMatrix } from "../../components/roster/skill-cert-matrix"
import { CERT_COLUMNS, CERT_ROWS } from "../roster-mock"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Skill + cert matrix | Roster",
}

export default function SkillCertMatrixPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.06 / Roster"
        title="Skill + cert matrix"
        description="Crew × competency grid — level chips for each skill, expiry warnings stacked alongside when a renewal is close or overdue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Skill + cert matrix" },
        ]}
      />
      <section className={styles.canvas}>
        <SkillCertMatrix technicians={CERT_ROWS} skills={CERT_COLUMNS} />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Jordan OH&amp;S cell shows the expired warning — 4 days past
            renewal. Trent OH&amp;S is within 30 days so it shows the amber
            warning. Marcus carries Master across the board.
          </p>
        </div>
      </section>
    </main>
  )
}
