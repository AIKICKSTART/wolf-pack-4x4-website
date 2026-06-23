/**
 * Shared types for the cloud-cost management primitives.
 * Vantage / Cloudability-style infrastructure cost-ops vocabulary, AU flavour.
 * AUD pricing, AWS ap-southeast-2 (Sydney) and ap-southeast-4 (Melbourne).
 */

/** AWS services we track for spend. */
export type AwsService =
  | "EC2"
  | "RDS"
  | "S3"
  | "Lambda"
  | "CloudFront"
  | "DynamoDB"
  | "ECS"
  | "EKS"
  | "ElastiCache"
  | "Route53"

/** AWS region code (full string). */
export type AwsRegion =
  | "ap-southeast-2" // Sydney
  | "ap-southeast-4" // Melbourne
  | "ap-southeast-1" // Singapore
  | "us-east-1" // N. Virginia
  | "us-west-2" // Oregon
  | "eu-west-1" // Ireland

/** Severity for an anomaly or alert. */
export type CostSeverity = "info" | "warning" | "critical"

/** Tone shared with primitives/chip. */
export type CloudTone = "red" | "amber" | "teal" | "green" | "neutral"

/** Budget alert state. */
export type BudgetState = "ok" | "approaching" | "exceeded"

/** Commitment type for reserved instances / savings plans. */
export type CommitmentType = "reserved_instance" | "savings_plan" | "spot_blocks"

/** Status for a saving recommendation. */
export type RecommendationStatus = "new" | "in_review" | "implemented" | "dismissed"

/** Implementation effort for a saving action. */
export type SavingEffort = "low" | "medium" | "high"

/** Resource state for unused / idle resource decisions. */
export type IdleResourceAction = "decommission" | "stop" | "snapshot" | "keep"

/** Tag dimension used for allocation. */
export type AllocationTag = "env" | "team" | "project" | "cost_centre"

export interface MoneyAud {
  /** Major units (dollars). Always AUD on this surface. */
  value: number
}

export interface ServiceSpendRow {
  /** AWS service. */
  service: AwsService
  /** Spend in AUD for the period. */
  spend: number
}

export interface CostResourceRow {
  /** Resource identifier (ARN / ID). */
  id: string
  /** Display name. */
  name: string
  /** AWS service. */
  service: AwsService
  /** AWS region the resource runs in. */
  region: AwsRegion
  /** Spend in AUD this period. */
  spend: number
  /** Resource attribute chips (e.g. "m5.xlarge", "Linux"). */
  attributes: ReadonlyArray<string>
}

export interface AllocationSegment {
  /** Tag value label e.g. "production". */
  label: string
  /** Spend in AUD. */
  value: number
  /** Tone for the segment swatch. */
  tone: CloudTone
}

export interface DailyCostPoint {
  /** ISO date for this sample. */
  dateISO: string
  /** Actual spend in AUD. */
  actual: number
  /** Forecast spend in AUD (optional). */
  forecast?: number
}

export interface ChargebackRow {
  id: string
  team: string
  contact: string
  spend: number
  allocationPct: number
  trend: ReadonlyArray<number>
}

export interface RegionSpendCell {
  region: AwsRegion
  label: string
  spend: number
}

/** Map AWS region code to a friendly AU-flavoured label. */
export function regionLabel(region: AwsRegion): string {
  switch (region) {
    case "ap-southeast-2":
      return "Sydney (ap-southeast-2)"
    case "ap-southeast-4":
      return "Melbourne (ap-southeast-4)"
    case "ap-southeast-1":
      return "Singapore (ap-southeast-1)"
    case "us-east-1":
      return "N. Virginia (us-east-1)"
    case "us-west-2":
      return "Oregon (us-west-2)"
    case "eu-west-1":
      return "Ireland (eu-west-1)"
  }
}

/** Friendly name for an allocation tag. */
export function allocationTagLabel(tag: AllocationTag): string {
  switch (tag) {
    case "env":
      return "Environment"
    case "team":
      return "Team"
    case "project":
      return "Project"
    case "cost_centre":
      return "Cost centre"
  }
}

/** Map a severity to a tone. */
export function severityTone(severity: CostSeverity): CloudTone {
  switch (severity) {
    case "info":
      return "teal"
    case "warning":
      return "amber"
    case "critical":
      return "red"
  }
}

/** Map a budget state to a tone. */
export function budgetStateTone(state: BudgetState): CloudTone {
  switch (state) {
    case "ok":
      return "green"
    case "approaching":
      return "amber"
    case "exceeded":
      return "red"
  }
}

/** Map an effort to a tone. */
export function effortTone(effort: SavingEffort): CloudTone {
  switch (effort) {
    case "low":
      return "green"
    case "medium":
      return "amber"
    case "high":
      return "red"
  }
}

/** Map an AWS service to a chip tone for charts / chips. */
export function serviceTone(service: AwsService): CloudTone {
  switch (service) {
    case "EC2":
      return "red"
    case "RDS":
      return "teal"
    case "S3":
      return "amber"
    case "Lambda":
      return "green"
    case "CloudFront":
      return "amber"
    case "DynamoDB":
      return "teal"
    case "ECS":
      return "red"
    case "EKS":
      return "red"
    case "ElastiCache":
      return "amber"
    case "Route53":
      return "green"
  }
}

/** Format an AUD amount with the en-AU locale. */
export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/** Compact AUD formatter for headline figures (e.g. $1.2k). */
export function formatAudCompact(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

/** Format a percentage value with sign. */
export function formatPctSigned(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : ""
  return `${sign}${Math.abs(value).toFixed(1)}%`
}

/** Format a short Australian date. */
export function formatDateAu(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d)
}

/** Format an ISO date as a compact day label e.g. "12 May". */
export function formatDayLabel(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
  }).format(d)
}
