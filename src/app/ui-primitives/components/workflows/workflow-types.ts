/** Shared types for the workflow builder primitives. */

export type WorkflowNodeKind =
  | "trigger"
  | "action"
  | "condition"
  | "loop"
  | "wait"
  | "end"

export type WorkflowNodeTone = "red" | "amber" | "teal" | "green" | "neutral"

export type WorkflowRunStatus =
  | "queued"
  | "running"
  | "success"
  | "failed"
  | "skipped"
  | "cancelled"

export type WorkflowStatus = "draft" | "active" | "paused" | "archived"

export interface WorkflowNodePort {
  id: string
  /** Port edge — drives where the SVG line attaches. */
  side: "top" | "right" | "bottom" | "left"
  /** Optional label for true / false / loop-back ports. */
  label?: string
}

export interface WorkflowVariable {
  /** Token used in templates — e.g. `trigger.customer.email`. */
  path: string
  /** Display label. */
  label: string
  /** Sample value rendered as a hint. */
  sample?: string
  type?: "string" | "number" | "boolean" | "object" | "array" | "date"
  children?: ReadonlyArray<WorkflowVariable>
}

export interface WorkflowRun {
  id: string
  startedAt: string
  trigger: string
  status: WorkflowRunStatus
  /** Human-readable duration label, e.g. "1.4s" or "2m 31s". */
  duration: string
}

export interface WorkflowLogEntry {
  id: string
  timestamp: string
  node: string
  status: WorkflowRunStatus
  message: string
  duration?: string
}

export interface WorkflowPaletteItem {
  id: string
  name: string
  kind: WorkflowNodeKind
  description: string
}

export interface WorkflowPaletteSection {
  id: string
  title: string
  items: ReadonlyArray<WorkflowPaletteItem>
}
