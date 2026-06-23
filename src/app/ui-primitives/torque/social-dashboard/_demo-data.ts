/**
 * Demo data for the Torque "Social marketing home" screen (social-dashboard).
 *
 * A Postiz-style social command dashboard for Oak Flats Muffler Men, Illawarra
 * NSW. Realistic late-May 2026 marketing content across the four live channels
 * (Facebook / Instagram / TikTok / YouTube): connected accounts, upcoming and
 * recently-published posts, engagement analytics, campaign performance, and the
 * owner approval queue.
 *
 * Every export is typed against the existing primitive families — no primitive
 * is modified. Data only.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque". The
 * underlying scheduling/marketing engine is internal and never surfaced by name.
 */

import type {
  ApprovalStage,
  AudienceSeries,
  ConnectedAccount,
  MentionInboxItem,
  PlatformDescriptor,
  PostEngagement,
  ScheduledPost,
} from "../../components/social-scheduler"
import type {
  CampaignStatus,
  ChannelKind,
  FunnelStep,
  ResultsTile,
} from "../../components/marketing-campaigns"
import type { BarSeries, DonutSegment } from "../../components/charts"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"
export const TODAY_LABEL = "Thu 28 May 2026"

export type Tone = "red" | "amber" | "teal" | "green" | "neutral"

/* ---- Platforms ----------------------------------------------------------- */

/** The four channels Mufflermen actively publishes to, in priority order. */
export const PLATFORMS: ReadonlyArray<PlatformDescriptor> = [
  {
    key: "facebook",
    label: "Facebook",
    handle: "@MufflerMen",
    charLimit: 5000,
    aspectRatios: ["1:1", "16:9", "4:5"],
    tone: "teal",
    mark: "FB",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@mufflermen.au",
    charLimit: 2200,
    aspectRatios: ["1:1", "4:5", "9:16"],
    tone: "red",
    mark: "IG",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@mufflermenwollongong",
    charLimit: 2200,
    aspectRatios: ["9:16"],
    tone: "neutral",
    mark: "TT",
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "@MufflerMenAU",
    charLimit: 5000,
    aspectRatios: ["16:9", "9:16"],
    tone: "red",
    mark: "YT",
  },
]

/* ---- Connected accounts (AccountConnectorCard) --------------------------- */

export const CONNECTED_ACCOUNTS: ReadonlyArray<ConnectedAccount> = [
  {
    id: "acc-fb",
    platform: "facebook",
    handle: "@MufflerMen",
    displayName: "Oak Flats Muffler Men",
    followerCount: 24800,
    status: "connected",
    expiresAt: "2026-08-14T00:00:00+10:00",
    lastSyncedAt: "2026-05-28T08:05:00+10:00",
    scopes: ["pages_manage_posts", "pages_read_engagement", "insights"],
  },
  {
    id: "acc-ig",
    platform: "instagram",
    handle: "@mufflermen.au",
    displayName: "Muffler Men · Oak Flats",
    followerCount: 18260,
    status: "connected",
    expiresAt: "2026-07-30T00:00:00+10:00",
    lastSyncedAt: "2026-05-28T08:05:00+10:00",
    scopes: ["instagram_content_publish", "instagram_manage_insights"],
  },
  {
    id: "acc-tt",
    platform: "tiktok",
    handle: "@mufflermenwollongong",
    displayName: "Muffler Men Wollongong",
    followerCount: 12940,
    status: "expiring",
    expiresAt: "2026-06-02T00:00:00+10:00",
    lastSyncedAt: "2026-05-28T07:40:00+10:00",
    scopes: ["video.publish", "video.list", "user.info.basic"],
  },
  {
    id: "acc-yt",
    platform: "youtube",
    handle: "@MufflerMenAU",
    displayName: "Oak Flats Muffler Men",
    followerCount: 9120,
    status: "error",
    expiresAt: "2026-06-19T00:00:00+10:00",
    lastSyncedAt: "2026-05-27T21:12:00+10:00",
    scopes: ["youtube.upload", "youtube.readonly"],
  },
]

/* ---- Header posture stats ------------------------------------------------ */

export interface PostureStat {
  id: string
  label: string
  value: string
  detail: string
  tone: Tone
}

