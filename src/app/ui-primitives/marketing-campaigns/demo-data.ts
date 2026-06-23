import type { HeatCell } from "../components/charts/heatmap-calendar"
import type { ChannelMatrixRow } from "../components/notifications/channel-matrix"
import type {
  ABVariant,
  CampaignTemplateMeta,
  CampaignTouchpoint,
  ChannelMixOption,
  CreativeAsset,
  DripSequenceMeta,
  FunnelStep,
  GoalOption,
  ResultsTile,
  SegmentRuleGroup,
  SendTimeRecommendation,
} from "../components/marketing-campaigns"

export const DEMO_CAMPAIGN_NAME = "Winter exhaust deals"
export const DEMO_OBJECTIVE = "Drive Bay 2 dyno bookings before EOFY"

export const DEMO_SEGMENT_GROUPS: ReadonlyArray<SegmentRuleGroup> = [
  {
    id: "core",
    operator: "and",
    rules: [
      { id: "1", kind: "attribute", label: "Vehicle = Hilux | Ranger" },
      { id: "2", kind: "behavior", label: "Booked service in last 12m" },
      { id: "3", kind: "event", label: "Visited Manta launch page" },
    ],
    initialTags: ["suburb:Illawarra", "vehicle:ute"],
  },
  {
    id: "exclude",
    operator: "or",
    rules: [
      { id: "4", kind: "negation", label: "NOT opted out of marketing" },
      { id: "5", kind: "behavior", label: "Lapsed customer > 180 days" },
    ],
    initialTags: ["status:lapsed"],
  },
]

export const DEMO_AB_VARIANTS: ReadonlyArray<ABVariant> = [
  {
    id: "a",
    label: "A",
    subject: "Manta cat-back is in — book your install",
    preview: "Bay 2 is open for dyno tunes Thursday & Friday. First 12 bookings get a free baseline run.",
    weight: 50,
  },
  {
    id: "b",
    label: "B",
    subject: "Spare a hot lap? Manta cat-back fitted same-day",
    preview: "Our local crew can fit your Manta cat-back this week. Hilux & Ranger bays free this Thursday.",
    weight: 30,
  },
  {
    id: "c",
    label: "C",
    subject: "Bay 2 availability blast — Mufflermen Illawarra",
    preview: "Thursday and Friday slots opened up in Bay 2 — drive away with a sharper tune by 4pm.",
    weight: 20,
  },
]

export const DEMO_CHANNEL_MIX: ReadonlyArray<ChannelMixOption> = [
  { kind: "email", costLabel: "$0.0008", reach: 0.92 },
  { kind: "sms", costLabel: "$0.064", reach: 0.82, costTone: "amber" },
  { kind: "push", costLabel: "$0.0001", reach: 0.41 },
  { kind: "inapp", costLabel: "Free", reach: 0.36 },
  { kind: "banner", costLabel: "$0.014 CPC", reach: 0.18, costTone: "amber" },
  { kind: "social", costLabel: "$8.10 CPM", reach: 0.31, costTone: "amber" },
]

export const DEMO_CHANNEL_ROWS: ReadonlyArray<ChannelMatrixRow> = [
  { id: "deals", label: "Winter exhaust deals" },
  { id: "manta", label: "Manta launch announcement" },
  { id: "bay2", label: "Bay 2 availability blast" },
]

export const DEMO_GOAL_OPTIONS: ReadonlyArray<GoalOption> = [
  {
    id: "opens",
    helper: "Open rate of opened messages",
    unit: "%",
    suggestedTarget: 32,
  },
  {
    id: "clicks",
    helper: "Click-through rate on the offer",
    unit: "%",
    suggestedTarget: 8,
  },
  {
    id: "conversions",
    helper: "Quote requests submitted",
    unit: "requests",
    suggestedTarget: 240,
  },
  {
    id: "revenue",
    helper: "Attributed revenue, end-of-month",
    unit: "AUD",
    suggestedTarget: 48000,
  },
  {
    id: "bookings",
    helper: "Confirmed Bay 2 bookings",
    unit: "bookings",
    suggestedTarget: 84,
  },
]

export const DEMO_CREATIVES: ReadonlyArray<CreativeAsset> = [
  {
    id: "c1",
    title: "Manta cat-back hero",
    channel: "email",
    thumbGlyph: "▦",
    durationLabel: "Long form",
  },
  {
    id: "c2",
    title: "Winter deals · SMS shortlink",
    channel: "sms",
    thumbGlyph: "▭",
    durationLabel: "160 chars",
  },
  {
    id: "c3",
    title: "Bay 2 lockscreen push",
    channel: "push",
    thumbGlyph: "▢",
    durationLabel: "Lock",
  },
  {
    id: "c4",
    title: "In-app banner · Manta launch",
    channel: "inapp",
    thumbGlyph: "◫",
    durationLabel: "300×120",
  },
  {
    id: "c5",
    title: "Web hero · Ranger Raptor",
    channel: "banner",
    thumbGlyph: "▥",
    durationLabel: "1920×600",
  },
  {
    id: "c6",
    title: "Reel · Hilux cat-back fit",
    channel: "social",
    thumbGlyph: "▷",
    durationLabel: "0:28",
  },
]

