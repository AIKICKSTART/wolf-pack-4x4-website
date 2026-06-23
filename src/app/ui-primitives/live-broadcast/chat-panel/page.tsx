import type { Metadata } from "next"

import { ChatPanel } from "../../components/live-broadcast"
import { PageHeader } from "../../components/page-header"

import { CHAT_MESSAGES } from "../_mock-data"
import styles from "../live-broadcast.module.css"

export const metadata: Metadata = {
  title: "Chat panel | Live broadcast",
  description:
    "Primitive 02 — live chat with rate-limit countdown, slow-mode, quick reactions, host + moderator badges, supporter tier chips.",
}

const SHORT_MESSAGES = CHAT_MESSAGES.slice(0, 4)

export default function ChatPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Chat panel"
        title="Chat panel"
        description="Live chat column shown alongside the player. Includes host announcement pin, supporter tier badges, quick reactions, rate-limit cooldown chip, and slow-mode disable state."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live broadcast", href: "/ui-primitives/live-broadcast" },
          { label: "Chat panel" },
        ]}
      />

      <section className={[styles.demoSurface, styles.demoTriple].join(" ")}>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Open chat · pinned host announce</span>
          <ChatPanel messages={CHAT_MESSAGES} />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Slow mode · cooldown countdown</span>
          <ChatPanel
            messages={SHORT_MESSAGES}
            slowModeSeconds={20}
            cooldownSeconds={14}
          />
        </div>
        <div className={styles.demoStack}>
          <span className={styles.demoLabel}>Chat paused by moderator</span>
          <ChatPanel messages={SHORT_MESSAGES} isPaused />
        </div>
      </section>
    </main>
  )
}
