/* Shared types for Mufflermen Customer-Success / Health-Scoring primitives. */

export type HealthBucket = "critical" | "watch" | "healthy" | "elite"

export type ChurnBucket = "low" | "medium" | "high" | "critical"

export type CsTone = "red" | "amber" | "teal" | "green" | "neutral"

export type CustomerSuccessSegment =
  | "strategic"
  | "growth"
  | "retention"
  | "win-back"

export type CustomerLifecycleStage =
  | "acquisition"
  | "onboarding"
  | "adoption"
  | "expansion"
  | "renewal"

export type HealthFactorKey =
  | "engagement"
  | "adoption"
  | "sentiment"
  | "support"
  | "value"

export type RenewalStageKey =
  | "early"
  | "planning"
  | "negotiation"
  | "verbal"
  | "signed"

export type NextBestAction =
  | "upgrade-package"
  | "fleet-expansion"
  | "service-bundle"
  | "extended-warranty"
  | "tyre-program"
  | "dyno-bundle"

export const HEALTH_BUCKET_LABEL: Record<HealthBucket, string> = {
  critical: "Critical",
  watch: "Watch",
  healthy: "Healthy",
  elite: "Elite",
}

export const HEALTH_BUCKET_TONE: Record<HealthBucket, CsTone> = {
  critical: "red",
  watch: "amber",
  healthy: "green",
  elite: "teal",
}

export const CHURN_BUCKET_LABEL: Record<ChurnBucket, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
  critical: "Critical",
}

export const CHURN_BUCKET_TONE: Record<ChurnBucket, CsTone> = {
  low: "green",
  medium: "amber",
  high: "red",
  critical: "red",
}

export const SEGMENT_LABEL: Record<CustomerSuccessSegment, string> = {
  strategic: "Strategic",
  growth: "Growth",
  retention: "Retention",
  "win-back": "Win-back",
}

export const SEGMENT_TONE: Record<CustomerSuccessSegment, CsTone> = {
  strategic: "teal",
  growth: "green",
  retention: "amber",
  "win-back": "red",
}

export const LIFECYCLE_LABEL: Record<CustomerLifecycleStage, string> = {
  acquisition: "Acquisition",
  onboarding: "Onboarding",
  adoption: "Adoption",
  expansion: "Expansion",
  renewal: "Renewal",
}

export const LIFECYCLE_ORDER: ReadonlyArray<CustomerLifecycleStage> = [
  "acquisition",
  "onboarding",
  "adoption",
  "expansion",
  "renewal",
]

export const HEALTH_FACTOR_LABEL: Record<HealthFactorKey, string> = {
  engagement: "Engagement",
  adoption: "Adoption",
  sentiment: "Sentiment",
  support: "Support",
  value: "Value",
}

export const RENEWAL_STAGE_LABEL: Record<RenewalStageKey, string> = {
  early: "Early signal",
  planning: "Planning",
  negotiation: "Negotiation",
  verbal: "Verbal yes",
  signed: "Signed",
}

export const RENEWAL_STAGE_TONE: Record<RenewalStageKey, CsTone> = {
  early: "neutral",
  planning: "teal",
  negotiation: "amber",
  verbal: "green",
  signed: "green",
}

export const NEXT_BEST_ACTION_LABEL: Record<NextBestAction, string> = {
  "upgrade-package": "Upgrade service package",
  "fleet-expansion": "Fleet expansion",
  "service-bundle": "Service bundle",
  "extended-warranty": "Extended warranty",
  "tyre-program": "Tyre rotation program",
  "dyno-bundle": "Quarterly dyno bundle",
}

export interface CustomerSuccessRef {
  id: string
  name: string
  suburb?: string
  segment?: CustomerSuccessSegment
}

/** Map a 0..100 score onto a health bucket. */
export function bucketForScore(score: number): HealthBucket {
  if (score < 30) return "critical"
  if (score < 60) return "watch"
  if (score < 90) return "healthy"
  return "elite"
}

/** Map a 0..100 churn probability onto a churn bucket. */
export function bucketForChurnProbability(probability: number): ChurnBucket {
  if (probability < 15) return "low"
  if (probability < 40) return "medium"
  if (probability < 70) return "high"
  return "critical"
}

/** Format AUD currency without trailing zeros. */
export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value)
}
