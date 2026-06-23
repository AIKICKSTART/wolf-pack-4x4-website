/**
 * Realistic Mufflermen fixtures for the /job-queue sub-routes.
 *
 * All data is fictional but shaped after the real async pipeline:
 * SMS quote sends, invoice PDF generation, supplier parts feeds, Stripe
 * webhooks, booking emails, dispatch POs, and customer surveys.
 */

import type {
  ConcurrencyLimit,
  DeadLetterItem,
  FailedJob,
  JobKindCount,
  JobRowItem,
  PipelineNode,
  PriorityBacklog,
  QueueDepthSeries,
  ScheduledJob,
  TimingBucket,
  TimingOutlier,
  TimingPercentile,
  WorkerStatusItem,
} from "../components/job-queue"

export const JOB_ROWS: ReadonlyArray<JobRowItem> = [
  {
    id: "job_2026_05_29_001a",
    kind: "quote-send-sms",
    status: "running",
    durationMs: 1240,
    attempt: 1,
    maxAttempts: 5,
    queue: "high",
  },
  {
    id: "job_2026_05_29_001b",
    kind: "invoice-generate-pdf",
    status: "running",
    durationMs: 3920,
    attempt: 1,
    maxAttempts: 3,
    queue: "normal",
  },
  {
    id: "job_2026_05_29_001c",
    kind: "webhook-stripe-payment",
    status: "done",
    durationMs: 612,
    attempt: 1,
    maxAttempts: 5,
    queue: "high",
  },
  {
    id: "job_2026_05_29_001d",
    kind: "parts-feed-sync",
    status: "retrying",
    durationMs: 18_400,
    attempt: 3,
    maxAttempts: 5,
    queue: "low",
  },
  {
    id: "job_2026_05_29_001e",
    kind: "booking-confirmation-email",
    status: "queued",
    durationMs: 0,
    attempt: 0,
    maxAttempts: 3,
    queue: "normal",
  },
  {
    id: "job_2026_05_29_001f",
    kind: "customer-survey-trigger",
    status: "failed",
    durationMs: 4210,
    attempt: 5,
    maxAttempts: 5,
    queue: "low",
  },
  {
    id: "job_2026_05_29_001g",
    kind: "dispatch-supplier-po",
    status: "done",
    durationMs: 8750,
    attempt: 1,
    maxAttempts: 3,
    queue: "normal",
  },
]

export const QUEUE_DEPTH_SERIES: ReadonlyArray<QueueDepthSeries> = [
  {
    priority: "high",
    depths: [12, 16, 18, 22, 24, 19, 14, 18, 22, 28, 32, 28],
  },
  {
    priority: "normal",
    depths: [42, 48, 56, 62, 68, 64, 60, 72, 78, 84, 92, 86],
  },
  {
    priority: "low",
    depths: [104, 116, 128, 140, 138, 132, 124, 118, 126, 140, 152, 144],
  },
]

export const QUEUE_DEPTH_X_LABELS: ReadonlyArray<string> = [
  "-55m",
  "-50m",
  "-45m",
  "-40m",
  "-35m",
  "-30m",
  "-25m",
  "-20m",
  "-15m",
  "-10m",
  "-5m",
  "now",
]

export const QUEUE_DEPTH_TOTAL =
  QUEUE_DEPTH_SERIES.reduce(
    (sum, lane) => sum + (lane.depths[lane.depths.length - 1] ?? 0),
    0,
  )

export const WORKERS: ReadonlyArray<WorkerStatusItem> = [
  {
    id: "oak-flats-worker-01",
    name: "oak-flats-worker-01",
    state: "busy",
    uptime: "4h 12m",
    currentJob: "invoice-generate-pdf",
    concurrency: 5,
    concurrencyCap: 8,
  },
  {
    id: "oak-flats-worker-02",
    name: "oak-flats-worker-02",
    state: "busy",
    uptime: "4h 09m",
    currentJob: "quote-send-sms",
    concurrency: 8,
    concurrencyCap: 8,
  },
  {
    id: "oak-flats-worker-03",
    name: "oak-flats-worker-03",
    state: "idle",
    uptime: "3h 58m",
    concurrency: 0,
    concurrencyCap: 8,
  },
  {
    id: "oak-flats-worker-04",
    name: "oak-flats-worker-04",
    state: "draining",
    uptime: "0h 06m",
    currentJob: "parts-feed-sync",
    concurrency: 2,
    concurrencyCap: 8,
  },
]

