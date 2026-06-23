import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TokenUsageChip } from "../../components/ai"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Token usage chip | UI Primitives — AI",
}

export default function TokenUsagePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="AI.11 / Conversation"
        title="Token usage chip"
        description="Compact meter chip showing tokens consumed vs budget. Tone shifts from calm green to amber at 60% and red at 85% so users can plan compression."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI", href: "/ui-primitives/ai" },
          { label: "Token usage" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.stage}>
          <div className={styles.cluster}>
            <div className={styles.clusterHead}>
              <h3 className={styles.clusterTitle}>Tone progression</h3>
              <span className={styles.clusterMeta}>Calm → amber → red</span>
            </div>
            <div className={styles.row}>
              <TokenUsageChip used={12_400} budget={200_000} label="Context" />
              <TokenUsageChip used={64_200} budget={200_000} label="Context" />
              <TokenUsageChip used={132_500} budget={200_000} label="Context" />
              <TokenUsageChip used={184_900} budget={200_000} label="Context" />
            </div>
          </div>

          <div className={styles.cluster}>
            <div className={styles.clusterHead}>
              <h3 className={styles.clusterTitle}>Per-turn rolling cost</h3>
              <span className={styles.clusterMeta}>Single message context</span>
            </div>
            <div className={styles.row}>
              <TokenUsageChip used={418} budget={4_000} label="Prompt" />
              <TokenUsageChip used={2_140} budget={4_000} label="Prompt" />
              <TokenUsageChip used={3_410} budget={4_000} label="Prompt" />
              <TokenUsageChip used={3_980} budget={4_000} label="Prompt" />
            </div>
          </div>
        </div>

        <div className={styles.note}>
          <span>Semantics</span>
          <p>
            The chip uses role=meter with aria-valuemin / aria-valuemax / aria-valuenow,
            plus a human-readable aria-label, so assistive tech announces the
            current ratio without needing to parse the visual meter.
          </p>
        </div>
      </section>
    </main>
  )
}
