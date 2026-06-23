import type { Metadata } from "next"

import { ConversationThreadView } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { MICK_THREAD, KAREN_THREAD } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Conversation thread view | Unified inbox primitives",
  description:
    "Primitive 02 — central message viewer with inbound / outbound bubbles, channel context tag and per-message channel hint.",
}

export default function ConversationThreadViewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Thread view"
        title="Conversation thread view"
        description="The central viewer for a single conversation. Inbound bubbles sit left, outbound (team) bubbles sit right with a teal tint. The channel context tag stays visible in the header — and individual messages can flag a cross-channel hop (e.g. a customer who started on Instagram and continued on SMS)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Conversation thread view" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>SMS · Mick D. · DPF question</span>
        <ConversationThreadView
          channel="sms"
          subject="DPF clean question — Hilux"
          customerName="Mick D."
          customerContact="+61 412 803 277"
          messages={MICK_THREAD}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Facebook · Karen W. · 3rd reschedule, flagged upset
        </span>
        <ConversationThreadView
          channel="facebook"
          subject="Quote follow-up — VF Commodore"
          customerName="Karen W."
          customerContact="messenger · Karen Walters"
          messages={KAREN_THREAD}
        />
      </section>
    </main>
  )
}
