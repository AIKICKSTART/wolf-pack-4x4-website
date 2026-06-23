/**
 * Shared types for the Hermes agent control-plane primitives.
 *
 * Hermes is the workshop's customer-facing AI assistant — live on
 * mufflermen.com.au. These primitives compose into the Hermes operations
 * console: chat surface, run inspector, rule editor, evaluations, budget
 * and safety panels. Visual reference only — primitives are presentational.
 */

/** Tone vocabulary aligned with the global primitive palette. */
export type HermesTone = "neutral" | "red" | "amber" | "teal" | "green"

/** Customer channels Hermes is wired into. */
export type HermesChannel =
  | "web-chat"
  | "sms"
  | "messenger"
  | "instagram"
  | "phone-voice"

/** Tool kit available to Hermes runs. */
export type HermesToolName =
  | "quote.estimate"
  | "parts.search"
  | "bookings.create"
  | "payment.collect"
  | "refund.process"
  | "escalate.to_human"

/** Lifecycle status for an agent run step. */
export type HermesRunStepStatus = "queued" | "running" | "done" | "failed" | "skipped"

/** Discriminator for the run timeline entries. */
export type HermesRunStepKind = "plan" | "tool" | "reflection" | "response" | "handoff"

/** Lifecycle status for a connected knowledge source. */
export type HermesSourceStatus = "synced" | "syncing" | "stale" | "error" | "paused"

/** Priority lanes for the escalation queue. */
export type HermesPriority = "p1-critical" | "p2-high" | "p3-watch" | "p4-routine"

/** Conversation queue states. */
export type HermesConversationState =
  | "active"
  | "queued"
  | "handed-off"
  | "resolved"

/** Safety filter outcome. */
export type HermesFilterPhase = "pre" | "post"

/** Evaluation axes used by the rubric grid. */
export type HermesRubricAxis = "accuracy" | "tone" | "safety" | "resolution"

export const CHANNEL_LABEL: Record<HermesChannel, string> = {
  "web-chat": "Web chat",
  sms: "SMS",
  messenger: "Messenger",
  instagram: "Instagram DM",
  "phone-voice": "Phone · voice",
}

export const CHANNEL_TONE: Record<HermesChannel, HermesTone> = {
  "web-chat": "teal",
  sms: "amber",
  messenger: "teal",
  instagram: "red",
  "phone-voice": "green",
}

export const TOOL_LABEL: Record<HermesToolName, string> = {
  "quote.estimate": "Quote · estimate",
  "parts.search": "Parts · search",
  "bookings.create": "Bookings · create",
  "payment.collect": "Payment · collect",
  "refund.process": "Refund · process",
  "escalate.to_human": "Escalate · to human",
}

export const TOOL_DESCRIPTION: Record<HermesToolName, string> = {
  "quote.estimate":
    "Quote a cat-back, mid-pipe, or muffler job. Pulls fitment + supplier price + fitter hours.",
  "parts.search":
    "Look up parts catalogue + supplier stock. Returns SKU, lead time and price brackets.",
  "bookings.create":
    "Pencil in a Bay 1 / 2 / 3 slot. Honours opening hours + bay-specific tooling.",
  "payment.collect":
    "Generate a secure payment link via the Stripe terminal. Confirms total before send.",
  "refund.process":
    "Trigger a refund — guarded by a $200 cap and human approval beyond that.",
  "escalate.to_human":
    "Route to a human handler with full context bundle attached.",
}

export const RUN_STEP_STATUS_LABEL: Record<HermesRunStepStatus, string> = {
  queued: "Queued",
  running: "Running",
  done: "Done",
  failed: "Failed",
  skipped: "Skipped",
}

export const RUN_STEP_STATUS_TONE: Record<HermesRunStepStatus, HermesTone> = {
  queued: "neutral",
  running: "teal",
  done: "green",
  failed: "red",
  skipped: "amber",
}

export const SOURCE_STATUS_LABEL: Record<HermesSourceStatus, string> = {
  synced: "Synced",
  syncing: "Syncing",
  stale: "Stale",
  error: "Error",
  paused: "Paused",
}

export const SOURCE_STATUS_TONE: Record<HermesSourceStatus, HermesTone> = {
  synced: "green",
  syncing: "teal",
  stale: "amber",
  error: "red",
  paused: "neutral",
}

export const PRIORITY_LABEL: Record<HermesPriority, string> = {
  "p1-critical": "P1 · Critical",
  "p2-high": "P2 · High",
  "p3-watch": "P3 · Watch",
  "p4-routine": "P4 · Routine",
}

export const PRIORITY_TONE: Record<HermesPriority, HermesTone> = {
  "p1-critical": "red",
  "p2-high": "amber",
  "p3-watch": "teal",
  "p4-routine": "neutral",
}

export const CONVERSATION_STATE_LABEL: Record<HermesConversationState, string> = {
  active: "Active",
  queued: "Queued",
  "handed-off": "Handed off",
  resolved: "Resolved",
}

export const CONVERSATION_STATE_TONE: Record<HermesConversationState, HermesTone> = {
  active: "green",
  queued: "amber",
  "handed-off": "teal",
  resolved: "neutral",
}

/** Format a queue-time number into a human chip label. */
export function formatQueueTime(seconds: number): string {
  if (seconds < 0) {
    return `${Math.abs(seconds)}s over`
  }
  if (seconds < 60) {
    return `${seconds}s`
  }
  const mins = Math.floor(seconds / 60)
  const rest = seconds % 60
  return rest === 0 ? `${mins}m` : `${mins}m ${rest}s`
}

/** Bucket a 0..100 score into a tone. */
export function toneForScore(score: number): HermesTone {
  const clamped = Math.max(0, Math.min(100, score))
  if (clamped >= 85) return "green"
  if (clamped >= 65) return "teal"
  if (clamped >= 40) return "amber"
  return "red"
}
