/**
 * Realistic Oak Flats Mufflermen demo data for the data-import primitive set.
 * Three source CSVs: parts catalog, customer book, quote intake.
 */

import type {
  CsvRowPreview,
  DuplicateRuleEntry,
  ImportHistoryEntry,
  MappingTemplateSummary,
  SourceColumnDescriptor,
  TargetFieldDescriptor,
  TransformChip,
  ValidationErrorClass,
} from "../components/data-import"
import type {
  ColumnMapping,
  DryRunOutcomeCount,
  ImportSourceOption,
  RollbackCandidate,
  SampleRowField,
  TransformColumn,
} from "../components/data-import"

export const IMPORT_SOURCES: ReadonlyArray<ImportSourceOption> = [
  {
    kind: "csv",
    label: "CSV file",
    description: "Comma, semicolon, tab or pipe-delimited text — parts, customers, quotes.",
    glyph: "⌗",
    hint: "Most common",
  },
  {
    kind: "excel",
    label: "Excel workbook",
    description: ".xlsx with multi-sheet support — picks the active sheet by default.",
    glyph: "▦",
    hint: "Multi-sheet",
  },
  {
    kind: "json",
    label: "JSON document",
    description: "Newline-delimited or array. Auto-detects deeply nested objects.",
    glyph: "{ }",
    hint: "Nested OK",
  },
  {
    kind: "google-sheets",
    label: "Google Sheets",
    description: "Live link to a Google Sheet — re-fetches on every run.",
    glyph: "≡",
    hint: "Live link",
  },
  {
    kind: "airtable",
    label: "Airtable base",
    description: "OAuth into an Airtable workspace and pick a base + table.",
    glyph: "◉",
    hint: "OAuth",
  },
  {
    kind: "direct-db",
    label: "Direct database",
    description: "Read-only Postgres connection. Provide a SELECT or table name.",
    glyph: "⌬",
    hint: "Read-only",
  },
  {
    kind: "webhook",
    label: "Webhook endpoint",
    description: "Push rows to a unique URL — useful for partner integrations.",
    glyph: "↯",
    hint: "Streaming",
  },
]

export const PARTS_CSV_HEADERS: ReadonlyArray<string> = [
  "SKU",
  "Title",
  "Supplier",
  "RRP",
  "Stock",
]

export const PARTS_CSV_ROWS: ReadonlyArray<CsvRowPreview> = [
  {
    rowNumber: 1,
    cells: [
      { value: "MFM-EX-2010-COMM" },
      { value: "VE Commodore cat-back exhaust — 2.5\"" },
      { value: "Manta Performance" },
      { value: "1,498.00" },
      { value: "6" },
    ],
  },
  {
    rowNumber: 2,
    cells: [
      { value: "MFM-EX-2014-RANGER" },
      { value: "PX Ranger 3.2 turbo-back DPF-delete" },
      { value: "Manta Performance" },
      { value: "2,180.00" },
      { value: "3" },
    ],
  },
  {
    rowNumber: 3,
    cells: [
      { value: "MFM-MUF-NS-200" },
      { value: "Universal straight-through muffler 2\"" },
      { value: "Redback" },
      { value: "182.00" },
      { value: "24" },
    ],
  },
  {
    rowNumber: 4,
    cells: [
      { value: "MFM-CAT-LC79" },
      { value: "LC79 V8 4.5L sports cat 200CPSI" },
      { value: "Beaudesert" },
      { value: "1,080.00" },
      { value: "2" },
    ],
  },
  {
    rowNumber: 5,
    cells: [
      { value: "MFM-FIT-CLAMP-25" },
      { value: "Heavy-duty exhaust clamp 2.5\"" },
      { value: "Manta Performance" },
      { value: "18.50" },
      { value: "240", flagged: true },
    ],
  },
  {
    rowNumber: 6,
    cells: [
      { value: "MFM-EX-LDV-T60" },
      { value: "LDV T60 3\" turbo-back" },
      { value: "Manta Performance" },
      { value: "1,720.00" },
      { value: "4" },
    ],
  },
  {
    rowNumber: 7,
    cells: [
      { value: "MFM-CAT-NL-300" },
      { value: "100-cell metal cat — 3\"" },
      { value: "Redback" },
      { value: "320.00" },
      { value: "11" },
    ],
  },
  {
    rowNumber: 8,
    cells: [
      { value: "MFM-EX-NM300" },
      { value: "Navara NP300 3\" turbo-back DPF-back" },
      { value: "Manta Performance" },
      { value: "1,940.00" },
      { value: "5" },
    ],
  },
  {
    rowNumber: 9,
    cells: [
      { value: "MFM-MUF-OVAL-3" },
      { value: "Universal oval muffler 3\" straight-through" },
      { value: "Redback" },
      { value: "240.00" },
      { value: "16" },
    ],
  },
  {
    rowNumber: 10,
    cells: [
      { value: "MFM-FIT-FLEX-25" },
      { value: "Stainless flex 2.5\" 200mm" },
      { value: "Beaudesert" },
      { value: "62.00" },
      { value: "" },
    ],
  },
]

