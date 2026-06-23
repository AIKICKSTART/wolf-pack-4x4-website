import type { Metadata } from "next"

import { SnoozeControls } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Snooze controls | Notifications",
  description:
    "Primitive 06 — snooze options panel with 1h / tomorrow / next week / custom presets and inline date+time picker.",
}

export default function SnoozeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Snooze"
        title="Snooze controls"
        description="A focused panel for snoozing a single notification or the whole bell. Preset chips cover the common cases, and a Custom chip expands an inline date + time picker for everything else."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Snooze" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 520 }}>
          <SnoozeControls summary="Currently snoozed for 1 hour — resumes 10:30" />
        </div>
      </section>
    </main>
  )
}
