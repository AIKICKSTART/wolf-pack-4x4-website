/**
 * Shared types for the reports-deep primitive set.
 * Co-located so each component imports a single named type rather than ad-hoc shapes.
 * Mufflermen domain: dyno bookings, parts margin, suburb performance, weekly revenue.
 */

export type DeepTone = "neutral" | "positive" | "negative" | "warning" | "info"

export type ChartKind = "bar" | "line" | "area" | "pie" | "donut" | "scatter" | "funnel"

export type AggregatorKind = "sum" | "avg" | "min" | "max" | "count" | "distinct"

export type CronCadence =
  | "hourly"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "custom"

export type ExportFileKind = "pdf" | "csv" | "xlsx" | "json" | "parquet"

export type RecipientChannel = "email" | "slack" | "teams" | "webhook"

export type FilterFieldKind = "select" | "multiSelect" | "dateRange" | "numericRange" | "text" | "chips"

export type AnomalySeverity = "minor" | "moderate" | "severe" | "critical"

export type CohortMetric = "retention" | "revenue" | "engagement"

export type SourceState = "ok" | "syncing" | "stale" | "failed" | "auth-needed"

export type SharePermission = "view" | "comment" | "edit" | "admin"

export type ShareChannel = "link" | "embed" | "email" | "slack"

export type GoalCadence = "weekly" | "monthly" | "quarterly" | "annual"

export interface BuilderDimension {
  readonly id: string
  readonly label: string
  readonly source: string
}

export interface BuilderMeasure {
  readonly id: string
  readonly label: string
  readonly aggregator: AggregatorKind
  readonly unit?: string
}

export interface BuilderFilterChip {
  readonly id: string
  readonly label: string
  readonly value: string
}

export interface ScheduledExportConfig {
  readonly id: string
  readonly reportName: string
  readonly cronLabel: string
  readonly cadence: CronCadence
  readonly nextRun: string
  readonly format: ExportFileKind
  readonly recipients: ReadonlyArray<RecipientReference>
  readonly enabled: boolean
}

export interface RecipientReference {
  readonly id: string
  readonly label: string
  readonly channel: RecipientChannel
}

export interface FilterFieldDef {
  readonly id: string
  readonly label: string
  readonly kind: FilterFieldKind
  readonly hint?: string
}

export interface FilterChipGroupDef {
  readonly id: string
  readonly label: string
  readonly options: ReadonlyArray<{ readonly id: string; readonly label: string }>
}

export interface DashboardWidget {
  readonly id: string
  readonly title: string
  readonly subtitle: string
  readonly span: 1 | 2 | 3
  readonly heightUnits: 1 | 2
  readonly accent: "teal" | "amber" | "red" | "green" | "violet"
  readonly value: string
  readonly delta?: string
}

export interface PivotAxisGroup {
  readonly id: string
  readonly label: string
  readonly leaves: ReadonlyArray<string>
}

export interface PivotMeasure {
  readonly id: string
  readonly label: string
  readonly format: "aud" | "count" | "percent" | "ratio"
}

export interface PivotMatrixCell {
  readonly value: number
  readonly emphasis?: "value" | "subtotal" | "total"
}

export interface DrillDownEntry {
  readonly id: string
  readonly dimensionLabel: string
  readonly dimensionValue: string
  readonly metric: string
  readonly metricValue: string
  readonly contribution: number
}

export interface FunnelStage {
  readonly id: string
  readonly label: string
  readonly current: number
  readonly prior: number
}

export interface CohortRow {
  readonly id: string
  readonly cohortLabel: string
  readonly size: number
  readonly cells: ReadonlyArray<number>
}

export interface ForecastPoint {
  readonly label: string
  readonly actual?: number
  readonly forecast: number
  readonly lowerBound: number
  readonly upperBound: number
}

export interface AnomalyEvent {
  readonly id: string
  readonly metric: string
  readonly observedValue: string
  readonly expectedValue: string
  readonly deviationPct: number
  readonly severity: AnomalySeverity
  readonly reason: string
  readonly detectedAt: string
}

export interface GoalProgress {
  readonly id: string
  readonly label: string
  readonly cadence: GoalCadence
  readonly target: number
  readonly current: number
  readonly projected: number
  readonly unit: string
  readonly formatter: "aud" | "count" | "percent"
  readonly daysRemaining: number
}

export interface DataSourceConnection {
  readonly id: string
  readonly name: string
  readonly kind: string
  readonly state: SourceState
  readonly recordCount: number
  readonly lastSyncedLabel: string
  readonly nextSyncLabel: string
  readonly cadenceLabel: string
}

export interface SharePermissionEntry {
  readonly id: string
  readonly label: string
  readonly permission: SharePermission
}

export interface DragState {
  readonly draggingId: string | null
  readonly overZone: string | null
}

export type Currency = "AUD"

export const AUD_OPTS: Readonly<Intl.NumberFormatOptions> = {
  style: "currency",
  currency: "AUD",
  currencyDisplay: "symbol",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}

export const PCT_OPTS: Readonly<Intl.NumberFormatOptions> = {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}

export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", AUD_OPTS).format(value)
}

export function formatAudCompact(value: number): string {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat("en-AU", {
      ...AUD_OPTS,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }
  return formatAud(value)
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value)
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-AU", PCT_OPTS).format(value)
}

export const TONE_TO_CSS: Record<DeepTone, string> = {
  neutral: "var(--primitive-muted)",
  positive: "var(--primitive-green)",
  negative: "var(--primitive-red)",
  warning: "var(--primitive-amber)",
  info: "var(--primitive-teal)",
}
