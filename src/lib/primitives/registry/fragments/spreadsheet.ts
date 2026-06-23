import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "spreadsheet",
  "title": "Spreadsheet",
  "group": "Data",
  "summary": "14 spreadsheet grid primitives — editable cells, sortable/filterable headers, formula bar, selection/merge overlays, conditional-formatting + data-validation cards, find/replace, sheet tabs, context menu, autofill handle, and a pivot quick-builder.",
  "entries": [
    {
      "key": "spreadsheet/cell",
      "family": "spreadsheet",
      "name": "SpreadsheetCell",
      "label": "Cell",
      "description": "Editable grid cell with type-aware display, tone tinting for conditional formatting, focus/selected/editing states, and Enter/Escape commit semantics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/cell",
      "tags": [
        "grid",
        "cell",
        "editable"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/column-header",
      "family": "spreadsheet",
      "name": "ColumnHeader",
      "label": "Column header",
      "description": "Column header showing A1 letter and label with sort toggle, filter popover with active-count badge, freeze toggle, and a resize handle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/column-header",
      "tags": [
        "grid",
        "header",
        "sort",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/row-header",
      "family": "spreadsheet",
      "name": "RowHeader",
      "label": "Row header",
      "description": "Numbered row header with select, freeze toggle, and a horizontal resize handle, plus selected/frozen visual states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/row-header",
      "tags": [
        "grid",
        "header",
        "row"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/formula-bar",
      "family": "spreadsheet",
      "name": "FormulaBar",
      "label": "Formula bar",
      "description": "Active-cell formula bar with A1 reference chip, value/formula textarea, commit/cancel actions, and a quick-pick function rail.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/formula-bar",
      "tags": [
        "formula",
        "input",
        "toolbar"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/frozen-row-col-divider",
      "family": "spreadsheet",
      "name": "FrozenRowColDivider",
      "label": "Frozen divider",
      "description": "Tonal separator marking a frozen-rows or frozen-columns boundary, with optional label plate and orientation-aware sizing.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/frozen-divider",
      "tags": [
        "grid",
        "freeze",
        "divider"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/cell-selection-overlay",
      "family": "spreadsheet",
      "name": "CellSelectionOverlay",
      "label": "Cell selection overlay",
      "description": "Absolutely-positioned selection ring over a cell range with a label plate showing the A1 range and cell count, plus an optional autofill drag handle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/cell-selection-overlay",
      "tags": [
        "grid",
        "selection",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/cell-merge-indicator",
      "family": "spreadsheet",
      "name": "CellMergeIndicator",
      "label": "Cell merge indicator",
      "description": "Status chip describing a cell range's merge kind (horizontal/vertical/block) and dimensions, with a merge/unmerge action button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/cell-merge",
      "tags": [
        "grid",
        "merge",
        "range"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/conditional-formatting-rule",
      "family": "spreadsheet",
      "name": "ConditionalFormattingRule",
      "label": "Conditional formatting rule",
      "description": "Editor card for a conditional-formatting rule: condition operator, comparison value, format kind with swatch preview, and apply/remove actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/conditional-formatting",
      "tags": [
        "formatting",
        "rule",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/data-validation-card",
      "family": "spreadsheet",
      "name": "DataValidationCard",
      "label": "Data validation card",
      "description": "Per-column data-validation editor with rule type, expression, error message, and a reject-invalid toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/data-validation",
      "tags": [
        "validation",
        "rule",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/find-replace-bar",
      "family": "spreadsheet",
      "name": "FindReplaceBar",
      "label": "Find & replace bar",
      "description": "Slide-in find/replace bar with case-sensitivity toggle, cycling sheet/workbook/selection scope, match count, and replace/replace-all actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/find-replace",
      "tags": [
        "search",
        "replace",
        "toolbar"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/sheet-tab-rail",
      "family": "spreadsheet",
      "name": "SheetTabRail",
      "label": "Sheet tab rail",
      "description": "Bottom tab rail of sheets with tone dots, badges, reorder controls, an options popover (rename/duplicate/protect/delete), and add-sheet button.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/sheet-tab-rail",
      "tags": [
        "tabs",
        "sheets",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/cell-context-menu",
      "family": "spreadsheet",
      "name": "CellContextMenu",
      "label": "Cell context menu",
      "description": "Right-click cell menu grouping clipboard/structure/format actions with keyboard shortcuts and a disabled-actions filter.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/cell-context-menu",
      "tags": [
        "menu",
        "context",
        "actions"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/autofill-drag-handle",
      "family": "spreadsheet",
      "name": "AutofillDragHandle",
      "label": "Autofill drag handle",
      "description": "Small corner drag handle (sm/md/lg, optional pulse) that initiates an autofill-series drag on mouse/touch down.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/autofill-handle",
      "tags": [
        "grid",
        "autofill",
        "handle"
      ],
      "status": "captured"
    },
    {
      "key": "spreadsheet/pivot-quick-builder",
      "family": "spreadsheet",
      "name": "PivotQuickBuilder",
      "label": "Pivot quick builder",
      "description": "Pivot-table builder showing a source range, available fields, and rows/columns/values/filters drop zones with removable field chips and aggregation markers.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/spreadsheet",
      "routeHref": "/ui-primitives/spreadsheet/pivot-builder",
      "tags": [
        "pivot",
        "builder",
        "fields"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
