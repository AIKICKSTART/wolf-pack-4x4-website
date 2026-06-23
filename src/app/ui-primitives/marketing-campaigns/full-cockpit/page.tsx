import type { Metadata } from "next"

import {
  ABVariantEditor,
  AudienceSegmentBuilder,
  CampaignCard,
  CampaignTemplateChooser,
  ChannelMixPicker,
  ConversionFunnelCard,
  CreativeGallery,
  DripSequenceEditor,
  GoalKpiSelector,
  RealTimeResultsCard,
  ScheduleLauncher,
  SendTimeOptimizer,
  SubjectLineTester,
  UtmParameterBuilder,
} from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_AB_VARIANTS,
  DEMO_CAMPAIGN_NAME,
  DEMO_CHANNEL_MIX,
  DEMO_CHANNEL_ROWS,
  DEMO_CREATIVES,
  DEMO_DRIP_META,
  DEMO_DRIP_TOUCHPOINTS,
  DEMO_FUNNEL_STEPS,
  DEMO_GOAL_OPTIONS,
  DEMO_HEATMAP_CELLS,
  DEMO_RESULTS_TILES,
  DEMO_SEGMENT_GROUPS,
  DEMO_SEND_RECOMMENDATION,
  DEMO_SUBJECT_SUGGESTIONS,
  DEMO_TEMPLATES,
} from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Full campaign cockpit | Marketing campaigns",
  description:
    "Composition — all 14 marketing campaign primitives composed into a single Klaviyo-style campaign cockpit.",
}

export default function FullCockpitScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Campaign cockpit"
        title="Full campaign cockpit"
        description="All fourteen primitives composed into one Klaviyo-style cockpit: campaign list on top, segment + variant + channel mix mid-block, schedule + goal + send-time + subject side, live results + funnel below, template chooser + UTM + drip sequence at the bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Full cockpit" },
        ]}
      />

      <div className={styles.cockpit}>
        <section className={styles.demoSurface} aria-labelledby="cockpit-campaigns">
          <h2 className={styles.demoLabel} id="cockpit-campaigns">
            Active campaigns
          </h2>
          <div className={styles.demoStack}>
            <CampaignCard
              name="Winter exhaust deals"
              objective="Drive Bay 2 dyno bookings before EOFY"
              status="running"
              channels={["email", "sms"]}
              audienceSize={8420}
              sendWindow="Tue 6:30pm AEST"
              badge="A/B"
            />
            <CampaignCard
              name="Manta launch announcement"
              objective="Convert Hilux owners in Illawarra to Manta cat-back"
              status="scheduled"
              channels={["email", "social", "banner"]}
              audienceSize={12480}
              sendWindow="Thu 7:00pm AEST"
            />
            <CampaignCard
              name="Bay 2 availability blast"
              objective="Fill last-minute Bay 2 slots Friday"
              status="draft"
              channels={["sms", "push"]}
              audienceSize={2840}
              sendWindow="Fri 11:00am AEST"
            />
          </div>
        </section>

        <div className={styles.cockpitTop}>
          <div className={styles.cockpitCol}>
            <AudienceSegmentBuilder
              groups={DEMO_SEGMENT_GROUPS}
              estimate={3284}
              estimateDelta="+184 vs last preview"
            />
            <ABVariantEditor
              variants={DEMO_AB_VARIANTS}
              defaultWinnerRule="clicks"
            />
          </div>
          <div className={styles.cockpitCol}>
            <ChannelMixPicker
              options={DEMO_CHANNEL_MIX}
              defaultActive={["email", "sms", "push"]}
              matrixRows={DEMO_CHANNEL_ROWS}
            />
            <ScheduleLauncher
              defaultMode="specific"
              defaultDateTime="2026-06-02T18:30"
              defaultTimezone="Australia/Sydney"
            />
          </div>
        </div>

        <div className={styles.cockpitMid}>
          <div className={styles.cockpitCol}>
            <GoalKpiSelector
              options={DEMO_GOAL_OPTIONS}
              defaultGoal="bookings"
            />
            <SubjectLineTester
              defaultSubject="Manta cat-back is in — book your install"
              suggestions={DEMO_SUBJECT_SUGGESTIONS}
            />
          </div>
          <div className={styles.cockpitCol}>
            <SendTimeOptimizer
              cells={DEMO_HEATMAP_CELLS}
              recommended={DEMO_SEND_RECOMMENDATION}
              defaultOverride="18:00"
            />
            <CreativeGallery
              assets={DEMO_CREATIVES}
              defaultFilter="all"
            />
          </div>
        </div>

        <div className={styles.cockpitWide}>
          <RealTimeResultsCard
            campaignName={DEMO_CAMPAIGN_NAME}
            tiles={DEMO_RESULTS_TILES}
          />
          <ConversionFunnelCard
            campaignName={DEMO_CAMPAIGN_NAME}
            steps={DEMO_FUNNEL_STEPS}
          />
        </div>

        <div className={styles.cockpitWide}>
          <CampaignTemplateChooser
            templates={DEMO_TEMPLATES}
            defaultTab="library"
          />
          <UtmParameterBuilder />
          <DripSequenceEditor
            meta={DEMO_DRIP_META}
            touchpoints={DEMO_DRIP_TOUCHPOINTS}
          />
        </div>
      </div>
    </main>
  )
}
