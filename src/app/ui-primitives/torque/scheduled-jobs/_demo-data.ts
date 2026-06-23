/**
 * Demo fixtures for the Torque "Scheduled jobs & cron" screen.
 *
 * Torque is Oak Flats Muffler Men's customer-facing business assistant
 * (Illawarra, NSW — exhausts, fabrication, servicing). This surface is the
 * cron/automations console: the marketing + ops jobs Torque runs on a
 * schedule (daily SEO audit, weekly blog draft, social digest, review
 * sweeps, service-reminder runs) with their cron expression, next/last run,
 * and last status.
 *
 * All copy below is customer-/operator-facing and must never surface the
 * internal engine codename. (Dev note: the run engine powering Torque is
 * internally the "Hermes" engine — that codename stays out of every visible
 * string by design.)
 */

import type { MetricBlockItem } from "@/app/ui-primitives/components/data-display/metric-block"
import type { StatusBadgeTone } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import type { AuditTrailEntry } from "@/app/ui-primitives/components/workflow-engine/audit-trail-rail"
import type { RunTraceSpan } from "@/app/ui-primitives/components/workflow-engine/run-trace-viewer"
import type { WorkflowTemplate } from "@/app/ui-primitives/components/workflow-engine/template-library-grid"
import type {
  EngineStatus,
  EngineTriggerKind,
} from "@/app/ui-primitives/components/workflow-engine/workflow-engine-types"

/** A scheduled automation row in the jobs table. */
export interface ScheduledJob {
  id: string
  /** Short, human job name shown to the owner. */
  name: string
  /** One-line description of what the job does. */
  blurb: string
  /** Cron expression — surfaced in a <code> cell. */
  cron: string
  /** Friendly cadence label, e.g. "Daily · 6:00am". */
  cadence: string
  /** Next scheduled fire, friendly label. */
  nextRun: string
  /** Last run timestamp, friendly label. */
  lastRun: string
  /** Last run status badge tone. */
  lastStatus: StatusBadgeTone
  /** Last run status label. */
  lastStatusLabel: string
  /** Whether the schedule is currently enabled. */
  enabled: boolean
  /** Workshop owner of the automation. */
  owner: string
}

