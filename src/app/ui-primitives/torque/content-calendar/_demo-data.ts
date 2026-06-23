/**
 * Demo data for the Torque "Marketing content calendar" screen.
 *
 * Oak Flats Muffler Men — Illawarra NSW. A broader-than-social monthly
 * marketing plan: blog + social + email + campaign items mapped across a
 * month grid, with a status + channel vocabulary, an approval-pending rail,
 * a content pipeline board and headline marketing figures.
 *
 * Dev-only note: the owner-facing assistant brand is always "Torque". The
 * legacy internal codename never appears in any customer-visible copy.
 *
 * All data is static fixture content. Dates are anchored to a fixed reference
 * month so the month grid renders deterministically in the showcase.
 */

import type { MonthEvent, MonthEventTone } from "../../components/calendar"
import type { ActivityFeedItem } from "../../components/data-display"
import type { KanbanColumn } from "../../components/data-display"
import type { MetricBlockItem } from "../../components/data-display"
import type { StatusBadgeSpec } from "../../components/data-display"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW"

/** Fixed reference month so the calendar renders deterministically. */
export const CALENDAR_REFERENCE = new Date(2026, 5, 1) // June 2026
export const CALENDAR_TODAY = new Date(2026, 5, 11) // Thu 11 Jun 2026
export const CALENDAR_MONTH_LABEL = "June"

/* ---- Channels (broader than social) -------------------------------------- */

export type ContentChannel = "blog" | "social" | "email" | "campaign"

export interface ChannelDescriptor {
  id: ContentChannel
  label: string
  /** Maps the channel to a calendar/event tone. */
  tone: MonthEventTone
  detail: string
}

export const CHANNELS: ReadonlyArray<ChannelDescriptor> = [
  { id: "blog", label: "Blog", tone: "teal", detail: "Long-form guides + how-tos" },
  { id: "social", label: "Social", tone: "amber", detail: "Facebook · Instagram · TikTok" },
  { id: "email", label: "Email", tone: "green", detail: "Newsletter + service reminders" },
  { id: "campaign", label: "Campaign", tone: "red", detail: "Cross-channel pushes" },
]

/* ---- Content status vocabulary ------------------------------------------- */

export type ContentStatus = "idea" | "draft" | "in-review" | "scheduled" | "published"

export interface StatusDescriptor {
  id: ContentStatus
  label: string
}

export const STATUSES: ReadonlyArray<StatusDescriptor> = [
  { id: "idea", label: "Idea" },
  { id: "draft", label: "Draft" },
  { id: "in-review", label: "In review" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
]

/** Status badge specs for the inline legend chips. */
export const STATUS_BADGES: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "neutral", label: "Idea" },
  { tone: "info", label: "Draft" },
  { tone: "warn", label: "In review" },
  { tone: "brand", label: "Scheduled" },
  { tone: "success", label: "Published" },
]

/* ---- Month grid items ----------------------------------------------------- */

export interface CalendarItem extends MonthEvent {
  channel: ContentChannel
  status: ContentStatus
}

/** Helper keeps the fixture terse while staying type-safe. */
function item(
  id: string,
  day: number,
  channel: ContentChannel,
  status: ContentStatus,
  title: string,
): CalendarItem {
  const tone = CHANNELS.find((channel_) => channel_.id === channel)?.tone ?? "neutral"
  return {
    id,
    date: new Date(2026, 5, day),
    title,
    tone,
    channel,
    status,
  }
}

export const CALENDAR_ITEMS: ReadonlyArray<CalendarItem> = [
  item("c01", 2, "blog", "published", "3in vs 2.5in: which exhaust?"),
  item("c02", 3, "social", "published", "Before/after: VDJ79 dual"),
  item("c03", 4, "email", "scheduled", "June service reminders"),
  item("c04", 5, "social", "scheduled", "Friday dyno reel"),
  item("c05", 8, "campaign", "in-review", "Winter Tune-Up Drive"),
  item("c06", 9, "blog", "draft", "DPF-back explained: Ranger"),
  item("c07", 10, "social", "scheduled", "Ute of the week: Cannon"),
  item("c08", 11, "email", "in-review", "Towing season prep offer"),
  item("c09", 11, "social", "draft", "Bay 2 walkaround clip"),
  item("c10", 12, "campaign", "scheduled", "Dyno Tuesday: 200 Series"),
  item("c11", 12, "blog", "idea", "Why exhausts crack"),
  item("c12", 15, "social", "scheduled", "Customer spotlight: Patrol"),
  item("c13", 16, "email", "draft", "Mid-winter newsletter"),
  item("c14", 17, "blog", "in-review", "Stainless vs mild steel"),
  item("c15", 18, "social", "idea", "Workshop time-lapse"),
  item("c16", 19, "campaign", "draft", "EOFY booking blitz"),
  item("c17", 22, "social", "scheduled", "Monday meet the techs"),
  item("c18", 23, "email", "idea", "Loyalty: 50-year cap drop"),
  item("c19", 24, "blog", "scheduled", "Volume-legal Hilux 2.8L"),
  item("c20", 25, "social", "scheduled", "Thursday tip: rust check"),
  item("c21", 26, "campaign", "in-review", "Winter Tune-Up: last call"),
  item("c22", 29, "email", "scheduled", "July bookings open"),
  item("c23", 30, "social", "idea", "Month wrap reel"),
]

