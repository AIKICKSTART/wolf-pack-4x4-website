import type { Metadata } from "next"

import {
  AtRiskCustomersList,
  ChurnRiskCard,
  CohortRetentionGrid,
  CustomerHealthScore,
  CustomerJourneyTimeline,
  CustomerSegmentDistribution,
  ExecutiveBriefingCard,
  ExpansionOpportunityCard,
  FeatureAdoptionMeter,
  NpsTrendChart,
  QbrMeetingCard,
  RenewalPipelineStage,
  SuccessPlanChecklist,
  SupportTicketVolumeCard,
} from "../../components/customer-success"
import { PageHeader } from "../../components/page-header"
import {
  COHORT_COLUMN_LABELS,
  SAMPLE_ASKS,
  SAMPLE_AT_RISK,
  SAMPLE_CHURN_FACTORS,
  SAMPLE_COHORTS,
  SAMPLE_FEATURES,
  SAMPLE_HEALTH_FACTORS,
  SAMPLE_LIFECYCLE_HISTORY,
  SAMPLE_MILESTONES,
  SAMPLE_NPS_POINTS,
  SAMPLE_QBR_AGENDA,
  SAMPLE_QBR_OUTCOMES,
  SAMPLE_RISKS,
  SAMPLE_SEGMENT_SLICES,
  SAMPLE_SENTIMENT_POINTS,
  SAMPLE_VOLUME_POINTS,
  SAMPLE_WINS,
} from "../fixtures"

import styles from "../customer-success.module.css"

export const metadata: Metadata = {
  title: "Full CS console | Customer success",
  description:
    "Composition — every customer-success primitive arranged into a single console for a strategic account: executive briefing, health, churn, expansion, journey, support volume, NPS trend, cohort grid, at-risk list, segment donut, success plan, QBR card, renewal pipeline.",
}

export default function FullCsConsolePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full CS console"
        title="Full customer success console"
        description="Composes every primitive in this folder into a working customer-success surface for Wollongong Express Fleet. Exec briefing headers the page; health, churn, expansion, journey, QBR, support, and renewal sit aside; the at-risk list, cohort grid, NPS, feature adoption, and segment donut anchor the centre."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer success", href: "/ui-primitives/customer-success" },
          { label: "Full console" },
        ]}
      />

      <ExecutiveBriefingCard
        weekLabel="Week of 27 May 2026"
        author="Stuart Halloran"
        wins={SAMPLE_WINS}
        risks={SAMPLE_RISKS}
        asks={SAMPLE_ASKS}
      />

      <div className={styles.console}>
        <div className={styles.consoleMain}>
          <NpsTrendChart
            points={SAMPLE_NPS_POINTS}
            ariaLabel="Mufflermen NPS trend for the trailing six months"
          />

          <CohortRetentionGrid
            rows={SAMPLE_COHORTS}
            columnLabels={COHORT_COLUMN_LABELS}
            ariaLabel="Mufflermen cohort retention grid"
          />

          <AtRiskCustomersList
            rows={SAMPLE_AT_RISK}
            caption="This week's at-risk customers"
            kicker="Watchlist · Week of 27 May 2026"
          />

          <div className={styles.demoTwo}>
            <FeatureAdoptionMeter rows={SAMPLE_FEATURES} />
            <CustomerSegmentDistribution slices={SAMPLE_SEGMENT_SLICES} />
          </div>

          <SuccessPlanChecklist
            customerName="Wollongong Express Fleet"
            milestones={SAMPLE_MILESTONES}
          />
        </div>

        <aside className={styles.consoleSide}>
          <CustomerHealthScore
            customerName="Wollongong Express Fleet"
            score={88}
            trendDelta={6}
            factors={SAMPLE_HEALTH_FACTORS}
          />

          <CustomerJourneyTimeline
            customerName="Wollongong Express Fleet"
            currentStage="expansion"
            history={SAMPLE_LIFECYCLE_HISTORY}
          />

          <ChurnRiskCard
            customerName="Wollongong Express Fleet"
            probability={18}
            window="next 90 days"
            factors={SAMPLE_CHURN_FACTORS.slice(0, 2)}
            intervention="Confirm Q3 fleet rotation pricing in the 18 Jun QBR. No urgent intervention needed."
            ctaLabel="Mark reviewed"
          />

          <ExpansionOpportunityCard
            customerName="Wollongong Express Fleet"
            action="fleet-expansion"
            upliftAud={48_000}
            confidence="high"
            rationale="Four utes added in the last 12 weeks and two cab-chassis pricing requests. Pitch a tiered fleet quote at QBR."
            ctaLabel="Open fleet playbook"
          />

          <SupportTicketVolumeCard
            customerName="Wollongong Express Fleet"
            openTickets={1}
            trailingTickets={76}
            window="last 90 days"
            volumePoints={SAMPLE_VOLUME_POINTS}
            sentimentPoints={SAMPLE_SENTIMENT_POINTS}
            sentimentDirection="up"
            sentimentDelta="+12"
          />

          <RenewalPipelineStage
            customerName="Wollongong Express Fleet"
            stage="planning"
            expectedCloseIso="2026-08-30"
            acvAud={142_000}
            likelihood={62}
            nextStep="Send refreshed FY26 fleet rotation pricing pack before the 18 Jun QBR."
          />

          <QbrMeetingCard
            customerName="Wollongong Express Fleet"
            scheduledIso="2026-06-18T10:00:00+10:00"
            location="On-site · Bay 2 walk-through"
            agenda={SAMPLE_QBR_AGENDA}
            lastOutcomes={SAMPLE_QBR_OUTCOMES}
          />
        </aside>
      </div>
    </main>
  )
}
