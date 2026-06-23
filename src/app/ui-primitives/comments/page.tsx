import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./comments.module.css"

export const metadata: Metadata = {
  title: "Comments & Annotations | UI Primitives",
  description:
    "Collaborative comment + annotation primitives for Mufflermen docs, designs, and floor plans — inline threads, annotation pins, mention picker, reaction trays, resolve flow, sticky notes, activity stream.",
}

type Accent = "teal" | "amber" | "red" | "green" | "pink" | "violet"

interface CommentsScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: Accent
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<CommentsScene> = [
  {
    kicker: "Primitive 01",
    title: "Inline comment thread",
    body:
      "Anchored thread: pin badge, root bubble, replies stack, composer, resolve toggle.",
    href: "/ui-primitives/comments/inline-thread",
    accent: "amber",
    glyph: "◐",
    state: "Composition · stateful",
  },
  {
    kicker: "Primitive 02",
    title: "Comment bubble",
    body:
      "Single bubble with avatar, role chip, body, reactions, reply CTA, kebab.",
    href: "/ui-primitives/comments/comment-bubble",
    accent: "red",
    glyph: "◗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Annotation pin",
    body:
      "Numbered, positioned pin with pulse + tone-by-status. Reduced motion disables pulse.",
    href: "/ui-primitives/comments/annotation-pin",
    accent: "red",
    glyph: "◉",
    state: "Stateless · animation",
  },
  {
    kicker: "Primitive 04",
    title: "Comment composer",
    body:
      "Textarea + mention picker + attach + emoji + draft auto-save + send.",
    href: "/ui-primitives/comments/comment-composer",
    accent: "teal",
    glyph: "✎",
    state: "Stateful · textarea",
  },
  {
    kicker: "Primitive 05",
    title: "Reaction tray",
    body:
      "Persistent reaction row on every comment with aria-pressed for own reactions.",
    href: "/ui-primitives/comments/reaction-tray",
    accent: "pink",
    glyph: "☺",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 06",
    title: "Resolve toggle",
    body:
      "Resolve / unresolve toggle with checkbox glyph and resolve-with-note expander.",
    href: "/ui-primitives/comments/resolve-toggle",
    accent: "green",
    glyph: "✓",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 07",
    title: "Mention picker",
    body:
      "Typeahead @mention popover — users, teams, roles — arrow-key navigable.",
    href: "/ui-primitives/comments/mention-picker",
    accent: "teal",
    glyph: "@",
    state: "Stateful · keyboard",
  },
  {
    kicker: "Primitive 08",
    title: "Thread side panel",
    body:
      "Right rail listing threads with Open / Resolved / @me filter chips + selected highlight.",
    href: "/ui-primitives/comments/thread-side-panel",
    accent: "amber",
    glyph: "▤",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 09",
    title: "Activity stream",
    body:
      "Verb-chipped timeline: commented, replied, resolved, reopened, mentioned, liked.",
    href: "/ui-primitives/comments/activity-stream",
    accent: "violet",
    glyph: "≡",
    state: "Stateless · timeline",
  },
  {
    kicker: "Primitive 10",
    title: "Sticky note",
    body:
      "Figma-style floating sticky with author chip, body, drag affordance, tone variants.",
    href: "/ui-primitives/comments/sticky-note",
    accent: "amber",
    glyph: "▢",
    state: "Stateless · visual",
  },
  {
    kicker: "Primitive 11",
    title: "Pin marker overlay",
    body:
      "Positioned pin layer over any target surface — image, SVG, canvas.",
    href: "/ui-primitives/comments/pin-marker-overlay",
    accent: "red",
    glyph: "◎",
    state: "Stateless · layout",
  },
  {
    kicker: "Primitive 12",
    title: "Subscription row",
    body:
      "Follower avatars + bell toggle to subscribe / unsubscribe from a thread.",
    href: "/ui-primitives/comments/subscription-row",
    accent: "amber",
    glyph: "🔔",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 13",
    title: "Reply card",
    body:
      "Indented nested reply card with smaller author header — used inside threads.",
    href: "/ui-primitives/comments/reply-card",
    accent: "teal",
    glyph: "↳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Editor inline comments",
    body:
      "Prose with highlighted ranges that expose tooltip threads on hover / focus.",
    href: "/ui-primitives/comments/editor-inline",
    accent: "violet",
    glyph: "¶",
    state: "Stateless · hover",
  },
  {
    kicker: "Composition",
    title: "Full canvas annotation board",
    body:
      "Workshop floor-plan with 6 pins + thread side panel + activity stream below.",
    href: "/ui-primitives/comments/full-canvas",
    accent: "red",
    glyph: "◐◉",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Accent, string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  pink: styles.accentPink,
  violet: styles.accentViolet,
}

export default function CommentsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Comments / 14 primitives + composition"
        title="Comments & annotations"
        description="Figma- and Loom-style collaborative primitives for Mufflermen workshop docs, design specs, floor plans, and recordings — distinct from inbox messaging and AI assistant chat."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — collaboration is not wired
      </span>

      <section className={styles.grid} aria-label="Comments primitives">
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
