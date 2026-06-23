/**
 * Demo data for the Torque "Social content calendar" screen.
 *
 * Real Oak Flats Muffler Men marketing content for June 2026 across the four
 * priority channels (Facebook / Instagram / TikTok / YouTube). The month grid
 * feeds the social-scheduler QueueCalendar; the side rail reuses PostCard +
 * ApprovalStageTracker; the campaign filter feeds CampaignCard.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque". The
 * underlying scheduling engine is internal and never surfaced by name here.
 */

import type {
  ApprovalStage,
  CalendarDay,
  PlatformDescriptor,
  ScheduledPost,
  SocialPlatform,
} from "../../components/social-scheduler"
import type {
  CampaignStatus,
  ChannelKind,
} from "../../components/marketing-campaigns/marketing-campaigns-types"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"
export const CALENDAR_MONTH_LABEL = "June 2026"

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

/* ---- Campaigns (the calendar filter) ------------------------------------- */

export type CampaignKey = "all" | "winter-tune" | "build-series" | "4wd-touring"

export interface CalendarCampaign {
  key: CampaignKey
  name: string
  /** Internal goal note. */
  objective: string
  status: CampaignStatus
  channels: ReadonlyArray<ChannelKind>
  audienceSize: number
  sendWindow: string
  badge?: string
  /** Accent tone for the filter chip. */
  tone: "red" | "amber" | "teal" | "green" | "neutral"
}

export const CAMPAIGNS: ReadonlyArray<CalendarCampaign> = [
  {
    key: "all",
    name: "All campaigns",
    objective: "Every scheduled post across the four Mufflermen channels.",
    status: "running",
    channels: ["social"],
    audienceSize: 71840,
    sendWindow: "Jun 2026",
    tone: "neutral",
  },
  {
    key: "winter-tune",
    name: "Winter Tune-Up Drive",
    objective: "Fill servicing bays before the July rego rush.",
    status: "running",
    channels: ["social", "email"],
    audienceSize: 41200,
    sendWindow: "Weekday 7:30am AEST",
    badge: "A/B",
    tone: "amber",
  },
  {
    key: "build-series",
    name: "Bay 2 Build Series",
    objective: "Showcase custom fab work — drive dyno + cat-back enquiries.",
    status: "running",
    channels: ["social"],
    audienceSize: 52600,
    sendWindow: "Tue & Thu 5:00pm AEST",
    tone: "red",
  },
  {
    key: "4wd-touring",
    name: "4WD Touring Season",
    objective: "Target tourers prepping rigs for the long-weekend run.",
    status: "scheduled",
    channels: ["social"],
    audienceSize: 38400,
    sendWindow: "Sat 9:00am AEST",
    tone: "teal",
  },
]

/* ---- Month grid (QueueCalendar) ------------------------------------------ */

interface SeedPost {
  id: string
  title: string
  hour: number
  minute: number
  platforms: ReadonlyArray<SocialPlatform>
  status: ScheduledPost["status"]
  campaign: Exclude<CampaignKey, "all">
}

const WEEKDAYS: ReadonlyArray<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

