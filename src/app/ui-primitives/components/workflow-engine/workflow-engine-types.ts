/**
 * Shared types for the Mufflermen workflow engine primitive family.
 *
 * The workflow engine sits next to the AI workflow builder — it covers the
 * deterministic business automations the workshop runs day-to-day. Quote
 * follow-up nudges, roadworthy expiry SMS, refund approvals, customer
 * welcome flows, recall hit follow-ups. Visual reference only —
 * presentational. No runtime behaviour beyond local UI state.
 */

/** Tone vocabulary aligned with the global primitive palette. */
export type EngineTone =
  | "neutral"
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "violet"

/** Discriminator for workflow step nodes on the builder canvas. */
export type EngineStepKind =
  | "action"
  | "decision"
  | "wait"
  | "parallel"
  | "loop"
  | "approval"
  | "trigger"
  | "end"

/** Lifecycle status for steps + runs + audit entries. */
export type EngineStatus =
  | "idle"
  | "active"
  | "running"
  | "passed"
  | "failed"
  | "skipped"
  | "cancelled"
  | "waiting"

/** Trigger source kinds for the trigger config card. */
export type EngineTriggerKind = "webhook" | "cron" | "event" | "manual"

/** Backoff strategies for retry policy. */
export type EngineBackoff = "fixed" | "linear" | "exponential"

/** Join strategies for fan-out / parallel cards. */
export type EngineJoinStrategy = "first" | "all" | "race"

/** Variable runtime types — drives the icon + tone on variable rows. */
export type EngineVarType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "date"
  | "currency"

/** Variable source — where the value flows in from. */
export type EngineVarSource = "trigger" | "step" | "constant" | "secret" | "context"

/** Error handler action kinds — chained on a single error block. */
export type EngineErrorAction = "catch" | "compensate" | "alert" | "retry"

/** Approval decisions on the manual gate. */
export type EngineApprovalDecision = "pending" | "approved" | "rejected" | "expired"

/** Audit trail entry kinds. */
export type EngineAuditEvent =
  | "created"
  | "edited"
  | "published"
  | "disabled"
  | "approved"
  | "reverted"

/** Run trace span level used by the trace viewer. */
export type EngineTraceLevel = "info" | "warn" | "error"

/** Strongly-typed canvas step payload — discriminated by `kind`. */
export type EngineStep =
  | {
      kind: "trigger"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      trigger: EngineTriggerKind
    }
  | {
      kind: "action"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      service: string
    }
  | {
      kind: "decision"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      expression: string
    }
  | {
      kind: "wait"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      durationLabel: string
    }
  | {
      kind: "parallel"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      branches: number
    }
  | {
      kind: "loop"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      iterations: number
    }
  | {
      kind: "approval"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
      approver: string
    }
  | {
      kind: "end"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: EngineStatus
    }

/** Connection between two steps on the canvas. */
export interface EngineEdge {
  id: string
  from: string
  to: string
  /** Optional inline label — e.g. "yes" / "no" / "timeout". */
  label?: string
  tone?: EngineTone
  /** Dashed for fail / timeout / compensate paths. */
  dashed?: boolean
}

/** ---- Display dictionaries ------------------------------------------------ */

export const STEP_KIND_LABEL: Record<EngineStepKind, string> = {
  action: "Action",
  decision: "Decision",
  wait: "Wait",
  parallel: "Parallel",
  loop: "Loop",
  approval: "Approval",
  trigger: "Trigger",
  end: "End",
}

export const STEP_KIND_TONE: Record<EngineStepKind, EngineTone> = {
  action: "teal",
  decision: "violet",
  wait: "amber",
  parallel: "neutral",
  loop: "violet",
  approval: "amber",
  trigger: "green",
  end: "neutral",
}

export const STATUS_LABEL: Record<EngineStatus, string> = {
  idle: "Idle",
  active: "Selected",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
  skipped: "Skipped",
  cancelled: "Cancelled",
  waiting: "Waiting",
}

export const STATUS_TONE: Record<EngineStatus, EngineTone> = {
  idle: "neutral",
  active: "teal",
  running: "teal",
  passed: "green",
  failed: "red",
  skipped: "amber",
  cancelled: "neutral",
  waiting: "amber",
}

export const TRIGGER_KIND_LABEL: Record<EngineTriggerKind, string> = {
  webhook: "Webhook",
  cron: "Cron",
  event: "Event bus",
  manual: "Manual",
}

