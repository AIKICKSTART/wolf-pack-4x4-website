import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "bulk-ops",
  "title": "Bulk operations",
  "group": "Data",
  "summary": "14 bulk-action control surfaces for multi-row data operations — selection header, action menu, filtered edit/tag/reassign/export forms, destructive confirmations, live progress, per-row status, undo, and saved-action reuse — sharing a common bulk-ops type vocabulary.",
  "entries": [
    {
      "key": "bulk-ops/bulk-action-menu",
      "family": "bulk-ops",
      "name": "BulkActionMenu",
      "label": "Bulk action menu",
      "description": "Dropdown menu of bulk actions (tag, move, assign, change status, export, archive, delete) with hints and a destructive delete item.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-action-menu",
      "tags": [
        "bulk",
        "menu",
        "actions"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-confirmation-modal",
      "family": "bulk-ops",
      "name": "BulkConfirmationModal",
      "label": "Bulk confirmation modal",
      "description": "Alertdialog confirming a destructive bulk action with an impact summary list and a type-to-confirm phrase gate on the CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-confirmation-modal",
      "tags": [
        "bulk",
        "confirm",
        "destructive"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-export-trigger",
      "family": "bulk-ops",
      "name": "BulkExportTrigger",
      "label": "Bulk export trigger",
      "description": "Export card for a selection with format radios (CSV/XLSX/JSON/PDF), include-archived and email-when-ready toggles, and a row-count estimate.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-export-trigger",
      "tags": [
        "bulk",
        "export",
        "download"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-operation-progress",
      "family": "bulk-ops",
      "name": "BulkOperationProgress",
      "label": "Bulk operation progress",
      "description": "Live progress strip showing processed/total counts, percent complete, formatted ETA, and pause/resume + cancel controls for a running bulk job.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-operation-progress",
      "tags": [
        "bulk",
        "progress",
        "eta"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-reassign-card",
      "family": "bulk-ops",
      "name": "BulkReassignCard",
      "label": "Bulk reassign card",
      "description": "Ownership-transfer card moving a selection from one assignee to a chosen candidate, with transfer-comments and notify-previous-owner toggles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-reassign-card",
      "tags": [
        "bulk",
        "reassign",
        "ownership"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-result-summary",
      "family": "bulk-ops",
      "name": "BulkResultSummary",
      "label": "Bulk result summary",
      "description": "Post-run summary card with succeeded/skipped/failed count tiles, a plain-language impact paragraph, total rows processed, and an export-results button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-result-summary",
      "tags": [
        "bulk",
        "result",
        "summary"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-select-header",
      "family": "bulk-ops",
      "name": "BulkSelectHeader",
      "label": "Bulk select header",
      "description": "Selection-mode header showing selected/total counts, select-all and clear links, an active filter chip, and an exit-selection-mode button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-select-header",
      "tags": [
        "bulk",
        "selection",
        "header"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/bulk-tag-apply",
      "family": "bulk-ops",
      "name": "BulkTagApply",
      "label": "Bulk tag apply",
      "description": "Tag editor for a selection with add/replace mode, a chip input with keyboard add/remove, and an existing-tag suggestion list with usage counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/bulk-tag-apply",
      "tags": [
        "bulk",
        "tags",
        "labels"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/filtered-bulk-edit-form",
      "family": "bulk-ops",
      "name": "FilteredBulkEditForm",
      "label": "Filtered bulk edit form",
      "description": "Form applying a field change to a filtered scope, choosing field, operation (set/append/clear/increment), value, and an only-update-empty toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/filtered-bulk-edit-form",
      "tags": [
        "bulk",
        "edit",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/mass-delete-confirmation",
      "family": "bulk-ops",
      "name": "MassDeleteConfirmation",
      "label": "Mass delete confirmation",
      "description": "Full-surface mass-delete alertdialog stating the record count and resource, recovery-window chip, and a type-to-confirm phrase gating the delete button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/mass-delete-confirmation",
      "tags": [
        "bulk",
        "delete",
        "destructive"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/per-row-status-cell",
      "family": "bulk-ops",
      "name": "PerRowStatusCell",
      "label": "Per-row status cell",
      "description": "Table cell rendering a row's bulk-op status chip (queued/in-progress/done/skipped/failed), optional message, and retry/skip actions on failure.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/per-row-status-cell",
      "tags": [
        "bulk",
        "status",
        "table-cell"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/saved-bulk-actions",
      "family": "bulk-ops",
      "name": "SavedBulkActions",
      "label": "Saved bulk actions",
      "description": "List of reusable saved bulk actions, each with a kind glyph, name/description, last-used relative time and average row count, plus a reuse button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/saved-bulk-actions",
      "tags": [
        "bulk",
        "saved",
        "reuse"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/skip-retry-row-actions",
      "family": "bulk-ops",
      "name": "SkipRetryRowActions",
      "label": "Skip / retry row actions",
      "description": "Inline action chip cluster for a failed bulk row offering skip, retry, and edit-and-retry buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/skip-retry-row-actions",
      "tags": [
        "bulk",
        "retry",
        "row-actions"
      ],
      "status": "captured"
    },
    {
      "key": "bulk-ops/undo-bulk-banner",
      "family": "bulk-ops",
      "name": "UndoBulkBanner",
      "label": "Undo bulk banner",
      "description": "Live-region toast banner reporting an applied bulk action with a countdown ring/timer and undo + dismiss controls before the change commits.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/bulk-ops",
      "routeHref": "/ui-primitives/bulk-ops/undo-bulk-banner",
      "tags": [
        "bulk",
        "undo",
        "toast"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
