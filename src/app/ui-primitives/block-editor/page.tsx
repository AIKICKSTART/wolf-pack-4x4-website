import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./block-editor.module.css"

export const metadata: Metadata = {
  title: "Block editor | UI Primitives",
  description:
    "Reusable block-editor primitives — gallery, code, table, embed, quote, poll, sandbox, timeline, divider, video, callout, checklist, accordion, CTA. Edit + preview + error states.",
}

interface BlockScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<BlockScene> = [
  {
    kicker: "Primitive 01",
    title: "Gallery",
    body: "Workshop time-lapse + before/after exhaust + dyno bay shots — grid, carousel, masonry layouts.",
    href: "/ui-primitives/block-editor/gallery",
    accent: "amber",
    glyph: "▦",
    state: "Stateful · layout",
  },
  {
    kicker: "Primitive 02",
    title: "Code block",
    body: "Language picker + syntax theme + copy + line numbers. Bash fitment check + parts-API JSON.",
    href: "/ui-primitives/block-editor/code",
    accent: "violet",
    glyph: "</>",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 03",
    title: "Table",
    body: "Dyno comparison grid — sortable columns, resize, cell formatting, AUD currency formatting.",
    href: "/ui-primitives/block-editor/table",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 04",
    title: "Embed",
    body: "YouTube / Vimeo / CodePen / Twitter embed with aspect-ratio picker. Workshop walk-around demo.",
    href: "/ui-primitives/block-editor/embed",
    accent: "red",
    glyph: "▷",
    state: "Stateful · provider",
  },
  {
    kicker: "Primitive 05",
    title: "Quote",
    body: "Pull-quote with citation, author, optional headshot — Mick Davis 4WD testimonial baked in.",
    href: "/ui-primitives/block-editor/quote",
    accent: "violet",
    glyph: "”",
    state: "Stateful · variant",
  },
  {
    kicker: "Primitive 06",
    title: "Poll",
    body: "Multi-choice poll with live results bars — Manta / Pacemaker / XForce / Genie supplier vote.",
    href: "/ui-primitives/block-editor/poll",
    accent: "teal",
    glyph: "▌",
    state: "Stateful · vote",
  },
  {
    kicker: "Primitive 07",
    title: "Code sandbox",
    body: "Live HTML / CSS / JS playground with preview pane. Booking-widget mock loaded.",
    href: "/ui-primitives/block-editor/code-sandbox",
    accent: "green",
    glyph: "▣",
    state: "Stateful · pane",
  },
  {
    kicker: "Primitive 08",
    title: "Timeline",
    body: "Vertical event timeline (year / month / event) — half a century on the Oak Flats workshop floor.",
    href: "/ui-primitives/block-editor/timeline",
    accent: "amber",
    glyph: "│",
    state: "Stateful · add",
  },
  {
    kicker: "Primitive 09",
    title: "Divider",
    body: "Section divider variants — line, dot, icon, wave, zigzag — with optional bay-change label.",
    href: "/ui-primitives/block-editor/divider",
    accent: "neutral",
    glyph: "—",
    state: "Stateful · variant",
  },
  {
    kicker: "Primitive 10",
    title: "Video",
    body: "Self-hosted workshop video with poster + chapters + captions toggle. Dyno walk-through baked in.",
    href: "/ui-primitives/block-editor/video",
    accent: "red",
    glyph: "▶",
    state: "Stateful · captions",
  },
  {
    kicker: "Primitive 11",
    title: "Callout",
    body: "Info / warning / tip / danger callout with icon + dismissible flag — DPF cleaning notice.",
    href: "/ui-primitives/block-editor/callout",
    accent: "amber",
    glyph: "▲",
    state: "Stateful · dismiss",
  },
  {
    kicker: "Primitive 12",
    title: "Checklist",
    body: "Interactive todo with checkbox + completion meter — pre-service walk-around.",
    href: "/ui-primitives/block-editor/checklist",
    accent: "green",
    glyph: "✓",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 13",
    title: "Accordion",
    body: "Collapsible Q&A block with expand-all / collapse-all controls — workshop FAQ.",
    href: "/ui-primitives/block-editor/accordion",
    accent: "teal",
    glyph: "▾",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 14",
    title: "Call to action",
    body: "Heading + body + button + background — Bay 4 dyno booking card with accent tone picker.",
    href: "/ui-primitives/block-editor/cta",
    accent: "amber",
    glyph: "▶▶",
    state: "Stateful · tone",
  },
  {
    kicker: "Composition",
    title: "Full document",
    body: "Composed long-form post mixing every block — masthead, gallery, table, quote, poll, callout, CTA.",
    href: "/ui-primitives/block-editor/full-document",
    accent: "violet",
    glyph: "▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<BlockScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function BlockEditorIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Block editor / 14 primitives + composition"
        title="Block-editor primitives"
        description="Reusable editorial blocks — gallery, code, table, embed, quote, poll, sandbox, timeline, divider, video, callout, checklist, accordion, CTA. Every block shares the same render / edit / error mode triplet and emits typed BlockData<T> envelopes. Visual reference only — nothing wired to real storage."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Block editor" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — block hosts are not wired
      </span>

      <section className={styles.grid} aria-label="Block-editor primitives">
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
