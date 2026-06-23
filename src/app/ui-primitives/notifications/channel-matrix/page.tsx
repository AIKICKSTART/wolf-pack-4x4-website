import type { Metadata } from "next"

import { ChannelMatrix } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import { DEMO_CHANNELS, DEMO_CHANNEL_ROWS, DEMO_CHANNEL_VALUE } from "../demo-data"
import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Channel matrix | Notifications",
  description:
    "Primitive 08 — notification preferences matrix mapping event types to delivery channels.",
}

export default function ChannelMatrixScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Channel matrix"
        title="Channel matrix"
        description="Rows describe event types (Booking, Quote, Job, Invoice, Mention, System, Marketing). Columns describe delivery channels (Email, SMS, Push, In-app, Slack). Each cell is an aria-pressed switch tinted per channel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Channel matrix" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ChannelMatrix
          rows={DEMO_CHANNEL_ROWS}
          channels={DEMO_CHANNELS}
          defaultValue={DEMO_CHANNEL_VALUE}
        />
      </section>
    </main>
  )
}