export const POSTURE_STATS: ReadonlyArray<PostureStat> = [
  {
    id: "reach",
    label: "30-day reach",
    value: "182k",
    detail: "across the four live channels",
    tone: "teal",
  },
  {
    id: "scheduled",
    label: "Scheduled",
    value: "11",
    detail: "posts queued through June",
    tone: "green",
  },
  {
    id: "pending",
    label: "Awaiting you",
    value: "3",
    detail: "held at the owner gate",
    tone: "amber",
  },
  {
    id: "accounts",
    label: "Connected",
    value: "4",
    detail: "1 token expiring · 1 sync error",
    tone: "red",
  },
]

/* ---- Recently published + upcoming posts (PostCard) ---------------------- */

export const RECENTLY_PUBLISHED: ReadonlyArray<ScheduledPost> = [
  {
    id: "pub-falcon-gtho",
    title: "Falcon GT-HO Phase IV — restored twin system",
    scheduledFor: "2026-05-27T17:30:00+10:00",
    status: "published",
    platforms: ["instagram", "facebook", "youtube"],
    preview:
      "A genuine Phase IV came through Bay 1 this week. Hand-fabricated 2.5\" twin system, mandrel-bent and TIG-welded in Oak Flats — every bend matched to the original drawings.",
    engagement: { likes: 3120, comments: 184, shares: 268, saves: 540, rate: 0.097 },
  },
  {
    id: "pub-ranger-raptor",
    title: "Ranger Raptor turbo-back: before / after",
    scheduledFor: "2026-05-25T08:00:00+10:00",
    status: "published",
    platforms: ["instagram", "tiktok"],
    preview:
      "Factory restriction gone. A free-flowing 3\" turbo-back with a resonator delete kept it touring-quiet on the highway and woken up everywhere else. Fitted while the owner waited.",
    engagement: { likes: 2480, comments: 132, shares: 196, saves: 410, rate: 0.088 },
  },
  {
    id: "pub-winter-service",
    title: "Winter servicing slots are filling up",
    scheduledFor: "2026-05-23T07:30:00+10:00",
    status: "published",
    platforms: ["facebook"],
    preview:
      "Beat the July rego rush — book a winter service and exhaust health check now. Local techs, genuine parts, honest quotes. Five spots left this fortnight at Oak Flats.",
    engagement: { likes: 612, comments: 48, shares: 74, saves: 96, rate: 0.041 },
  },
]

export const UPCOMING_POSTS: ReadonlyArray<ScheduledPost> = [
  {
    id: "up-dyno-tuesday",
    title: "Dyno Tuesday: turbo Patrol Y62 — 318rwkw",
    scheduledFor: "2026-06-02T17:00:00+10:00",
    status: "scheduled",
    platforms: ["facebook", "youtube"],
    preview:
      "318rwkw and 690Nm at the wheels on Steve's Y62 after a full turbo-back and tune. Curve in the carousel — quiet cruising, serious shove.",
    approver: "Mia (brand)",
  },
  {
    id: "up-cat-back-reel",
    title: "300ZX cat-back fab time-lapse",
    scheduledFor: "2026-06-04T09:30:00+10:00",
    status: "scheduled",
    platforms: ["instagram", "tiktok"],
    preview:
      "Quiet at idle, brutal up top. Watch a custom 3\" stainless cat-back come together in Bay 2, bend by bend.",
  },
  {
    id: "up-pacemaker",
    title: "Now stocking genuine Pacemaker headers",
    scheduledFor: "2026-06-06T14:00:00+10:00",
    status: "scheduled",
    platforms: ["instagram", "youtube"],
    preview:
      "Tuned-length runners, ceramic-coat options, fitted in-house at Oak Flats. Drop us a model and we'll match the right set.",
  },
]

/* ---- Approval-pending queue (PostCard + ApprovalStageTracker) ------------ */

export const PENDING_APPROVAL_POSTS: ReadonlyArray<ScheduledPost> = [
  {
    id: "gate-dyno-200",
    title: "Dyno Tuesday: 200 Series — 254rwkw / 612Nm",
    scheduledFor: "2026-06-02T17:00:00+10:00",
    status: "in-review",
    platforms: ["facebook", "youtube"],
    preview:
      "254rwkw and 612Nm on Dave's 200 Series. Drafted by Torque, brand-checked by Mia — waiting on your sign-off before it queues.",
    approver: "Daniel (admin)",
  },
  {
    id: "gate-hilux-reveal",
    title: "Hilux N80 before / after reveal",
    scheduledFor: "2026-06-03T08:00:00+10:00",
    status: "in-review",
    platforms: ["instagram", "tiktok"],
    preview:
      "Factory tin can → hand-rolled 2.5\" twin-tip. Drafted and ready, sitting on brand-voice review.",
    approver: "Mia (brand)",
  },
  {
    id: "gate-touring-promo",
    title: "Long-weekend touring tune-up offer",
    scheduledFor: "2026-06-05T07:30:00+10:00",
    status: "draft",
    platforms: ["facebook", "instagram"],
    preview:
      "10% off touring exhaust packages booked before the June long weekend. Torque flagged the discount line for your call.",
    approver: "Daniel (admin)",
  },
]