/* ---- Headline marketing figures ------------------------------------------ */

export const MARKETING_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "m-published",
    label: "Live this month",
    value: "23",
    unit: "items",
    delta: { label: "+6 vs May", direction: "up" },
  },
  {
    id: "m-pending",
    label: "Waiting on you",
    value: "4",
    unit: "approvals",
    delta: { label: "2 due today", direction: "flat" },
  },
  {
    id: "m-reach",
    label: "Channel reach",
    value: "18.4k",
    unit: "people",
    delta: { label: "+12.3%", direction: "up" },
  },
  {
    id: "m-bookings",
    label: "Attributed bookings",
    value: "37",
    unit: "jobs",
    delta: { label: "+9 MoM", direction: "up" },
  },
]

/* ---- Posture stats (header band rail) ------------------------------------ */

export type StatTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface PostureStat {
  id: string
  label: string
  value: string
  detail: string
  tone: StatTone
}

export const POSTURE_STATS: ReadonlyArray<PostureStat> = [
  { id: "p-blog", label: "Blog", value: "6", detail: "2 live · 4 in flight", tone: "teal" },
  { id: "p-social", label: "Social", value: "10", detail: "Across 3 channels", tone: "amber" },
  { id: "p-email", label: "Email", value: "5", detail: "1 sent · 4 staged", tone: "green" },
  { id: "p-campaign", label: "Campaign", value: "4", detail: "2 cross-channel pushes", tone: "red" },
]

/* ---- Campaign filter ------------------------------------------------------ */

export interface CampaignFilterOption {
  id: string
  label: string
  active?: boolean
}

export const CAMPAIGN_FILTERS: ReadonlyArray<CampaignFilterOption> = [
  { id: "all", label: "All campaigns", active: true },
  { id: "winter", label: "Winter Tune-Up Drive" },
  { id: "eofy", label: "EOFY Booking Blitz" },
  { id: "evergreen", label: "Evergreen / how-tos" },
]

/* ---- Approval-pending rail ------------------------------------------------ */

export type PendingTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface PendingItem {
  id: string
  title: string
  /** Display window, e.g. "Thu 11 Jun · 6:30pm". */
  start: Date
  channelLabel: string
  statusLabel: string
  tone: PendingTone
  description: string
}

export const PENDING_ITEMS: ReadonlyArray<PendingItem> = [
  {
    id: "ap-01",
    title: "Towing season prep offer",
    start: new Date(2026, 5, 11, 9, 0),
    channelLabel: "Email",
    statusLabel: "In review",
    tone: "green",
    description:
      "$50 off any 4in dual system booked before 30 June. Mia drafted the subject line — needs your sign-off before it goes to the list.",
  },
  {
    id: "ap-02",
    title: "Winter Tune-Up Drive",
    start: new Date(2026, 5, 8, 8, 0),
    channelLabel: "Campaign",
    statusLabel: "In review",
    tone: "red",
    description:
      "Cross-channel push: blog hero, two social cuts and a reminder email. All assets ready — waiting on the discount you want to run.",
  },
  {
    id: "ap-03",
    title: "Stainless vs mild steel",
    start: new Date(2026, 5, 17, 7, 30),
    channelLabel: "Blog",
    statusLabel: "In review",
    tone: "teal",
    description:
      "1,200-word buyer guide aimed at Ranger and Hilux owners. Voice check passed; needs a final read before it publishes.",
  },
  {
    id: "ap-04",
    title: "Winter Tune-Up: last call",
    start: new Date(2026, 5, 26, 6, 30),
    channelLabel: "Campaign",
    statusLabel: "In review",
    tone: "amber",
    description:
      "Closing-week reminder across social + email. Held back until the main Winter Tune-Up Drive is approved above.",
  },
]

/* ---- Activity feed (recent calendar activity) ---------------------------- */