export const TRIGGER_KIND_TONE: Record<EngineTriggerKind, EngineTone> = {
  webhook: "teal",
  cron: "amber",
  event: "violet",
  manual: "neutral",
}

export const BACKOFF_LABEL: Record<EngineBackoff, string> = {
  fixed: "Fixed",
  linear: "Linear",
  exponential: "Exponential",
}

export const JOIN_STRATEGY_LABEL: Record<EngineJoinStrategy, string> = {
  first: "First to finish",
  all: "Wait for all",
  race: "Race · best score",
}

export const VAR_TYPE_LABEL: Record<EngineVarType, string> = {
  string: "string",
  number: "number",
  boolean: "boolean",
  object: "object",
  array: "array",
  date: "date",
  currency: "currency",
}

export const VAR_TYPE_TONE: Record<EngineVarType, EngineTone> = {
  string: "teal",
  number: "amber",
  boolean: "violet",
  object: "neutral",
  array: "neutral",
  date: "teal",
  currency: "green",
}

export const VAR_SOURCE_LABEL: Record<EngineVarSource, string> = {
  trigger: "Trigger",
  step: "Step",
  constant: "Constant",
  secret: "Secret",
  context: "Context",
}

export const ERROR_ACTION_LABEL: Record<EngineErrorAction, string> = {
  catch: "Catch",
  compensate: "Compensate",
  alert: "Alert",
  retry: "Retry",
}

export const ERROR_ACTION_TONE: Record<EngineErrorAction, EngineTone> = {
  catch: "amber",
  compensate: "teal",
  alert: "red",
  retry: "violet",
}

export const APPROVAL_DECISION_LABEL: Record<EngineApprovalDecision, string> = {
  pending: "Awaiting",
  approved: "Approved",
  rejected: "Rejected",
  expired: "Expired",
}

export const APPROVAL_DECISION_TONE: Record<EngineApprovalDecision, EngineTone> = {
  pending: "amber",
  approved: "green",
  rejected: "red",
  expired: "neutral",
}

export const AUDIT_EVENT_LABEL: Record<EngineAuditEvent, string> = {
  created: "Created",
  edited: "Edited",
  published: "Published",
  disabled: "Disabled",
  approved: "Approved",
  reverted: "Reverted",
}

export const AUDIT_EVENT_TONE: Record<EngineAuditEvent, EngineTone> = {
  created: "teal",
  edited: "neutral",
  published: "green",
  disabled: "amber",
  approved: "green",
  reverted: "red",
}

export const TRACE_LEVEL_TONE: Record<EngineTraceLevel, EngineTone> = {
  info: "neutral",
  warn: "amber",
  error: "red",
}

/** ---- Helpers ------------------------------------------------------------- */

/** Format a duration in milliseconds compactly (1832 → "1.8s"). */
export function formatDuration(ms: number): string {
  if (ms < 0) {
    return "0ms"
  }
  if (ms < 1_000) {
    return `${Math.round(ms)}ms`
  }
  if (ms < 60_000) {
    return `${(ms / 1_000).toFixed(1)}s`
  }
  if (ms < 3_600_000) {
    const minutes = Math.floor(ms / 60_000)
    const seconds = Math.round((ms % 60_000) / 1_000)
    return `${minutes}m ${seconds.toString().padStart(2, "0")}s`
  }
  const hours = Math.floor(ms / 3_600_000)
  const minutes = Math.round((ms % 3_600_000) / 60_000)
  return `${hours}h ${minutes}m`
}

/** Format an AUD-flavoured cost figure. Used on refund approvals + template chips. */
export function formatCurrency(amount: number, currency: "AUD" | "USD" = "AUD"): string {
  const symbol = currency === "AUD" ? "A$" : "$"
  if (amount === 0) {
    return `${symbol}0.00`
  }
  if (Math.abs(amount) < 100) {
    return `${symbol}${amount.toFixed(2)}`
  }
  return `${symbol}${Math.round(amount).toLocaleString()}`
}

/** Format a percentage with one decimal place, locale-aware. */
export function formatRate(ratio: number): string {
  const value = Math.max(0, Math.min(1, ratio)) * 100
  return value >= 99.95 ? "100%" : `${value.toFixed(1)}%`
}

/** Bucket a 0..100 score into a tone for run-trace spans + template chips. */
export function engineScoreTone(score: number): EngineTone {
  const clamped = Math.max(0, Math.min(100, score))
  if (clamped >= 85) return "green"
  if (clamped >= 65) return "teal"
  if (clamped >= 40) return "amber"
  return "red"
}