/** The Torque automations roster — the heart of the screen. */
export const SCHEDULED_JOBS: ReadonlyArray<ScheduledJob> = [
  {
    id: "job-seo-audit",
    name: "Daily SEO audit",
    blurb: "Crawls the Oak Flats site, checks ranks for ‘exhaust Wollongong’ and flags broken pages.",
    cron: "0 6 * * *",
    cadence: "Daily · 6:00am",
    nextRun: "Tomorrow · 6:00am",
    lastRun: "Today · 6:00am",
    lastStatus: "success",
    lastStatusLabel: "Passed",
    enabled: true,
    owner: "Marketing",
  },
  {
    id: "job-blog-draft",
    name: "Weekly blog draft",
    blurb: "Drafts a how-to post (e.g. ‘Is your exhaust legal in NSW?’) for Daz to review before publish.",
    cron: "0 7 * * 1",
    cadence: "Mondays · 7:00am",
    nextRun: "Mon 1 Jun · 7:00am",
    lastRun: "Mon 25 May · 7:00am",
    lastStatus: "warn",
    lastStatusLabel: "Awaiting review",
    enabled: true,
    owner: "Content",
  },
  {
    id: "job-social-digest",
    name: "Social digest",
    blurb: "Bundles the week’s shop wins into a Facebook + Instagram carousel, queued for owner sign-off.",
    cron: "0 16 * * 5",
    cadence: "Fridays · 4:00pm",
    nextRun: "Fri 29 May · 4:00pm",
    lastRun: "Fri 22 May · 4:00pm",
    lastStatus: "success",
    lastStatusLabel: "Posted",
    enabled: true,
    owner: "Social",
  },
  {
    id: "job-review-sweep",
    name: "Google review sweep",
    blurb: "Pulls new Google reviews, drafts a reply in the shop’s voice, and nudges Daz on anything 3-star or under.",
    cron: "0 9 * * *",
    cadence: "Daily · 9:00am",
    nextRun: "Tomorrow · 9:00am",
    lastRun: "Today · 9:00am",
    lastStatus: "success",
    lastStatusLabel: "Passed",
    enabled: true,
    owner: "Reputation",
  },
  {
    id: "job-service-reminder",
    name: "Service reminder run",
    blurb: "Texts regulars whose exhaust health check is due — staggered so the bays don’t flood.",
    cron: "30 8 * * 2,4",
    cadence: "Tue & Thu · 8:30am",
    nextRun: "Thu 28 May · 8:30am",
    lastRun: "Tue 26 May · 8:30am",
    lastStatus: "success",
    lastStatusLabel: "Sent · 14",
    enabled: true,
    owner: "Retention",
  },
  {
    id: "job-quote-followup",
    name: "Quote follow-up nudge",
    blurb: "Follows up open exhaust quotes after 3 days with a friendly ‘still keen?’ and a booking link.",
    cron: "0 10 * * *",
    cadence: "Daily · 10:00am",
    nextRun: "Tomorrow · 10:00am",
    lastRun: "Today · 10:00am",
    lastStatus: "error",
    lastStatusLabel: "Failed · SMS gateway",
    enabled: true,
    owner: "Sales",
  },
  {
    id: "job-monthly-report",
    name: "Monthly owner report",
    blurb: "Compiles bookings, revenue and lead mix into a one-page PDF for Daz on the 1st.",
    cron: "0 7 1 * *",
    cadence: "1st of month · 7:00am",
    nextRun: "Mon 1 Jun · 7:00am",
    lastRun: "Fri 1 May · 7:00am",
    lastStatus: "success",
    lastStatusLabel: "Delivered",
    enabled: true,
    owner: "Reporting",
  },
  {
    id: "job-stock-sync",
    name: "Supplier stock sync",
    blurb: "Refreshes mandrel-bend and muffler stock levels from suppliers so quotes stay honest.",
    cron: "*/30 * * * *",
    cadence: "Every 30 min",
    nextRun: "Paused",
    lastRun: "Mon 19 May · 2:30pm",
    lastStatus: "neutral",
    lastStatusLabel: "Disabled",
    enabled: false,
    owner: "Parts",
  },
]

/** Header KPI strip — the figures that summarise the automations posture. */
export const POSTURE_METRICS: ReadonlyArray<MetricBlockItem> = [
  {
    id: "active-jobs",
    label: "Active jobs",
    value: "7",
    unit: "/ 8",
    delta: { label: "1 paused", direction: "flat" },
  },
  {
    id: "runs-today",
    label: "Runs today",
    value: "12",
    delta: { label: "3", direction: "up" },
  },
  {
    id: "success-rate",
    label: "7-day success",
    value: "96.4",
    unit: "%",
    delta: { label: "1.2 pts", direction: "up" },
  },
  {
    id: "next-fire",
    label: "Next fire",
    value: "8:30",
    unit: "am",
    delta: { label: "Service run", direction: "flat" },
  },
  {
    id: "needs-review",
    label: "Awaiting you",
    value: "2",
    delta: { label: "1 failed", direction: "down" },
  },
]

/** A row in the run-history list. */
export interface RunHistoryEntry {
  runId: string
  startedAt: string
  triggerKind: EngineTriggerKind
  triggerLabel: string
  status: EngineStatus
  durationMs: number
  stepsCompleted: number
  stepsTotal: number
  finalStepLabel?: string
}