export const CUSTOMER_CSV_HEADERS: ReadonlyArray<string> = [
  "Name",
  "Email",
  "Phone",
  "Suburb",
]

export const CUSTOMER_CSV_ROWS: ReadonlyArray<CsvRowPreview> = [
  {
    rowNumber: 1,
    cells: [
      { value: "Daniel Houareau" },
      { value: "d.houareau@example.com" },
      { value: "0412 884 110" },
      { value: "Oak Flats" },
    ],
  },
  {
    rowNumber: 2,
    cells: [
      { value: "Steph Mavropoulos" },
      { value: "steph.m@example.com" },
      { value: "0408 220 401" },
      { value: "Albion Park" },
    ],
  },
  {
    rowNumber: 3,
    cells: [
      { value: "Reuben Le Roy" },
      { value: "" },
      { value: "0411 904 220" },
      { value: "Shellharbour" },
    ],
  },
  {
    rowNumber: 4,
    cells: [
      { value: "Imogen Walford" },
      { value: "imogen.walford@example.com" },
      { value: "(02) 4296 1188" },
      { value: "Warilla" },
    ],
  },
  {
    rowNumber: 5,
    cells: [
      { value: "Cooper Drazan" },
      { value: "cooper@drazan-fleet.example" },
      { value: "0419 408 220" },
      { value: "Dapto" },
    ],
  },
]

export const QUOTE_CSV_HEADERS: ReadonlyArray<string> = [
  "Customer",
  "Vehicle",
  "Job",
  "Quoted AUD",
  "Status",
]

export const QUOTE_CSV_ROWS: ReadonlyArray<CsvRowPreview> = [
  {
    rowNumber: 1,
    cells: [
      { value: "Daniel Houareau" },
      { value: "2010 VE Commodore" },
      { value: "Cat-back fit" },
      { value: "1,820" },
      { value: "Accepted" },
    ],
  },
  {
    rowNumber: 2,
    cells: [
      { value: "Steph Mavropoulos" },
      { value: "2014 Ranger PX" },
      { value: "Turbo-back + DPF" },
      { value: "2,560" },
      { value: "Pending" },
    ],
  },
  {
    rowNumber: 3,
    cells: [
      { value: "Reuben Le Roy" },
      { value: "2008 BA Falcon" },
      { value: "Muffler replace" },
      { value: "420" },
      { value: "Accepted" },
    ],
  },
  {
    rowNumber: 4,
    cells: [
      { value: "Imogen Walford" },
      { value: "2016 Yaris" },
      { value: "Mid-pipe weld" },
      { value: "180" },
      { value: "Declined" },
    ],
  },
]

export const PARTS_SOURCE_COLUMNS: ReadonlyArray<SourceColumnDescriptor> = [
  {
    id: "sku",
    label: "SKU",
    detected: "text",
    sample: "MFM-EX-2010-COMM",
  },
  {
    id: "title",
    label: "Title",
    detected: "text",
    sample: "VE Commodore cat-back exhaust — 2.5\"",
  },
  {
    id: "supplier",
    label: "Supplier",
    detected: "text",
    sample: "Manta Performance",
  },
  {
    id: "rrp",
    label: "RRP",
    detected: "currency",
    sample: "1,498.00",
  },
  {
    id: "stock",
    label: "Stock",
    detected: "number",
    sample: "6",
  },
]

export const PARTS_TARGET_FIELDS: ReadonlyArray<TargetFieldDescriptor> = [
  { id: "part-number", label: "Part number", required: true },
  { id: "display-name", label: "Display name", required: true },
  { id: "supplier-id", label: "Supplier reference", required: true },
  { id: "rrp-aud", label: "RRP (AUD)" },
  { id: "stock-on-hand", label: "Stock on hand" },
  { id: "category-tag", label: "Category tag" },
]

