import type { Metadata } from "next"

import { NotificationHistoryTimeline } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import { DEMO_HISTORY_GROUPS } from "../demo-data"
import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "History timeline | Notifications"
,
  description:
    "Primitive 04 — long-form notification history grouped by date with count chips and read-state.",
}

export default function HistoryTimelineScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / History"
        title="Notification history timeline"
        description="A long-form scroll of past notifications grouped by date with total + unread count chips. Per-row dots are color-coded by tone, and unread rows carry an inset accent stripe."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "History timeline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <NotificationHistoryTimeline groups={DEMO_HISTORY_GROUPS} />
      </section>
    </main>
  )
}
