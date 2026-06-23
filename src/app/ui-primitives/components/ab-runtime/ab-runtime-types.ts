/* Shared types for the ab-runtime (live A/B + feature-flag) primitive family. */

export type AbRuntimeTone = "neutral" | "red" | "amber" | "teal" | "green"

export type AbExperimentStatus =
  | "scheduled"
  | "running"
  | "ramping"
  | "stopped"
  | "shipped"
  | "killed"

export type AbArmRole = "control" | "treatment" | "shadow"

export type AbDecisionRecommendation =
  | "ship-treatment"
  | "iterate"
  | "kill"
  | "keep-running"

export type AbStoppingRule =
  | "futility"
  | "superiority"
  | "guardrail"
  | "max-duration"

export type AbSegmentKey = "mobile" | "desktop" | "ios" | "android" | "au" | "nz"

export type AbHistoryOutcome =
  | "shipped"
  | "iterated"
  | "killed"
  | "inconclusive"

export const STATUS_LABEL: Record<AbExperimentStatus, string> = {
  scheduled: "Scheduled",
  running: "Running",
  ramping: "Ramping",
  stopped: "Stopped",
  shipped: "Shipped",
  killed: "Killed",
}

export const STATUS_TONE: Record<AbExperimentStatus, AbRuntimeTone> = {
  scheduled: "neutral",
  running: "teal",
  ramping: "amber",
  stopped: "neutral",
  shipped: "green",
  killed: "red",
}

export const DECISION_LABEL: Record<AbDecisionRecommendation, string> = {
  "ship-treatment": "Ship treatment",
  iterate: "Iterate",
  kill: "Kill",
  "keep-running": "Keep running",
}

export const DECISION_TONE: Record<AbDecisionRecommendation, AbRuntimeTone> = {
  "ship-treatment": "green",
  iterate: "amber",
  kill: "red",
  "keep-running": "teal",
}

export const STOPPING_RULE_LABEL: Record<AbStoppingRule, string> = {
  futility: "Futility",
  superiority: "Superiority",
  guardrail: "Guardrail",
  "max-duration": "Max duration",
}

export const STOPPING_RULE_TONE: Record<AbStoppingRule, AbRuntimeTone> = {
  futility: "amber",
  superiority: "green",
  guardrail: "red",
  "max-duration": "neutral",
}

export const SEGMENT_LABEL: Record<AbSegmentKey, string> = {
  mobile: "Mobile",
  desktop: "Desktop",
  ios: "iOS",
  android: "Android",
  au: "AU",
  nz: "NZ",
}

export const HISTORY_OUTCOME_LABEL: Record<AbHistoryOutcome, string> = {
  shipped: "Shipped",
  iterated: "Iterated",
  killed: "Killed",
  inconclusive: "Inconclusive",
}

export const HISTORY_OUTCOME_TONE: Record<AbHistoryOutcome, AbRuntimeTone> = {
  shipped: "green",
  iterated: "amber",
  killed: "red",
  inconclusive: "neutral",
}

export const ARM_ROLE_LABEL: Record<AbArmRole, string> = {
  control: "Control",
  treatment: "Treatment",
  shadow: "Shadow",
}

export interface AbExperimentArmSummary {
  id: string
  name: string
  role: AbArmRole
  /** Allocation percent 0..100. */
  allocation: number
  /** Conversion rate for the primary metric, percentage 0..100. */
  conversionRate?: number
  /** Whether this arm is the current winner. */
  isWinner?: boolean
}

/** Significance-star tier driven by p-value. */
export type AbSignificanceTier = "none" | "one" | "two" | "three"

export function significanceTier(pValue: number | undefined): AbSignificanceTier {
  if (pValue === undefined || Number.isNaN(pValue)) return "none"
  if (pValue < 0.001) return "three"
  if (pValue < 0.01) return "two"
  if (pValue < 0.05) return "one"
  return "none"
}

export function formatSignificanceStars(tier: AbSignificanceTier): string {
  switch (tier) {
    case "three":
      return "***"
    case "two":
      return "**"
    case "one":
      return "*"
    default:
      return ""
  }
}

export function formatPValue(p: number | undefined): string {
  if (p === undefined || Number.isNaN(p)) return "—"
  if (p < 0.001) return "p < 0.001"
  return `p = ${p.toFixed(3)}`
}

export function formatLiftPercent(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return "—"
  if (value > 0) return `+${value.toFixed(1)}%`
  if (value < 0) return `${value.toFixed(1)}%`
  return "0.0%"
}

export function formatSampleSize(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return n.toString()
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toFixed(fractionDigits)}%`
}
