import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { NotificationCenterPanelDemo } from "../_interactive-demos"
import { MOCK_CENTRE_ITEMS } from "../_mock-data"
import styles from "../notifications-system.module.css"

export const metadata: Metadata = {
  title: "Notification center | Notifications system",
  description:
    "Primitive 10 — sliding notification center panel with grouped notifications, filter tabs, and search.",
}

const READ_ONLY_ITEMS = MOCK_CENTRE_ITEMS.map((item) => ({ ...item, read: true }))
const NO_ITEMS = [] as typeof MOCK_CENTRE_ITEMS

export default function NotificationCenterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Notification center"
        title="Notification center panel"
        description="A full-height panel that lives behind the bell. Shows unread count, filter tabs (All / Unread / Alerts), search, mark-all-read, and grouped notifications by day."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system", href: "/ui-primitives/notifications-system" },
          { label: "Notification center" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A — Mixed read / unread</span>
        <NotificationCenterPanelDemo items={MOCK_CENTRE_ITEMS} markAll />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B — All read (0 unread)</span>
        <NotificationCenterPanelDemo items={READ_ONLY_ITEMS} markAll />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C — Empty (no notifications)</span>
        <NotificationCenterPanelDemo items={NO_ITEMS} />
      </section>
    </main>
  )
}
