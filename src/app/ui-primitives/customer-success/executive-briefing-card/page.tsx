import type { Metadata } from "next"

import { ExecutiveBriefingCard } from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import { SAMPLE_ASKS, SAMPLE_RISKS, SAMPLE_WINS } from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Executive briefing card | Customer success",
  description:
    "Primitive 14 — weekly executive briefing with top 3 wins, top 3 risks, and asks for the week.",
}

export default function ExecutiveBriefingCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Briefing"
        title="Executive briefing card"
        description="The card the CS lead drops into a Monday morning thread — wins, risks, and asks in equal weight. Each section caps at three items so leadership reads it in 30 seconds."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Executive briefing card" },
        ]}
      />

      <div className={styles.demoSurface}>
        <span className={styles.demoLabel}>Week of 27 May 2026 · Stuart</span>
        <ExecutiveBriefingCard
          weekLabel="Week of 27 May 2026"
          author="Stuart Halloran"
          wins={SAMPLE_WINS}
          risks={SAMPLE_RISKS}
          asks={SAMPLE_ASKS}
        />
      </div>
    </main>
  )
}
