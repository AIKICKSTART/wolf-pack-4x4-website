import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "db-admin",
  "title": "Database admin",
  "group": "Data",
  "summary": "14 database-administration primitives — schema browser, ER diagram, SQL editor + results, migrations, index/constraint/trigger/procedure inspectors, FK arrows, schema diff, and a backup/restore wizard.",
  "entries": [
    {
      "key": "db-admin/schema-tree",
      "family": "db-admin",
      "name": "SchemaTree",
      "label": "Schema tree",
      "description": "Filterable, expandable tree browser of schemas/tables/views/functions with per-kind glyphs and row counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/schema-tree",
      "tags": [
        "schema",
        "tree",
        "browser",
        "filter"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/column-list-panel",
      "family": "db-admin",
      "name": "ColumnListPanel",
      "label": "Column list panel",
      "description": "Lists a table's columns with type, default, PK/FK/NULL chips and per-column comment popovers.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/column-list-panel",
      "tags": [
        "columns",
        "table",
        "schema"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/er-diagram-canvas",
      "family": "db-admin",
      "name": "ErDiagramCanvas",
      "label": "ER diagram canvas",
      "description": "SVG entity-relationship canvas rendering table nodes with columns and curved FK edges plus an optional minimap.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/er-diagram-canvas",
      "tags": [
        "er-diagram",
        "svg",
        "relationships",
        "schema"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/query-editor",
      "family": "db-admin",
      "name": "QueryEditor",
      "label": "Query editor",
      "description": "SQL editor with line-number gutter, connection label, cyclable row-limit chip, and a run action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/query-editor",
      "tags": [
        "sql",
        "editor",
        "query"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/query-results-table",
      "family": "db-admin",
      "name": "QueryResultsTable",
      "label": "Query results table",
      "description": "Renders SQL result rows via the shared DataTable with typed cell formatting, row numbers, and CSV export.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/query-results-table",
      "tags": [
        "results",
        "table",
        "sql",
        "export"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/migration-list-row",
      "family": "db-admin",
      "name": "MigrationListRow",
      "label": "Migration list row",
      "description": "Single migration row showing version, name, applied-at/duration, status chip, and view/run/rollback actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/migration-list-row",
      "tags": [
        "migration",
        "row",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/index-inspector",
      "family": "db-admin",
      "name": "IndexInspector",
      "label": "Index inspector",
      "description": "Card detailing an index's type, uniqueness, indexed columns, size, and usage tier.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/index-inspector",
      "tags": [
        "index",
        "inspector",
        "performance"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/constraint-chip-row",
      "family": "db-admin",
      "name": "ConstraintChipRow",
      "label": "Constraint chip row",
      "description": "Row of PK/FK/UQ/CK/NN constraint chips that expand to show name, columns, references, and expressions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/constraint-chip-row",
      "tags": [
        "constraint",
        "chips",
        "schema"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/trigger-card",
      "family": "db-admin",
      "name": "TriggerCard",
      "label": "Trigger card",
      "description": "Card for a database trigger showing timing, event chips, the called function, and an enabled/disabled switch.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/trigger-card",
      "tags": [
        "trigger",
        "card",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/stored-procedure-card",
      "family": "db-admin",
      "name": "StoredProcedureCard",
      "label": "Stored procedure card",
      "description": "Card showing a stored procedure's signature, language/args/line meta, and its body via the shared CodeBlock.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/stored-procedure-card",
      "tags": [
        "stored-procedure",
        "code",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/row-count-badge",
      "family": "db-admin",
      "name": "RowCountBadge",
      "label": "Row count badge",
      "description": "Compact badge that abbreviates a row count (K/M/B) with a magnitude-based tone and accessible full label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/row-count-badge",
      "tags": [
        "badge",
        "count",
        "metric"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/foreign-key-arrow",
      "family": "db-admin",
      "name": "ForeignKeyArrow",
      "label": "Foreign key arrow",
      "description": "Visualizes a foreign key from source to target column with an SVG arrow and on-delete/on-update action chips.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/foreign-key-arrow",
      "tags": [
        "foreign-key",
        "relationship",
        "arrow"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/schema-diff-pane",
      "family": "db-admin",
      "name": "SchemaDiffPane",
      "label": "Schema diff pane",
      "description": "Side-by-side two-column schema diff marking added/removed/changed/unchanged paths with a summary count strip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/schema-diff-pane",
      "tags": [
        "diff",
        "schema",
        "compare"
      ],
      "status": "captured"
    },
    {
      "key": "db-admin/backup-restore-panel",
      "family": "db-admin",
      "name": "BackupRestorePanel",
      "label": "Backup / restore panel",
      "description": "Lists available backups and walks a select/review/confirm restore wizard with a manual backup-now action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/db-admin",
      "routeHref": "/ui-primitives/db-admin/backup-restore-panel",
      "tags": [
        "backup",
        "restore",
        "wizard"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
