import type { Metadata } from "next"

import { DoNotDisturbCard } from "../../components/notifications-system"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Do not disturb | Notifications system",
  description:
    "Primitive 09 — DND schedule with weekday picker, hush window, and enable toggle.",
}

export default function DoNotDisturbScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Do not disturb"
        title="Do not disturb"
        description="A recurring quiet window for personal accounts. Default is workshop hours-aware — Mon–Fri 19:00–07:00 with the option to extend to the weekend."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Do not disturb" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Workshop default (Mon–Fri 19:00 – 07:00)</span>
        <DoNotDisturbCard
          initialValue={{
            enabled: true,
            weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            window: { startHour: 19, startMinute: 0, endHour: 7, endMinute: 0 },
          }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — Disabled (manual override)</span>
        <DoNotDisturbCard
          initialValue={{
            enabled: false,
            weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            window: { startHour: 19, startMinute: 0, endHour: 7, endMinute: 0 },
          }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — All week, late-shift window</span>
        <DoNotDisturbCard
          initialValue={{
            enabled: true,
            weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            window: { startHour: 22, startMinute: 30, endHour: 6, endMinute: 30 },
          }}
        />
      </section>
    </main>
  )
}
