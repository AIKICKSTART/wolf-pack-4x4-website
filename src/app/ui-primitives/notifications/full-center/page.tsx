import type { Metadata } from "next"

import {
  ChannelMatrix,
  NotificationBell,
  NotificationHistoryTimeline,
  NotificationPopover,
  QuietHoursScheduler,
  SubscribeToggle,
} from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_CHANNELS,
  DEMO_CHANNEL_ROWS,
  DEMO_CHANNEL_VALUE,
  DEMO_HISTORY_GROUPS,
  DEMO_POPOVER_ITEMS,
} from "../demo-data"
import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Full notification center | Notifications",
  description:
    "Composition — full notification center scene combining bell, popover, history timeline, channel matrix, quiet hours, and a preferences side panel.",
}

export default function FullCenterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Notification center"
        title="Full notification center"
        description="One page demonstrating how the primitives compose — bell trigger and popover at the top, a long-form history timeline on the left, and a side panel with the channel matrix, quiet hours, and a per-source subscribe toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Full center" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Bell + open popover</span>
        <div className={styles.demoInline} style={{ alignItems: "start" }}>
          <NotificationBell count={4} hasUnread />
          <NotificationPopover
            items={DEMO_POPOVER_ITEMS}
            viewAllHref="/ui-primitives/notifications/history-timeline"
          />
        </div>
      </section>

      <div className={styles.center}>
        <div className={styles.centerMain}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>History timeline</span>
            <NotificationHistoryTimeline groups={DEMO_HISTORY_GROUPS} />
          </section>
        </div>

        <aside className={styles.centerSide}>
          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Subscribe</span>
            <SubscribeToggle
              subscribed
              controlled={false}
              defaultSubscribed
              subscribeLabel="Subscribe to workshop updates"
              unsubscribeLabel="Subscribed · Workshop"
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Channel preferences</span>
            <ChannelMatrix
              rows={DEMO_CHANNEL_ROWS}
              channels={DEMO_CHANNELS}
              defaultValue={DEMO_CHANNEL_VALUE}
              legend="Per-event channel routing"
            />
          </section>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Quiet hours</span>
            <QuietHoursScheduler />
          </section>
        </aside>
      </div>
    </main>
  )
}
