import type { Metadata } from "next"

import { WinBackCampaignCard } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Win-back campaign card | Marketing automation",
  description:
    "Primitive 07 — lapsed-customer campaign card with cohort, projected revenue and incentive footnote.",
}

const RECOVER_TREND_PROD = [12, 18, 22, 19, 31, 38, 44, 52]
const RECOVER_TREND_SOFT = [4, 6, 7, 8, 9, 10, 11, 14]
const RECOVER_TREND_BIG = [80, 95, 110, 124, 138, 152, 168, 184]

export default function WinBackCampaignCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Win-back campaign card"
        title="Win-back campaign card"
        description="Lapsed-customer campaign card with the cohort definition, projected recovers and revenue, plus the incentive used to drive reactivation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Win-back campaign card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Standard 365d lapsed</h2>
        <WinBackCampaignCard
          name="Lapsed 365d · 15% off first service"
          cohortLabel="Lapsed ≥ 365 days"
          cohortSize={1820}
          recoverTrend={RECOVER_TREND_PROD}
          predictedRecovers={184}
          projectedRevenue={32400}
          baselineReactivationRate={9.6}
          incentiveHeadline="15% off first service · Bay 2 priority slot"
          incentiveFootnote="One-time use. Valid 30 days. Excludes Manta cat-back."
          description="Targets owners who haven't booked a service in 12 months. Aims to win back active customers before churn settles in."
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Soft-launch cohort</h2>
        <WinBackCampaignCard
          name="Lapsed 180d · roadworthy reminder"
          cohortLabel="Lapsed ≥ 180 days"
          cohortSize={420}
          recoverTrend={RECOVER_TREND_SOFT}
          predictedRecovers={24}
          projectedRevenue={4200}
          baselineReactivationRate={5.8}
          incentiveHeadline="Roadworthy at cost · $80 → $40"
          incentiveFootnote="Limit one per vehicle. Workshop labour only."
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Aggressive winback (high-spend)</h2>
        <WinBackCampaignCard
          name="Lapsed 720d · Manta loyalty"
          cohortLabel="Lapsed ≥ 2 years"
          cohortSize={6240}
          recoverTrend={RECOVER_TREND_BIG}
          predictedRecovers={612}
          projectedRevenue={148000}
          baselineReactivationRate={3.1}
          incentiveHeadline="Free Manta cat-back fit with full system"
          incentiveFootnote="Stackable with manufacturer rebate. Subject to system availability."
          description="Targets pre-COVID customers. Long tail but high revenue per recovery."
        />
      </section>
    </main>
  )
}
