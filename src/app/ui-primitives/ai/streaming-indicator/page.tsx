import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AssistantMessageBubble,
  ChatThread,
  StreamingIndicator,
} from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Streaming indicator | UI Primitives — AI",
}

export default function StreamingIndicatorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.04 / Conversation"
        title="Streaming indicator"
        description="Three-dot streaming animation with role=status and a polite aria label. Users with prefers-reduced-motion get a blinking caret instead of bouncing dots."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Streaming indicator" },
        ]}
      />
      <section className={styles.canvas}>
        <ChatThread ariaLabel="Streaming indicator examples">
          <AssistantMessageBubble
            timestamp="09:41"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            streaming
            showFeedbackRow={false}
          >
            <p>
              Checking NSW EPA noise limits for the Hilux 2.8 GUN125…
            </p>
            <StreamingIndicator label="Mufflermen Assistant is thinking" />
          </AssistantMessageBubble>

          <AssistantMessageBubble
            timestamp="09:42"
            modelName="Claude Sonnet"
            authorName="Mufflermen Assistant"
            streaming
            showFeedbackRow={false}
          >
            <StreamingIndicator label="Mufflermen Assistant is replying" />
          </AssistantMessageBubble>
        </ChatThread>

        <div className={styles.stage}>
          <h3 className={styles.clusterTitle}>Standalone variants</h3>
          <div className={styles.row}>
            <StreamingIndicator label="Default streaming indicator" />
            <StreamingIndicator label="Thinking about EGT thresholds" />
            <StreamingIndicator label="Fetching parts catalogue" />
          </div>
        </div>

        <div className={styles.note}>
          <span>Reduced motion</span>
          <p>
            Under prefers-reduced-motion: reduce, the bouncing dots are replaced
            with a static blinking caret using a steps() keyframe, preserving the
            signal without continuous motion.
          </p>
        </div>
      </section>
    </main>
  )
}
