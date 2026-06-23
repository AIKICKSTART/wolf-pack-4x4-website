import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  ApprovalStageTracker,
  AudienceGrowthChart,
  EngagementAnalyticsStrip,
} from "../../components/social-scheduler"
import {
  CampaignCard,
  ConversionFunnelCard,
  RealTimeResultsCard,
} from "../../components/marketing-campaigns"
import { BarChart, DonutChart } from "../../components/charts"

import {
  AccountsSection,
  ChartCard,
  HeaderBand,
  MentionRail,
  PostList,
  PostsSection,
  RailHeader,
} from "./_components"
import {
  APPROVAL_STAGES,
  AUDIENCE_SERIES,
  BOOKING_FUNNEL_NAME,
  BOOKING_FUNNEL_STEPS,
  CAMPAIGNS,
  CONNECTED_ACCOUNTS,
  CONTENT_MIX,
  ENGAGEMENT_30D,
  ENGAGEMENT_DELTAS,
  ENGAGEMENT_TRENDS,
  MENTIONS,
  PENDING_APPROVAL_POSTS,
  PLATFORMS,
  POSTURE_STATS,
  REACH_BAR_LABELS,
  REACH_BAR_SERIES,
  RECENTLY_PUBLISHED,
  TOP_CAMPAIGN_NAME,
  TOP_CAMPAIGN_TILES,
  UPCOMING_POSTS,
} from "./_demo-data"
import styles from "./social-dashboard.module.css"

export const metadata: Metadata = {
  title: "Social marketing home | Torque",
  description:
    "The Oak Flats Muffler Men social command dashboard — connected accounts, upcoming and recently-published posts, engagement analytics, campaign performance, and the owner approval queue. Composed entirely from registered UI primitives.",
}

export default function SocialDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Torque / Social marketing home"
        title="Social marketing home"
        description="One screen for the whole Mufflermen social operation across Facebook, Instagram, TikTok and YouTube. See connected accounts, what just published, what's queued, how engagement and campaigns are tracking — and clear the three posts waiting at the owner gate. Live, light + dark, built only from registered primitives."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque" },
          { label: "Social marketing home" },
        ]}
      />

      <HeaderBand stats={POSTURE_STATS} />

      <AccountsSection accounts={CONNECTED_ACCOUNTS} platforms={PLATFORMS} />

      <div className={styles.layout}>
        <div className={styles.column}>
          <PostsSection
            id="social-dashboard-published-title"
            kicker="Just went out"
            title="Recently published"
            aside="The Phase IV restoration is pulling a 9.7% engagement rate — your strongest post this quarter."
            posts={RECENTLY_PUBLISHED}
            platforms={PLATFORMS}
          />

          <section
            className={styles.section}
            aria-labelledby="social-dashboard-analytics-title"
          >
            <header className={styles.sectionHead}>
              <span className={styles.sectionHeadText}>
                <span className={styles.sectionKicker}>Last 30 days</span>
                <h2
                  id="social-dashboard-analytics-title"
                  className={styles.sectionTitle}
                >
                  Engagement analytics
                </h2>
              </span>
              <p className={styles.sectionAside}>
                Saves are up 21% on the build content — Torque is shifting more of the calendar to
                fabrication reels.
              </p>
            </header>

            <EngagementAnalyticsStrip
              title="All channels"
              engagement={ENGAGEMENT_30D}
              trends={ENGAGEMENT_TRENDS}
              deltas={ENGAGEMENT_DELTAS}
            />

            <AudienceGrowthChart
              title="Audience growth · 30 days"
              series={AUDIENCE_SERIES}
              platforms={PLATFORMS}
            />

            <div className={styles.analyticsSplit}>
              <ChartCard kicker="Reach index" title="Reach by channel vs last month">
                <BarChart
                  series={[...REACH_BAR_SERIES]}
                  xLabels={[...REACH_BAR_LABELS]}
                  mode="grouped"
                  height={220}
                  ariaLabel="Reach by channel this month versus last month, indexed in thousands"
                  unit="k"
                />
              </ChartCard>

              <ChartCard kicker="Content mix" title="What we posted this month">
                <DonutChart
                  segments={[...CONTENT_MIX]}
                  ariaLabel="Content type mix: build reels, dyno results, servicing, supplier features"
                  centerLabel="42%"
                  centerCaption="build reels"
                  size={200}
                />
              </ChartCard>
            </div>
          </section>

          <section
            className={styles.section}
            aria-labelledby="social-dashboard-campaigns-title"
          >
            <header className={styles.sectionHead}>
              <span className={styles.sectionHeadText}>
                <span className={styles.sectionKicker}>3 active</span>
                <h2
                  id="social-dashboard-campaigns-title"
                  className={styles.sectionTitle}
                >
                  Campaign performance
                </h2>
              </span>
              <p className={styles.sectionAside}>
                The Build Series is doing the heavy lifting — 184 workshop bookings traced back to
                social this week.
              </p>
            </header>

            <div className={styles.campaignList}>
              {CAMPAIGNS.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  name={campaign.name}
                  objective={campaign.objective}
                  status={campaign.status}
                  channels={campaign.channels}
                  audienceSize={campaign.audienceSize}
                  sendWindow={campaign.sendWindow}
                  badge={campaign.badge}
                />
              ))}
            </div>

            <RealTimeResultsCard
              campaignName={TOP_CAMPAIGN_NAME}
              tiles={TOP_CAMPAIGN_TILES}
            />

            <ConversionFunnelCard
              campaignName={BOOKING_FUNNEL_NAME}
              steps={BOOKING_FUNNEL_STEPS}
            />
          </section>
        </div>

        <aside className={styles.rail} aria-label="Approval queue, upcoming posts, and mentions">
          <section
            className={styles.approvalFrame}
            aria-labelledby="social-dashboard-gate-title"
          >
            <header className={styles.approvalIntro}>
              <span className={styles.approvalKicker}>Approval before posting</span>
              <h2 id="social-dashboard-gate-title" className={styles.approvalHeading}>
                Owner gate
              </h2>
              <p className={styles.approvalCopy}>
                Torque drafts and Mia checks the voice — but the Dyno Tuesday 200 Series post stays
                held until you sign off.
              </p>
            </header>
            <ApprovalStageTracker
              title="Dyno Tuesday: 200 Series"
              stages={[...APPROVAL_STAGES]}
            />
          </section>

          <section
            className={styles.section}
            aria-labelledby="social-dashboard-pending-title"
          >
            <RailHeader
              id="social-dashboard-pending-title"
              kicker="Needs your call"
              title="Pending approval"
              count={PENDING_APPROVAL_POSTS.length}
              variant="approval"
            />
            <PostList posts={PENDING_APPROVAL_POSTS} platforms={PLATFORMS} />
          </section>

          <section
            className={styles.section}
            aria-labelledby="social-dashboard-upcoming-title"
          >
            <RailHeader
              id="social-dashboard-upcoming-title"
              kicker="Next out the door"
              title="Upcoming posts"
              count={UPCOMING_POSTS.length}
              variant="upcoming"
            />
            <PostList posts={UPCOMING_POSTS} platforms={PLATFORMS} />
          </section>

          <MentionRail mentions={MENTIONS} platforms={PLATFORMS} />
        </aside>
      </div>
    </main>
  )
}