/** Approval workflow for the highlighted gated post (Dyno Tuesday 200 Series). */
export const APPROVAL_STAGES: ReadonlyArray<ApprovalStage> = [
  {
    id: "ap-draft",
    label: "Torque drafted",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-05-27T16:40:00+10:00",
    note: "Caption, carousel order and three hashtag groups generated from the dyno sheet.",
  },
  {
    id: "ap-brand",
    label: "Brand voice",
    owner: "Mia (brand)",
    state: "approved",
    completedAt: "2026-05-27T17:55:00+10:00",
    note: "Tightened the headline and swapped one hashtag. On-brand.",
  },
  {
    id: "ap-admin",
    label: "Owner sign-off",
    owner: "Daniel (admin)",
    state: "current",
    note: "Pending final approval before anything posts to the four channels.",
  },
  {
    id: "ap-queued",
    label: "Queued to publish",
    owner: "Torque",
    state: "pending",
  },
]

/* ---- Engagement analytics (EngagementAnalyticsStrip) --------------------- */

export const ENGAGEMENT_30D: PostEngagement = {
  likes: 18420,
  comments: 1264,
  shares: 2180,
  saves: 4360,
  rate: 0.072,
}

export const ENGAGEMENT_TRENDS = {
  likes: [820, 910, 1040, 980, 1180, 1340, 1290, 1460] as ReadonlyArray<number>,
  comments: [44, 52, 61, 58, 72, 80, 88, 96] as ReadonlyArray<number>,
  shares: [88, 96, 120, 110, 142, 168, 180, 210] as ReadonlyArray<number>,
  saves: [240, 280, 320, 300, 380, 420, 480, 540] as ReadonlyArray<number>,
} as const

export const ENGAGEMENT_DELTAS = {
  likes: 0.124,
  comments: 0.087,
  shares: 0.182,
  saves: 0.214,
} as const

/* ---- Audience growth (AudienceGrowthChart) ------------------------------- */

function ramp(
  start: number,
  monthlyGain: number,
  samples: number,
): ReadonlyArray<{ date: string; followers: number }> {
  return Array.from({ length: samples }, (_, idx) => {
    const followers = Math.round(start + (monthlyGain / (samples - 1)) * idx)
    const day = String(idx * 3 + 1).padStart(2, "0")
    return { date: `2026-05-${day}`, followers }
  })
}

export const AUDIENCE_SERIES: ReadonlyArray<AudienceSeries> = [
  {
    platform: "facebook",
    current: 24800,
    delta30d: 1240,
    points: ramp(23560, 1240, 11),
  },
  {
    platform: "instagram",
    current: 18260,
    delta30d: 1680,
    points: ramp(16580, 1680, 11),
  },
  {
    platform: "tiktok",
    current: 12940,
    delta30d: 2310,
    points: ramp(10630, 2310, 11),
  },
  {
    platform: "youtube",
    current: 9120,
    delta30d: 540,
    points: ramp(8580, 540, 11),
  },
]

/* ---- Reach-by-channel bar chart (BarChart) ------------------------------- */

export const REACH_BAR_SERIES: ReadonlyArray<BarSeries> = [
  {
    label: "This month",
    tone: "red",
    values: [62, 54, 41, 25],
  },
  {
    label: "Last month",
    tone: "teal",
    values: [55, 44, 28, 22],
  },
]

export const REACH_BAR_LABELS: ReadonlyArray<string> = ["FB", "IG", "TikTok", "YT"]

/* ---- Content-type mix donut (DonutChart) --------------------------------- */

export const CONTENT_MIX: ReadonlyArray<DonutSegment> = [
  { label: "Build reels", value: 42, tone: "red" },
  { label: "Dyno results", value: 26, tone: "amber" },
  { label: "Servicing", value: 20, tone: "teal" },
  { label: "Supplier features", value: 12, tone: "green" },
]

/* ---- Campaign performance (CampaignCard + RealTimeResultsCard + funnel) --- */