export const DEMO_SUBJECT_SUGGESTIONS: ReadonlyArray<string> = [
  "Manta cat-back fitted same-day — Bay 2 open",
  "Bay 2 slots opened: book your dyno tune",
  "Winter exhaust deals · Hilux & Ranger",
  "Spare a hot lap this Thursday?",
  "Quick win: Manta cat-back, fitted by 4pm",
]

/** 12 weeks × 7 days = 84 cells, synthetic peaks on Tues/Thurs evenings. */
function buildHeatmapCells(): ReadonlyArray<HeatCell> {
  const cells: HeatCell[] = []
  const start = new Date("2026-03-01")
  for (let week = 0; week < 12; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start)
      date.setDate(start.getDate() + week * 7 + day)
      // Tue (1) and Thu (3) evenings simulate spike.
      const isPeakDay = day === 1 || day === 3
      const noise = Math.sin(week * 0.7 + day * 1.1) * 8 + 14
      const value = Math.max(
        0,
        Math.round(isPeakDay ? 42 + noise + week * 1.4 : 18 + noise * 0.6),
      )
      cells.push({
        date: date.toISOString().slice(0, 10),
        value,
      })
    }
  }
  return cells
}

export const DEMO_HEATMAP_CELLS: ReadonlyArray<HeatCell> = buildHeatmapCells()

export const DEMO_SEND_RECOMMENDATION: SendTimeRecommendation = {
  label: "Tue · 6:30pm AEST",
  lift: "+24% opens vs avg",
}

export const DEMO_RESULTS_TILES: ReadonlyArray<ResultsTile> = [
  {
    kind: "sent",
    value: "8,420",
    delta: { label: "+12% vs avg", direction: "up" },
    trend: [120, 220, 410, 560, 720, 880, 1020, 1180, 1320, 1480],
  },
  {
    kind: "delivered",
    value: "8,194",
    delta: { label: "97.3%", direction: "flat" },
    trend: [110, 215, 400, 550, 705, 858, 998, 1156, 1290, 1452],
  },
  {
    kind: "opened",
    value: "3,084",
    delta: { label: "+4.2pt vs avg", direction: "up" },
    trend: [40, 92, 180, 270, 360, 458, 542, 638, 720, 818],
  },
  {
    kind: "clicked",
    value: "612",
    delta: { label: "7.5% CTR", direction: "up" },
    trend: [4, 12, 28, 48, 76, 108, 142, 184, 230, 286],
  },
  {
    kind: "bounced",
    value: "126",
    delta: { label: "1.5% bounce", direction: "down" },
    trend: [2, 8, 18, 32, 50, 64, 78, 90, 108, 126],
  },
]

export const DEMO_FUNNEL_STEPS: ReadonlyArray<FunnelStep> = [
  { label: "Sent", count: 8420 },
  { label: "Opened", count: 3084 },
  { label: "Clicked", count: 612 },
  { label: "Converted", count: 184 },
]

export const DEMO_TEMPLATES: ReadonlyArray<CampaignTemplateMeta> = [
  {
    id: "t1",
    title: "Winter exhaust offer · email + SMS",
    description: "Hero offer, EOFY callout, location-specific Bay 2 CTA.",
    channels: ["email", "sms"],
    isPrivate: false,
    thumbGlyph: "▦",
  },
  {
    id: "t2",
    title: "Product launch — Manta announcement",
    description: "Hero image, three-feature grid, dealer locator footer.",
    channels: ["email", "social"],
    isPrivate: false,
    thumbGlyph: "▥",
  },
  {
    id: "t3",
    title: "Booking reminder · SMS only",
    description: "Friendly reminder 24h before Bay 2 booking with reschedule link.",
    channels: ["sms"],
    isPrivate: false,
    thumbGlyph: "▭",
  },
  {
    id: "t4",
    title: "Win-back · lapsed >180 days",
    description: "Drive lapsed Hilux owners back for a tune with a $50 voucher.",
    channels: ["email", "push"],
    isPrivate: false,
    thumbGlyph: "◫",
  },
  {
    id: "t5",
    title: "Illawarra crew internal · Mufflermen kickoff",
    description: "Private template — internal launch comms for team.",
    channels: ["email", "inapp"],
    isPrivate: true,
    thumbGlyph: "★",
  },
  {
    id: "t6",
    title: "Bay 2 dyno follow-up · clone",
    description: "Saved clone of the Bay 2 follow-up with custom token block.",
    channels: ["email"],
    isPrivate: true,
    thumbGlyph: "✦",
  },
]

export const DEMO_DRIP_META: DripSequenceMeta = {
  triggerLabel: "Bay 2 quote requested",
  triggerSource: "Webhook · workshop form",
}

export const DEMO_DRIP_TOUCHPOINTS: ReadonlyArray<CampaignTouchpoint> = [
  {
    id: "step-1",
    name: "Send Manta cat-back guide",
    channel: "email",
    delayLabel: "Immediately",
  },
  {
    id: "step-2",
    name: "Wait for first open",
    channel: "email",
    delayLabel: "2 days",
    branchCondition: "Opened guide email",
  },
  {
    id: "step-3",
    name: "SMS · Bay 2 slots this week",
    channel: "sms",
    delayLabel: "3 days",
    branchCondition: "Did not click",
  },
  {
    id: "step-4",
    name: "Push · Workshop is filling up",
    channel: "push",
    delayLabel: "5 days",
  },
  {
    id: "step-5",
    name: "Email · Closing offer + voucher",
    channel: "email",
    delayLabel: "7 days",
    branchCondition: "No booking yet",
  },
]
