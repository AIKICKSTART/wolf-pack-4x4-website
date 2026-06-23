import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./data-import.module.css"

export const metadata: Metadata = {
  title: "Data import + migration wizard | UI Primitives",
  description:
    "Data-import primitives — source picker, CSV preview, column mapper, type detector, validation, dry-run, progress, rollback, history, duplicate rules, mapping templates, AI suggestions, transforms.",
}

interface ImportScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ImportScene> = [
  {
    kicker: "Primitive 01",
    title: "Import source picker",
    body: "CSV / Excel / JSON / Sheets / Airtable / DB / Webhook source cards.",
    href: "/ui-primitives/data-import/import-source-picker",
    accent: "teal",
    glyph: "⌗",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 02",
    title: "CSV file preview",
    body: "First 10 rows, header row, delimiter and encoding chips.",
    href: "/ui-primitives/data-import/csv-file-preview",
    accent: "amber",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Column mapper",
    body: "Source columns → target fields, skip toggle, required + auto-match chips.",
    href: "/ui-primitives/data-import/column-mapper",
    accent: "violet",
    glyph: "↔",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 04",
    title: "Field type detector row",
    body: "Detected type chip per column with override picker and sample value.",
    href: "/ui-primitives/data-import/field-type-detector-row",
    accent: "teal",
    glyph: "T",
    state: "Stateful · row",
  },
  {
    kicker: "Primitive 05",
    title: "Validation errors panel",
    body: "Error-class chips, row counts, row-jump CTA — blocker vs warning vs info.",
    href: "/ui-primitives/data-import/validation-errors-panel",
    accent: "red",
    glyph: "!",
    state: "Stateless · live",
  },
  {
    kicker: "Primitive 06",
    title: "Dry-run summary",
    body: "Rows to create / update / skip / fail tiles + impact chip + commit CTA.",
    href: "/ui-primitives/data-import/dry-run-summary",
    accent: "green",
    glyph: "Σ",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Import progress bar",
    body: "Long-running progress with rows/sec, ETA, pause/resume CTA.",
    href: "/ui-primitives/data-import/import-progress-bar",
    accent: "teal",
    glyph: "→",
    state: "Stateful · live",
  },
  {
    kicker: "Primitive 08",
    title: "Rollback confirmation",
    body: "Undo-window list + confirmation phrase input. Hard-armed danger CTA.",
    href: "/ui-primitives/data-import/rollback-confirmation",
    accent: "red",
    glyph: "↺",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 09",
    title: "Sample row preview",
    body: "Single row mapped source → target with transform chips.",
    href: "/ui-primitives/data-import/sample-row-preview",
    accent: "amber",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Import history row",
    body: "Filename, timestamp, rows, status chip, duration, rollback chip.",
    href: "/ui-primitives/data-import/import-history-row",
    accent: "violet",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Duplicate handling rules",
    body: "Key columns + action: skip / update / keep both / merge by rule.",
    href: "/ui-primitives/data-import/duplicate-handling-rules",
    accent: "teal",
    glyph: "⌘",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 12",
    title: "Mapping template card",
    body: "Saved-mapping summary with apply CTA.",
    href: "/ui-primitives/data-import/mapping-template-card",
    accent: "green",
    glyph: "⌬",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Field mapping suggestion",
    body: "AI suggestion banner with confidence chip and accept/reject.",
    href: "/ui-primitives/data-import/field-mapping-suggestion",
    accent: "teal",
    glyph: "✦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Transform rules editor",
    body: "Per-column transform chips with live preview row.",
    href: "/ui-primitives/data-import/transform-rules-editor",
    accent: "violet",
    glyph: "λ",
    state: "Stateful · pipeline",
  },
  {
    kicker: "Composition",
    title: "Full wizard",
    body: "5-step wizard: source → preview → mapping → dry-run → progress.",
    href: "/ui-primitives/data-import/full-wizard",
    accent: "red",
    glyph: "⊞",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ImportScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function DataImportIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Data import / 14 primitives + composition"
        title="Data import + migration wizard"
        description="The CSV-in, validation-out, dry-run-then-commit-then-rollback stack. Parts catalog, customer book, quote intake — every primitive uses realistic Oak Flats Mufflermen data; no real writes wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real writes wired
      </span>

      <section className={styles.grid} aria-label="Data import primitives">
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