/** Posts keyed by day-of-month for June 2026. Today = the 9th. */
const POSTS_BY_DAY: Record<number, ReadonlyArray<SeedPost>> = {
  2: [
    {
      id: "scp-winter-launch",
      title: "Winter tune-up: book before rego",
      hour: 7,
      minute: 30,
      platforms: ["facebook", "instagram"],
      status: "published",
      campaign: "winter-tune",
    },
  ],
  3: [
    {
      id: "scp-manta-restock",
      title: "Manta 4WD restock landed",
      hour: 11,
      minute: 0,
      platforms: ["facebook", "youtube"],
      status: "published",
      campaign: "4wd-touring",
    },
  ],
  5: [
    {
      id: "scp-suburb-mick",
      title: "Suburb spotlight: Mick's LX",
      hour: 19,
      minute: 0,
      platforms: ["instagram", "facebook"],
      status: "published",
      campaign: "build-series",
    },
  ],
  9: [
    {
      id: "scp-300zx-fab",
      title: "300ZX cat-back fab time-lapse",
      hour: 9,
      minute: 30,
      platforms: ["instagram", "tiktok"],
      status: "scheduled",
      campaign: "build-series",
    },
    {
      id: "scp-dyno-200",
      title: "Dyno Tuesday: 200 Series",
      hour: 17,
      minute: 0,
      platforms: ["facebook", "youtube"],
      status: "in-review",
      campaign: "build-series",
    },
  ],
  10: [
    {
      id: "scp-hilux-reveal",
      title: "Hilux N80 before / after",
      hour: 8,
      minute: 0,
      platforms: ["instagram", "tiktok"],
      status: "draft",
      campaign: "build-series",
    },
  ],
  11: [
    {
      id: "scp-winter-tip",
      title: "Winter tip: drone-free quiet system",
      hour: 7,
      minute: 30,
      platforms: ["facebook"],
      status: "scheduled",
      campaign: "winter-tune",
    },
  ],
  13: [
    {
      id: "scp-patrol-touring",
      title: "Touring-ready: turbo-back for the Patrol",
      hour: 9,
      minute: 0,
      platforms: ["instagram", "facebook", "youtube"],
      status: "scheduled",
      campaign: "4wd-touring",
    },
  ],
  16: [
    {
      id: "scp-pacemaker",
      title: "Supplier feature: Pacemaker headers",
      hour: 14,
      minute: 0,
      platforms: ["instagram", "youtube"],
      status: "scheduled",
      campaign: "build-series",
    },
  ],
  18: [
    {
      id: "scp-winter-reminder",
      title: "Last call: winter servicing slots",
      hour: 7,
      minute: 30,
      platforms: ["facebook", "instagram"],
      status: "draft",
      campaign: "winter-tune",
    },
  ],
  20: [
    {
      id: "scp-touring-reel",
      title: "Long-weekend touring rig walkaround",
      hour: 9,
      minute: 0,
      platforms: ["tiktok", "instagram"],
      status: "draft",
      campaign: "4wd-touring",
    },
  ],
  23: [
    {
      id: "scp-dyno-patrol",
      title: "Dyno Tuesday: turbo Patrol",
      hour: 17,
      minute: 0,
      platforms: ["instagram", "facebook", "youtube"],
      status: "scheduled",
      campaign: "build-series",
    },
  ],
  25: [
    {
      id: "scp-winter-recap",
      title: "Winter drive recap: bays booked solid",
      hour: 8,
      minute: 0,
      platforms: ["facebook"],
      status: "draft",
      campaign: "winter-tune",
    },
  ],
}

/**
 * Build a 35-cell month grid (5 weeks, Mon-start) for June 2026.
 * Cells outside the month are flagged; the 9th is "today".
 */
function buildCalendarDays(campaign: CampaignKey): ReadonlyArray<CalendarDay> {
  const days: CalendarDay[] = []
  const startOffset = 0 // 1 June 2026 falls on a Monday in this demo grid
  const daysInMonth = 30

  for (let i = 0; i < 35; i += 1) {
    const dayNumber = i - startOffset + 1
    const outsideMonth = dayNumber < 1 || dayNumber > daysInMonth
    const isToday = dayNumber === 9
    const displayNumber = outsideMonth
      ? dayNumber < 1
        ? daysInMonth + dayNumber
        : dayNumber - daysInMonth
      : dayNumber
    const dateBase = `2026-06-${String(Math.max(1, Math.min(daysInMonth, dayNumber))).padStart(2, "0")}`
    const seeds = outsideMonth ? [] : POSTS_BY_DAY[dayNumber] ?? []
    const visible =
      campaign === "all" ? seeds : seeds.filter((seed) => seed.campaign === campaign)

    days.push({
      date: outsideMonth ? `${dateBase}-out${i}` : dateBase,
      weekday: WEEKDAYS[i % 7],
      dayNumber: displayNumber,
      outsideMonth,
      isToday,
      posts: visible.map((seed) => ({
        id: seed.id,
        title: seed.title,
        hour: seed.hour,
        minute: seed.minute,
        platforms: seed.platforms,
        status: seed.status,
      })),
    })
  }

  return days
}

/** Calendar grids precomputed per campaign so the page stays a server component. */
export const CALENDAR_DAYS_BY_CAMPAIGN: Readonly<
  Record<CampaignKey, ReadonlyArray<CalendarDay>>