export const CALENDAR_ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "af-01",
    title: "Torque scheduled “Dyno Tuesday: 200 Series”",
    description: "Campaign · 12 Jun, queued across Facebook + Instagram.",
    timestamp: "9 min ago",
    tone: "info",
    actor: { name: "Torque" },
  },
  {
    id: "af-02",
    title: "“3in vs 2.5in: which exhaust?” went live",
    description: "Blog · 412 reads in the first day, 5 quote enquiries.",
    timestamp: "1 hr ago",
    tone: "success",
    actor: { name: "Torque" },
  },
  {
    id: "af-03",
    title: "Mia flagged the towing offer for your call",
    description: "Email · subject line ready, discount needs owner sign-off.",
    timestamp: "3 hrs ago",
    tone: "warn",
    actor: { name: "Mia Calvert" },
  },
  {
    id: "af-04",
    title: "Winter Tune-Up Drive assets bundled",
    description: "Campaign · blog + 2 social cuts + reminder email packaged.",
    timestamp: "Yesterday",
    tone: "info",
    actor: { name: "Torque" },
  },
]

/* ---- Content pipeline board ---------------------------------------------- */

export const PIPELINE_COLUMNS: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Ideas",
    cards: [
      {
        id: "pl-01",
        code: "BLOG",
        title: "Why exhausts crack",
        sub: "Buyer-education evergreen",
        tags: ["blog", "evergreen"],
        priority: "low",
        due: "TBC",
      },
      {
        id: "pl-02",
        code: "SOC",
        title: "Workshop time-lapse",
        sub: "Reels — bay rebuild",
        tags: ["social", "reel"],
        priority: "low",
        due: "18 Jun",
      },
      {
        id: "pl-03",
        code: "EMAIL",
        title: "Loyalty: 50-year cap drop",
        sub: "Reward returning customers",
        tags: ["email", "loyalty"],
        priority: "med",
        due: "23 Jun",
      },
    ],
  },
  {
    stage: "progress",
    title: "Drafting",
    cards: [
      {
        id: "pl-04",
        code: "BLOG",
        title: "DPF-back explained: Ranger",
        sub: "Next-gen T6.2 V6 diesel",
        tags: ["blog", "diesel"],
        priority: "med",
        due: "9 Jun",
        assignees: [{ name: "Mia Calvert" }],
      },
      {
        id: "pl-05",
        code: "CAMP",
        title: "EOFY Booking Blitz",
        sub: "Cross-channel · ends 30 Jun",
        tags: ["campaign", "eofy"],
        priority: "high",
        due: "19 Jun",
        assignees: [{ name: "Torque" }, { name: "Dane Whitlock" }],
      },
      {
        id: "pl-06",
        code: "EMAIL",
        title: "Mid-winter newsletter",
        sub: "Service tips + dyno results",
        tags: ["email", "newsletter"],
        priority: "med",
        due: "16 Jun",
        assignees: [{ name: "Mia Calvert" }],
      },
    ],
  },
  {
    stage: "review",
    title: "Needs approval",
    cards: [
      {
        id: "pl-07",
        code: "CAMP",
        title: "Winter Tune-Up Drive",
        sub: "Blog + social + email bundle",
        tags: ["campaign", "winter"],
        priority: "high",
        due: "8 Jun",
        assignees: [{ name: "Torque" }],
      },
      {
        id: "pl-08",
        code: "EMAIL",
        title: "Towing season prep offer",
        sub: "$50 off 4in dual systems",
        tags: ["email", "offer"],
        priority: "high",
        due: "11 Jun",
        assignees: [{ name: "Mia Calvert" }],
      },
      {
        id: "pl-09",
        code: "BLOG",
        title: "Stainless vs mild steel",
        sub: "Ranger + Hilux buyer guide",
        tags: ["blog", "guide"],
        priority: "med",
        due: "17 Jun",
        assignees: [{ name: "Torque" }],
      },
    ],
  },
  {
    stage: "done",
    title: "Scheduled / live",
    cards: [
      {
        id: "pl-10",
        code: "CAMP",
        title: "Dyno Tuesday: 200 Series",
        sub: "Queued · 12 Jun",
        tags: ["campaign", "dyno"],
        priority: "high",
        due: "12 Jun",
        assignees: [{ name: "Torque" }],
      },
      {
        id: "pl-11",
        code: "BLOG",
        title: "Volume-legal Hilux 2.8L",
        sub: "Scheduled · 24 Jun",
        tags: ["blog", "compliance"],
        priority: "med",
        due: "24 Jun",
      },
      {
        id: "pl-12",
        code: "BLOG",
        title: "3in vs 2.5in: which exhaust?",
        sub: "Published · 412 reads",
        tags: ["blog", "live"],
        priority: "low",
        due: "2 Jun",
      },
    ],
  },
]
