/**
 * Mufflermen fixture data for the Operations section group.
 *
 * Real Oak Flats Mufflermen copy + workshop telemetry. These fixtures are
 * presentational only — the section components are token-driven compositions of
 * existing primitives, so the data shapes mirror the primitive prop contracts.
 *
 * No design values live here (no color/size/space) — only domain content.
 */

import type { ActivityFeedItem } from "../../components/data-display/activity-feed"
import type { MetricBlockItem } from "../../components/data-display/metric-block"
import type { StatusBadgeSpec } from "../../components/data-display/status-badge-grid"
import type { RunTimelineStep } from "../../components/hermes-agent/run-timeline"
import type { ToolPaletteEntry } from "../../components/hermes-agent/tool-palette"
import type { AgentChatTurn } from "../../components/hermes-agent/agent-chat-panel"
import type { HermesChannel } from "../../components/hermes-agent/hermes-agent-types"
import type {
  BlockData,
  CalloutPayload,
  ChecklistPayload,
  CtaPayload,
} from "../../components/block-editor/block-editor-types"

/* ------------------------------------------------------------------ *
 * Dashboard command — workshop floor telemetry
 * ------------------------------------------------------------------ */

export const COMMAND_HEADLINE_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "bays",
    label: "Bays running",
    value: "6",
    unit: "/ 8",
    delta: { label: "2 idle", direction: "flat" },
  },
  {
    id: "today-jobs",
    label: "Jobs booked today",
    value: "23",
    delta: { label: "+4 vs avg", direction: "up" },
  },
  {
    id: "wait",
    label: "Avg wait",
    value: "34",
    unit: "min",
    delta: { label: "-9 min", direction: "down" },
  },
  {
    id: "revenue",
    label: "Day takings",
    value: "$8,240",
    delta: { label: "+12.4%", direction: "up" },
  },
]

export interface CommandTileSpec {
  id: string
  label: string
  aside: string
  tone: "red" | "amber" | "teal" | "green" | "neutral"
  cardLabel: string
  cardValue: string
  cardUnit?: string
  cardMeta: string
  delta: { label: string; direction: "up" | "down" | "flat" }
  spark: number[]
  sparkTone: "red" | "amber" | "teal" | "green"
}

export const COMMAND_TILES: ReadonlyArray<CommandTileSpec> = [
  {
    id: "throughput",
    label: "Exhaust throughput",
    aside: "Today",
    tone: "red",
    cardLabel: "Systems fitted",
    cardValue: "17",
    cardMeta: "cat-back, performance & repairs",
    delta: { label: "+3 on target", direction: "up" },
    spark: [8, 11, 9, 14, 12, 16, 15, 17],
    sparkTone: "red",
  },
  {
    id: "quotes",
    label: "Quotes converting",
    aside: "7d",
    tone: "amber",
    cardLabel: "Quote → booking",
    cardValue: "68",
    cardUnit: "%",
    cardMeta: "Hermes-assisted estimates",
    delta: { label: "+6.2 pts", direction: "up" },
    spark: [52, 55, 60, 58, 63, 61, 66, 68],
    sparkTone: "amber",
  },
  {
    id: "parts",
    label: "Parts in transit",
    aside: "Live",
    tone: "teal",
    cardLabel: "Inbound lines",
    cardValue: "41",
    cardMeta: "Mufflers, hangers, resonators",
    delta: { label: "9 arriving 2pm", direction: "flat" },
    spark: [30, 34, 33, 38, 36, 39, 40, 41],
    sparkTone: "teal",
  },
  {
    id: "csat",
    label: "Customer rating",
    aside: "30d",
    tone: "green",
    cardLabel: "Google reviews",
    cardValue: "4.9",
    cardUnit: "/ 5",
    cardMeta: "312 reviews · Oak Flats",
    delta: { label: "+0.1", direction: "up" },
    spark: [46, 47, 47, 48, 48, 49, 49, 49],
    sparkTone: "green",
  },
]

