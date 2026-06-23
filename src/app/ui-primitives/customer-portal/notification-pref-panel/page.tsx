import type { Metadata } from "next"

import { NotificationPrefPanel } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import { NOTIFICATION_TOPICS } from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Notification preferences | Customer portal"
,
  description:
    "Primitive 11 — customer notification preferences with SMS, email and push toggles per topic — three states.",
}

const ALL_ON_TOPICS = NOTIFICATION_TOPICS.map((topic) => ({
  ...topic,
  channels: { sms: true, email: true, push: true } as const,
}))

const ALL_OFF_TOPICS = NOTIFICATION_TOPICS.map((topic) => ({
  ...topic,
  channels: { sms: false, email: false, push: false } as const,
}))

export default function NotificationPrefPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Notification preferences"
        title="SMS, email + push preferences"
        description="Mick's default mix (selective per topic), all channels on for a power-user setup, and everything quiet — the do-not-disturb extreme."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Notification preferences" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <NotificationPrefPanel topics={NOTIFICATION_TOPICS} />
          <NotificationPrefPanel topics={ALL_ON_TOPICS} />
          <NotificationPrefPanel topics={ALL_OFF_TOPICS} />
        </div>
      </section>
    </main>
  )
}
