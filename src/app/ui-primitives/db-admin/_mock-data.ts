/** Realistic Mufflermen schema mocks shared across db-admin sub-routes. */

import type {
  BackupRecord,
  ConstraintRecord,
  ErEdge,
  ErNode,
  IndexRecord,
  MigrationRecord,
  QueryResultColumn,
  QueryResultRow,
  SchemaColumn,
  SchemaDiffEntry,
  SchemaObjectNode,
  StoredProcedure,
  TriggerRecord,
} from "../components/db-admin"

export const SCHEMAS: ReadonlyArray<SchemaObjectNode> = [
  {
    id: "public",
    name: "public",
    kind: "schema",
    count: 18,
    children: [
      { id: "public.quotes", name: "quotes", kind: "table", count: 12_482 },
      { id: "public.parts", name: "parts", kind: "table", count: 3_104 },
      { id: "public.customers", name: "customers", kind: "table", count: 8_926 },
      { id: "public.bookings", name: "bookings", kind: "table", count: 24_510 },
      { id: "public.invoices", name: "invoices", kind: "table", count: 16_882 },
      { id: "public.users", name: "users", kind: "table", count: 142 },
      { id: "public.audit_log", name: "audit_log", kind: "table", count: 1_204_891 },
      { id: "public.vw_active_bookings", name: "vw_active_bookings", kind: "view", count: 312 },
      {
        id: "public.mv_monthly_revenue",
        name: "mv_monthly_revenue",
        kind: "materialized_view",
        count: 36,
      },
      { id: "public.fn_quote_total", name: "fn_quote_total", kind: "function" },
      { id: "public.fn_audit_log", name: "fn_audit_log", kind: "function" },
      { id: "public.quotes_id_seq", name: "quotes_id_seq", kind: "sequence" },
      { id: "public.bookings_id_seq", name: "bookings_id_seq", kind: "sequence" },
    ],
  },
  {
    id: "analytics",
    name: "analytics",
    kind: "schema",
    count: 6,
    children: [
      { id: "analytics.daily_metrics", name: "daily_metrics", kind: "table", count: 1_842 },
      {
        id: "analytics.mv_top_parts",
        name: "mv_top_parts",
        kind: "materialized_view",
        count: 500,
      },
      { id: "analytics.fn_refresh", name: "fn_refresh", kind: "function" },
    ],
  },
  {
    id: "audit",
    name: "audit",
    kind: "schema",
    count: 3,
    children: [
      { id: "audit.events", name: "events", kind: "table", count: 4_482_001 },
      { id: "audit.events_id_seq", name: "events_id_seq", kind: "sequence" },
    ],
  },
]

export const QUOTES_COLUMNS: ReadonlyArray<SchemaColumn> = [
  {
    name: "id",
    type: "bigint",
    family: "number",
    nullable: false,
    defaultValue: "nextval('quotes_id_seq')",
    isPrimaryKey: true,
    comment: "Surrogate primary key for the quote.",
  },
  {
    name: "customer_id",
    type: "bigint",
    family: "number",
    nullable: false,
    isForeignKey: true,
    comment: "Owner of the quote — references public.customers(id).",
  },
  {
    name: "vehicle_rego",
    type: "varchar(8)",
    family: "string",
    nullable: false,
    comment: "AU plate number — uppercased on insert.",
  },
  {
    name: "exhaust_kind",
    type: "varchar(40)",
    family: "string",
    nullable: false,
    defaultValue: "'cat-back'",
  },
  {
    name: "subtotal_cents",
    type: "integer",
    family: "number",
    nullable: false,
    defaultValue: "0",
  },
  {
    name: "gst_cents",
    type: "integer",
    family: "number",
    nullable: false,
    defaultValue: "0",
    comment: "Auto-computed as round(subtotal * 0.10).",
  },
  {
    name: "status",
    type: "quote_status",
    family: "string",
    nullable: false,
    defaultValue: "'draft'",
  },
  {
    name: "valid_until",
    type: "date",
    family: "date",
    nullable: true,
  },
  {
    name: "created_at",
    type: "timestamptz",
    family: "date",
    nullable: false,
    defaultValue: "now()",
  },
  {
    name: "updated_at",
    type: "timestamptz",
    family: "date",
    nullable: false,
    defaultValue: "now()",
  },
]

