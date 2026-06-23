/** Shared fixtures used across the bulk-ops showcase pages. */

import type {
  BulkActionDescriptor,
  BulkAssignee,
  BulkOperationProgressState,
  BulkResultCounts,
  BulkRowResult,
  BulkSelectionSummary,
  BulkTagSuggestion,
  SavedBulkAction,
} from "../components/bulk-ops"

export const SELECTION_SUMMARY: BulkSelectionSummary = {
  selected: 237,
  totalInView: 1284,
  filterLabel: "Status: Awaiting parts",
}

export const ACTION_OPTIONS: ReadonlyArray<BulkActionDescriptor> = [
  { id: "tag", label: "Tag", hint: "Add or replace tags" },
  { id: "move", label: "Move to pipeline", hint: "Reassign to a sales stage" },
  { id: "assign", label: "Reassign owner", hint: "Service advisor" },
  { id: "change_status", label: "Change status", hint: "Mark as awaiting customer" },
  { id: "export", label: "Export", hint: "CSV · XLSX · JSON · PDF" },
  { id: "archive", label: "Archive", hint: "Hide from active board" },
  { id: "delete", label: "Delete", hint: "Irreversible", destructive: true },
]

export const PROGRESS_STATE: BulkOperationProgressState = {
  processed: 184,
  total: 237,
  etaSeconds: 92,
}

export const RESULT_COUNTS: BulkResultCounts = {
  success: 221,
  skipped: 9,
  failed: 7,
}

export const ROW_RESULTS: ReadonlyArray<BulkRowResult> = [
  { id: "Q-2418", label: "Q-2418 · Hayes HiLux", status: "done" },
  { id: "Q-2419", label: "Q-2419 · Ranger 3.2", status: "in_progress" },
  { id: "Q-2420", label: "Q-2420 · LandCruiser 79", status: "queued" },
  { id: "Q-2421", label: "Q-2421 · Patrol Y62", status: "failed", message: "VIN mismatch" },
  { id: "Q-2422", label: "Q-2422 · Triton MR", status: "skipped", message: "Already archived" },
]

export const TAG_SUGGESTIONS: ReadonlyArray<BulkTagSuggestion> = [
  { label: "escalated", usage: 42 },
  { label: "warranty", usage: 88 },
  { label: "interstate-delivery", usage: 17 },
  { label: "vip-fleet", usage: 9 },
  { label: "needs-photo", usage: 24 },
]

export const ASSIGNEES: ReadonlyArray<BulkAssignee> = [
  { id: "u-jhayes", name: "Jordan Hayes", role: "Service advisor" },
  { id: "u-mtran", name: "Mia Tran", role: "Service advisor" },
  { id: "u-keoghn", name: "Kelvin Eoghan", role: "Parts manager" },
  { id: "u-rbailey", name: "Rhys Bailey", role: "Workshop lead" },
]

export const FROM_ASSIGNEE: BulkAssignee = {
  id: "u-clane",
  name: "Casey Lane",
  role: "Service advisor (departing)",
}

export const SAVED_ACTIONS: ReadonlyArray<SavedBulkAction> = [
  {
    id: "saved-1",
    name: "Archive quotes >90 days unaccepted",
    kind: "archive",
    description: "Soft-archives quotes with no acceptance after 90 days and tags them stale-90.",
    lastUsedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    averageRows: 184,
  },
  {
    id: "saved-2",
    name: "Tag overdue invoices as escalated",
    kind: "tag",
    description: "Applies the escalated tag to invoices with an overdue balance >$500.",
    lastUsedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    averageRows: 36,
  },
  {
    id: "saved-3",
    name: "Reassign Casey's open bookings",
    kind: "assign",
    description: "Transfers Casey Lane's open service bookings to Mia Tran with comments.",
    lastUsedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    averageRows: 8,
  },
  {
    id: "saved-4",
    name: "Export VIP fleet customers",
    kind: "export",
    description: "Quarterly CSV export of customers tagged vip-fleet, including archived rows.",
    lastUsedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    averageRows: 412,
  },
]

export const BULK_EDIT_FIELDS = [
  { id: "status", label: "Status" },
  { id: "assigned_to", label: "Assigned to" },
  { id: "tags", label: "Tags" },
  { id: "priority", label: "Priority" },
  { id: "follow_up_at", label: "Follow-up date" },
] as const