/** Recent runs across all automations, newest first. */
export const RUN_HISTORY: ReadonlyArray<RunHistoryEntry> = [
  {
    runId: "OFM-7714",
    startedAt: "Today · 10:00am",
    triggerKind: "cron",
    triggerLabel: "Quote follow-up nudge",
    status: "failed",
    durationMs: 4_120,
    stepsCompleted: 3,
    stepsTotal: 5,
    finalStepLabel: "SMS gateway",
  },
  {
    runId: "OFM-7710",
    startedAt: "Today · 9:00am",
    triggerKind: "cron",
    triggerLabel: "Google review sweep",
    status: "passed",
    durationMs: 18_640,
    stepsCompleted: 6,
    stepsTotal: 6,
    finalStepLabel: "Owner digest",
  },
  {
    runId: "OFM-7702",
    startedAt: "Today · 6:00am",
    triggerKind: "cron",
    triggerLabel: "Daily SEO audit",
    status: "passed",
    durationMs: 142_300,
    stepsCompleted: 8,
    stepsTotal: 8,
    finalStepLabel: "Rank report",
  },
  {
    runId: "OFM-7689",
    startedAt: "Yesterday · 4:00pm",
    triggerKind: "cron",
    triggerLabel: "Social digest",
    status: "waiting",
    durationMs: 9_400,
    stepsCompleted: 4,
    stepsTotal: 5,
    finalStepLabel: "Owner sign-off",
  },
  {
    runId: "OFM-7651",
    startedAt: "Yesterday · 8:30am",
    triggerKind: "cron",
    triggerLabel: "Service reminder run",
    status: "passed",
    durationMs: 22_100,
    stepsCompleted: 5,
    stepsTotal: 5,
    finalStepLabel: "14 texts sent",
  },
  {
    runId: "OFM-7640",
    startedAt: "Mon 26 May · 7:00am",
    triggerKind: "manual",
    triggerLabel: "Weekly blog draft (re-run)",
    status: "skipped",
    durationMs: 1_200,
    stepsCompleted: 1,
    stepsTotal: 4,
    finalStepLabel: "Draft exists",
  },
]

/** Total duration for the failed-run trace scale, in ms. */
export const TRACE_TOTAL_MS = 4_120

/** Trace of the failed quote-follow-up run (OFM-7714) — what broke. */
export const FAILED_RUN_TRACE: ReadonlyArray<RunTraceSpan> = [
  {
    id: "trace-1",
    label: "Find stale quotes",
    service: "quotes.query · 3-day window",
    status: "passed",
    startOffsetMs: 0,
    durationMs: 420,
    level: "info",
    message: "Matched 6 open exhaust quotes idle for 3+ days across the Illawarra.",
  },
  {
    id: "trace-2",
    label: "Compose nudge",
    service: "torque.compose · shop voice",
    status: "passed",
    startOffsetMs: 460,
    durationMs: 980,
    level: "info",
    message: "Wrote a friendly ‘still keen on that cat-back?’ with a Bay 2 booking link.",
  },
  {
    id: "trace-3",
    label: "Brand voice check",
    service: "torque.guard · tone",
    status: "passed",
    startOffsetMs: 1_480,
    durationMs: 360,
    level: "info",
    message: "Passed the Oak Flats voice check — no pushy wording, ADR-safe claims only.",
  },
  {
    id: "trace-4",
    label: "Send SMS batch",
    service: "sms.send · gateway",
    status: "failed",
    startOffsetMs: 1_880,
    durationMs: 2_040,
    level: "error",
    message: "SMS gateway returned 502 on 4 of 6 messages. Held the batch and queued a retry for 10:15am.",
  },
  {
    id: "trace-5",
    label: "Alert owner",
    service: "notify.owner · Daz",
    status: "passed",
    startOffsetMs: 3_960,
    durationMs: 160,
    level: "warn",
    message: "Pinged Daz: ‘Quote nudges held — SMS provider hiccup, auto-retry set.’",
  },
]

/** A compact next-run row for the upcoming queue. */
export interface UpcomingRun {
  id: string
  name: string
  when: string
  cadence: string
  tone: "red" | "amber" | "teal" | "green" | "neutral"
}

/** Next few scheduled fires, soonest first. */
export const UPCOMING_RUNS: ReadonlyArray<UpcomingRun> = [
  {
    id: "up-1",
    name: "Service reminder run",
    when: "Thu 28 May · 8:30am",
    cadence: "Tue & Thu · 8:30am",
    tone: "teal",
  },
  {
    id: "up-2",
    name: "Social digest",
    when: "Fri 29 May · 4:00pm",
    cadence: "Fridays · 4:00pm",
    tone: "green",
  },
  {
    id: "up-3",
    name: "Weekly blog draft",
    when: "Mon 1 Jun · 7:00am",
    cadence: "Mondays · 7:00am",
    tone: "amber",
  },
  {
    id: "up-4",
    name: "Monthly owner report",
    when: "Mon 1 Jun · 7:00am",
    cadence: "1st of month · 7:00am",
    tone: "neutral",
  },
]