export const COMMAND_STATUS_BADGES: ReadonlyArray<StatusBadgeSpec> = [
  { tone: "success", label: "Bay 1 · fitting" },
  { tone: "success", label: "Bay 2 · fabricating" },
  { tone: "warn", label: "Bay 3 · waiting parts" },
  { tone: "brand", label: "Bay 4 · dyno run" },
  { tone: "info", label: "Bay 5 · diagnostics" },
  { tone: "neutral", label: "Bay 6 · cleaning" },
]

export const COMMAND_ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "a1",
    title: "Cat-back system fitted — VE Commodore SS",
    description: "2.5\" mandrel-bent, twin polished tips. Signed off by Dale.",
    timestamp: "2 min ago",
    tone: "success",
    actor: { name: "Dale R." },
  },
  {
    id: "a2",
    title: "Hermes booked a muffler repair",
    description: "Hilux N80, blowing muffler. Slotted into Bay 3 at 1:30pm.",
    timestamp: "11 min ago",
    tone: "info",
    actor: { name: "Hermes" },
  },
  {
    id: "a3",
    title: "Parts backorder flagged",
    description: "Resonator for BA Falcon delayed — supplier ETA Thursday.",
    timestamp: "26 min ago",
    tone: "warn",
    actor: { name: "Priya N." },
  },
  {
    id: "a4",
    title: "Performance package quoted",
    description: "Ranger PX3 — 3\" turbo-back + tune referral. $3,180.",
    timestamp: "48 min ago",
    tone: "success",
    actor: { name: "Hermes" },
  },
]

/* ------------------------------------------------------------------ *
 * Agent workflow — Hermes run inspector
 * ------------------------------------------------------------------ */

export const AGENT_CHANNELS: ReadonlyArray<HermesChannel> = ["web-chat", "sms", "messenger"]

export const AGENT_RUN_STEPS: ReadonlyArray<RunTimelineStep> = [
  {
    id: "s1",
    kind: "plan",
    title: "Understand the request",
    detail: "Customer wants a price on a cat-back for a 2018 Hilux and a fitting slot this week.",
    status: "done",
    timestamp: "10:41:02",
    durationMs: 640,
  },
  {
    id: "s2",
    kind: "tool",
    title: "Estimate the job",
    detail: "Priced 2.5\" mandrel cat-back with a centre muffler delete option.",
    payload: '{ "vehicle": "Hilux N80 2018", "system": "cat-back", "tips": "twin" }',
    status: "done",
    timestamp: "10:41:05",
    durationMs: 1180,
    toolName: "quote.estimate",
  },
  {
    id: "s3",
    kind: "tool",
    title: "Check parts on hand",
    detail: "Mufflers and tips in stock; one hanger kit on order.",
    status: "done",
    timestamp: "10:41:09",
    durationMs: 870,
    toolName: "parts.search",
  },
  {
    id: "s4",
    kind: "tool",
    title: "Offer a fitting slot",
    detail: "Held Thursday 9:00am, Bay 2 — 3 hour booking.",
    status: "running",
    timestamp: "10:41:12",
    toolName: "bookings.create",
  },
  {
    id: "s5",
    kind: "response",
    title: "Reply to the customer",
    detail: "Drafting a friendly quote + booking confirmation for review.",
    status: "queued",
    timestamp: "10:41:12",
  },
]

export const AGENT_TOOLS: ReadonlyArray<ToolPaletteEntry> = [
  {
    name: "quote.estimate",
    usage24h: 142,
    medianLatencyMs: 980,
    failureRate: 0.012,
    trend: [9, 12, 11, 14, 13, 16, 15, 18, 17, 19, 18, 21],
    enabled: true,
  },
  {
    name: "parts.search",
    usage24h: 88,
    medianLatencyMs: 720,
    failureRate: 0.028,
    trend: [6, 7, 6, 9, 8, 10, 9, 11, 10, 12, 11, 12],
    enabled: true,
  },
  {
    name: "bookings.create",
    usage24h: 54,
    medianLatencyMs: 1340,
    failureRate: 0.0,
    trend: [3, 4, 4, 5, 5, 6, 7, 6, 8, 7, 9, 8],
    enabled: true,
  },
  {
    name: "payment.collect",
    usage24h: 31,
    medianLatencyMs: 1610,
    failureRate: 0.041,
    trend: [2, 2, 3, 3, 4, 3, 5, 4, 5, 6, 5, 6],
    enabled: true,
  },
  {
    name: "escalate.to_human",
    usage24h: 12,
    medianLatencyMs: 220,
    failureRate: 0.0,
    trend: [1, 0, 1, 2, 1, 2, 1, 3, 2, 2, 3, 2],
    enabled: true,
  },
]

