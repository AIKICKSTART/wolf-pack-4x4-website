import type { Metadata } from "next"

import {
  AccountConnectorCard,
  ApprovalStageTracker,
  AudienceGrowthChart,
  BestTimeHeatmap,
  CaptionAiStudio,
  CrossPlatformComposer,
  EngagementAnalyticsStrip,
  HashtagStrategyPanel,
  MediaBinder,
  MentionInboxRow,
  PostCard,
  QueueCalendar,
  RepurposeFlow,
  WebhookEventLog,
} from "../../components/social-scheduler"
import { PageHeader } from "../../components/page-header"

import {
  APPROVAL_STAGES,
  AUDIENCE_SERIES,
  buildAccounts,
  buildScheduledPosts,
  CALENDAR_DAYS,
  CAPTION_PRESETS,
  ENGAGEMENT_DELTAS,
  ENGAGEMENT_TRENDS,
  HASHTAG_GROUPS,
  HASHTAG_POOL,
  HEATMAP_CELLS,
  MEDIA_BINDER_ITEMS,
  MENTION_INBOX,
  PLATFORMS,
  POST_ENGAGEMENT,
  REPURPOSE_STAGES,
  SAMPLE_HASHTAGS,
  WEBHOOK_EVENTS,
} from "../_mock-data"
import styles from "../social-scheduler.module.css"

export const metadata: Metadata = {
  title: "Muffler Pulse control room | UI Primitives",
  description:
    "Full Muffler Pulse control room — all 14 social-scheduler primitives composed into one live planning, scheduling, and listening surface.",
}

export default function FullPulsePage() {
  const accounts = buildAccounts()
  const posts = buildScheduledPosts()
  const platformFor = (key: string) =>
    PLATFORMS.find((p) => p.key === key) ?? PLATFORMS[0]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full pulse"
        title="Muffler Pulse — control room"
        description="The full composition. Compose, schedule, approve, monitor, listen — all 14 primitives wired into one surface using the real Mufflermen workshop's channels."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Social scheduler", href: "/ui-primitives/social-scheduler" },
          { label: "Full pulse" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>01 · Compose & schedule</span>
        <CrossPlatformComposer
          platforms={PLATFORMS}
          initialBody={
            "300ZX Twin Turbo on the hoist. Custom 3\" stainless cat-back fab'd in-house, mandrel bent, TIG welded. The bark hits different."
          }
          initialHashtags={SAMPLE_HASHTAGS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>02 · Publishing queue</span>
        <QueueCalendar
          days={CALENDAR_DAYS}
          platforms={PLATFORMS}
          initialView="month"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>03 · Connected channels</span>
        <div className={styles.pulseAccounts}>
          {accounts.map((account) => (
            <AccountConnectorCard
              key={account.id}
              account={account}
              platform={platformFor(account.platform)}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>04 · Caption AI studio</span>
        <CaptionAiStudio
          presets={CAPTION_PRESETS}
          hashtagPool={HASHTAG_POOL}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>05 + 11 · Scheduled posts + media binder</span>
        <div className={styles.pulseFooterRow}>
          <div className={styles.demoColumn}>
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} platforms={PLATFORMS} />
            ))}
          </div>
          <MediaBinder items={MEDIA_BINDER_ITEMS} platforms={PLATFORMS} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>06 + 09 · Hashtag strategy + best time</span>
        <div className={styles.pulseFooterRow}>
          <HashtagStrategyPanel groups={HASHTAG_GROUPS} />
          <BestTimeHeatmap cells={HEATMAP_CELLS} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>07 + 08 · Engagement + audience growth</span>
        <div className={styles.pulseFooterRow}>
          <EngagementAnalyticsStrip
            engagement={POST_ENGAGEMENT}
            trends={ENGAGEMENT_TRENDS}
            deltas={ENGAGEMENT_DELTAS}
          />
          <AudienceGrowthChart
            series={AUDIENCE_SERIES}
            platforms={PLATFORMS}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>10 + 12 · Repurpose + approvals</span>
        <div className={styles.pulseFooterRow}>
          <RepurposeFlow stages={REPURPOSE_STAGES} />
          <ApprovalStageTracker stages={APPROVAL_STAGES} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>13 + 14 · Webhooks + mention inbox</span>
        <div className={styles.pulseFooterRow}>
          <WebhookEventLog events={WEBHOOK_EVENTS} platforms={PLATFORMS} />
          <div className={styles.pulseMentions}>
            {MENTION_INBOX.map((mention) => (
              <MentionInboxRow
                key={mention.id}
                mention={mention}
                platform={platformFor(mention.platform)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
