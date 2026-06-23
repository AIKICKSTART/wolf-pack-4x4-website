/**
 * Shared types for the job queue / async tasks console primitives.
 *
 * Exported from `index.ts` so sub-routes and fixtures can type their data
 * without re-declaring queue/job/worker shapes.
 */

export type JobStatus = "queued" | "running" | "done" | "failed" | "retrying"

export type BackoffStrategy = "exponential" | "linear" | "fixed"

/**
 * Job kinds in the Oak Flats Mufflermen async pipeline.
 *
 * These map to Sidekiq-style worker classes and BullMQ queue names. Keep the
 * list closed — if a new kind is added, callers should extend the union.
 */
export type JobKind =
  | "quote-send-sms"
  | "invoice-generate-pdf"
  | "parts-feed-sync"
  | "booking-confirmation-email"
  | "webhook-stripe-payment"
  | "dispatch-supplier-po"
  | "customer-survey-trigger"

export type QueuePriority = "high" | "normal" | "low"

export type WorkerState = "idle" | "busy" | "draining" | "offline"

/** Human-readable labels for a job kind. */
export const JOB_KIND_LABEL: Record<JobKind, string> = {
  "quote-send-sms": "Quote SMS",
  "invoice-generate-pdf": "Invoice PDF",
  "parts-feed-sync": "Parts feed sync",
  "booking-confirmation-email": "Booking email",
  "webhook-stripe-payment": "Stripe webhook",
  "dispatch-supplier-po": "Supplier PO",
  "customer-survey-trigger": "Survey trigger",
}

/** Map status to a tone in the shared primitive palette. */
export const STATUS_TONE: Record<JobStatus, "teal" | "amber" | "green" | "red"> = {
  queued: "teal",
  running: "amber",
  done: "green",
  failed: "red",
  retrying: "amber",
}

/** Map priority to a tone in the shared primitive palette. */
export const PRIORITY_TONE: Record<QueuePriority, "red" | "amber" | "teal"> = {
  high: "red",
  normal: "amber",
  low: "teal",
}

/** Map worker state to a tone in the shared primitive palette. */
export const WORKER_TONE: Record<WorkerState, "green" | "amber" | "teal" | "red"> = {
  idle: "teal",
  busy: "green",
  draining: "amber",
  offline: "red",
}

/** Default canonical queue names for the Mufflermen pipeline. */
export const DEFAULT_QUEUES: ReadonlyArray<QueuePriority> = ["high", "normal", "low"]
