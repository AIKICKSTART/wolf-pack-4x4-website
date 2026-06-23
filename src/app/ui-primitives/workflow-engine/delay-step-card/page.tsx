import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DelayStepCard } from "../../components/workflow-engine"

import styles from "../workflow-engine.module.css"

export const metadata: Metadata = {
  title: "Delay step card | Workflow engine",
  description:
    "Primitive 11 — delay step card with duration, timezone, weekend + holiday skip controls.",
}

export default function DelayStepCardScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Delay"
        title="Delay step card"
        description="Pauses the workflow for a configured window. The day-3 nudge waits three business days. The roadworthy reminder waits exactly until 09:00 AEST on the morning T-7d. Each card surfaces the duration, optional resume-at timestamp, the timezone anchor, and whether to skip weekends or AU public holidays."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workflow engine", href: "/ui-primitives/workflow-engine" },
          { label: "Delay step card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Triple · business-day, schedule-anchored, fixed sleep
        </span>
        <div className={styles.demoTriple}>
          <DelayStepCard
            kicker="Quote follow-up"
            title="Wait 3 business days"
            durationMs={3 * 24 * 60 * 60 * 1000}
            resumeAtLabel="Mon 09:00"
            timezone="Australia/Sydney"
            skipWeekends
            skipHolidays
          />
          <DelayStepCard
            kicker="RWC expiry"
            title="Pause until T-7d at 09:00"
            durationMs={6 * 24 * 60 * 60 * 1000}
            resumeAtLabel="Tue 09:00"
            timezone="Australia/Sydney"
            skipWeekends={false}
            skipHolidays
            tone="teal"
          />
          <DelayStepCard
            kicker="Welcome series"
            title="Wait 60 seconds"
            durationMs={60 * 1000}
            timezone="Australia/Sydney"
            skipWeekends={false}
            skipHolidays={false}
            tone="green"
          />
        </div>
      </section>
    </main>
  )
}
