import type { Metadata } from "next"

import {
  AbandonedQuoteNudge,
  AudienceBuilder,
  CampaignBudgetPanel,
  ConsentStateTile,
  CreativeVariantCard,
  DripSequenceRow,
  EngagementDecayChart,
  GoalFunnelCard,
  JourneyCanvas,
  LeadScoreMatrix,
  PersonalizationTokenRow,
  SendTimeOptimizer,
  WinBackCampaignCard,
} from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_ABANDONED_NUDGE,
  DEMO_BUDGET_ACTUAL,
  DEMO_BUDGET_IDEAL,
  DEMO_DRIP_ROWS,
  DEMO_SEND_TIME_RECIPIENTS,
  DYNO_BOOKING_FUNNEL,
  ENGAGEMENT_DECAY_SERIES,
  ILLAWARRA_4WD_AUDIENCE,
  LEAD_SCORE_COLS,
  LEAD_SCORE_ROWS,
  LEAD_SCORE_VALUES,
  NEW_LEAD_JOURNEY_EDGES,
  NEW_LEAD_JOURNEY_NODES,
} from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Full marketing automation orchestrator | Marketing automation",
  description:
    "Composition — all fourteen marketing-automation primitives composed into one live Mufflermen orchestrator surface.",
}

const RECOVER_TREND = [12, 18, 22, 19, 31, 38, 44, 52]

export default function FullOrchestratorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Live orchestrator"
        title="Full marketing automation orchestrator"
        description="All fourteen primitives composed into a single Mufflermen marketing-automation surface: journey canvas at the top, audience + lead score mid-left, drip cadence + variants right, win-back + abandoned-quote nudge, budget + funnel + send-time, consent + tokens + engagement decay at the bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Full orchestrator" },
        ]}
      />

      <div className={styles.orchestrator}>
        <section className={styles.demoSurface} aria-labelledby="orc-canvas">
          <h2 className={styles.demoLabel} id="orc-canvas">
            Active journey
          </h2>
          <JourneyCanvas
            title="New lead · 7-day workshop intro"
            nodes={NEW_LEAD_JOURNEY_NODES}
            edges={NEW_LEAD_JOURNEY_EDGES}
            liveCount={184}
          />
        </section>

        <div className={styles.orchestratorTop}>
          <div className={styles.orchestratorCol}>
            <AudienceBuilder
              title="Illawarra 4WD · Bay 2 dyno"
              groups={ILLAWARRA_4WD_AUDIENCE}
              estimate={1284}
              estimateDelta={{ value: 184, direction: "up" }}
            />
            <LeadScoreMatrix
              title="Mufflermen lead score"
              rows={LEAD_SCORE_ROWS}
              cols={LEAD_SCORE_COLS}
              scores={LEAD_SCORE_VALUES}
              threshold={70}
            />
          </div>
          <div className={styles.orchestratorCol}>
            <section className={styles.demoSurface}>
              <h3 className={styles.demoLabel}>Quote-recovery cadence</h3>
              <div className={styles.demoStack}>
                {DEMO_DRIP_ROWS.map((step, idx) => (
                  <DripSequenceRow
                    key={step.id}
                    index={idx + 1}
                    channel={step.channel}
                    title={step.title}
                    preview={step.preview}
                    delayLabel={step.delayLabel}
                    openRate={step.openRate}
                    clickRate={step.clickRate}
                    status={step.status}
                    predicate={step.predicate}
                  />
                ))}
              </div>
            </section>
            <section className={styles.demoSurface}>
              <h3 className={styles.demoLabel}>Subject line A/B · winner declared</h3>
              <div className={styles.variantGrid}>
                <CreativeVariantCard
                  variant="A"
                  subject="Bay 2 slots open this week"
                  body="G'day {{first_name}}, Bay 2 has slots Thu + Fri this week. Lock in your dyno tune online."
                  openRate={42.1}
                  clickRate={4.2}
                  conversionRate={1.6}
                  weight={20}
                  signal="loser"
                />
                <CreativeVariantCard
                  variant="B"
                  subject="Hot lap this Thursday?"
                  body="Spare a hot lap this Thursday? Mufflermen Bay 2 is taking dyno bookings — same-day fit on most cat-back kits."
                  openRate={46.8}
                  clickRate={6.4}
                  conversionRate={2.4}
                  weight={80}
                  signal="winner"
                />
              </div>
            </section>
          </div>
        </div>

        <div className={styles.orchestratorMid}>
          <div className={styles.orchestratorCol}>
            <AbandonedQuoteNudge
              reference="QT-2026-04193"
              amount={2840}
              abandonedAt="32 min ago · Mon 6:42pm"
              schedule={DEMO_ABANDONED_NUDGE}
              incentive="Free roadworthy with service booked in 7 days"
            />
            <WinBackCampaignCard
              name="Lapsed 365d · 15% off first service"
              cohortLabel="Lapsed ≥ 365 days"
              cohortSize={1820}
              recoverTrend={RECOVER_TREND}
              predictedRecovers={184}
              projectedRevenue={32400}
              baselineReactivationRate={9.6}
              incentiveHeadline="15% off first service · Bay 2 priority slot"
              incentiveFootnote="One-time use. Valid 30 days. Excludes Manta cat-back."
            />
          </div>
          <div className={styles.orchestratorCol}>
            <GoalFunnelCard
              goalName="Bay 2 dyno session"
              description="Quote requested → Bay 2 booking confirmed within 14 days."
              steps={DYNO_BOOKING_FUNNEL}
              averageValue={420}
            />
            <CampaignBudgetPanel
              campaignName="Winter exhaust deals"
              dailyBudget={2400}
              spentToday={1820}
              projectedSpend={2860}
              pacing="ahead"
              actualPoints={DEMO_BUDGET_ACTUAL}
              idealPoints={DEMO_BUDGET_IDEAL}
            />
          </div>
        </div>

        <div className={styles.orchestratorWide}>
          <SendTimeOptimizer
            title="Winter exhaust deals · cohort A"
            band="medium"
            recipients={DEMO_SEND_TIME_RECIPIENTS}
          />
          <EngagementDecayChart
            title="Mufflermen channels · half-life"
            series={ENGAGEMENT_DECAY_SERIES}
          />
        </div>

        <div className={styles.orchestratorMid}>
          <section className={styles.demoSurface}>
            <h3 className={styles.demoLabel}>Personalisation audit</h3>
            <div className={styles.demoStack}>
              <PersonalizationTokenRow
                token="{{first_name}}"
                source="Contact attribute · first_name"
                previewBefore="G'day "
                previewValue="Dazza"
                previewAfter=", your Hilux quote is saved."
                fallback="Mate"
              />
              <PersonalizationTokenRow
                token="{{vehicle.make}}"
                source="Vehicle attribute"
                previewBefore="Your "
                previewValue="Hilux"
                previewAfter=" cat-back is ready in Bay 2."
                fallback="vehicle"
              />
              <PersonalizationTokenRow
                token="{{quote.amount}}"
                source="Quote attribute · amount"
                previewBefore="Quote total: "
                previewValue="$2,840"
                previewAfter=" inc. GST."
              />
            </div>
          </section>
          <ConsentStateTile
            name="Dazza Whittaker"
            email="dazza.w@bigpond.com"
            status="double-opt-in"
            optedInAt="2024-11-12 · 09:42"
            confirmedAt="2024-11-12 · 09:48"
            lastSentAt="2026-05-21 · 18:30"
            unsubscribeHref="/unsubscribe?token=demo-token-dazza"
            note="Confirmed via Spam-Act-compliant double opt-in flow."
          />
        </div>
      </div>
    </main>
  )
}