export const AGENT_CHAT_TURNS: ReadonlyArray<AgentChatTurn> = [
  {
    kind: "customer",
    id: "t1",
    authorName: "Jordan M.",
    content: "Hey, roughly how much for a cat-back exhaust on my 2018 Hilux? And can you fit it this week?",
    timestamp: "10:40",
  },
  {
    kind: "agent",
    id: "t2",
    timestamp: "10:41",
    content:
      "Good question! For a 2018 Hilux N80 a 2.5\" mandrel-bent cat-back with twin polished tips runs around $1,650 fitted. We've got mufflers and tips in stock, so I can hold Thursday 9:00am in Bay 2 for you — about a 3 hour job. Want me to lock it in?",
    citations: [
      {
        index: 1,
        title: "Hilux cat-back pricing — Oak Flats price book",
        url: "https://mufflermen.com.au/pricing/hilux",
        snippet: "2.5\" mandrel cat-back, twin tips — $1,650 fitted.",
      },
    ],
    toolTraces: [
      {
        toolName: "quote.estimate",
        status: "done",
        inputJson: '{ "vehicle": "Hilux N80 2018", "system": "cat-back" }',
        outputJson: '{ "total": 1650, "currency": "AUD" }',
        durationMs: 1180,
      },
      {
        toolName: "bookings.create",
        status: "running",
        inputJson: '{ "bay": 2, "slot": "Thu 09:00", "hours": 3 }',
        durationMs: 0,
      },
    ],
  },
]

export const AGENT_SUGGESTED_PROMPTS: ReadonlyArray<string> = [
  "Add a tune referral to the quote",
  "Offer a Saturday slot instead",
  "Send the booking confirmation",
]

/* ------------------------------------------------------------------ *
 * CMS editor — page content blocks
 * ------------------------------------------------------------------ */

export const CMS_CALLOUT_DATA: BlockData<CalloutPayload> = {
  id: "callout-warranty",
  version: 3,
  updatedAt: "2026-05-28T22:10:00.000Z",
  payload: {
    kind: "tip",
    title: "Lifetime workmanship guarantee",
    body: "Every exhaust we build at Oak Flats is backed for as long as you own the car. If a weld or hanger we fitted lets go, we make it right — no argument.",
    dismissible: false,
  },
}

export const CMS_CHECKLIST_DATA: BlockData<ChecklistPayload> = {
  id: "checklist-booking",
  version: 5,
  updatedAt: "2026-05-29T01:30:00.000Z",
  payload: {
    title: "Before your fitting appointment",
    items: [
      { id: "c1", label: "Confirm your vehicle make, model & year", done: true },
      { id: "c2", label: "Tell us about any noise, blowing or rattles", done: true },
      { id: "c3", label: "Approve the written quote from Hermes", done: true },
      { id: "c4", label: "Drop the car by 8:30am on the day", done: false },
      { id: "c5", label: "Arrange a lift or wait in the customer lounge", done: false },
    ],
  },
}

export const CMS_CTA_DATA: BlockData<CtaPayload> = {
  id: "cta-quote",
  version: 2,
  updatedAt: "2026-05-29T00:00:00.000Z",
  payload: {
    heading: "Ready for an exhaust that sounds right?",
    body: "Get a fast, honest quote from the Oak Flats Mufflermen — cat-backs, performance systems, repairs and custom fabrication.",
    buttonLabel: "Get my quote",
    buttonHref: "https://mufflermen.com.au/quote",
    tone: "red",
  },
}
