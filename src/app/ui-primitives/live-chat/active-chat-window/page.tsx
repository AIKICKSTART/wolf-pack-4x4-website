import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ActiveChatWindow } from "../../components/live-chat"

import { HILUX_MESSAGES, MENTION_CANDIDATES, VISITOR_MICK } from "../_mock-data"
import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Active chat window | Live chat",
  description:
    "Primitive 02 — centre chat window: header + scrollable thread (composes MessageBubble) + composer (composes ReplyComposer).",
}

export default function ActiveChatWindowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Window"
        title="Active chat window"
        description="The centre pane of the operator console. Composes inbox primitives — MessageBubble for each turn, TypingIndicator while the visitor types, and the existing ReplyComposer with @-mention picker. Sticks to the inbox visual language so operators feel at home regardless of which surface they're in."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Active chat window" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive · Mick Davis · 4 messages · typing indicator
        </span>
        <ActiveChatWindow
          visitorName="Mick Davis"
          visitorMeta="Oak Flats NSW · Chrome on Android · 14m on site"
          messages={HILUX_MESSAGES}
          typingPerson={VISITOR_MICK}
          mentionCandidates={MENTION_CANDIDATES}
        />
      </section>
    </main>
  )
}
