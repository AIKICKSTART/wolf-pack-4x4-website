import type {
  AbandonedNudgeStep,
  AudienceGroup,
  EngagementDecaySeries,
  GoalFunnelStep,
  JourneyEdgeSpec,
  JourneyNodeSpec,
  LeadScoreAxis,
  SendTimeRecipient,
} from "../components/marketing-automation"

/* ------------------------------------------------------------------ */
/* Journey canvas — "New lead → 7-day workshop intro"                 */
/* ------------------------------------------------------------------ */

export const NEW_LEAD_JOURNEY_NODES: ReadonlyArray<JourneyNodeSpec> = [
  {
    id: "trig",
    kind: "trigger",
    title: "New lead created",
    subtitle: "Source: workshop quote form",
    col: 1,
    row: 1,
    active: true,
  },
  {
    id: "wait1",
    kind: "wait",
    title: "Wait 5 minutes",
    subtitle: "Avoid burst-send penalty",
    col: 2,
    row: 1,
  },
  {
    id: "act-welcome",
    kind: "action",
    title: "Send welcome email",
    subtitle: "Mufflermen intro · Bay 2",
    col: 3,
    row: 1,
  },
  {
    id: "wait2",
    kind: "wait",
    title: "Wait 24 hours",
    subtitle: "Reduce fatigue",
    col: 1,
    row: 2,
  },
  {
    id: "cond-opened",
    kind: "condition",
    title: "Opened welcome?",
    subtitle: "If opened in 24h",
    col: 2,
    row: 2,
  },
  {
    id: "act-sms",
    kind: "action",
    title: "SMS: Bay 2 availability",
    subtitle: "Personalised slot offer",
    col: 3,
    row: 2,
  },
  {
    id: "act-nudge",
    kind: "action",
    title: "Email: 4WD service guide",
    subtitle: "Re-engagement push",
    col: 3,
    row: 3,
  },
  {
    id: "goal-booking",
    kind: "goal",
    title: "Goal · Service booked",
    subtitle: "Conversion target",
    col: 4,
    row: 2,
  },
  {
    id: "exit-end",
    kind: "exit",
    title: "Exit journey",
    subtitle: "After 7 days",
    col: 4,
    row: 3,
  },
]

export const NEW_LEAD_JOURNEY_EDGES: ReadonlyArray<JourneyEdgeSpec> = [
  { from: "trig", to: "wait1", kind: "default" },
  { from: "wait1", to: "act-welcome", kind: "default" },
  { from: "act-welcome", to: "wait2", kind: "default" },
  { from: "wait2", to: "cond-opened", kind: "default" },
  { from: "cond-opened", to: "act-sms", kind: "yes", label: "Yes" },
  { from: "cond-opened", to: "act-nudge", kind: "no", label: "No" },
  { from: "act-sms", to: "goal-booking", kind: "default" },
  { from: "act-nudge", to: "exit-end", kind: "fallback" },
]

/* ------------------------------------------------------------------ */
/* Drip sequence rows — abandoned-quote recovery                       */
/* ------------------------------------------------------------------ */

export interface DemoDripRow {
  id: string
  channel: import("../components/marketing-automation").AutomationChannel
  title: string
  preview: string
  delayLabel: string
  openRate?: number
  clickRate?: number
  status: import("../components/marketing-automation").DripStepStatus
  predicate?: string
}