> = {
  all: buildCalendarDays("all"),
  "winter-tune": buildCalendarDays("winter-tune"),
  "build-series": buildCalendarDays("build-series"),
  "4wd-touring": buildCalendarDays("4wd-touring"),
}

/* ---- Side rail: upcoming + approval-pending posts ------------------------ */

export const UPCOMING_POSTS: ReadonlyArray<ScheduledPost> = [
  {
    id: "rail-300zx-fab",
    title: "300ZX twin-turbo cat-back fab time-lapse",
    scheduledFor: "2026-06-09T09:30:00+10:00",
    status: "scheduled",
    platforms: ["instagram", "tiktok"],
    preview:
      "Quiet at idle, brutal at the top end. Custom 3\" stainless, mandrel bent and TIG welded in Bay 2. Time-lapse below.",
    engagement: { likes: 1840, comments: 96, shares: 142, saves: 312, rate: 0.084 },
    approver: "Mia (brand)",
  },
  {
    id: "rail-patrol-touring",
    title: "Touring-ready: turbo-back for the Patrol",
    scheduledFor: "2026-06-13T09:00:00+10:00",
    status: "scheduled",
    platforms: ["instagram", "facebook", "youtube"],
    preview:
      "Long-weekend bound? We'll have your Y62 breathing easy with a free-flowing turbo-back, fitted while you wait.",
  },
  {
    id: "rail-pacemaker",
    title: "Supplier feature: Pacemaker headers",
    scheduledFor: "2026-06-16T14:00:00+10:00",
    status: "scheduled",
    platforms: ["instagram", "youtube"],
    preview:
      "Genuine Pacemaker extractors now stocked at Oak Flats. Tuned-length runners, ceramic-coat options, fitted in-house.",
  },
]

/** Posts blocked behind the approval gate — approval-before-posting visible. */
export const PENDING_APPROVAL_POSTS: ReadonlyArray<ScheduledPost> = [
  {
    id: "rail-dyno-200",
    title: "Dyno Tuesday: 200 Series — 254rwkw / 612Nm",
    scheduledFor: "2026-06-09T17:00:00+10:00",
    status: "in-review",
    platforms: ["facebook", "youtube"],
    preview:
      "254rwkw and 612Nm on Dave's 200 Series. Curve in the carousel. Awaiting Daniel's sign-off before it queues.",
    approver: "Daniel (admin)",
  },
  {
    id: "rail-hilux-reveal",
    title: "Hilux N80 before / after reveal",
    scheduledFor: "2026-06-10T08:00:00+10:00",
    status: "draft",
    platforms: ["instagram", "tiktok"],
    preview:
      "Factory tin can → hand-rolled 2.5\" twin-tip. Drafted by Torque, waiting on brand voice review.",
    approver: "Mia (brand)",
  },
]

/** Approval workflow for the highlighted post (Dyno Tuesday 200 Series). */
export const APPROVAL_STAGES: ReadonlyArray<ApprovalStage> = [
  {
    id: "ap-draft",
    label: "Torque drafted",
    owner: "Torque",
    state: "approved",
    completedAt: "2026-06-08T16:40:00+10:00",
    note: "Caption, carousel order and three hashtag groups generated from the dyno sheet.",
  },
  {
    id: "ap-brand",
    label: "Brand voice",
    owner: "Mia (brand)",
    state: "approved",
    completedAt: "2026-06-08T17:55:00+10:00",
    note: "Tightened the headline, swapped one hashtag. Looks on-brand.",
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

/* ---- Header / posture stats ---------------------------------------------- */

export type StatTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface PostureStat {
  id: string
  label: string
  value: string
  detail: string
  tone: StatTone
}

export const POSTURE_STATS: ReadonlyArray<PostureStat> = [
  {
    id: "scheduled",
    label: "Scheduled",
    value: "9",
    detail: "posts queued across June",
    tone: "teal",
  },
  {
    id: "pending",
    label: "Awaiting approval",
    value: "2",
    detail: "held until the owner signs off",
    tone: "amber",
  },
  {
    id: "drafts",
    label: "Drafts",
    value: "5",
    detail: "Torque-prepped, ready to review",
    tone: "neutral",
  },
  {
    id: "channels",
    label: "Live channels",
    value: "4",
    detail: "Facebook · Instagram · TikTok · YouTube",
    tone: "green",
  },
]