export interface DashboardCampaign {
  id: string
  name: string
  objective: string
  status: CampaignStatus
  channels: ReadonlyArray<ChannelKind>
  audienceSize: number
  sendWindow: string
  badge?: string
}

export const CAMPAIGNS: ReadonlyArray<DashboardCampaign> = [
  {
    id: "camp-build-series",
    name: "Bay 2 Build Series",
    objective: "Showcase custom fab work — drive dyno + cat-back enquiries.",
    status: "running",
    channels: ["social"],
    audienceSize: 52600,
    sendWindow: "Tue & Thu 5:00pm AEST",
    badge: "Top",
  },
  {
    id: "camp-winter-tune",
    name: "Winter Tune-Up Drive",
    objective: "Fill servicing bays before the July rego rush.",
    status: "running",
    channels: ["social", "email"],
    audienceSize: 41200,
    sendWindow: "Weekday 7:30am AEST",
    badge: "A/B",
  },
  {
    id: "camp-4wd-touring",
    name: "4WD Touring Season",
    objective: "Target tourers prepping rigs for the long-weekend run.",
    status: "scheduled",
    channels: ["social"],
    audienceSize: 38400,
    sendWindow: "Sat 9:00am AEST",
  },
]

/** Live results for the top campaign — feeds RealTimeResultsCard. */
export const TOP_CAMPAIGN_NAME = "Bay 2 Build Series · last 7 days"

export const TOP_CAMPAIGN_TILES: ReadonlyArray<ResultsTile> = [
  {
    kind: "sent",
    value: "8",
    delta: { label: "2 vs last wk", direction: "up" },
    trend: [3, 4, 5, 5, 6, 7, 8],
  },
  {
    kind: "delivered",
    value: "142k",
    delta: { label: "11% reach", direction: "up" },
    trend: [88, 96, 112, 120, 128, 136, 142],
  },
  {
    kind: "opened",
    value: "9.4k",
    delta: { label: "engaged", direction: "up" },
    trend: [4.2, 5.1, 6.0, 6.8, 7.6, 8.5, 9.4],
  },
  {
    kind: "clicked",
    value: "1.3k",
    delta: { label: "to bookings", direction: "up" },
    trend: [0.4, 0.6, 0.7, 0.9, 1.0, 1.2, 1.3],
  },
  {
    kind: "bounced",
    value: "0.6%",
    delta: { label: "stable", direction: "flat" },
    trend: [0.7, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6],
  },
]

/** Social-to-booking funnel for the build series. */
export const BOOKING_FUNNEL_NAME = "Social → workshop booking"

export const BOOKING_FUNNEL_STEPS: ReadonlyArray<FunnelStep> = [
  { label: "Reached", count: 142000 },
  { label: "Engaged", count: 9400 },
  { label: "Profile tap", count: 2860 },
  { label: "Enquiry", count: 640 },
  { label: "Booked", count: 184 },
]

/* ---- Mention inbox (MentionInboxRow) ------------------------------------- */

export const MENTIONS: ReadonlyArray<MentionInboxItem> = [
  {
    id: "m-falcon",
    platform: "instagram",
    authorHandle: "@classic_ford_au",
    authorName: "Classic Ford AU",
    body: "That Phase IV system is a work of art — bends are spot on. Where are you guys based?",
    kind: "comment",
    sentiment: "positive",
    receivedAt: "2026-05-28T07:20:00+10:00",
    unread: true,
  },
  {
    id: "m-patrol",
    platform: "facebook",
    authorHandle: "Steve M.",
    authorName: "Steve McKenna",
    body: "Booked the Y62 in for the turbo-back next week. Can't wait to hear it on the dyno.",
    kind: "mention",
    sentiment: "positive",
    receivedAt: "2026-05-28T06:55:00+10:00",
    unread: true,
  },
  {
    id: "m-quote",
    platform: "tiktok",
    authorHandle: "@illawarra_4wd",
    authorName: "Illawarra 4WD",
    body: "How much for a turbo-back on a 79 Series? Touring setup, quiet on the highway.",
    kind: "dm",
    sentiment: "neutral",
    receivedAt: "2026-05-27T19:40:00+10:00",
  },
  {
    id: "m-wait",
    platform: "facebook",
    authorHandle: "Karen P.",
    authorName: "Karen Patel",
    body: "Waited a while for a callback on my booking last week — otherwise great work on the Ranger.",
    kind: "comment",
    sentiment: "negative",
    receivedAt: "2026-05-27T15:10:00+10:00",
  },
]