export const DEMO_DRIP_ROWS: ReadonlyArray<DemoDripRow> = [
  {
    id: "d1",
    channel: "sms",
    title: "Quick reminder · save your quote",
    preview:
      "G'day {{first_name}}, your quote for the Manta cat-back is saved — book Bay 2 this week and get a free baseline run.",
    delayLabel: "2 hr after abandon",
    openRate: 28.0,
    clickRate: 11.2,
    status: "live",
    predicate: "quote_value > $400",
  },
  {
    id: "d2",
    channel: "email",
    title: "We saved your build · Mufflermen",
    preview:
      "Your Hilux cat-back configuration is still locked in. Bay 2 has Thursday afternoon slots if you want to lock it in.",
    delayLabel: "24 hr after abandon",
    openRate: 42.6,
    clickRate: 4.2,
    status: "live",
  },
  {
    id: "d3",
    channel: "task",
    title: "Call task · Dazza to ring lead",
    preview: "Workshop lead Dazza handles personal call-backs day 3 of the cadence.",
    delayLabel: "Day 3, 9:00am",
    status: "live",
    predicate: "lead_score >= 60",
  },
  {
    id: "d4",
    channel: "email",
    title: "Closing offer · roadworthy thrown in",
    preview:
      "Last call on the Manta cat-back quote — book in by Friday and we'll throw in the roadworthy free.",
    delayLabel: "Day 5, 6:00pm",
    openRate: 36.2,
    clickRate: 5.4,
    status: "paused",
  },
  {
    id: "d5",
    channel: "webhook",
    title: "CRM tag · lapsed-warm",
    preview: "Push to HubSpot, tag the contact and reassign to nurturing journey.",
    delayLabel: "Day 7, 11:00am",
    status: "draft",
  },
]

/* ------------------------------------------------------------------ */
/* Lead score matrix                                                    */
/* ------------------------------------------------------------------ */

export const LEAD_SCORE_ROWS: ReadonlyArray<LeadScoreAxis> = [
  { id: "hilux", label: "Hilux owner", helper: "vehicle.make = Hilux" },
  { id: "ranger", label: "Ranger owner", helper: "vehicle.make = Ranger" },
  { id: "falcon", label: "Falcon enthusiast", helper: "vehicle.make = Falcon" },
  { id: "wholesale", label: "Wholesale buyer", helper: "type = supplier" },
]

export const LEAD_SCORE_COLS: ReadonlyArray<LeadScoreAxis> = [
  { id: "quote-viewed", label: "Viewed quote", helper: "≥ 1 in 7d" },
  { id: "dyno-video", label: "Dyno video watched", helper: "≥ 50% completed" },
  { id: "spec-built", label: "Spec built", helper: "≥ 1 cat-back config" },
  { id: "callback-req", label: "Callback requested", helper: "form submitted" },
]

/** Each row × col score, deliberately reflecting Daniel's spec
 *  (vehicle=20, suburb=15, quote-viewed=30, dyno-watched=10) plus a multiplier. */
export const LEAD_SCORE_VALUES: ReadonlyArray<ReadonlyArray<number>> = [
  [50, 30, 65, 85],
  [50, 30, 65, 85],
  [40, 40, 55, 70],
  [25, 10, 45, 60],
]

/* ------------------------------------------------------------------ */
/* Audience builder                                                     */
/* ------------------------------------------------------------------ */

