import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SentimentIndicator } from "../../components/live-chat"

import styles from "../live-chat.module.css"

export const metadata: Metadata = {
  title: "Sentiment indicator | Live chat",
  description:
    "Primitive 07 — Frustrated → Neutral → Delighted sentiment meter with recent-shift indicator.",
}

export default function SentimentIndicatorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Sentiment"
        title="Sentiment indicator"
        description="A live sentiment meter built on the chart RadialMeter primitive. Score lives on a -100 to +100 scale; buckets at -25 and +25. The recent-shift indicator (▲/▼) flags how the read changed against the prior reading so operators can spot a frustrated visitor before the chat goes sideways. role=meter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Live chat", href: "/ui-primitives/live-chat" },
          { label: "Sentiment indicator" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three sentiment buckets</span>
        <div className={styles.demoTriple}>
          <SentimentIndicator score={72} recentShiftPoints={18} />
          <SentimentIndicator score={4} recentShiftPoints={-6} />
          <SentimentIndicator score={-58} recentShiftPoints={-22} />
        </div>
      </section>
    </main>
  )
}
