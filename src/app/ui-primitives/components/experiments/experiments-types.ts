/* Shared types for the A/B testing + experimentation primitives. */

export type ExperimentStatus = "draft" | "running" | "stopped" | "decided"

export type DecisionRecommendation =
  | "ship-variant"
  | "continue"
  | "stop-loss"
  | "insufficient-power"

export type StopConditionKind =
  | "min-sample"
  | "significance"
  | "time-elapsed"
  | "manual"
  | "guardrail"

export type BanditAlgorithm =
  | "epsilon-greedy"
  | "thompson"
  | "ucb1"
  | "softmax"

export type ExperimentTone = "neutral" | "red" | "amber" | "teal" | "green"

export type SignificanceAlpha = 0.01 | 0.05 | 0.1

export type MultipleComparisonsCorrection = "bonferroni" | "fdr" | "none"

export const STATUS_LABEL: Record<ExperimentStatus, string> = {
  draft: "Draft",
  running: "Running",
  stopped: "Stopped",
  decided: "Decided",
}

export const STATUS_TONE: Record<ExperimentStatus, ExperimentTone> = {
  draft: "neutral",
  running: "teal",
  stopped: "amber",
  decided: "green",
}

export const DECISION_LABEL: Record<DecisionRecommendation, string> = {
  "ship-variant": "Ship variant",
  continue: "Continue",
  "stop-loss": "Stop loss",
  "insufficient-power": "Insufficient power",
}

export const DECISION_TONE: Record<DecisionRecommendation, ExperimentTone> = {
  "ship-variant": "green",
  continue: "teal",
  "stop-loss": "red",
  "insufficient-power": "amber",
}

export const STOP_CONDITION_LABEL: Record<StopConditionKind, string> = {
  "min-sample": "Min sample reached",
  significance: "Significance threshold",
  "time-elapsed": "Time elapsed",
  manual: "Manual",
  guardrail: "Guardrail breach",
}

export const STOP_CONDITION_TONE: Record<StopConditionKind, ExperimentTone> = {
  "min-sample": "teal",
  significance: "green",
  "time-elapsed": "neutral",
  manual: "amber",
  guardrail: "red",
}

export const BANDIT_LABEL: Record<BanditAlgorithm, string> = {
  "epsilon-greedy": "ε-greedy",
  thompson: "Thompson sampling",
  ucb1: "UCB1",
  softmax: "Softmax",
}

export const CORRECTION_LABEL: Record<MultipleComparisonsCorrection, string> = {
  bonferroni: "Bonferroni",
  fdr: "FDR (Benjamini-Hochberg)",
  none: "None",
}

export interface ExperimentVariantSummary {
  id: string
  name: string
  isControl?: boolean
}
