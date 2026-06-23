import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChatQueueInbox } from "../../components/live-chat"

import { QUEUE_ITEMS } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Chat queue inbox | Live chat",
  description:
    "Primitive 01 — operator's pending chat queue with Mine / Unassigned / At-risk filter chips and per-row SLA risk colour-coding.",
}

export default function ChatQueueInboxScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Queue"
        title="Chat queue inbox"
        description="The operator's pending chat queue. Filter chips toggle between Mine (chats already assigned to me), Unassigned (in the open pool) and At-risk (SLA almost breached). Rows sort by SLA risk; the per-row chip pulls from the same SLA palette as the support primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Chat queue inbox" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · 5 visitors · filter + SLA tone shifting
        </span>
        <ChatQueueInbox items={QUEUE_ITEMS} activeId="q1" />
      </section>
    </main>
  )
}
