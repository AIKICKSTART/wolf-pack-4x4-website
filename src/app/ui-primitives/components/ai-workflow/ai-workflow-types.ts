/**
 * Shared types for the Mufflermen AI workflow builder primitive family.
 *
 * These primitives compose into a visual AI workflow studio — drag-drop canvas,
 * prompt blocks, model selectors, eval gates, agent loops, RAG blocks, safety
 * checks and triggers. Used to define what Hermes can do and what marketing
 * automations run on the AI layer. Visual reference only — presentational.
 */

/** Tone vocabulary aligned with the global primitive palette. */
export type WorkflowTone = "neutral" | "red" | "amber" | "teal" | "green" | "violet"

/** AI model identifiers used across the workflow studio. */
export type WorkflowModelId =
  | "claude-opus-4.7"
  | "gpt-4o-2024"
  | "gemini-2.5-flash"
  | "llama-3.3-70b"

/** Coarse model class — drives the badge colour + tier label. */
export type WorkflowModelTier = "frontier" | "balanced" | "fast" | "self-hosted"

/** Pricing dimension for the model selector. */
export type WorkflowModelSpeed = "fast" | "medium" | "slow"

/** Workshop-aware tool kit available to workflow nodes. */
export type WorkflowToolName =
  | "parts.search"
  | "quote.create"
  | "booking.find"
  | "customer.lookup"
  | "hermes.escalate"

/** Discriminator for the node kind on the flow canvas. */
export type WorkflowNodeKind =
  | "trigger"
  | "prompt"
  | "model"
  | "tool"
  | "vector"
  | "gate"
  | "parallel"
  | "loop"
  | "safety"
  | "output"

/** Node lifecycle status — drives the dot + halo on the canvas. */
export type WorkflowNodeStatus = "idle" | "active" | "running" | "passed" | "failed" | "skipped"

/** Output gate strategy. */
export type WorkflowGateStrategy = "regex" | "json-schema" | "eval-fn"

/** Outcome of a gate evaluation against a sample. */
export type WorkflowGateOutcome = "pass" | "fail" | "warn"

/** Parallel branch join strategies. */
export type WorkflowJoinStrategy = "first" | "all" | "race"

/** Agentic loop halt reasons. */
export type WorkflowHaltReason =
  | "max-iterations"
  | "goal-reached"
  | "tool-error"
  | "budget-cap"
  | "human-stop"

/** Trigger kinds for the trigger card. */
export type WorkflowTriggerKind = "webhook" | "cron" | "event" | "manual"

/** Vector retrieval embedding models. */
export type WorkflowEmbeddingModel =
  | "text-embedding-3-large"
  | "text-embedding-3-small"
  | "voyage-3"
  | "nomic-embed-v1"

/** Safety check kinds. */
export type WorkflowSafetyKind = "moderation" | "pii" | "jailbreak" | "topic-fence"

/** Safety action taken when a check trips. */
export type WorkflowSafetyAction = "block" | "redact" | "flag" | "escalate"

/** Strongly-typed canvas node payload — discriminated by `kind`. */
export type WorkflowNode =
  | {
      kind: "trigger"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      trigger: WorkflowTriggerKind
    }
  | {
      kind: "prompt"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      tokens: number
    }
  | {
      kind: "model"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      modelId: WorkflowModelId
    }
  | {
      kind: "tool"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      toolName: WorkflowToolName
    }
  | {
      kind: "vector"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      topK: number
    }
  | {
      kind: "gate"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      strategy: WorkflowGateStrategy
    }
  | {
      kind: "parallel"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      branches: number
    }
  | {
      kind: "loop"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      iterations: number
    }
  | {
      kind: "safety"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
      safetyKind: WorkflowSafetyKind
    }
  | {
      kind: "output"
      id: string
      x: number
      y: number
      title: string
      subtitle: string
      status: WorkflowNodeStatus
    }

/** Connection between two nodes on the canvas. */
export interface WorkflowEdge {
  id: string
  from: string
  to: string
  label?: string
  /** Optional tone — used for "fail" branches or "skip" paths. */
  tone?: WorkflowTone
  /** Dashed for control-plane / dotted edges (gate fail, loop). */
  dashed?: boolean
}

/** ---- Display dictionaries ------------------------------------------------ */

export const MODEL_LABEL: Record<WorkflowModelId, string> = {
  "claude-opus-4.7": "Claude Opus 4.7",
  "gpt-4o-2024": "GPT-4o",
  "gemini-2.5-flash": "Gemini 2.5 Flash",
  "llama-3.3-70b": "Llama 3.3 · 70B",
}