export const FAILED_JOBS: ReadonlyArray<FailedJob> = [
  {
    id: "job_2026_05_29_failed_92",
    kind: "customer-survey-trigger",
    errorClass: "Net::OpenTimeout",
    errorMessage: "Connection to survey vendor timed out after 30s.",
    stackTrace:
      "Net::OpenTimeout: execution expired\n  app/jobs/customer_survey_trigger_job.rb:42:in `dispatch'\n  app/jobs/customer_survey_trigger_job.rb:18:in `perform'\n  vendor/bundle/sidekiq-7.3/lib/sidekiq/processor.rb:201:in `execute_job'\n  vendor/bundle/sidekiq-7.3/lib/sidekiq/processor.rb:170:in `process'",
    failedAt: "12:42:08 AEST",
    attempt: 5,
    maxAttempts: 5,
  },
  {
    id: "job_2026_05_29_failed_93",
    kind: "parts-feed-sync",
    errorClass: "PartsApi::AuthError",
    errorMessage: "Supplier feed rejected credentials — rotate API key.",
    stackTrace:
      "PartsApi::AuthError: 401 Unauthorized\n  app/jobs/parts_feed_sync_job.rb:88:in `pull_feed'\n  app/jobs/parts_feed_sync_job.rb:32:in `perform'\n  vendor/bundle/sidekiq-7.3/lib/sidekiq/processor.rb:201:in `execute_job'",
    failedAt: "12:39:52 AEST",
    attempt: 3,
    maxAttempts: 5,
  },
  {
    id: "job_2026_05_29_failed_94",
    kind: "invoice-generate-pdf",
    errorClass: "Prawn::Errors::CannotFit",
    errorMessage: "Quote line exceeded PDF column width on row 14.",
    stackTrace:
      "Prawn::Errors::CannotFit: Cannot fit content\n  app/services/invoice_pdf_renderer.rb:212:in `render_line_items'\n  app/jobs/invoice_generate_pdf_job.rb:54:in `perform'\n  vendor/bundle/sidekiq-7.3/lib/sidekiq/processor.rb:201:in `execute_job'",
    failedAt: "12:31:18 AEST",
    attempt: 2,
    maxAttempts: 3,
  },
]

export const CONCURRENCY_LIMITS: ReadonlyArray<ConcurrencyLimit> = [
  { queue: "high", used: 8, cap: 12, minCap: 4, maxCap: 32 },
  { queue: "normal", used: 14, cap: 24, minCap: 4, maxCap: 48 },
  { queue: "low", used: 6, cap: 16, minCap: 2, maxCap: 32 },
]

export const TIMING_BUCKETS: ReadonlyArray<TimingBucket> = [
  { label: "<100", count: 412 },
  { label: "100-250", count: 1180 },
  { label: "250-500", count: 1860 },
  { label: "0.5-1s", count: 940 },
  { label: "1-2s", count: 320 },
  { label: "2-5s", count: 86 },
  { label: ">5s", count: 14 },
]

export const TIMING_PERCENTILES: ReadonlyArray<TimingPercentile> = [
  { label: "p50", valueMs: 312 },
  { label: "p90", valueMs: 920 },
  { label: "p99", valueMs: 4180 },
]

export const TIMING_OUTLIERS: ReadonlyArray<TimingOutlier> = [
  { jobId: "job_2026_05_29_001d", valueMs: 18_400 },
  { jobId: "job_2026_05_29_outlier_22", valueMs: 24_120 },
]

export const DEAD_LETTERS: ReadonlyArray<DeadLetterItem> = [
  {
    id: "job_2026_05_20_dlq_07",
    kind: "customer-survey-trigger",
    reason: "Vendor 5xx — manual review needed",
    age: "9d 4h",
  },
  {
    id: "job_2026_05_21_dlq_11",
    kind: "dispatch-supplier-po",
    reason: "Beaudesert PO endpoint returned malformed JSON",
    age: "8d 12h",
  },
  {
    id: "job_2026_05_24_dlq_03",
    kind: "webhook-stripe-payment",
    reason: "Signing key rotated mid-flight",
    age: "5d 2h",
  },
]

export const KIND_COUNTS: ReadonlyArray<JobKindCount> = [
  { kind: "quote-send-sms", total: 124 },
  { kind: "invoice-generate-pdf", total: 86 },
  { kind: "parts-feed-sync", total: 18 },
  { kind: "booking-confirmation-email", total: 162 },
  { kind: "webhook-stripe-payment", total: 92 },
  { kind: "dispatch-supplier-po", total: 24 },
  { kind: "customer-survey-trigger", total: 48 },
]

export const PRIORITY_BACKLOG: ReadonlyArray<PriorityBacklog> = [
  { priority: "high", backlog: 28 },
  { priority: "normal", backlog: 86 },
  { priority: "low", backlog: 144 },
]

export const SCHEDULED: ReadonlyArray<ScheduledJob> = [
  {
    id: "job_sched_001",
    kind: "booking-confirmation-email",
    countdownLabel: "in 2m 18s",
    scheduledFor: "13:04 AEST",
    description: "Confirmation for Joel R — Falcon FG mid-pipe replacement",
  },
  {
    id: "job_sched_002",
    kind: "parts-feed-sync",
    countdownLabel: "in 14m 02s",
    scheduledFor: "13:16 AEST",
    description: "Hushpower nightly sync (1,240 SKUs estimated)",
  },
  {
    id: "job_sched_003",
    kind: "customer-survey-trigger",
    countdownLabel: "in 1h 06m",
    scheduledFor: "14:08 AEST",
    description: "Post-service follow-up for completed bookings",
  },
  {
    id: "job_sched_004",
    kind: "dispatch-supplier-po",
    countdownLabel: "in 2h 32m",
    scheduledFor: "15:34 AEST",
    description: "Manta restock — 8 line items, $4,206 AUD",
  },
]

export const PIPELINE_NODES: ReadonlyArray<PipelineNode> = [
  { id: "n1", label: "Load quote draft", status: "done", durationMs: 240 },
  { id: "n2", label: "Render PDF body", status: "done", durationMs: 1820 },
  { id: "n3", label: "Stamp signature block", status: "running", durationMs: 612 },
  { id: "n4", label: "Upload to S3", status: "queued" },
  { id: "n5", label: "Email customer", status: "queued" },
]

export const TIMING_CAPTION = "invoice-generate-pdf · last 5,000 runs"
export const PIPELINE_NAME = "invoice-generate-pdf"
