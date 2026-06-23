import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./db-admin.module.css"

export const metadata: Metadata = {
  title: "Database Admin | UI Primitives",
  description:
    "Database admin / schema viewer primitives — schema tree, column list, ER diagram, query editor + results, migrations, indexes, constraints, triggers, stored procedures, schema diff, backup/restore — plus a full admin composition.",
}

interface DbAdminScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<DbAdminScene> = [
  {
    kicker: "Primitive 01",
    title: "Schema tree",
    body: "Left-rail schema browser — schemas → tables / views / materialized views / functions / sequences with counts and filter.",
    href: "/ui-primitives/db-admin/schema-tree",
    accent: "neutral",
    glyph: "≡▾",
    state: "Stateful · expand / select",
  },
  {
    kicker: "Primitive 02",
    title: "Column list panel",
    body: "Right panel — columns of a table with type, nullable, default, PK / FK chips, and comment popovers.",
    href: "/ui-primitives/db-admin/column-list-panel",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · comment popover",
  },
  {
    kicker: "Primitive 03",
    title: "ER diagram canvas",
    body: "SVG entity-relationship canvas — table nodes with column rows, FK arrows, minimap.",
    href: "/ui-primitives/db-admin/er-diagram-canvas",
    accent: "amber",
    glyph: "◫↔◫",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Query editor",
    body: "SQL editor with mono font, line-number gutter, connection chip, row-limit chip, run button.",
    href: "/ui-primitives/db-admin/query-editor",
    accent: "red",
    glyph: "SQL",
    state: "Stateful · text + limit",
  },
  {
    kicker: "Primitive 05",
    title: "Query results table",
    body: "Composes DataTable + row-number column + type-aware cell renderers (number / date / boolean / json) + CSV export.",
    href: "/ui-primitives/db-admin/query-results-table",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · sort + select",
  },
  {
    kicker: "Primitive 06",
    title: "Migration row",
    body: "Row per migration — version, name, applied-at, status chip (Pending / Applied / Failed / Rolled back), actions.",
    href: "/ui-primitives/db-admin/migration-list-row",
    accent: "amber",
    glyph: "▭▭▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Index inspector",
    body: "Index card — type chip (BTree / GIN / GIST / Hash / BRIN), columns, uniqueness, size, usage chip.",
    href: "/ui-primitives/db-admin/index-inspector",
    accent: "green",
    glyph: "≣≣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Constraint chip row",
    body: "Row of PK / FK / UNIQUE / CHECK / NOT NULL chips with click-to-view details popover.",
    href: "/ui-primitives/db-admin/constraint-chip-row",
    accent: "amber",
    glyph: "PK FK",
    state: "Stateful · details popover",
  },
  {
    kicker: "Primitive 09",
    title: "Trigger card",
    body: "Trigger surface — name, timing (BEFORE / AFTER / INSTEAD OF), event chips, function ref, enabled toggle.",
    href: "/ui-primitives/db-admin/trigger-card",
    accent: "red",
    glyph: "⤿",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 10",
    title: "Stored procedure card",
    body: "Procedure with arg list, return type, language chip, body excerpt rendered through CodeBlock.",
    href: "/ui-primitives/db-admin/stored-procedure-card",
    accent: "teal",
    glyph: "ƒn",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 11",
    title: "Row count badge",
    body: "Tiny tonal badge with K / M / B suffix that shifts tone for larger tables.",
    href: "/ui-primitives/db-admin/row-count-badge",
    accent: "neutral",
    glyph: "12K",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Foreign key arrow",
    body: "Standalone FK visualizer — source.column → target.column with on-delete / on-update chips.",
    href: "/ui-primitives/db-admin/foreign-key-arrow",
    accent: "teal",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Schema diff pane",
    body: "Side-by-side schema diff — left / right with added / removed / changed rows + summary chip row.",
    href: "/ui-primitives/db-admin/schema-diff-pane",
    accent: "amber",
    glyph: "± ~",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Backup / restore panel",
    body: "Backup list, manual backup CTA, three-step restore wizard (Select → Review → Confirm).",
    href: "/ui-primitives/db-admin/backup-restore-panel",
    accent: "green",
    glyph: "↺",
    state: "Stateful · wizard",
  },
  {
    kicker: "Composition",
    title: "Full database admin",
    body: "Schema tree + column list + constraint row + index inspector + trigger card + ER tab + query editor + results + backup panel.",
    href: "/ui-primitives/db-admin/full-admin",
    accent: "red",
    glyph: "DB·≡↔▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<DbAdminScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function DbAdminIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="DB Admin / 14 primitives + composition"
        title="Database admin / schema viewer primitives"
        description="Visual primitives for an internal database administrator — schema browser, column inspector, ER diagram, SQL editor + results, migrations, indexes, constraints, triggers, stored procedures, schema diff, and backup / restore. Wired to mock Mufflermen schema — no live database connection."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "DB Admin" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live database connection
      </span>

      <section className={styles.grid} aria-label="Database admin primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
