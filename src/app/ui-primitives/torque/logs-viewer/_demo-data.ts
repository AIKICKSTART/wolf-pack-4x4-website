/**
 * Demo data for the Torque Logs viewer screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) observability fixtures — the
 * structured log stream behind the workshop's Torque assistant: quote drafting,
 * SMS confirmations, supplier stock checks, social scheduling, payment capture,
 * and the public exhaust/servicing site. Every line carries a timestamp, a
 * correlation id, a source service, and structured key/value fields so the
 * expandable rows have real substance.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque". The
 * legacy internal codename is never surfaced in any string below.
 */

import type { LogSeverity } from "../../components/observability/observability-types"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const STREAM_LABEL = "Live · ap-southeast-2"

/** A single structured log line in the Torque platform stream. */
export interface TorqueLogEntry {
  id: string
  /** Display timestamp (24h, workshop-local). */
  time: string
  /** Full ISO-ish timestamp surfaced when the row is expanded. */
  timestamp: string
  level: LogSeverity
  /** Emitting service / source. */
  source: LogSource
  message: string
  /** Trace correlation id threaded across services. */
  correlationId: string
  /** Structured key/value context shown when the row is expanded. */
  fields: ReadonlyArray<readonly [string, string]>
}

/** Sources the stream can be filtered by. */
export type LogSource =
  | "quotes-api"
  | "customer-sms"
  | "parts-catalogue"
  | "payment-gateway"
  | "social-scheduler"
  | "site-edge"

export interface LevelOption {
  level: LogSeverity
  label: string
}

export interface SourceOption {
  source: LogSource
  label: string
  /** Short human description for the toolbar tooltip / aria. */
  hint: string
}

/** Levels in escalating order, matching the observability LogSeverity scale. */
export const LEVEL_OPTIONS: ReadonlyArray<LevelOption> = [
  { level: "debug", label: "Debug" },
  { level: "info", label: "Info" },
  { level: "warn", label: "Warn" },
  { level: "error", label: "Error" },
  { level: "fatal", label: "Fatal" },
]

export const SOURCE_OPTIONS: ReadonlyArray<SourceOption> = [
  { source: "quotes-api", label: "quotes-api", hint: "Quote drafting + pricing" },
  { source: "customer-sms", label: "customer-sms", hint: "Booking + reminder SMS" },
  { source: "parts-catalogue", label: "parts-catalogue", hint: "Stock + supplier lookups" },
  { source: "payment-gateway", label: "payment-gateway", hint: "Deposits + invoices" },
  { source: "social-scheduler", label: "social-scheduler", hint: "Mufflerpulse posts" },
  { source: "site-edge", label: "site-edge", hint: "Public exhaust/servicing site" },
]

/** Headline counters for the summary strip above the stream. */
export interface StreamStat {
  id: string
  label: string
  value: string
  unit?: string
  caption: string
  tone: "red" | "amber" | "teal" | "green" | "neutral"
  delta?: { value: string; direction: "up" | "down" | "flat" }
  sparkline?: number[]
}

export const STREAM_STATS: ReadonlyArray<StreamStat> = [
  {
    id: "throughput",
    label: "Lines / min",
    value: "1,284",
    caption: "Across 6 sources, last 5 min",
    tone: "teal",
    delta: { value: "9% vs avg", direction: "up" },
    sparkline: [980, 1040, 1120, 1080, 1190, 1240, 1284],
  },
  {
    id: "errors",
    label: "Errors / 5 min",
    value: "3",
    caption: "1 supplier timeout, 2 SMS retries",
    tone: "red",
    delta: { value: "2 vs prev", direction: "up" },
    sparkline: [0, 1, 0, 2, 1, 2, 3],
  },
  {
    id: "warns",
    label: "Warnings / 5 min",
    value: "11",
    caption: "Mostly low-stock 2.5″ bends",
    tone: "amber",
    delta: { value: "Steady", direction: "flat" },
    sparkline: [9, 12, 10, 13, 11, 12, 11],
  },
  {
    id: "p95",
    label: "Quote draft p95",
    value: "412",
    unit: "ms",
    caption: "Time to draft a full system quote",
    tone: "green",
    delta: { value: "38ms faster", direction: "down" },
    sparkline: [520, 498, 470, 455, 438, 420, 412],
  },
]

/**
 * The stream, newest first. Correlation ids thread related lines together
 * (e.g. trc-9f2a covers the Patrol quote → SMS → payment-link journey).
 */
