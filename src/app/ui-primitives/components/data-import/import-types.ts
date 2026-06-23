/**
 * Shared types for the data-import primitive set.
 * Co-located so every component imports a single named type rather than ad-hoc shapes.
 */

export type ImportSourceKind =
  | "csv"
  | "excel"
  | "json"
  | "google-sheets"
  | "airtable"
  | "direct-db"
  | "webhook"

export type DetectedFieldType =
  | "text"
  | "number"
  | "currency"
  | "date"
  | "boolean"
  | "email"
  | "phone"

export type ImportStatus =
  | "queued"
  | "running"
  | "paused"
  | "success"
  | "warn"
  | "failed"
  | "rolled-back"

export type DuplicateAction = "skip" | "update" | "keep-both" | "merge-by-rule"

export type ValidationSeverity = "blocker" | "warning" | "info"

export type EncodingLabel = "UTF-8" | "UTF-16" | "Latin-1" | "Windows-1252"

export type DelimiterLabel = "comma" | "semicolon" | "tab" | "pipe"

export type ConfidenceTone = "high" | "medium" | "low"

export type TransformKind =
  | "trim"
  | "lowercase"
  | "uppercase"
  | "regex-replace"
  | "split"
  | "lookup"
  | "coalesce"

export interface CsvCell {
  value: string
  flagged?: boolean
}

export interface CsvRowPreview {
  rowNumber: number
  cells: ReadonlyArray<CsvCell>
}

export interface SourceColumnDescriptor {
  id: string
  label: string
  detected: DetectedFieldType
  sample: string
}

export interface TargetFieldDescriptor {
  id: string
  label: string
  required?: boolean
  helpText?: string
}

export interface ValidationErrorClass {
  id: string
  label: string
  count: number
  severity: ValidationSeverity
  firstRowNumber?: number
}

export interface ImportHistoryEntry {
  id: string
  filename: string
  startedAt: string
  rows: number
  durationSeconds: number
  status: ImportStatus
  rollbackAvailable: boolean
}

export interface DuplicateRuleEntry {
  id: string
  keyColumns: ReadonlyArray<string>
  action: DuplicateAction
  description: string
}

export interface MappingTemplateSummary {
  id: string
  name: string
  mappedColumnCount: number
  lastUsedLabel: string
  ownerLabel: string
}

export interface TransformChip {
  id: string
  kind: TransformKind
  label: string
  detail?: string
}
