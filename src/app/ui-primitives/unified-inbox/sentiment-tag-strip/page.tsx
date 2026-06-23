import type { Metadata } from "next"

import { SentimentTagStrip } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Sentiment tag strip | Unified inbox primitives",
  description:
    "Primitive 05 — auto-detected sentiment chips (positive / neutral / negative / upset) with AI badge and human override.",
}

export default function SentimentTagStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Sentiment"
        title="Sentiment tag strip"
        description="Strip of four sentiment chips. The AI-detected bucket gets a dashed outline + an 'AI' badge; clicking another chip overrides the detection. Karen W. is auto-flagged as upset after three reschedules — overriding to negative is one tap away."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Sentiment tag strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Karen W. · auto-detected upset (3rd reschedule)
        </span>
        <SentimentTagStrip
          detected="upset"
          source="Auto-detected from 6 messages over 4 days"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mick D. · neutral baseline</span>
        <SentimentTagStrip
          detected="neutral"
          source="Auto-detected from 4 messages today"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Jase T. · positive Instagram DM</span>
        <SentimentTagStrip
          detected="positive"
          source="Auto-detected from 2 DMs"
        />
      </section>
    </main>
  )
}
