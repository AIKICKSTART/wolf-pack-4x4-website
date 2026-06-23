import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./bulk-ops.module.css"

export const metadata: Metadata = {
  title: "Bulk operations | UI Primitives",
  description:
    "Reusable cross-resource bulk-operations primitives — selection headers, action menus, confirmation modals, run progress, per-row status, results, undo banners, and saved actions.",
}

interface BulkOpsScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<BulkOpsScene> = [
  {
    kicker: "Primitive 01",
    title: "Bulk-select header",
    body: "Selected-count chip, select-all / clear, active filter, exit selection mode.",
    href: "/ui-primitives/bulk-ops/bulk-select-header",
    accent: "teal",
    glyph: "▭▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Bulk-action menu",
    body: "Tag / move / assign / status / export / archive / delete — tone-coded destructives.",
    href: "/ui-primitives/bulk-ops/bulk-action-menu",
    accent: "amber",
    glyph: "≡▾",
    state: "Stateful · open",
  },
  {
    kicker: "Primitive 03",
    title: "Bulk confirmation modal",
    body: "Typed-input phrase, impact summary, irreversibility chip for destructive runs.",
    href: "/ui-primitives/bulk-ops/bulk-confirmation-modal",
    accent: "red",
    glyph: "!?",
    state: "Stateful · typed",
  },
  {
    kicker: "Primitive 04",
    title: "Operation progress",
    body: "Rows processed, ETA, pause / resume, cancel for long-running bulk runs.",
    href: "/ui-primitives/bulk-ops/bulk-operation-progress",
    accent: "teal",
    glyph: "▰▰▱",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Per-row status cell",
    body: "Queued / In progress / Done / Skipped / Failed chip with per-row retry / skip.",
    href: "/ui-primitives/bulk-ops/per-row-status-cell",
    accent: "green",
    glyph: "●●●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Skip / retry actions",
    body: "Skip · Retry · Edit-and-retry chips for failed rows inline.",
    href: "/ui-primitives/bulk-ops/skip-retry-row-actions",
    accent: "amber",
    glyph: "↻↦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Result summary",
    body: "Success / skipped / failed counts, impact summary, export-result CTA.",
    href: "/ui-primitives/bulk-ops/bulk-result-summary",
    accent: "green",
    glyph: "✓✕",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Undo banner",
    body: "Floating success banner with countdown ring and undo CTA.",
    href: "/ui-primitives/bulk-ops/undo-bulk-banner",
    accent: "teal",
    glyph: "↺",
    state: "Stateful · timer",
  },
  {
    kicker: "Primitive 09",
    title: "Filtered bulk edit",
    body: "Field · operation · value form with only-update-empty guard.",
    href: "/ui-primitives/bulk-ops/filtered-bulk-edit-form",
    accent: "amber",
    glyph: "⇄",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 10",
    title: "Mass delete",
    body: "Warning illustration, typed-input, recovery-window chip, final delete CTA.",
    href: "/ui-primitives/bulk-ops/mass-delete-confirmation",
    accent: "red",
    glyph: "⌫",
    state: "Stateful · typed",
  },
  {
    kicker: "Primitive 11",
    title: "Export trigger",
    body: "Scope chip, format picker, include-archived, email-when-ready, Export CTA.",
    href: "/ui-primitives/bulk-ops/bulk-export-trigger",
    accent: "teal",
    glyph: "↓",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 12",
    title: "Tag apply",
    body: "Tag input with suggestions and replace-vs-add mode toggle.",
    href: "/ui-primitives/bulk-ops/bulk-tag-apply",
    accent: "green",
    glyph: "#·",
    state: "Stateful · tags",
  },
  {
    kicker: "Primitive 13",
    title: "Reassign",
    body: "From-assignee chip to-assignee picker, transfer-comments, notify toggles.",
    href: "/ui-primitives/bulk-ops/bulk-reassign-card",
    accent: "amber",
    glyph: "→@",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 14",
    title: "Saved bulk actions",
    body: "Saved-action list with last-used, average rows, reuse CTA per row.",
    href: "/ui-primitives/bulk-ops/saved-bulk-actions",
    accent: "teal",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full bulk flow",
    body: "Selection header + table + action menu + confirm + progress + result + undo, composed.",
    href: "/ui-primitives/bulk-ops/full-flow",
    accent: "red",
    glyph: "▦◇",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<BulkOpsScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function BulkOpsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Bulk ops / 14 primitives + composition"
        title="Bulk operations primitives"
        description="Reusable primitives for cross-resource bulk operations on quotes, parts, customers, and bookings — selection headers, action menus, confirmation modals, run progress, per-row status, result summaries, undo banners, and saved actions. Visual references — no real records are mutated."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bulk operations" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — bulk operations are not wired
      </span>

      <section className={styles.grid} aria-label="Bulk operations primitives">
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
