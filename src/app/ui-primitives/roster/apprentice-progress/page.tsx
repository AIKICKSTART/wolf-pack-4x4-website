import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ApprenticeProgressMeter } from "../../components/roster/apprentice-progress-meter"
import styles from "../roster.module.css"

export const metadata: Metadata = {
  title: "Apprentice progression meter | Roster",
}

export default function ApprenticeProgressPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="29.14 / Roster"
        title="Apprentice progression meter"
        description="A radial qualification meter for an apprentice — completion percent, modules done, and the next module preview."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Roster", href: "/ui-primitives/roster" },
          { label: "Apprentice progression meter" },
        ]}
      />
      <section className={styles.canvas}>
        <ApprenticeProgressMeter
          apprenticeName="Jordan Pace"
          yearLevel="Year 3 · Light Vehicle Mechanical"
          modulesDone={11}
          modulesTotal={16}
          completionPercent={68}
          nextModule={{
            title: "ADR-compliance certification module",
            estimatedHours: 6,
          }}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            RadialMeter on the left, ProgressLinear (segmented) on the right
            shows discrete modules, and the dashed-border next-module preview
            tells Jordan exactly what is coming. All assistive labels read
            the apprentice name and the live percent.
          </p>
        </div>
      </section>
    </main>
  )
}
