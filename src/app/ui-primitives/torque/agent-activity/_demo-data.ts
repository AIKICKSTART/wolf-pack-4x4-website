/**
 * Demo fixtures for the Torque activity & run feed screen.
 *
 * Torque is Oak Flats Muffler Men's customer-facing business assistant
 * (Illawarra, NSW — exhausts, fabrication, servicing). All copy below is
 * customer-/operator-facing and must never surface the internal engine
 * codename. (Dev note: the engine powering Torque is internally the "Hermes"
 * run engine — that codename stays out of every visible string by design.)
 */

import type { ActivityFeedItem } from "@/app/ui-primitives/components/data-display/activity-feed"
import type { KanbanColumn } from "@/app/ui-primitives/components/data-display/kanban-board"
import type { MetricBlockItem } from "@/app/ui-primitives/components/data-display/metric-block"
import type { StatusBadgeSpec } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import type { RunTimelineStep } from "@/app/ui-primitives/components/hermes-agent/run-timeline"

/** Header KPI strip — the figures that summarise Torque's working day. */
export const HEADLINE_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "conversations",
    label: "Conversations today",
    value: "148",
    delta: { label: "18%", direction: "up" },
  },
  {
    id: "auto-resolved",
    label: "Auto-resolved",
    value: "82",
    unit: "%",
    delta: { label: "4 pts", direction: "up" },
  },
  {
    id: "quotes",
    label: "Quotes drafted",
    value: "37",
    delta: { label: "9", direction: "up" },
  },
  {
    id: "bookings",
    label: "Bookings pencilled",
    value: "22",
    delta: { label: "Flat", direction: "flat" },
  },
  {
    id: "median-reply",
    label: "Median first reply",
    value: "11",
    unit: "s",
    delta: { label: "3s faster", direction: "down" },
  },
]

/** Live run trace — Torque handling a Hilux cat-back enquiry end to end. */
export const RUN_STEPS: ReadonlyArray<RunTimelineStep> = [
  {
    id: "step-1",
    kind: "plan",
    title: "Read enquiry — 2019 Hilux 2.8L cat-back",
    detail:
      "Customer wants a louder-but-legal cat-back for a 2019 Hilux 2.8L tow rig. Plan: confirm fitment, quote a 3in mandrel system, offer a Bay 2 slot this week.",
    status: "done",
    timestamp: "08:41:02",
    durationMs: 640,
  },
  {
    id: "step-2",
    kind: "tool",
    toolName: "parts.search",
    title: "Parts lookup",
    detail: "Matched a 3in aluminised mandrel cat-back with a rear muffler delete option.",
    payload:
      '{ "vehicle": "Toyota Hilux 2.8L 2019", "sku": "OFM-CB-HILUX-3IN", "stock": "in-stock", "leadTimeDays": 0 }',
    status: "done",
    timestamp: "08:41:03",
    durationMs: 880,
  },
  {
    id: "step-3",
    kind: "tool",
    toolName: "quote.estimate",
    title: "Quote estimate",
    detail: "Parts + 2.5 fitter hours in Bay 2. ADR volume-legal tip noted for the customer.",
    payload:
      '{ "partsAud": 1180, "labourHours": 2.5, "labourAud": 412.5, "totalAud": 1592.5, "note": "stays under ADR drive-by limit" }',
    status: "done",
    timestamp: "08:41:05",
    durationMs: 1240,
  },
  {
    id: "step-4",
    kind: "reflection",
    title: "Check tow-rig wording",
    detail:
      "Reworded the recommendation so it reads honestly for a daily tow vehicle — flagged the resonator keeps drone down on the highway.",
    status: "done",
    timestamp: "08:41:07",
    durationMs: 520,
  },
  {
    id: "step-5",
    kind: "tool",
    toolName: "bookings.create",
    title: "Booking offer",
    detail: "Offered Thursday 9:00am in Bay 2 — honours the hoist tooling for the Hilux.",
    payload: '{ "bay": "Bay 2", "slot": "Thu 9:00am", "durationHours": 3, "held": true }',
    status: "running",
    timestamp: "08:41:08",
  },
  {
    id: "step-6",
    kind: "response",
    title: "Draft reply to customer",
    detail: "Awaiting the booking hold before sending the quote + slot to the customer.",
    status: "queued",
    timestamp: "—",
  },
]

export const RUN_TOKEN_TOTAL = 4820
export const RUN_COST_CENTS = 9
export const RUN_DURATION_MS = 4280

