import type { Metadata } from "next"

import { RealTimeResultsCard } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_CAMPAIGN_NAME, DEMO_RESULTS_TILES } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Real-time results card | Marketing campaigns",
  description:
    "Primitive 10 — live aria-live region with Sent / Delivered / Opened / Clicked / Bounced metric tiles and sparkline trends.",
}

export default function RealTimeResultsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Real-time results card"
        title="Real-time results card"
        description="A polite aria-live status region for in-flight campaigns. Sent, delivered, opened, clicked and bounced render as MetricBlock tiles with sparkline trends and a streaming pulse badge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Real-time results" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <RealTimeResultsCard
          campaignName={DEMO_CAMPAIGN_NAME}
          tiles={DEMO_RESULTS_TILES}
        />
      </section>
    </main>
  )
}
