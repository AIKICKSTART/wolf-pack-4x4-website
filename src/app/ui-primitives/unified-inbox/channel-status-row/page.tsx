import type { Metadata } from "next"

import { ChannelStatusRow } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { CHANNEL_HEALTH } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Channel status row | Unified inbox primitives",
  description:
    "Primitive 14 — channel connection status cards (FB connected, IG OAuth expired with reconnect CTA, web chat degraded).",
}

export default function ChannelStatusRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Channel status"
        title="Channel status row"
        description="Per-channel health cards. Connected channels pulse green, degraded channels turn amber with last-sync time, expired or disconnected channels surface a Reconnect CTA. Real-world example — Instagram OAuth quietly expires after 60 days and inbound DMs silently fail unless this row flags it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Channel status row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          5 channels · 3 connected · 1 expired · 1 degraded
        </span>
        <ChannelStatusRow channels={CHANNEL_HEALTH} />
      </section>
    </main>
  )
}