export const PARTS_INITIAL_MAPPINGS: ReadonlyArray<ColumnMapping> = [
  {
    sourceId: "sku",
    targetId: "part-number",
    skip: false,
    confidence: 97,
    confidenceTone: "high",
  },
  {
    sourceId: "title",
    targetId: "display-name",
    skip: false,
    confidence: 92,
    confidenceTone: "high",
  },
  {
    sourceId: "supplier",
    targetId: "supplier-id",
    skip: false,
    confidence: 78,
    confidenceTone: "medium",
  },
  {
    sourceId: "rrp",
    targetId: "rrp-aud",
    skip: false,
    confidence: 99,
    confidenceTone: "high",
  },
  {
    sourceId: "stock",
    targetId: "stock-on-hand",
    skip: false,
    confidence: 88,
    confidenceTone: "high",
  },
]

export const VALIDATION_ERROR_CLASSES: ReadonlyArray<ValidationErrorClass> = [
  {
    id: "missing-required",
    label: "Missing required: Supplier reference",
    count: 8,
    severity: "blocker",
    firstRowNumber: 14,
  },
  {
    id: "invalid-currency",
    label: "Invalid format: RRP not a currency value",
    count: 3,
    severity: "blocker",
    firstRowNumber: 32,
  },
  {
    id: "duplicate-sku",
    label: "Duplicate SKU already in catalog",
    count: 5,
    severity: "warning",
    firstRowNumber: 47,
  },
  {
    id: "out-of-range",
    label: "Out of range: Stock < 0",
    count: 2,
    severity: "warning",
    firstRowNumber: 58,
  },
  {
    id: "foreign-key",
    label: "Foreign-key missing: Supplier not found",
    count: 6,
    severity: "blocker",
    firstRowNumber: 12,
  },
  {
    id: "low-confidence",
    label: "Low-confidence mapping flagged for review",
    count: 11,
    severity: "info",
    firstRowNumber: 4,
  },
]

export const DRY_RUN_OUTCOMES: ReadonlyArray<DryRunOutcomeCount> = [
  { label: "Rows to create", count: 482, tone: "create" },
  { label: "Rows to update", count: 196, tone: "update" },
  { label: "Rows skipped", count: 24, tone: "skip" },
  { label: "Rows failed", count: 19, tone: "fail" },
]

export const IMPORT_HISTORY: ReadonlyArray<ImportHistoryEntry> = [
  {
    id: "imp-2026-05-28",
    filename: "manta-parts-2026-05-28.csv",
    startedAt: "28 May 2026, 09:14 AEST",
    rows: 721,
    durationSeconds: 184,
    status: "success",
    rollbackAvailable: true,
  },
  {
    id: "imp-2026-05-22",
    filename: "redback-mufflers-may-restock.csv",
    startedAt: "22 May 2026, 11:08 AEST",
    rows: 96,
    durationSeconds: 46,
    status: "warn",
    rollbackAvailable: true,
  },
  {
    id: "imp-2026-05-14",
    filename: "loyalty-customers-Q2-2026.xlsx",
    startedAt: "14 May 2026, 16:42 AEST",
    rows: 1_412,
    durationSeconds: 312,
    status: "rolled-back",
    rollbackAvailable: false,
  },
  {
    id: "imp-2026-05-08",
    filename: "quote-history-fy26-h2.json",
    startedAt: "8 May 2026, 08:01 AEST",
    rows: 268,
    durationSeconds: 64,
    status: "failed",
    rollbackAvailable: false,
  },
  {
    id: "imp-2026-05-02",
    filename: "beaudesert-clearance-april.csv",
    startedAt: "2 May 2026, 13:18 AEST",
    rows: 184,
    durationSeconds: 38,
    status: "success",
    rollbackAvailable: false,
  },
]

export const ROLLBACK_CANDIDATES: ReadonlyArray<RollbackCandidate> = [
  {
    id: "imp-2026-05-28",
    label: "manta-parts-2026-05-28.csv",
    rowsAffected: 721,
    undoWindowLabel: "24h undo window",
    undoExpiresInLabel: "16h 22m",
  },
  {
    id: "imp-2026-05-22",
    label: "redback-mufflers-may-restock.csv",
    rowsAffected: 96,
    undoWindowLabel: "7-day undo window",
    undoExpiresInLabel: "1d 4h",
  },
]