/** Sample cron payload for the trigger card. */
export const CRON_SAMPLE_PAYLOAD = `{
  "job": "daily-seo-audit",
  "cron": "0 6 * * *",
  "timezone": "Australia/Sydney",
  "site": "mufflermen.com.au",
  "checks": ["ranks", "broken-links", "core-web-vitals"],
  "notifyOnFail": "owner"
}`

/** Audit trail — recent changes to the automations roster. */
export const AUDIT_ENTRIES: ReadonlyArray<AuditTrailEntry> = [
  {
    id: "audit-1",
    event: "disabled",
    actor: "Daz",
    actorRole: "Owner · Oak Flats",
    timestamp: "Today · 11:20am AEST",
    summary: "Paused the supplier stock sync while the new parts feed is wired up.",
    versionTag: "v8",
  },
  {
    id: "audit-2",
    event: "edited",
    actor: "Torque",
    actorRole: "Business assistant",
    timestamp: "Today · 10:16am AEST",
    summary: "Auto-retry added to the quote follow-up nudge after the SMS gateway 502.",
    versionTag: "v7",
  },
  {
    id: "audit-3",
    event: "approved",
    actor: "Daz",
    actorRole: "Owner · Oak Flats",
    timestamp: "Fri 22 May · 4:06pm AEST",
    summary: "Signed off the weekly social digest carousel before it posted.",
    versionTag: "v6",
  },
  {
    id: "audit-4",
    event: "created",
    actor: "Mia",
    actorRole: "Front desk",
    timestamp: "Mon 19 May · 9:40am AEST",
    summary: "Set up the Google review sweep to catch anything 3-star or under.",
    versionTag: "v5",
  },
  {
    id: "audit-5",
    event: "published",
    actor: "Torque",
    actorRole: "Business assistant",
    timestamp: "Thu 15 May · 6:02am AEST",
    summary: "Daily SEO audit went live across the Oak Flats site map.",
    versionTag: "v4",
  },
]

/** Template library — automations Daz can switch on next. */
export const JOB_TEMPLATES: ReadonlyArray<WorkflowTemplate> = [
  {
    id: "tpl-recall",
    title: "Recall hit follow-up",
    summary: "Watches for exhaust-related recalls and drafts a heads-up to affected regulars.",
    category: "Retention",
    iconKind: "recall",
    steps: 5,
    installCount: 34,
    tone: "amber",
    recommended: true,
  },
  {
    id: "tpl-rego",
    title: "Roadworthy expiry SMS",
    summary: "Texts customers a fortnight before their pink slip is due, with a booking link.",
    category: "Compliance",
    iconKind: "compliance",
    steps: 4,
    installCount: 51,
    tone: "teal",
  },
  {
    id: "tpl-winback",
    title: "Lapsed customer win-back",
    summary: "Nudges customers who haven’t booked in 12 months with a free exhaust check offer.",
    category: "Sales",
    iconKind: "quote",
    steps: 6,
    installCount: 28,
    tone: "green",
  },
  {
    id: "tpl-weather",
    title: "Long-weekend road-trip push",
    summary: "Times a ‘get road-trip ready’ social post + email before public holidays.",
    category: "Marketing",
    iconKind: "playbook",
    steps: 5,
    installCount: 19,
    tone: "violet",
  },
]

/** Status legend rows for the jobs table footer. */
export const STATUS_LEGEND: ReadonlyArray<{
  key: string
  tone: StatusBadgeTone
  label: string
}> = [
  { key: "passed", tone: "success", label: "Passed" },
  { key: "review", tone: "warn", label: "Awaiting review" },
  { key: "failed", tone: "error", label: "Failed" },
  { key: "disabled", tone: "neutral", label: "Disabled" },
]