export const ILLAWARRA_4WD_AUDIENCE: ReadonlyArray<AudienceGroup> = [
  {
    id: "core",
    title: "Core target · Illawarra 4WD owners",
    operator: "and",
    predicates: [
      {
        id: "p1",
        kind: "vehicle",
        label: "Vehicle type · 4WD ute",
        value: "Hilux | Ranger | Triton",
      },
      {
        id: "p2",
        kind: "geo",
        label: "Suburb · Illawarra postcode",
        value: "2500–2530",
      },
      {
        id: "p3",
        kind: "behaviour",
        label: "Viewed dyno video",
        value: "≥ 50% completed in 30d",
      },
      {
        id: "p4",
        kind: "attribute",
        label: "Vehicle age",
        value: "≤ 8 years",
      },
    ],
  },
  {
    id: "suppression",
    title: "Suppress",
    operator: "or",
    predicates: [
      {
        id: "s1",
        kind: "negation",
        label: "Booked service in last 14 days",
      },
      {
        id: "s2",
        kind: "lifecycle",
        label: "Lifecycle stage · churned",
      },
      {
        id: "s3",
        kind: "tag",
        label: "Tag · do-not-market",
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Abandoned quote nudge                                                */
/* ------------------------------------------------------------------ */

export const DEMO_ABANDONED_NUDGE: ReadonlyArray<AbandonedNudgeStep> = [
  {
    id: "n1",
    waitLabel: "+2 hr",
    channel: "sms",
    title: "Quick save · Bay 2 slot still open",
    status: "sent",
  },
  {
    id: "n2",
    waitLabel: "+24 hr",
    channel: "email",
    title: "Your Hilux quote · resumed",
    status: "sent",
  },
  {
    id: "n3",
    waitLabel: "Day 3",
    channel: "task",
    title: "Call task · Dazza to ring",
    status: "queued",
  },
  {
    id: "n4",
    waitLabel: "Day 5",
    channel: "email",
    title: "Closing offer · roadworthy free",
    status: "queued",
  },
]

/* ------------------------------------------------------------------ */
/* Goal funnel — Quote → Booked dyno session                            */
/* ------------------------------------------------------------------ */

export const DYNO_BOOKING_FUNNEL: ReadonlyArray<GoalFunnelStep> = [
  { id: "q-view", label: "Quote viewed", count: 8420 },
  { id: "q-saved", label: "Quote saved", count: 4180 },
  { id: "q-call", label: "Callback requested", count: 1240 },
  { id: "q-booked", label: "Bay 2 booking confirmed", count: 412 },
]

/* ------------------------------------------------------------------ */
/* Send-time optimizer recipients                                       */
/* ------------------------------------------------------------------ */

export const DEMO_SEND_TIME_RECIPIENTS: ReadonlyArray<SendTimeRecipient> = [
  {
    id: "r1",
    name: "Dazza Whittaker",
    email: "dazza.w@bigpond.com",
    bestSlot: "Tue 6:42pm",
    previousSlot: "Wed 10:00am",
    confidence: 86,
  },
  {
    id: "r2",
    name: "Aletheia Sako",
    email: "aletheia.sako@gmail.com",
    bestSlot: "Thu 8:18am",
    previousSlot: "Mon 6:00pm",
    confidence: 72,
  },
  {
    id: "r3",
    name: "Brendan Crowe",
    email: "brendan.crowe@illawarrasteel.com.au",
    bestSlot: "Sat 9:55am",
    previousSlot: "Sat 9:00am",
    confidence: 64,
  },
  {
    id: "r4",
    name: "Lin Quinones",
    email: "lin.q@outlook.com",
    bestSlot: "Wed 7:08pm",
    confidence: 41,
  },
]

/* ------------------------------------------------------------------ */
/* Engagement decay series — half-life per channel                      */
/* ------------------------------------------------------------------ */

function exponentialDecay(halfLife: number, length: number): number[] {
  const points: number[] = []
  for (let day = 0; day <= length; day += 1) {
    points.push(Math.pow(0.5, day / halfLife))
  }
  return points
}

export const ENGAGEMENT_DECAY_SERIES: ReadonlyArray<EngagementDecaySeries> = [
  { channel: "sms", points: exponentialDecay(1.4, 14), halfLifeDays: 1.4 },
  { channel: "push", points: exponentialDecay(2.1, 14), halfLifeDays: 2.1 },
  { channel: "email", points: exponentialDecay(3.6, 14), halfLifeDays: 3.6 },
  { channel: "voice", points: exponentialDecay(0.8, 14), halfLifeDays: 0.8 },
]

/* ------------------------------------------------------------------ */
/* Campaign budget — actual + ideal pacing                              */
/* ------------------------------------------------------------------ */

function buildIdealCurve(daily: number, hours: number): number[] {
  return Array.from({ length: hours + 1 }, (_, i) => (i / hours) * daily)
}

function buildActualCurve(
  daily: number,
  hours: number,
  multiplier: number,
): number[] {
  const ideal = buildIdealCurve(daily, hours)
  // Apply small noise + multiplier to current hour.
  return ideal.map((value, idx) => {
    const noise = Math.sin(idx * 0.6) * (daily * 0.02)
    return Math.max(0, value * multiplier + noise)
  })
}

export const DEMO_BUDGET_ACTUAL = buildActualCurve(2400, 16, 1.08)
export const DEMO_BUDGET_IDEAL = buildIdealCurve(2400, 24)