export const LOG_STREAM: ReadonlyArray<TorqueLogEntry> = [
  {
    id: "log-001",
    time: "14:46:08.214",
    timestamp: "2026-05-29T14:46:08.214+10:00",
    level: "info",
    source: "quotes-api",
    message: "Drafted cat-back + tune quote for Ford Ranger Raptor",
    correlationId: "trc-7c41e9",
    fields: [
      ["vehicle", "Ford Ranger Raptor (2023)"],
      ["rego", "DXR-42P"],
      ["quoteId", "Q-4821"],
      ["lineItems", "4"],
      ["total", "$2,450.00"],
      ["draftMs", "388"],
      ["customer", "Macca's workshop · Oak Flats"],
    ],
  },
  {
    id: "log-002",
    time: "14:45:51.902",
    timestamp: "2026-05-29T14:45:51.902+10:00",
    level: "warn",
    source: "parts-catalogue",
    message: "Low stock: 2.5″ mandrel bends below reorder point",
    correlationId: "trc-7c41e9",
    fields: [
      ["sku", "MB-250-90"],
      ["onHand", "4"],
      ["reorderPoint", "8"],
      ["supplier", "Manta / XForce — Unanderra"],
      ["action", "Reorder raised via supplier portal"],
    ],
  },
  {
    id: "log-003",
    time: "14:45:33.040",
    timestamp: "2026-05-29T14:45:33.040+10:00",
    level: "info",
    source: "customer-sms",
    message: "Sent booking confirmation for Hilux 2.8L DPF-back",
    correlationId: "trc-3b88a1",
    fields: [
      ["to", "+61 4xx xxx 118"],
      ["template", "booking-confirm-v3"],
      ["bookingId", "B-2209"],
      ["slot", "Fri 30 May · 09:30 · Bay 2"],
      ["segments", "1"],
      ["provider", "messagemedia"],
    ],
  },
  {
    id: "log-004",
    time: "14:44:19.671",
    timestamp: "2026-05-29T14:44:19.671+10:00",
    level: "error",
    source: "payment-gateway",
    message: "Deposit capture failed — issuer declined, retry scheduled",
    correlationId: "trc-9f2a6d",
    fields: [
      ["invoiceId", "INV-7741"],
      ["amount", "$300.00"],
      ["reason", "do_not_honour"],
      ["attempt", "1 of 3"],
      ["nextRetry", "14:49:19 (+5 min)"],
      ["job", "Nissan Patrol Y62 · 3″ mandrel exhaust"],
    ],
  },
  {
    id: "log-005",
    time: "14:43:58.115",
    timestamp: "2026-05-29T14:43:58.115+10:00",
    level: "info",
    source: "social-scheduler",
    message: "Queued Raptor build reel for Mufflerpulse channels",
    correlationId: "trc-1a07c2",
    fields: [
      ["post", "ranger-raptor-build-0529"],
      ["channels", "Instagram, Facebook"],
      ["scheduledFor", "15:00 today"],
      ["hashtags", "#IllawarraExhaust #OakFlats"],
      ["assets", "1 reel · 3 stills"],
    ],
  },
  {
    id: "log-006",
    time: "14:43:02.488",
    timestamp: "2026-05-29T14:43:02.488+10:00",
    level: "debug",
    source: "site-edge",
    message: "Cache hit — /services/exhaust-systems rendered from edge",
    correlationId: "trc-55de10",
    fields: [
      ["route", "/services/exhaust-systems"],
      ["status", "200"],
      ["cache", "HIT"],
      ["ttfbMs", "41"],
      ["region", "syd1"],
      ["bot", "false"],
    ],
  },
  {
    id: "log-007",
    time: "14:42:40.337",
    timestamp: "2026-05-29T14:42:40.337+10:00",
    level: "warn",
    source: "customer-sms",
    message: "SMS delivery delayed — carrier retry in progress",
    correlationId: "trc-3b88a1",
    fields: [
      ["to", "+61 4xx xxx 907"],
      ["template", "reminder-24h-v2"],
      ["bookingId", "B-2204"],
      ["status", "queued"],
      ["carrier", "Telstra"],
      ["retryIn", "60s"],
    ],
  },
  {
    id: "log-008",
    time: "14:41:55.020",
    timestamp: "2026-05-29T14:41:55.020+10:00",
    level: "info",
    source: "quotes-api",
    message: "Recalculated quote — added extractors + resonator delete",
    correlationId: "trc-7c41e9",
    fields: [
      ["quoteId", "Q-4821"],
      ["vehicle", "Holden Commodore VE"],
      ["addedItems", "Extractors, Resonator delete"],
      ["prevTotal", "$2,160.00"],
      ["total", "$3,120.00"],
      ["draftMs", "402"],
    ],
  },
  {
    id: "log-009",
    time: "14:41:11.764",
    timestamp: "2026-05-29T14:41:11.764+10:00",
    level: "error",
    source: "parts-catalogue",
    message: "Supplier feed timeout — XForce stock check abandoned",
    correlationId: "trc-c2f4b8",
    fields: [
      ["supplier", "XForce"],
      ["endpoint", "GET /v2/stock"],
      ["timeoutMs", "5000"],
      ["fallback", "Used last cached count (3 hrs old)"],
      ["sku", "XF-RAPTOR-CB"],
    ],
  },
  {
    id: "log-010",
    time: "14:40:47.293",
    timestamp: "2026-05-29T14:40:47.293+10:00",
    level: "info",
    source: "payment-gateway",
    message: "Invoice settled — logbook service + muffler",
    correlationId: "trc-44a0e1",
    fields: [
      ["invoiceId", "INV-7738"],
      ["amount", "$780.00"],
      ["method", "Visa ••• 4417"],
      ["job", "Mazda BT-50 · logbook + muffler"],
      ["settledMs", "1,204"],
    ],
  },
  {
    id: "log-011",
    time: "14:40:09.560",
    timestamp: "2026-05-29T14:40:09.560+10:00",
    level: "debug",
    source: "quotes-api",
    message: "Loaded pricing matrix for Subaru WRX exhaust work",
    correlationId: "trc-1f9b73",
    fields: [
      ["vehicle", "Subaru WRX (VB)"],
      ["matrix", "wrx-vb-2024"],
      ["entries", "37"],
      ["cache", "MISS"],
      ["loadMs", "62"],
    ],
  },
  {
    id: "log-012",
    time: "14:39:31.018",
    timestamp: "2026-05-29T14:39:31.018+10:00",
    level: "info",
    source: "site-edge",
    message: "Lead captured from /contact — quote request submitted",
    correlationId: "trc-90c5aa",
    fields: [
      ["route", "/contact"],
      ["leadId", "L-3318"],
      ["interest", "Full system · Toyota LandCruiser 79"],
      ["source", "Google Business Profile"],
      ["status", "queued for Torque"],
    ],
  },
  {
    id: "log-013",
    time: "14:38:52.741",
    timestamp: "2026-05-29T14:38:52.741+10:00",
    level: "warn",
    source: "payment-gateway",
    message: "Deposit reminder unsent — customer opted out of SMS",
    correlationId: "trc-9f2a6d",
    fields: [
      ["invoiceId", "INV-7741"],
      ["customer", "Frank P."],
      ["channel", "sms"],
      ["consent", "revoked"],
      ["fallback", "Emailed payment link instead"],
    ],
  },
  {
    id: "log-014",
    time: "14:38:10.205",
    timestamp: "2026-05-29T14:38:10.205+10:00",
    level: "fatal",
    source: "social-scheduler",
    message: "Channel auth expired — Instagram token rejected",
    correlationId: "trc-1a07c2",
    fields: [
      ["channel", "Instagram"],
      ["error", "OAuthAccessTokenException"],
      ["impact", "Reel queued but not yet posted"],
      ["action", "Owner re-auth required in settings"],
      ["since", "14:31 today"],
    ],
  },
  {
    id: "log-015",
    time: "14:37:44.882",
    timestamp: "2026-05-29T14:37:44.882+10:00",
    level: "info",
    source: "customer-sms",
    message: "Sent 5-star review thank-you to repeat customer",
    correlationId: "trc-77b3c9",
    fields: [
      ["to", "+61 4xx xxx 330"],
      ["template", "review-thanks-v1"],
      ["customer", "Kel R."],
      ["job", "Hilux DPF-back"],
      ["segments", "1"],
    ],
  },
  {
    id: "log-016",
    time: "14:37:02.310",
    timestamp: "2026-05-29T14:37:02.310+10:00",
    level: "debug",
    source: "parts-catalogue",
    message: "Indexed 12 new SKUs from Manta price update",
    correlationId: "trc-c2f4b8",
    fields: [
      ["supplier", "Manta Performance"],
      ["added", "12"],
      ["updated", "48"],
      ["category", "Mandrel bends + clamps"],
      ["indexMs", "318"],
    ],
  },
]
