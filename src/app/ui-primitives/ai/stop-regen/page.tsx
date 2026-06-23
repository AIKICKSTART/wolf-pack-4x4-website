import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AssistantMessageBubble,
  ChatThread,
  StopRegenActions,
  StreamingIndicator,
} from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Stop / Regenerate actions | UI Primitives — AI",
}

export default function StopRegenPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.09 / Conversation"
        title="Stop / Regenerate actions"
        description="Action toolbar beneath an assistant turn. Stop is enabled while streaming; regenerate, edit prompt, and copy are enabled only after the response settles."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Stop / Regenerate" },
        ]}
      />
      <section className={styles.canvas}>
        <ChatThread ariaLabel="Stop and regenerate states">
          <AssistantMessageBubble
            timestamp="09:41"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            streaming
            showFeedbackRow={false}
          >
            <p>Drafting the Redback fitment plan…</p>
            <StreamingIndicator />
            <StopRegenActions streaming />
          </AssistantMessageBubble>

          <AssistantMessageBubble
            timestamp="09:43"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            showFeedbackRow={false}
          >
            <p>
              Redback 3&quot; 304 stainless cat-back, A$1,184 fitted including
              V-band hardware and EGT bung. Thursday 09:30 Bay 2 hold pending
              confirmation.
            </p>
            <StopRegenActions />
          </AssistantMessageBubble>
        </ChatThread>

        <div className={styles.note}>
          <span>Streaming-aware state</span>
          <p>
            Each action button takes a disabled flag from the streaming prop. The
            Stop action also receives a red border tone so users instinctively
            reach for it during runaway generations.
          </p>
        </div>
      </section>
    </main>
  )
}
