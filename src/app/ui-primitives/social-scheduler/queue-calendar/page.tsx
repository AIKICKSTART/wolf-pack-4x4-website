import type { Metadata } from "next"

import { QueueCalendar } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { CALENDAR_DAYS, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Queue calendar | Muffler Pulse",
  description:
    "Primitive 02 — month / week / day calendar of scheduled posts with drag-to-reschedule.",
}

export default function QueueCalendarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Queue calendar"
        title="Queue calendar"
        description="The publishing queue as a date grid. Switch month / week / day, drag a chip onto another day to reschedule, or use arrow keys when a chip is focused for keyboard-only rescheduling."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Queue calendar" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Month view</span>
        <QueueCalendar days={CALENDAR_DAYS} platforms={PLATFORMS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Week view (anchored to today)</span>
        <QueueCalendar
          days={CALENDAR_DAYS}
          platforms={PLATFORMS}
          initialView="week"
          title="Week at a glance"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Day view (today)</span>
        <QueueCalendar
          days={CALENDAR_DAYS}
          platforms={PLATFORMS}
          initialView="day"
          title="Today's queue"
        />
      </section>
    </main>
  )
}