export const DUPLICATE_RULES: ReadonlyArray<DuplicateRuleEntry> = [
  {
    id: "rule-parts-sku",
    keyColumns: ["part_number"],
    action: "update",
    description:
      "When the same SKU is already in the parts catalog, update the existing row with the incoming RRP and stock.",
  },
  {
    id: "rule-customers-email",
    keyColumns: ["email_norm"],
    action: "merge-by-rule",
    description:
      "If a customer email matches, merge with prefer-most-recent for phone and suburb.",
  },
  {
    id: "rule-quotes-pair",
    keyColumns: ["customer_id", "vehicle_id"],
    action: "keep-both",
    description:
      "Quotes for the same customer + vehicle should be kept as separate revisions.",
  },
  {
    id: "rule-suppliers",
    keyColumns: ["supplier_slug"],
    action: "skip",
    description:
      "Suppliers are managed manually — skip incoming rows that match an existing slug.",
  },
]

export const MAPPING_TEMPLATES: ReadonlyArray<MappingTemplateSummary> = [
  {
    id: "tmpl-manta",
    name: "Manta parts catalog",
    mappedColumnCount: 5,
    lastUsedLabel: "28 May 2026",
    ownerLabel: "Daniel F.",
  },
  {
    id: "tmpl-loyalty",
    name: "Loyalty customer book",
    mappedColumnCount: 7,
    lastUsedLabel: "14 May 2026",
    ownerLabel: "Sarah B.",
  },
  {
    id: "tmpl-quotes",
    name: "Quote history (FY26)",
    mappedColumnCount: 6,
    lastUsedLabel: "8 May 2026",
    ownerLabel: "Daniel F.",
  },
  {
    id: "tmpl-suppliers",
    name: "Supplier price-list",
    mappedColumnCount: 4,
    lastUsedLabel: "2 May 2026",
    ownerLabel: "Bay-supervisor",
  },
]

export const PARTS_SAMPLE_ROW: ReadonlyArray<SampleRowField> = [
  {
    sourceLabel: "SKU",
    sourceValue: "MFM-EX-2010-COMM",
    targetLabel: "part_number",
    targetValue: "mfm-ex-2010-comm",
    transformedFlag: true,
  },
  {
    sourceLabel: "Title",
    sourceValue: "VE Commodore cat-back exhaust — 2.5\"",
    targetLabel: "display_name",
    targetValue: "VE Commodore cat-back exhaust — 2.5\"",
  },
  {
    sourceLabel: "Supplier",
    sourceValue: "Manta Performance",
    targetLabel: "supplier_id",
    targetValue: "supplier_manta-performance",
    transformedFlag: true,
  },
  {
    sourceLabel: "RRP",
    sourceValue: "1,498.00",
    targetLabel: "rrp_aud",
    targetValue: "149800",
    transformedFlag: true,
  },
  {
    sourceLabel: "Stock",
    sourceValue: "",
    targetLabel: "stock_on_hand",
    targetValue: "0",
    flagged: true,
  },
]

export const AVAILABLE_TRANSFORMS: ReadonlyArray<TransformChip> = [
  { id: "trim", kind: "trim", label: "trim" },
  { id: "lowercase", kind: "lowercase", label: "lowercase" },
  { id: "uppercase", kind: "uppercase", label: "uppercase" },
  { id: "regex-replace", kind: "regex-replace", label: "regex-replace", detail: "/\\s+/ → ' '" },
  { id: "split", kind: "split", label: "split", detail: "on whitespace" },
  { id: "lookup", kind: "lookup", label: "lookup", detail: "supplier_map" },
  { id: "coalesce", kind: "coalesce", label: "coalesce", detail: "→ n/a" },
]

export const TRANSFORM_COLUMNS: ReadonlyArray<TransformColumn> = [
  {
    id: "sku-column",
    label: "SKU",
    rawSample: "  MFM-EX-2010-COMM  ",
    chips: [
      { id: "trim", kind: "trim", label: "trim" },
      { id: "lowercase", kind: "lowercase", label: "lowercase" },
    ],
  },
  {
    id: "supplier-column",
    label: "Supplier",
    rawSample: "Manta   Performance",
    chips: [
      { id: "regex-replace", kind: "regex-replace", label: "regex-replace", detail: "/\\s+/" },
      { id: "lookup", kind: "lookup", label: "lookup", detail: "supplier_map" },
    ],
  },
  {
    id: "stock-column",
    label: "Stock",
    rawSample: "",
    chips: [{ id: "coalesce", kind: "coalesce", label: "coalesce", detail: "→ n/a" }],
  },
]