export const MODEL_VENDOR: Record<WorkflowModelId, string> = {
  "claude-opus-4.7": "Anthropic",
  "gpt-4o-2024": "OpenAI",
  "gemini-2.5-flash": "Google DeepMind",
  "llama-3.3-70b": "Self-hosted · GPU bay",
}

export const MODEL_TIER: Record<WorkflowModelId, WorkflowModelTier> = {
  "claude-opus-4.7": "frontier",
  "gpt-4o-2024": "balanced",
  "gemini-2.5-flash": "fast",
  "llama-3.3-70b": "self-hosted",
}

export const MODEL_TIER_LABEL: Record<WorkflowModelTier, string> = {
  frontier: "Frontier",
  balanced: "Balanced",
  fast: "Fast",
  "self-hosted": "Self-hosted",
}

export const MODEL_TIER_TONE: Record<WorkflowModelTier, WorkflowTone> = {
  frontier: "violet",
  balanced: "teal",
  fast: "green",
  "self-hosted": "amber",
}

export const MODEL_SPEED_LABEL: Record<WorkflowModelSpeed, string> = {
  fast: "Fast · sub-1s",
  medium: "Medium · 1–3s",
  slow: "Considered · 3–8s",
}

/** USD per 1M input tokens — used for cost projection. Read-only mock pricing. */
export const MODEL_COST_PER_MILLION: Record<WorkflowModelId, number> = {
  "claude-opus-4.7": 15.0,
  "gpt-4o-2024": 5.0,
  "gemini-2.5-flash": 0.3,
  "llama-3.3-70b": 0.02,
}

/** Typical latency per call in milliseconds — for the model card chip. */
export const MODEL_TYPICAL_LATENCY_MS: Record<WorkflowModelId, number> = {
  "claude-opus-4.7": 2400,
  "gpt-4o-2024": 1100,
  "gemini-2.5-flash": 380,
  "llama-3.3-70b": 640,
}

export const MODEL_SPEED: Record<WorkflowModelId, WorkflowModelSpeed> = {
  "claude-opus-4.7": "slow",
  "gpt-4o-2024": "medium",
  "gemini-2.5-flash": "fast",
  "llama-3.3-70b": "medium",
}

export const TOOL_LABEL: Record<WorkflowToolName, string> = {
  "parts.search": "Parts · search",
  "quote.create": "Quote · create",
  "booking.find": "Booking · find",
  "customer.lookup": "Customer · lookup",
  "hermes.escalate": "Hermes · escalate",
}

export const TOOL_BLURB: Record<WorkflowToolName, string> = {
  "parts.search": "Hit the supplier catalogue. Returns SKU + stock + lead time + price.",
  "quote.create": "Author a quote ID with line items and persist to the CRM.",
  "booking.find": "Search bay availability windows — Bay 1 / 2 / 3 + bay-specific tooling.",
  "customer.lookup": "Fetch a customer record by phone / rego / email.",
  "hermes.escalate": "Route the conversation to Hermes' live operator queue.",
}

export const NODE_KIND_LABEL: Record<WorkflowNodeKind, string> = {
  trigger: "Trigger",
  prompt: "Prompt",
  model: "Model",
  tool: "Tool call",
  vector: "Vector",
  gate: "Output gate",
  parallel: "Parallel",
  loop: "Agent loop",
  safety: "Safety",
  output: "Output",
}

export const NODE_KIND_TONE: Record<WorkflowNodeKind, WorkflowTone> = {
  trigger: "green",
  prompt: "teal",
  model: "violet",
  tool: "amber",
  vector: "teal",
  gate: "amber",
  parallel: "neutral",
  loop: "violet",
  safety: "red",
  output: "green",
}

export const NODE_STATUS_LABEL: Record<WorkflowNodeStatus, string> = {
  idle: "Idle",
  active: "Selected",
  running: "Running",
  passed: "Passed",
  failed: "Failed",
  skipped: "Skipped",
}

export const NODE_STATUS_TONE: Record<WorkflowNodeStatus, WorkflowTone> = {
  idle: "neutral",
  active: "teal",
  running: "teal",
  passed: "green",
  failed: "red",
  skipped: "amber",
}

export const GATE_STRATEGY_LABEL: Record<WorkflowGateStrategy, string> = {
  regex: "Regex",
  "json-schema": "JSON schema",
  "eval-fn": "Eval fn",
}

export const GATE_OUTCOME_LABEL: Record<WorkflowGateOutcome, string> = {
  pass: "Pass",
  fail: "Fail",
  warn: "Warn",
}

export const GATE_OUTCOME_TONE: Record<WorkflowGateOutcome, WorkflowTone> = {
  pass: "green",
  fail: "red",
  warn: "amber",
}

