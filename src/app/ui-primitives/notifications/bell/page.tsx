import type { Metadata } from "next"

import { NotificationBell } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Notification bell | Notifications",
  description:
    "Primitive 01 — top-bar bell icon with badge count and pulsing dot when new unread items arrive.",
}

export default function NotificationBellScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Bell"
        title="Notification bell"
        description="A compact bell trigger with a numeric badge for unread counts, a soft pulsing dot for fresh-but-unseen alerts, and accessible aria-label and aria-haspopup semantics."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Bell" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.bellStage}>
          <div className={styles.demoInline}>
            <NotificationBell count={0} />
            <NotificationBell count={0} hasUnread />
            <NotificationBell count={3} />
            <NotificationBell count={12} hasUnread tone="amber" />
            <NotificationBell count={148} hasUnread />
          </div>
        </div>
      </section>
    </main>
  )
}
