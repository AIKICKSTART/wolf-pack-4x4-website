/**
 * Shared types for the reports primitive set.
 * Co-located so each component imports a single named type rather than ad-hoc shapes.
 */

export type ExportFormat = "pdf" | "csv" | "excel" | "json" | "parquet"

export type ScheduleFrequency =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "custom-cron"

export type FilterOperator =
  | "equals"
  | "not-equals"
  | "greater-than"
  | "less-than"
  | "contains"
  | "in"
  | "between"

export type FilterGroupLogic = "AND" | "OR"

export type KpiTone = "neutral" | "positive" | "negative" | "warning"

export type DeliveryChannel = "email" | "slack" | "teams" | "webhook"

export type ReportStatus = "ok" | "running" | "warn" | "failed" | "queued"

export type AccessScope = "private" | "team" | "organisation" | "public"

export interface ScheduledRecipient {
  id: string
  label: string
  channel: DeliveryChannel
}

export interface FilterCondition {
  id: string
  field: string
  operator: FilterOperator
  value: string
}

export interface FilterGroup {
  id: string
  logic: FilterGroupLogic
  conditions: FilterCondition[]
  groups?: FilterGroup[]
}

export interface DateRangePresetEntry {
  id: string
  label: string
  hint: string
}

export interface PivotCell {
  value: string
  emphasis?: "subtotal" | "total" | "value"
}

export interface PivotRow {
  header: string
  cells: PivotCell[]
  subtotal?: boolean
}
