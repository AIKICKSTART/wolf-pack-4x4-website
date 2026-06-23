/** Shared types for the cross-resource bulk-operations primitives. */

export type BulkActionKind =
  | "tag"
  | "move"
  | "assign"
  | "change_status"
  | "export"
  | "archive"
  | "delete"

export type BulkRowStatus =
  | "queued"
  | "in_progress"
  | "done"
  | "skipped"
  | "failed"

export type BulkExportFormat = "csv" | "xlsx" | "json" | "pdf"

export type BulkAssignmentMode = "replace" | "transfer" | "shadow"

export type BulkResourceKind = "quote" | "part" | "customer" | "booking"

export interface BulkSelectionSummary {
  /** Number of currently-selected rows. */
  selected: number
  /** Total rows matching the active filter. */
  totalInView: number
  /** Active filter label, e.g. "Status: Awaiting parts". */
  filterLabel?: string
}

export interface BulkActionDescriptor {
  id: BulkActionKind
  label: string
  /** Short hint to render under the label in menus. */
  hint?: string
  /** Disabled with a reason when applicable. */
  disabledReason?: string
  destructive?: boolean
}

export interface BulkRowResult {
  id: string
  /** Display label — usually a resource ref like "Q-2418". */
  label: string
  status: BulkRowStatus
  /** Failure reason or skip reason. */
  message?: string
}

export interface BulkOperationProgressState {
  processed: number
  total: number
  /** Seconds remaining; undefined when unknown. */
  etaSeconds?: number
  paused?: boolean
}

export interface BulkResultCounts {
  success: number
  skipped: number
  failed: number
}

export interface BulkExportConfig {
  /** Human label for the scope being exported. */
  scopeLabel: string
  format: BulkExportFormat
  includeArchived: boolean
  emailWhenReady: boolean
  /** Estimated row count for the export. */
  estimatedRows: number
}

export interface BulkTagSuggestion {
  /** Tag label. */
  label: string
  /** Number of existing records currently using the tag. */
  usage: number
}

export interface BulkAssignee {
  id: string
  name: string
  /** Role label, e.g. "Service advisor". */
  role: string
}

export interface SavedBulkAction {
  id: string
  name: string
  kind: BulkActionKind
  /** Plain-English description, e.g. "Tag overdue invoices as escalated". */
  description: string
  /** ISO timestamp the action was last used. */
  lastUsedAt: string
  /** Average rows affected per run. */
  averageRows: number
}

export interface BulkEditOperation {
  /** Display name for the field being edited. */
  field: string
  /** What we are doing to it. */
  operation: "set" | "append" | "clear" | "increment"
  /** New value — text for set/append, number for increment, none for clear. */
  value?: string
  /** Only apply when the existing value is empty. */
  onlyUpdateEmpty: boolean
}