export const QUOTES_CONSTRAINTS: ReadonlyArray<ConstraintRecord> = [
  {
    kind: "primary_key",
    name: "quotes_pkey",
    columns: ["id"],
  },
  {
    kind: "foreign_key",
    name: "quotes_customer_id_fkey",
    columns: ["customer_id"],
    references: { table: "customers", columns: ["id"] },
  },
  {
    kind: "unique",
    name: "quotes_vehicle_rego_status_uq",
    columns: ["vehicle_rego", "status"],
  },
  {
    kind: "check",
    name: "quotes_subtotal_nonneg_ck",
    columns: ["subtotal_cents"],
    expression: "subtotal_cents >= 0",
  },
  {
    kind: "not_null",
    name: "quotes_created_at_nn",
    columns: ["created_at"],
  },
]

export const QUOTES_INDEXES: ReadonlyArray<IndexRecord> = [
  {
    name: "quotes_pkey",
    type: "btree",
    columns: ["id"],
    unique: true,
    sizeBytes: 1_120_000,
    usage: "high",
  },
  {
    name: "quotes_customer_id_idx",
    type: "btree",
    columns: ["customer_id"],
    unique: false,
    sizeBytes: 824_320,
    usage: "high",
  },
  {
    name: "quotes_status_partial_idx",
    type: "btree",
    columns: ["status"],
    unique: false,
    sizeBytes: 192_104,
    usage: "medium",
  },
  {
    name: "quotes_search_gin_idx",
    type: "gin",
    columns: ["search_vector"],
    unique: false,
    sizeBytes: 4_802_312,
    usage: "low",
  },
  {
    name: "quotes_archive_brin_idx",
    type: "brin",
    columns: ["created_at"],
    unique: false,
    sizeBytes: 28_414,
    usage: "unused",
  },
]

export const QUOTES_TRIGGERS: ReadonlyArray<TriggerRecord> = [
  {
    name: "quotes_set_updated_at",
    timing: "before",
    events: ["update"],
    functionRef: "fn_set_updated_at",
    enabled: true,
  },
  {
    name: "quotes_audit_log",
    timing: "after",
    events: ["insert", "update", "delete"],
    functionRef: "fn_audit_log",
    enabled: true,
  },
]

export const STORED_PROCEDURES: ReadonlyArray<StoredProcedure> = [
  {
    name: "fn_quote_total",
    arguments: [
      { name: "p_quote_id", type: "bigint" },
      { name: "p_include_gst", type: "boolean" },
    ],
    returns: "integer",
    language: "plpgsql",
    body: `CREATE OR REPLACE FUNCTION fn_quote_total(
  p_quote_id bigint,
  p_include_gst boolean DEFAULT true
) RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  v_subtotal integer;
  v_gst integer;
BEGIN
  SELECT subtotal_cents, gst_cents
    INTO v_subtotal, v_gst
    FROM quotes
   WHERE id = p_quote_id;

  IF p_include_gst THEN
    RETURN COALESCE(v_subtotal, 0) + COALESCE(v_gst, 0);
  END IF;

  RETURN COALESCE(v_subtotal, 0);
END;
$$;`,
  },
  {
    name: "fn_audit_log",
    arguments: [],
    returns: "trigger",
    language: "plpgsql",
    body: `CREATE OR REPLACE FUNCTION fn_audit_log()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO audit_log (table_name, action, row_id, changed_at)
  VALUES (TG_TABLE_NAME, TG_OP, NEW.id, now());
  RETURN NEW;
END;
$$;`,
  },
]