export const JOIN_STRATEGY_LABEL: Record<WorkflowJoinStrategy, string> = {
  first: "First to finish",
  all: "Wait for all",
  race: "Race · best score",
}

export const HALT_REASON_LABEL: Record<WorkflowHaltReason, string> = {
  "max-iterations": "Max iterations",
  "goal-reached": "Goal reached",
  "tool-error": "Tool error",
  "budget-cap": "Budget cap",
  "human-stop": "Human stop",
}

export const HALT_REASON_TONE: Record<WorkflowHaltReason, WorkflowTone> = {
  "max-iterations": "amber",
  "goal-reached": "green",
  "tool-error": "red",
  "budget-cap": "amber",
  "human-stop": "neutral",
}

export const TRIGGER_KIND_LABEL: Record<WorkflowTriggerKind, string> = {
  webhook: "Webhook",
  cron: "Cron",
  event: "Event bus",
  manual: "Manual",
}

export const TRIGGER_KIND_TONE: Record<WorkflowTriggerKind, WorkflowTone> = {
  webhook: "teal",
  cron: "amber",
  event: "violet",
  manual: "neutral",
}

export const EMBEDDING_LABEL: Record<WorkflowEmbeddingModel, string> = {
  "text-embedding-3-large": "text-embedding-3-large",
  "text-embedding-3-small": "text-embedding-3-small",
  "voyage-3": "voyage-3",
  "nomic-embed-v1": "nomic-embed-v1",
}

export const SAFETY_KIND_LABEL: Record<WorkflowSafetyKind, string> = {
  moderation: "Moderation",
  pii: "PII redact",
  jailbreak: "Jailbreak",
  "topic-fence": "Topic fence",
}

export const SAFETY_KIND_TONE: Record<WorkflowSafetyKind, WorkflowTone> = {
  moderation: "red",
  pii: "amber",
  jailbreak: "red",
  "topic-fence": "amber",
}

export const SAFETY_ACTION_LABEL: Record<WorkflowSafetyAction, string> = {
  block: "Block · halt",
  redact: "Redact",
  flag: "Flag · continue",
  escalate: "Escalate to Hermes",
}

export const SAFETY_ACTION_TONE: Record<WorkflowSafetyAction, WorkflowTone> = {
  block: "red",
  redact: "amber",
  flag: "amber",
  escalate: "violet",
}

/** ---- Helpers ------------------------------------------------------------- */

/** Format an AUD-flavoured cost figure with sensible precision. */
export function formatCost(usd: number, currency: "USD" | "AUD" = "USD"): string {
  const symbol = currency === "AUD" ? "A$" : "$"
  if (usd === 0) {
    return `${symbol}0.00`
  }
  if (usd < 0.01) {
    return `${symbol}${usd.toFixed(4)}`
  }
  if (usd < 1) {
    return `${symbol}${usd.toFixed(3)}`
  }
  if (usd < 100) {
    return `${symbol}${usd.toFixed(2)}`
  }
  return `${symbol}${Math.round(usd).toLocaleString()}`
}

/** Format a token count compactly (1,486 → "1.5k"). */
export function formatTokens(count: number): string {
  if (count < 1_000) {
    return `${count}`
  }
  if (count < 100_000) {
    return `${(count / 1_000).toFixed(1)}k`
  }
  if (count < 1_000_000) {
    return `${Math.round(count / 1_000)}k`
  }
  return `${(count / 1_000_000).toFixed(2)}M`
}

/** Estimate the cost of a single run given input + output token counts. */
export function projectCost(
  modelId: WorkflowModelId,
  inputTokens: number,
  outputTokens: number,
): number {
  // Output tokens are typically charged at ~3× input; use a flat 2.4× to keep math clean.
  const inputCost = (inputTokens / 1_000_000) * MODEL_COST_PER_MILLION[modelId]
  const outputCost = (outputTokens / 1_000_000) * MODEL_COST_PER_MILLION[modelId] * 2.4
  return inputCost + outputCost
}

/** Bucket a 0..100 score into a tone — mirrors hermes-agent toneForScore. */
export function workflowScoreTone(score: number): WorkflowTone {
  const clamped = Math.max(0, Math.min(100, score))
  if (clamped >= 85) return "green"
  if (clamped >= 65) return "teal"
  if (clamped >= 40) return "amber"
  return "red"
}

/** Format a percentage with one decimal, locale-aware, no trailing zero noise. */
export function formatRate(ratio: number): string {
  const value = Math.max(0, Math.min(1, ratio)) * 100
  return value >= 99.95 ? "100%" : `${value.toFixed(1)}%`
}
