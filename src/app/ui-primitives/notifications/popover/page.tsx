import type { Metadata } from "next"

import { NotificationPopover } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import { DEMO_POPOVER_ITEMS } from "../demo-data"
import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Notification popover | Notifications",
  description:
    "Primitive 02 — compact dropdown notification list with All / Unread / Mentions tabs and a view-all link.",
}

export default function NotificationPopoverScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Popover"
        title="Notification popover"
        description="A compact dropdown anchored to the bell. Tabs filter All / Unread / Mentions, recent items appear with auto-animate, and a footer surfaces a link into the deeper history view."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Popover" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.bellStage}>
          <NotificationPopover
            items={DEMO_POPOVER_ITEMS}
            viewAllHref="/ui-primitives/notifications/history-timeline"
          />
        </div>
      </section>
    </main>
  )
}