export const MIGRATIONS: ReadonlyArray<MigrationRecord> = [
  {
    version: "20260415_01",
    name: "create_quotes_table",
    appliedAt: "2026-04-15 09:12 UTC",
    status: "applied",
    durationMs: 184,
  },
  {
    version: "20260418_02",
    name: "add_quote_status_index",
    appliedAt: "2026-04-18 14:30 UTC",
    status: "applied",
    durationMs: 92,
  },
  {
    version: "20260502_03",
    name: "create_bookings_table",
    appliedAt: "2026-05-02 11:05 UTC",
    status: "applied",
    durationMs: 312,
  },
  {
    version: "20260514_04",
    name: "add_audit_log_partitions",
    appliedAt: "2026-05-14 18:42 UTC",
    status: "applied",
    durationMs: 1_204,
  },
  {
    version: "20260520_05",
    name: "alter_invoices_add_gst",
    appliedAt: "2026-05-20 02:15 UTC",
    status: "failed",
    durationMs: 4_892,
  },
  {
    version: "20260524_06",
    name: "rollback_audit_partitions",
    appliedAt: "2026-05-24 10:00 UTC",
    status: "rolled_back",
    durationMs: 612,
  },
  {
    version: "20260527_07",
    name: "add_part_warranty_months",
    status: "pending",
  },
]

export const ER_NODES: ReadonlyArray<ErNode> = [
  {
    id: "customers",
    name: "customers",
    schema: "public",
    x: 40,
    y: 40,
    width: 200,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "email", type: "citext" },
      { name: "phone", type: "varchar(20)" },
      { name: "full_name", type: "varchar(120)" },
      { name: "created_at", type: "timestamptz" },
    ],
  },
  {
    id: "quotes",
    name: "quotes",
    schema: "public",
    x: 320,
    y: 40,
    width: 220,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "customer_id", type: "bigint", isForeignKey: true },
      { name: "vehicle_rego", type: "varchar(8)" },
      { name: "subtotal_cents", type: "integer" },
      { name: "status", type: "quote_status" },
    ],
  },
  {
    id: "bookings",
    name: "bookings",
    schema: "public",
    x: 620,
    y: 40,
    width: 220,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "quote_id", type: "bigint", isForeignKey: true },
      { name: "customer_id", type: "bigint", isForeignKey: true },
      { name: "scheduled_for", type: "timestamptz" },
      { name: "bay_id", type: "smallint" },
    ],
  },
  {
    id: "parts",
    name: "parts",
    schema: "public",
    x: 40,
    y: 280,
    width: 200,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "sku", type: "varchar(40)" },
      { name: "title", type: "varchar(120)" },
      { name: "stock_qty", type: "integer" },
    ],
  },
  {
    id: "invoices",
    name: "invoices",
    schema: "public",
    x: 320,
    y: 280,
    width: 220,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "booking_id", type: "bigint", isForeignKey: true },
      { name: "total_cents", type: "integer" },
      { name: "paid_at", type: "timestamptz" },
    ],
  },
  {
    id: "users",
    name: "users",
    schema: "public",
    x: 620,
    y: 280,
    width: 220,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "email", type: "citext" },
      { name: "role", type: "user_role" },
      { name: "last_seen_at", type: "timestamptz" },
    ],
  },
  {
    id: "audit_log",
    name: "audit_log",
    schema: "public",
    x: 320,
    y: 480,
    width: 240,
    columns: [
      { name: "id", type: "bigint", isPrimaryKey: true },
      { name: "user_id", type: "bigint", isForeignKey: true },
      { name: "table_name", type: "varchar(80)" },
      { name: "action", type: "varchar(20)" },
      { name: "changed_at", type: "timestamptz" },
    ],
  },
]

export const ER_EDGES: ReadonlyArray<ErEdge> = [
  {
    id: "quotes_customer_fk",
    fromTable: "quotes",
    fromColumn: "customer_id",
    toTable: "customers",
    toColumn: "id",
    onDelete: "restrict",
    onUpdate: "cascade",
  },
  {
    id: "bookings_quote_fk",
    fromTable: "bookings",
    fromColumn: "quote_id",
    toTable: "quotes",
    toColumn: "id",
    onDelete: "set_null",
    onUpdate: "cascade",
  },
  {
    id: "bookings_customer_fk",
    fromTable: "bookings",
    fromColumn: "customer_id",
    toTable: "customers",
    toColumn: "id",
    onDelete: "restrict",
    onUpdate: "cascade",
  },
  {
    id: "invoices_booking_fk",
    fromTable: "invoices",
    fromColumn: "booking_id",
    toTable: "bookings",
    toColumn: "id",
    onDelete: "restrict",
    onUpdate: "cascade",
  },
  {
    id: "audit_user_fk",
    fromTable: "audit_log",
    fromColumn: "user_id",
    toTable: "users",
    toColumn: "id",
    onDelete: "set_null",
    onUpdate: "cascade",
  },
]

