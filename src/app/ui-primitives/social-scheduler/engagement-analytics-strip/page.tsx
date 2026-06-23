import type { Metadata } from "next"

import { EngagementAnalyticsStrip } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { ENGAGEMENT_DELTAS, ENGAGEMENT_TRENDS, POST_ENGAGEMENT } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Engagement analytics strip | Muffler Pulse",
  description:
    "Primitive 07 — likes / comments / shares / saves with trend sparklines and 7-day deltas.",
}

export default function EngagementAnalyticsStripPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Engagement strip"
        title="Engagement analytics strip"
        description="The compact four-up engagement strip — likes, comments, shares, saves. Each tile has a sparkline trend and a signed 7-day delta against the prior week."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Engagement strip" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Trending suburb spotlight</span>
        <EngagementAnalyticsStrip
          engagement={POST_ENGAGEMENT}
          trends={ENGAGEMENT_TRENDS}
          deltas={ENGAGEMENT_DELTAS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · TikTok dyno reel (high rate)</span>
        <EngagementAnalyticsStrip
          title="TikTok dyno cut"
          engagement={{
            likes: 18_400,
            comments: 824,
            shares: 1_240,
            saves: 3_120,
            rate: 0.142,
          }}
          trends={{
            likes: [200, 400, 1000, 2400, 4800, 9200, 18400],
            comments: [10, 30, 80, 160, 320, 540, 824],
            shares: [12, 40, 120, 280, 540, 880, 1240],
            saves: [30, 90, 240, 520, 980, 1820, 3120],
          }}
          deltas={{ likes: 0.62, comments: 0.42, shares: 0.38, saves: 0.71 }}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · LinkedIn supplier post (declining)</span>
        <EngagementAnalyticsStrip
          title="LinkedIn restock"
          engagement={{
            likes: 92,
            comments: 4,
            shares: 6,
            saves: 12,
            rate: 0.009,
          }}
          trends={{
            likes: [140, 132, 128, 120, 110, 102, 92],
            comments: [12, 10, 9, 8, 6, 5, 4],
            shares: [14, 12, 10, 9, 8, 7, 6],
            saves: [22, 20, 18, 16, 14, 13, 12],
          }}
          deltas={{ likes: -0.21, comments: -0.34, shares: -0.16, saves: -0.18 }}
        />
      </section>
    </main>
  )
}
