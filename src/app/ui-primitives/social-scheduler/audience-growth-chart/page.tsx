import type { Metadata } from "next"

import { AudienceGrowthChart } from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import { AUDIENCE_SERIES, PLATFORMS } from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Audience growth chart | Muffler Pulse",
  description:
    "Primitive 08 — follower trajectory per platform with 30-day delta.",
}

export default function AudienceGrowthChartPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Audience growth"
        title="Audience growth chart"
        description="A multi-series line chart of the Mufflermen follower base across platforms over a 30-day window, with current values and 30-day deltas printed below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Audience growth" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · All channels</span>
        <AudienceGrowthChart series={AUDIENCE_SERIES} platforms={PLATFORMS} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · TikTok focus (single series)</span>
        <AudienceGrowthChart
          title="TikTok trajectory"
          series={AUDIENCE_SERIES.filter((s) => s.platform === "tiktok")}
          platforms={PLATFORMS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · Owned video (IG + YouTube)</span>
        <AudienceGrowthChart
          title="Owned video"
          series={AUDIENCE_SERIES.filter(
            (s) => s.platform === "instagram" || s.platform === "youtube",
          )}
          platforms={PLATFORMS}
        />
      </section>
    </main>
  )
}
