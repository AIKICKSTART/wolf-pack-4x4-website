/**
 * Demo data for the Torque web-terminal scene.
 *
 * Read-only operator-console fixtures for Oak Flats Muffler Men (Illawarra NSW).
 * Dev note: this surface mirrors the internal node-pty operator console — but it
 * is a SAFE, READ-ONLY demo. No real shell is attached. All output below is
 * canned transcript, not live process output.
 */

import type { MetricBlockItem } from "@/app/ui-primitives/components/data-display/metric-block"
import type { StatusBadgeTone } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import type { OutputStreamSample } from "@/app/ui-primitives/components/dev-experience"

/** A single operator console session, shown as a selectable tab. */
export interface TerminalSession {
  /** Stable id used for tab selection + aria-controls wiring. */
  id: string
  /** Tab label, e.g. "ofm-prod · web". */
  label: string
  /** Short host/role descriptor under the scrollback header. */
  host: string
  /** Run status chip tone + label. */
  statusTone: StatusBadgeTone
  statusLabel: string
  /** Monospaced scrollback transcript — prompt lines + canned output. */
  transcript: string
  /** Tabbed stdout/stderr/network/json streams for the run detail pane. */
  streams: ReadonlyArray<OutputStreamSample>
}

/** Top status-strip chips describing the operator session at a glance. */
export interface StatusChip {
  tone: StatusBadgeTone
  label: string
}

export const STATUS_CHIPS: ReadonlyArray<StatusChip> = [
  { tone: "success", label: "Connection healthy" },
  { tone: "info", label: "Read-only demo" },
  { tone: "brand", label: "Operator-only" },
  { tone: "neutral", label: "ap-southeast-2 · Sydney" },
]

export const SESSION_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "uptime",
    label: "Session uptime",
    value: "04:12:37",
    delta: { label: "stable", direction: "flat" },
  },
  {
    id: "commands",
    label: "Commands run",
    value: "1,284",
    delta: { label: "+36 today", direction: "up" },
  },
  {
    id: "latency",
    label: "Round-trip latency",
    value: "41",
    unit: "ms",
    delta: { label: "-6ms", direction: "down" },
  },
  {
    id: "exit",
    label: "Last exit code",
    value: "0",
    delta: { label: "ok", direction: "flat" },
  },
]

const WEB_TRANSCRIPT = `oakflats@ofm-prod:~/torque$ torque status --service web
  Torque web surface ........ ONLINE   pid 4417   up 4h 12m
  Booking widget ............ ONLINE   p95 118ms
  Quote engine .............. ONLINE   queue 0
  CMS renderer .............. ONLINE   cache HIT 96.4%
oakflats@ofm-prod:~/torque$ torque logs --tail 6 --service web
[08:41:02] GET  /book/dapto-exhaust-check         200  84ms
[08:41:04] POST /api/quote  Hilux 2.8L volume-legal 201  142ms
[08:41:09] GET  /services/performance-exhausts    200  61ms
[08:41:17] GET  /parts/cat-back-stainless         200  73ms
[08:41:25] POST /api/booking  bay-3 Tue 10:30      201  119ms
[08:41:33] GET  /contact-the-workshop             200  58ms
oakflats@ofm-prod:~/torque$ torque health --probe booking
  booking-widget: ready
  availability sync: 12s ago
  next free bay: Tue 10:30 (Bay 3)
oakflats@ofm-prod:~/torque$ _`

const QUOTE_TRANSCRIPT = `oakflats@ofm-prod:~/torque$ torque quote inspect --id Q-3417
  Customer .... Hilux owner · Dapto NSW
  Vehicle ..... Toyota Hilux 2.8L 1GD-FTV
  Request ..... Cat-back stainless, volume-legal
  Drafted by .. Torque assistant   status: AWAITING OWNER SIGN-OFF
oakflats@ofm-prod:~/torque$ torque quote lines --id Q-3417
  1x  Cat-back 3" 409 stainless system .......  $1,420.00
  1x  High-flow metallic cat ................. $   480.00
  2x  Polished angle-cut tips ................ $   190.00
  Labour  3.5h @ $132/h ..................... $   462.00
  ----------------------------------------------------
  Subtotal ................................. $ 2,552.00
  GST (10%) ................................ $   255.20
  Total .................................... $ 2,807.20
oakflats@ofm-prod:~/torque$ torque quote validate --id Q-3417
  ✓ ADR 83/00 noise compliance referenced
  ✓ Parts in stock at Oak Flats
  ! Owner approval required before send
oakflats@ofm-prod:~/torque$ _`