/** Activity stream — what Torque has done across the workshop this morning. */
export const ACTIVITY_ITEMS: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-1",
    tone: "success",
    title: "Booked a Commodore muffler swap into Bay 1",
    description:
      "Confirmed Friday 11:30am for a VE Commodore rear muffler replacement. Reminder SMS scheduled.",
    timestamp: "2 min ago",
    actor: { name: "Torque" },
  },
  {
    id: "act-2",
    tone: "info",
    title: "Quoted a Ranger DPF-back system",
    description:
      "Drafted a $2,140 quote for a 2021 Ranger 2.0L Bi-Turbo DPF-back. Sent to the owner to review before release.",
    timestamp: "9 min ago",
    actor: { name: "Torque" },
  },
  {
    id: "act-3",
    tone: "warn",
    title: "Flagged a custom twin-system fabrication enquiry",
    description:
      "Held a hand-built twin 2.5in stainless request for Daz — needs a workshop measure-up before pricing.",
    timestamp: "23 min ago",
    actor: { name: "Torque" },
  },
  {
    id: "act-4",
    tone: "success",
    title: "Answered an opening-hours question",
    description:
      "Confirmed Saturday morning hours and the Oak Flats address for a customer driving down from Wollongong.",
    timestamp: "41 min ago",
    actor: { name: "Torque" },
  },
  {
    id: "act-5",
    tone: "error",
    title: "Escalated a warranty dispute",
    description:
      "A customer questioned a weld repair under warranty. Routed to Daz with the full job history attached.",
    timestamp: "1 hr ago",
    actor: { name: "Torque" },
  },
  {
    id: "act-6",
    tone: "info",
    title: "Sent a service reminder run",
    description:
      "Nudged 14 regulars due for an exhaust health check before the long weekend road trips.",
    timestamp: "1 hr ago",
    actor: { name: "Torque" },
  },
]

/** In-progress workshop jobs Torque is shepherding, as a kanban board. */
export const TASK_COLUMNS: ReadonlyArray<KanbanColumn> = [
  {
    stage: "backlog",
    title: "Awaiting customer",
    cards: [
      {
        id: "job-101",
        code: "ENQ-101",
        title: "Hilux 2.8L cat-back",
        sub: "Quote + Bay 2 slot sent",
        tags: ["cat-back", "tow rig"],
        priority: "med",
        due: "Reply due today",
        assignees: [{ name: "Torque" }],
      },
      {
        id: "job-104",
        code: "ENQ-104",
        title: "BA Falcon resonator delete",
        sub: "Waiting on go-ahead",
        tags: ["resonator"],
        priority: "low",
        due: "No deadline",
        assignees: [{ name: "Torque" }],
      },
    ],
  },
  {
    stage: "progress",
    title: "In the bays",
    cards: [
      {
        id: "job-088",
        code: "JOB-088",
        title: "Ranger DPF-back fit",
        sub: "Bay 3 · on the hoist",
        tags: ["DPF-back", "stainless"],
        priority: "high",
        due: "Out by 2pm",
        assignees: [{ name: "Mick" }, { name: "Torque" }],
      },
      {
        id: "job-090",
        code: "JOB-090",
        title: "Commodore muffler swap",
        sub: "Bay 1 · parts on bench",
        tags: ["muffler"],
        priority: "med",
        due: "Out by 4pm",
        assignees: [{ name: "Jase" }],
      },
    ],
  },
  {
    stage: "review",
    title: "Owner sign-off",
    cards: [
      {
        id: "job-077",
        code: "JOB-077",
        title: "Twin 2.5in fabrication",
        sub: "Custom quote drafted",
        tags: ["fabrication", "custom"],
        priority: "high",
        due: "Daz to approve",
        assignees: [{ name: "Daz" }, { name: "Torque" }],
      },
    ],
  },
  {
    stage: "done",
    title: "Done today",
    cards: [
      {
        id: "job-061",
        code: "JOB-061",
        title: "Territory exhaust health check",
        sub: "Passed · invoiced",
        tags: ["servicing"],
        priority: "low",
        due: "Closed 10:15am",
        assignees: [{ name: "Jase" }],
      },
      {
        id: "job-064",
        code: "JOB-064",
        title: "Navara mid-pipe weld",
        sub: "Welded · road-tested",
        tags: ["fabrication"],
        priority: "med",
        due: "Closed 11:40am",
        assignees: [{ name: "Mick" }],
      },
    ],
  },
]

/** Per-hour token burn for the cost panel (24 buckets, AUD cents). */
export const HOURLY_SPEND_CENTS: ReadonlyArray<number> = [
  4, 3, 2, 2, 1, 1, 3, 11, 28, 42, 51, 47, 39, 44, 52, 48, 41, 33, 24, 16, 12, 9, 6, 4,
]

export const BUDGET = {
  windowLabel: "Today",
  spentCents: 612,
  budgetCents: 1500,
  projectedCents: 1180,
  tokensUsed: 318_400,
  costPerConversationCents: 4,
} as const

/** Live throughput sparkline (conversations per 5-min bucket, last ~2h). */
export const THROUGHPUT_POINTS: ReadonlyArray<number> = [
  3, 4, 4, 6, 5, 7, 9, 8, 11, 10, 12, 9, 13, 11, 14, 12, 15, 13, 12, 16, 14, 17, 15, 18,
]

/** Channel mix + run-status chips shown beside the live feed. */
export const STATUS_CHIPS: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "success", label: "Engine online" },
  { tone: "info", label: "6 active chats" },
  { tone: "warn", label: "2 in queue" },
  { tone: "neutral", label: "1 handed to Daz" },
]