export const RESULT_COLUMNS: ReadonlyArray<QueryResultColumn> = [
  { id: "id", name: "id", family: "number" },
  { id: "vehicle_rego", name: "vehicle_rego", family: "string" },
  { id: "customer_id", name: "customer_id", family: "number" },
  { id: "subtotal_cents", name: "subtotal_cents", family: "number" },
  { id: "status", name: "status", family: "string" },
  { id: "is_locked", name: "is_locked", family: "boolean" },
  { id: "created_at", name: "created_at", family: "date" },
  { id: "tags", name: "tags", family: "json" },
]

export const RESULT_ROWS: ReadonlyArray<QueryResultRow> = [
  {
    id: 8421,
    vehicle_rego: "BVR-218",
    customer_id: 3102,
    subtotal_cents: 142_500,
    status: "sent",
    is_locked: false,
    created_at: "2026-05-26T08:14:22Z",
    tags: '["urgent","catback"]',
  },
  {
    id: 8420,
    vehicle_rego: "TKM-991",
    customer_id: 2890,
    subtotal_cents: 89_900,
    status: "draft",
    is_locked: false,
    created_at: "2026-05-26T07:48:01Z",
    tags: "[]",
  },
  {
    id: 8419,
    vehicle_rego: "OAK-447",
    customer_id: 4044,
    subtotal_cents: 268_400,
    status: "accepted",
    is_locked: true,
    created_at: "2026-05-25T16:02:11Z",
    tags: '["fleet"]',
  },
  {
    id: 8418,
    vehicle_rego: "FLT-008",
    customer_id: 4044,
    subtotal_cents: 0,
    status: "rejected",
    is_locked: false,
    created_at: "2026-05-25T11:30:00Z",
    tags: "null",
  },
  {
    id: 8417,
    vehicle_rego: "RX7-322",
    customer_id: 1188,
    subtotal_cents: 412_100,
    status: "accepted",
    is_locked: true,
    created_at: "2026-05-24T19:55:43Z",
    tags: '["premium","stainless"]',
  },
]

export const DIFF_ENTRIES: ReadonlyArray<SchemaDiffEntry> = [
  {
    id: "d1",
    path: "public.parts.warranty_months",
    change: "added",
    rightValue: "integer NOT NULL DEFAULT 12",
  },
  {
    id: "d2",
    path: "public.quotes.exhaust_kind",
    change: "changed",
    leftValue: "varchar(20) DEFAULT 'standard'",
    rightValue: "varchar(40) DEFAULT 'cat-back'",
  },
  {
    id: "d3",
    path: "public.bookings.legacy_notes",
    change: "removed",
    leftValue: "text",
  },
  {
    id: "d4",
    path: "public.invoices.id",
    change: "unchanged",
    leftValue: "bigint PRIMARY KEY",
    rightValue: "bigint PRIMARY KEY",
  },
  {
    id: "d5",
    path: "public.bookings_status_idx",
    change: "added",
    rightValue: "btree (status)",
  },
]

export const BACKUPS: ReadonlyArray<BackupRecord> = [
  {
    id: "bkp-20260527-0300",
    createdAt: "2026-05-27 03:00 UTC",
    sizeBytes: 4_482_801_233,
    kind: "scheduled",
    retention: "30d",
  },
  {
    id: "bkp-20260526-0300",
    createdAt: "2026-05-26 03:00 UTC",
    sizeBytes: 4_478_120_445,
    kind: "scheduled",
    retention: "30d",
  },
  {
    id: "bkp-20260525-1422",
    createdAt: "2026-05-25 14:22 UTC",
    sizeBytes: 4_476_002_900,
    kind: "manual",
    retention: "90d",
  },
  {
    id: "bkp-20260525-0300",
    createdAt: "2026-05-25 03:00 UTC",
    sizeBytes: 4_471_888_201,
    kind: "scheduled",
    retention: "30d",
  },
]