const WORKER_TRANSCRIPT = `oakflats@ofm-prod:~/torque$ torque jobs --queue workshop --live
  RUNNING   sync-bay-availability       since 00:03   ████████░░ 82%
  RUNNING   draft-followup-sms          since 00:01   ███░░░░░░░ 31%
  QUEUED    refresh-parts-pricing       eta   00:42
  QUEUED    rebuild-services-sitemap    eta   01:10
oakflats@ofm-prod:~/torque$ torque worker stats
  workers ........ 3 active / 4 max
  throughput ..... 148 jobs/hr
  failures ....... 0 in last 1h
  retry backoff .. exponential (cap 60s)
oakflats@ofm-prod:~/torque$ torque worker drain --dry-run
  would drain 2 running + 2 queued jobs
  estimated graceful stop: ~70s
  (dry run — no jobs stopped)
oakflats@ofm-prod:~/torque$ _`

export const SESSIONS: ReadonlyArray<TerminalSession> = [
  {
    id: "web",
    label: "ofm-prod · web",
    host: "oakflats@ofm-prod · web surface · ap-southeast-2",
    statusTone: "success",
    statusLabel: "Running · exit 0",
    transcript: WEB_TRANSCRIPT,
    streams: [
      {
        stream: "stdout",
        badge: "live",
        content: `torque status --service web
web surface ONLINE  pid 4417  up 4h12m
booking widget ONLINE  p95 118ms
quote engine ONLINE  queue 0
cms renderer ONLINE  cache HIT 96.4%`,
      },
      {
        stream: "stderr",
        badge: "0 errors",
        content: `(no errors in the last hour)
last warning 03:58:11 — slow upstream supplier feed (retried, ok)`,
      },
      {
        stream: "network",
        badge: "200 OK",
        content: `GET  /book/dapto-exhaust-check     200  84ms
POST /api/quote                    201  142ms
GET  /services/performance-exhausts 200  61ms
POST /api/booking  bay-3 Tue 10:30 201  119ms`,
      },
      {
        stream: "json",
        badge: "health",
        content: `{
  "service": "web",
  "status": "online",
  "pid": 4417,
  "uptimeSeconds": 15157,
  "cacheHitRatio": 0.964,
  "nextFreeBay": "Tue 10:30 (Bay 3)"
}`,
      },
    ],
  },
  {
    id: "quote",
    label: "ofm-prod · quotes",
    host: "oakflats@ofm-prod · quote engine · ap-southeast-2",
    statusTone: "warn",
    statusLabel: "Holding · owner sign-off",
    transcript: QUOTE_TRANSCRIPT,
    streams: [
      {
        stream: "stdout",
        badge: "Q-3417",
        content: `quote inspect --id Q-3417
customer  Hilux owner · Dapto NSW
vehicle   Toyota Hilux 2.8L 1GD-FTV
request   Cat-back stainless, volume-legal
total     $2,807.20 inc GST
status    AWAITING OWNER SIGN-OFF`,
      },
      {
        stream: "stderr",
        badge: "1 notice",
        content: `notice: owner approval required before this quote can be sent
no errors`,
      },
      {
        stream: "network",
        badge: "held",
        content: `POST /api/quote/send  Q-3417  — BLOCKED (approval gate)
GET  /api/parts/availability/oak-flats  200  47ms`,
      },
      {
        stream: "json",
        badge: "draft",
        content: `{
  "quoteId": "Q-3417",
  "vehicle": "Toyota Hilux 2.8L",
  "totalCents": 280720,
  "currency": "AUD",
  "compliance": "ADR 83/00",
  "approval": "pending_owner"
}`,
      },
    ],
  },
  {
    id: "worker",
    label: "ofm-prod · workers",
    host: "oakflats@ofm-prod · job workers · ap-southeast-2",
    statusTone: "info",
    statusLabel: "Running · 3 active",
    transcript: WORKER_TRANSCRIPT,
    streams: [
      {
        stream: "stdout",
        badge: "3 active",
        content: `jobs --queue workshop --live
RUNNING sync-bay-availability  82%
RUNNING draft-followup-sms     31%
QUEUED  refresh-parts-pricing  eta 00:42
QUEUED  rebuild-services-sitemap eta 01:10`,
      },
      {
        stream: "stderr",
        badge: "0 failed",
        content: `0 failures in last 1h
retry backoff: exponential (cap 60s)`,
      },
      {
        stream: "network",
        badge: "internal",
        content: `internal queue traffic only — no public endpoints touched
PUB  workshop.jobs.completed  148/hr`,
      },
      {
        stream: "json",
        badge: "stats",
        content: `{
  "workersActive": 3,
  "workersMax": 4,
  "throughputPerHour": 148,
  "failuresLastHour": 0
}`,
      },
    ],
  },
]

/** Read-only command-history hints shown beside the prompt input. */
export const SUGGESTED_COMMANDS: ReadonlyArray<string> = [
  "torque status",
  "torque logs --tail",
  "torque quote inspect",
  "torque jobs --live",
]
