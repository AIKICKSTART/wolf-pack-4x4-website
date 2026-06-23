/** Shared types for the database admin / schema viewer primitives. */

export type SchemaObjectKind =
  | "table"
  | "view"
  | "materialized_view"
  | "function"
  | "sequence"
  | "schema"

export type MigrationStatus = "pending" | "applied" | "failed" | "rolled_back"

export type IndexType = "btree" | "gin" | "gist" | "hash" | "brin"

export type TriggerTiming = "before" | "after" | "instead_of"

export type TriggerEvent = "insert" | "update" | "delete" | "truncate"

export type ConstraintKind =
  | "primary_key"
  | "foreign_key"
  | "unique"
  | "check"
  | "not_null"

export type FkAction = "cascade" | "restrict" | "no_action" | "set_null" | "set_default"

export type ColumnTypeFamily = "string" | "number" | "boolean" | "date" | "json" | "binary"

export interface SchemaColumn {
  name: string
  type: string
  family: ColumnTypeFamily
  nullable: boolean
  defaultValue?: string
  isPrimaryKey?: boolean
  isForeignKey?: boolean
  comment?: string
}

export interface SchemaObjectNode {
  id: string
  name: string
  kind: SchemaObjectKind
  /** Display count — rows for tables, indexes for materialized views, etc. */
  count?: number
  children?: ReadonlyArray<SchemaObjectNode>
}

export interface SchemaTableSummary {
  schema: string
  name: string
  rows: number
}

export interface MigrationRecord {
  version: string
  name: string
  appliedAt?: string
  status: MigrationStatus
  durationMs?: number
}

export interface IndexRecord {
  name: string
  type: IndexType
  columns: ReadonlyArray<string>
  unique: boolean
  sizeBytes: number
  /** Tone for the usage chip — high / medium / low / unused. */
  usage: "high" | "medium" | "low" | "unused"
}

export interface ConstraintRecord {
  kind: ConstraintKind
  name: string
  columns: ReadonlyArray<string>
  /** For foreign keys — target. */
  references?: { table: string; columns: ReadonlyArray<string> }
  /** For CHECK constraints — expression text. */
  expression?: string
}

export interface TriggerRecord {
  name: string
  timing: TriggerTiming
  events: ReadonlyArray<TriggerEvent>
  /** Function the trigger calls. */
  functionRef: string
  enabled: boolean
}

export interface StoredProcedure {
  name: string
  arguments: ReadonlyArray<{ name: string; type: string }>
  returns: string
  language: "plpgsql" | "sql" | "python" | "js"
  body: string
}

export interface ErColumn {
  name: string
  type: string
  isPrimaryKey?: boolean
  isForeignKey?: boolean
}

export interface ErNode {
  id: string
  name: string
  schema?: string
  /** Position in the canvas viewBox (px). */
  x: number
  y: number
  width?: number
  columns: ReadonlyArray<ErColumn>
}

export interface ErEdge {
  id: string
  fromTable: string
  fromColumn: string
  toTable: string
  toColumn: string
  onDelete?: FkAction
  onUpdate?: FkAction
}

export interface QueryResultColumn {
  id: string
  name: string
  family: ColumnTypeFamily
}

export interface QueryResultRow {
  [columnId: string]: string | number | boolean | null
}

export type SchemaDiffChange = "added" | "removed" | "changed" | "unchanged"

export interface SchemaDiffEntry {
  id: string
  /** Path of the object — e.g. "public.parts.warranty_months". */
  path: string
  change: SchemaDiffChange
  leftValue?: string
  rightValue?: string
}

export interface BackupRecord {
  id: string
  createdAt: string
  sizeBytes: number
  kind: "scheduled" | "manual"
  /** Retention label — e.g. "30d". */
  retention: string
}
