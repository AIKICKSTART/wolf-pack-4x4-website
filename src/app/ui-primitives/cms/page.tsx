import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./cms.module.css"

export const metadata: Metadata = {
  title: "CMS page-builder | UI Primitives",
  description:
    "Page-builder, content collections, schema designer, locale switcher and publish flow primitives for the Oak Flats Mufflermen workshop CMS. 14 primitives plus the composed studio.",
}

interface Scene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    kicker: "Primitive 01",
    title: "Block library panel",
    body: "Categorised palette across hero, feature, text, media, CTA, form, embed with searchable filter and brand-locked dots.",
    href: "/ui-primitives/cms/block-library-panel",
    accent: "red",
    glyph: "▣▣▣",
    state: "Stateful · search",
  },
  {
    kicker: "Primitive 02",
    title: "Page canvas",
    body: "Drag-and-drop canvas with rulers, grid overlay, zoom 50–150% and a sticky drop zone.",
    href: "/ui-primitives/cms/page-canvas",
    accent: "amber",
    glyph: "▥",
    state: "Stateful · zoom",
  },
  {
    kicker: "Primitive 03",
    title: "Block card",
    body: "Single block preview tile reused inside the palette + canvas inserter with selected, grabbed and loading states.",
    href: "/ui-primitives/cms/block-card",
    accent: "teal",
    glyph: "▤",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 04",
    title: "Slot inspector",
    body: "Right-rail props editor — text, textarea, number, colour, image, select and toggle slots for the focused block.",
    href: "/ui-primitives/cms/slot-inspector",
    accent: "violet",
    glyph: "⚙",
    state: "Stateful · forms",
  },
  {
    kicker: "Primitive 05",
    title: "Page tree",
    body: "Hierarchical workshop site outline with state chips, owner initials, expand/collapse and page-level create.",
    href: "/ui-primitives/cms/page-tree",
    accent: "teal",
    glyph: "▾▸",
    state: "Stateful · tree",
  },
  {
    kicker: "Primitive 06",
    title: "Template gallery",
    body: "Page-template thumbnails across landing, parts, suburb, service and blog categories.",
    href: "/ui-primitives/cms/template-gallery",
    accent: "amber",
    glyph: "▦",
    state: "Stateful · filter",
  },
  {
    kicker: "Primitive 07",
    title: "Responsive toolbar",
    body: "Desktop/tablet/mobile preview switcher with a viewport ruler and animated viewport frame.",
    href: "/ui-primitives/cms/responsive-toolbar",
    accent: "green",
    glyph: "▤ ▭ ▯",
    state: "Stateful · viewport",
  },
  {
    kicker: "Primitive 08",
    title: "Publish flow",
    body: "Draft → review → scheduled → published state-machine card with action buttons and reviewer meta.",
    href: "/ui-primitives/cms/publish-flow",
    accent: "green",
    glyph: "▶",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Revision timeline",
    body: "Vertical version history with author avatars, action tags, live-version pin and per-entry diff buttons.",
    href: "/ui-primitives/cms/revision-timeline",
    accent: "violet",
    glyph: "○─●─○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "SEO checklist",
    body: "Title, meta, OG, schema and accessibility checklist with pass/warn/fail dots and a radial completion gauge.",
    href: "/ui-primitives/cms/seo-checklist",
    accent: "amber",
    glyph: "✓✕!",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Collection row",
    body: "CMS collection entry — parts, suburbs, services, blog, vehicles — with item count, draft count and last edit.",
    href: "/ui-primitives/cms/collection-row",
    accent: "red",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Field builder",
    body: "Schema field builder — text, rich-text, number, boolean, date, image, reference, JSON, geo and money types.",
    href: "/ui-primitives/cms/field-builder",
    accent: "violet",
    glyph: "Aa#",
    state: "Stateful · CRUD",
  },
  {
    kicker: "Primitive 13",
    title: "Media picker",
    body: "DAM-backed gallery picker with format chip, search filter and focal-point selector.",
    href: "/ui-primitives/cms/media-picker",
    accent: "teal",
    glyph: "▣ ⌖",
    state: "Stateful · focal",
  },
  {
    kicker: "Primitive 14",
    title: "Locale switcher",
    body: "Locale tab strip with translation completeness bars, pending counts and last reviewed.",
    href: "/ui-primitives/cms/i18n-language-switcher",
    accent: "neutral",
    glyph: "EN/中",
    state: "Stateful · tabs",
  },
  {
    kicker: "Composition",
    title: "Full studio",
    body: "Composed live workshop CMS dashboard — page tree, canvas, inspector, publish flow, SEO checklist and revisions.",
    href: "/ui-primitives/cms/full-studio",
    accent: "red",
    glyph: "▣▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function CmsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="CMS / 14 primitives + composition"
        title="CMS page-builder primitives"
        description="Page-builder, content collections, schema designer, locale switcher and publish flow for the Oak Flats Mufflermen workshop. The 14 block-editor primitives are wired into Payload marketing pages and content overrides for production rendering."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS" },
        ]}
      />

      <span className={styles.notice}>
        Payload block layout source is wired; this board remains the operator preview surface.
      </span>

      <section className={styles.grid} aria-label="CMS primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
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
