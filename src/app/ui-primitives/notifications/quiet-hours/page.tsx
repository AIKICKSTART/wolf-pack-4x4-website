import type { Metadata } from "next"

import { QuietHoursScheduler } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Quiet hours scheduler | Notifications",
  description:
    "Primitive 07 — quiet hours setup with day chips, start/end pickers, and exception toggles.",
}

export default function QuietHoursScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Quiet hours"
        title="Quiet hours scheduler"
        description="A standalone scheduler for selecting active days, start and end times for the quiet window, and exception toggles so urgent alerts and direct mentions can still break through."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Quiet hours" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 540 }}>
          <QuietHoursScheduler />
        </div>
      </section>
    </main>
  )
}
