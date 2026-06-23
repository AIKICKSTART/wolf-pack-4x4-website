import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./content-studio.module.css"

export const metadata: Metadata = {
  title: "Content studio | UI Primitives",
  description:
    "Reusable content-studio primitives — long-form editor, outline rail, SEO inspector, taxonomy, media binder, publish scheduler, revision diffs, and AI repurpose cards for the Mufflermen editorial newsroom.",
}

interface StudioPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<StudioPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "Long-form editor",
    body: "Block-based rich text — paragraph, heading, list, quote, embed, code — with floating toolbar.",
    href: "/ui-primitives/content-studio/long-form-editor",
    accent: "violet",
    glyph: "¶",
    state: "Stateful · format",
  },
  {
    kicker: "Primitive 02",
    title: "Outline rail",
    body: "Auto-generated heading outline with jump-to scroll and reorder controls.",
    href: "/ui-primitives/content-studio/outline-rail",
    accent: "teal",
    glyph: "≡",
    state: "Stateful · jump",
  },
  {
    kicker: "Primitive 03",
    title: "Frontmatter panel",
    body: "Title, slug, excerpt, cover, author, category, and tag editor for every article.",
    href: "/ui-primitives/content-studio/frontmatter-panel",
    accent: "amber",
    glyph: "#",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 04",
    title: "SEO inspector",
    body: "Readability, keyword density, meta length, and Google snippet preview.",
    href: "/ui-primitives/content-studio/seo-inspector",
    accent: "green",
    glyph: "◇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Media binder",
    body: "Inline asset chooser — image, video, audio, embed — wired into the DAM.",
    href: "/ui-primitives/content-studio/media-binder",
    accent: "teal",
    glyph: "▢",
    state: "Stateful · pick",
  },
  {
    kicker: "Primitive 06",
    title: "Taxonomy tree",
    body: "Category and tag tree with article counts and drag-to-recategorise indicator.",
    href: "/ui-primitives/content-studio/taxonomy-tree",
    accent: "violet",
    glyph: "▾",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 07",
    title: "Publish scheduler",
    body: "Calendar picker with timezone and republish cadence selector.",
    href: "/ui-primitives/content-studio/publish-scheduler",
    accent: "amber",
    glyph: "◷",
    state: "Stateful · schedule",
  },
  {
    kicker: "Primitive 08",
    title: "Co-author strip",
    body: "Multi-author chip strip with role chips and per-author byline visibility toggle.",
    href: "/ui-primitives/content-studio/co-author-strip",
    accent: "teal",
    glyph: "○○○",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 09",
    title: "Revision diff viewer",
    body: "Side-by-side revision comparison with added, removed, and editor-note lines.",
    href: "/ui-primitives/content-studio/revision-diff-viewer",
    accent: "red",
    glyph: "↔",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Content block card",
    body: "Reusable snippet card — callout, quote, stat block, lead-magnet, diagram.",
    href: "/ui-primitives/content-studio/content-block-card",
    accent: "amber",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Comment thread card",
    body: "Editorial comment thread on a block — open, resolved, in-review states.",
    href: "/ui-primitives/content-studio/comment-thread-card",
    accent: "amber",
    glyph: "”",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Social repurpose card",
    body: "Generate X thread, IG reel, carousel, LinkedIn, TikTok, and newsletter from an article.",
    href: "/ui-primitives/content-studio/social-repurpose-card",
    accent: "violet",
    glyph: "↗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Readability score tile",
    body: "Flesch reading-ease dial with grade level, sentence length, and long-word ratio.",
    href: "/ui-primitives/content-studio/readability-score-tile",
    accent: "green",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Cover art studio",
    body: "Aspect-ratio cropper with focal-point pin and AI background suggestions.",
    href: "/ui-primitives/content-studio/cover-art-studio",
    accent: "red",
    glyph: "◻",
    state: "Stateful · crop",
  },
  {
    kicker: "Composition",
    title: "Full newsroom",
    body: "Editor + outline + frontmatter + media binder + SEO + comments + repurpose, composed.",
    href: "/ui-primitives/content-studio/full-newsroom",
    accent: "violet",
    glyph: "▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<StudioPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function ContentStudioIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Content studio / 14 primitives + composition"
        title="Content studio primitives"
        description="Reusable primitives for the Mufflermen editorial newsroom — long-form block editor, outline rail, frontmatter, SEO inspector, taxonomy tree, media binder, scheduler, co-authors, revision diffs, snippet cards, comment threads, repurpose cards, readability tile, and cover-art studio. Visual references only — no real CMS wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — newsroom is not wired
      </span>

      <section className={styles.grid} aria-label="Content studio primitives">
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
