import type { Metadata } from "next"

import { SnoozeController } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import { MOCK_SNOOZE_DURATIONS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Snooze controller | Notifications system",
  description:
    "Primitive 06 — snooze duration picker with active chip and clear control.",
}

export default function SnoozeControllerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Snooze controller"
        title="Snooze controller"
        description="Pause notifications for a fixed duration. Renders the four common workshop presets — 15 min, 1 hour, today, and until Monday — with an aria-radiogroup. The active chip is announced via role=status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Snooze controller" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Nothing snoozed</span>
        <SnoozeController durations={MOCK_SNOOZE_DURATIONS} defaultSelected={null} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Snoozed 1 hour</span>
        <SnoozeController durations={MOCK_SNOOZE_DURATIONS} defaultSelected="1h" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Until Monday</span>
        <SnoozeController
          durations={MOCK_SNOOZE_DURATIONS}
          defaultSelected="until-mon"
          activeChipLabel="Snoozed until Monday 07:00 AEST"
        />
      </section>
    </main>
  )
}
