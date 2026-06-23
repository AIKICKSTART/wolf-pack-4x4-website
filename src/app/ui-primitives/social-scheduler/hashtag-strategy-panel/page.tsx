import type { Metadata } from "next"

import { HashtagStrategyPanel } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { HASHTAG_GROUPS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Hashtag strategy panel | Muffler Pulse",
  description:
    "Primitive 06 — hashtag groups with reach estimates, trend, and competition.",
}

export default function HashtagStrategyPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Hashtag strategy"
        title="Hashtag strategy panel"
        description="Hashtag groups split by intent — branded, trending, community / local. Each row carries reach estimates plus the trend direction and competition tier so the team picks tags with intent rather than habit."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Hashtag strategy" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Full strategy (all three groups)</span>
        <HashtagStrategyPanel groups={HASHTAG_GROUPS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Branded-only run sheet</span>
        <HashtagStrategyPanel
          title="Brand hashtags"
          groups={HASHTAG_GROUPS.filter((g) => g.category === "branded")}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Community + trending mix</span>
        <HashtagStrategyPanel
          title="Reach mix"
          groups={HASHTAG_GROUPS.filter((g) => g.category !== "branded")}
        />
      </section>
    </main>
  )
}
