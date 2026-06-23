import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AssistantMessageBubble,
  ChatThread,
  UserMessageBubble,
} from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Chat thread | UI Primitives — AI",
}

export default function ChatThreadPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.01 / Conversation"
        title="Chat thread — quote assistant transcript"
        description="Scrollable role=log container that auto-sticks to the bottom when new messages arrive. Polite live announcements, aria-relevant=additions, keyboard scrollable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Chat thread" },
        ]}
      />
      <section className={styles.canvas}>
        <ChatThread ariaLabel="Mufflermen quote assistant transcript">
          <UserMessageBubble timestamp="09:41">
            <p>
              Help me pick an exhaust for a Hilux 2.8L diesel — needs to stay
              volume-legal in NSW.
            </p>
          </UserMessageBubble>

          <AssistantMessageBubble
            timestamp="09:41"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
          >
            <p>
              Two paths legal under NSW EPA 90 dB(A) static. The Redback 3&quot; mandrel
              cat-back keeps drone low and adds a quiet 18 rwkw with stock turbo.
            </p>
            <ul>
              <li>Redback 3&quot; cat-back — A$1,184 fitted, 89 dB(A)</li>
              <li>Magnaflow mid-pipe + factory tip — A$684 fitted, 85 dB(A)</li>
            </ul>
            <p>Want fitted timing for either at Oak Flats this week?</p>
          </AssistantMessageBubble>

          <UserMessageBubble timestamp="09:43">
            <p>Redback fitted. Earliest morning slot please.</p>
          </UserMessageBubble>

          <AssistantMessageBubble
            timestamp="09:43"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
          >
            <p>
              Thursday 09:30 Bay 2 is free. Estimated 2h on rack. I&apos;ll hold the
              slot for 30 min while you confirm.
            </p>
          </AssistantMessageBubble>
        </ChatThread>

        <div className={styles.note}>
          <span>Auto-scroll behaviour</span>
          <p>
            When a user scrolls up past 80 px from the bottom, autoscroll detaches
            so they can read history without being yanked back. New messages
            re-enable autoscroll only after the user returns to the bottom.
          </p>
        </div>
      </section>
    </main>
  )
}
