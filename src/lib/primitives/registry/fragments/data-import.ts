import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "data-import",
  "title": "Data import",
  "group": "Data",
  "summary": "14 CSV/data-import wizard primitives — source picker, file preview, column mapping, type detection, validation, dry-run, progress, rollback, history, dedupe, templates, AI suggestions, and a chained transform editor.",
  "entries": [
    {
      "key": "data-import/import-source-picker",
      "family": "data-import",
      "name": "ImportSourcePicker",
      "label": "Import source picker",
      "description": "Radiogroup fieldset of source cards (CSV, API, etc.) that emits the selected import source kind.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/import-source-picker",
      "tags": [
        "import",
        "picker",
        "radiogroup"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/csv-file-preview",
      "family": "data-import",
      "name": "CsvFilePreview",
      "label": "CSV file preview",
      "description": "Read-only table preview of the first rows of an uploaded CSV with delimiter, encoding, and size chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/csv-file-preview",
      "tags": [
        "csv",
        "preview",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/column-mapper",
      "family": "data-import",
      "name": "ColumnMapper",
      "label": "Column mapper",
      "description": "Maps source columns to target fields with per-row target select, auto-match confidence chips, and skip toggles.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/column-mapper",
      "tags": [
        "mapping",
        "columns",
        "fields"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/field-type-detector-row",
      "family": "data-import",
      "name": "FieldTypeDetectorRow",
      "label": "Field type detector row",
      "description": "Single column row showing the detected field type and a select to override it with a sample value.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/field-type-detector-row",
      "tags": [
        "type-detection",
        "row",
        "override"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/validation-errors-panel",
      "family": "data-import",
      "name": "ValidationErrorsPanel",
      "label": "Validation errors panel",
      "description": "Lists validation error classes by severity with counts and jump-to-row actions; blocks commit when blockers exist.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/validation-errors-panel",
      "tags": [
        "validation",
        "errors",
        "severity"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/dry-run-summary",
      "family": "data-import",
      "name": "DryRunSummary",
      "label": "Dry-run summary",
      "description": "Outcome tiles (create/update/skip/fail) for an evaluated import with an impact chip and a commit button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/dry-run-summary",
      "tags": [
        "dry-run",
        "summary",
        "commit"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/import-progress-bar",
      "family": "data-import",
      "name": "ImportProgressBar",
      "label": "Import progress bar",
      "description": "Live import progressbar showing processed/total rows, rate, ETA, and a pause/resume toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/import-progress-bar",
      "tags": [
        "progress",
        "import",
        "pause"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/rollback-confirmation",
      "family": "data-import",
      "name": "RollbackConfirmation",
      "label": "Rollback confirmation",
      "description": "Selects a recent import within its undo window and arms a destructive rollback behind a type-to-confirm phrase.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/rollback-confirmation",
      "tags": [
        "rollback",
        "confirmation",
        "destructive"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/sample-row-preview",
      "family": "data-import",
      "name": "SampleRowPreview",
      "label": "Sample row preview",
      "description": "Definition list showing one sample row mapped source-to-target with transformed and flagged field markers.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/sample-row-preview",
      "tags": [
        "sample",
        "preview",
        "mapping"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/import-history-row",
      "family": "data-import",
      "name": "ImportHistoryRow",
      "label": "Import history row",
      "description": "Compact history article for a past import with status chip, row/duration metrics, and inspect/rollback actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/import-history-row",
      "tags": [
        "history",
        "status",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/duplicate-handling-rules",
      "family": "data-import",
      "name": "DuplicateHandlingRules",
      "label": "Duplicate handling rules",
      "description": "Editable list of dedupe rules keyed by columns, each with a select for skip/update/keep-both/merge actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/duplicate-handling-rules",
      "tags": [
        "duplicates",
        "rules",
        "dedupe"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/mapping-template-card",
      "family": "data-import",
      "name": "MappingTemplateCard",
      "label": "Mapping template card",
      "description": "Card summarizing a saved column-mapping template with owner, mapped-column count, last-used, and apply action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/mapping-template-card",
      "tags": [
        "template",
        "mapping",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/field-mapping-suggestion",
      "family": "data-import",
      "name": "FieldMappingSuggestion",
      "label": "Field mapping suggestion",
      "description": "AI suggestion banner proposing a source-to-target column mapping with confidence chip and accept/reject buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/field-mapping-suggestion",
      "tags": [
        "ai",
        "suggestion",
        "mapping"
      ],
      "status": "captured"
    },
    {
      "key": "data-import/transform-rules-editor",
      "family": "data-import",
      "name": "TransformRulesEditor",
      "label": "Transform rules editor",
      "description": "Per-column chained-transform pipeline editor (trim/case/regex/split/lookup) with a live left-to-right preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/data-import",
      "routeHref": "/ui-primitives/data-import/transform-rules-editor",
      "tags": [
        "transform",
        "pipeline",
        "editor"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
