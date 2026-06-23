import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ConversationRail } from "../../components/ai"
import type { ConversationEntry } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Conversation rail | UI Primitives — AI",
}

const CONVERSATIONS: ReadonlyArray<ConversationEntry> = [
  {
    id: "c-001",
    title: "Hilux 2.8 volume-legal exhaust",
    preview: "Redback 3\" or Magnaflow mid-pipe under NSW EPA 90 dB(A).",
    timestamp: "09:41",
    group: "today",
  },
  {
    id: "c-002",
    title: "Bay 2 schedule for Thursday",
    preview: "Two diesel jobs + one warranty re-cat to slot.",
    timestamp: "08:12",
    group: "today",
  },
  {
    id: "c-003",
    title: "Magnaflow supplier ETA",
    preview: "Stainless lab AU + Magnaflow AU restock check.",
    timestamp: "Yesterday",
    group: "yesterday",
  },
  {
    id: "c-004",
    title: "EGT outlier — bay 3 cyl 4",
    preview: "38 second amber band breach, tip sniffer trace OK.",
    timestamp: "Mon",
    group: "week",
  },
  {
    id: "c-005",
    title: "304 vs 409 stainless write-up",
    preview: "Customer-facing FAQ for coastal NSW workshop.",
    timestamp: "Sat",
    group: "week",
  },
  {
    id: "c-006",
    title: "Audit log archive — March",
    preview: "236 events signed, pinned to evidence store.",
    timestamp: "Apr 3",
    group: "older",
  },
  {
    id: "c-007",
    title: "Workshop hoist service plan",
    preview: "Quarterly torque audit + bay 2 cylinder seal.",
    timestamp: "Mar 22",
    group: "older",
  },
]

export default function ConversationRailPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.10 / Conversation"
        title="Conversation rail"
        description="Left rail grouping past conversations by Today / Yesterday / Last 7 days / Older. Hover or focus reveals a 2-line preview; the active entry gets a red gradient marker."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Conversation rail" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <ConversationRail conversations={CONVERSATIONS} activeId="c-001" />
        </div>
        <div className={styles.note}>
          <span>Grouping rules</span>
          <p>
            Conversations are pre-grouped by the caller (Today / Yesterday / Last
            7 days / Older). The rail never resorts entries server-side, so
            cached transcripts stay stable across renders.
          </p>
        </div>
      </section>
    </main>
  )
}
