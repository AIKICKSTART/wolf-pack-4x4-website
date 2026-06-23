import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./asset-library.module.css"

export const metadata: Metadata = {
  title: "Asset Library | UI Primitives",
  description:
    "Reusable digital-asset-management primitives — asset cards, folder trees, tag managers, colour extractors, version timelines, approval flows, watermarks, renditions, and generated-media registry entries.",
}

interface AssetPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AssetPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "Asset card",
    body: "Image / video / audio / doc / 3D card with kind badge, dimension chip, license chip.",
    href: "/ui-primitives/asset-library/asset-card",
    accent: "teal",
    glyph: "▢",
    state: "Selectable",
  },
  {
    kicker: "Primitive 02",
    title: "DAM folder tree",
    body: "Media folder tree with per-folder asset counts and drag-target indicators.",
    href: "/ui-primitives/asset-library/dam-folder-tree",
    accent: "amber",
    glyph: "▾▸",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 03",
    title: "Tag manager",
    body: "Existing tag list, add input, colour picker, merge-duplicate suggestions.",
    href: "/ui-primitives/asset-library/tag-manager",
    accent: "red",
    glyph: "#",
    state: "Stateful · add",
  },
  {
    kicker: "Primitive 04",
    title: "Colour extract picker",
    body: "5-swatch palette extracted from an asset — hex, role chip, one-click copy.",
    href: "/ui-primitives/asset-library/color-extract-picker",
    accent: "green",
    glyph: "◐",
    state: "Stateful · copy",
  },
  {
    kicker: "Primitive 05",
    title: "License chip",
    body: "CC0 / CC-BY / Proprietary / Royalty-free / Editorial chip with tooltip.",
    href: "/ui-primitives/asset-library/license-chip",
    accent: "amber",
    glyph: "©",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Version timeline",
    body: "Vertical history with thumbnail, uploader, timestamp, comment, restore.",
    href: "/ui-primitives/asset-library/asset-version-timeline",
    accent: "green",
    glyph: "○─○─●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Bulk-select toolbar",
    body: "Floating toolbar with selection count and tag / move / download actions.",
    href: "/ui-primitives/asset-library/bulk-select-toolbar",
    accent: "red",
    glyph: "▭",
    state: "Stateful · count",
  },
  {
    kicker: "Primitive 08",
    title: "Asset-type filter",
    body: "Image / Video / Audio / Doc / 3D / Animation / Vector filter row with counts.",
    href: "/ui-primitives/asset-library/asset-type-filter",
    accent: "teal",
    glyph: "≡",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 09",
    title: "Smart collection row",
    body: "Rule criteria chips with auto-updating count and edit CTA.",
    href: "/ui-primitives/asset-library/smart-collection-row",
    accent: "amber",
    glyph: "✦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "DAM preview pane",
    body: "Large preview with EXIF, linked collections, download / share / archive.",
    href: "/ui-primitives/asset-library/dam-preview-pane",
    accent: "teal",
    glyph: "□",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Usage tracker",
    body: "Where-used list of pages, emails, and workflows referencing the asset.",
    href: "/ui-primitives/asset-library/usage-tracker",
    accent: "teal",
    glyph: "↗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Approval workflow",
    body: "Draft → Review → Approved → Published stepper with reviewer avatars and thread.",
    href: "/ui-primitives/asset-library/approval-workflow-card",
    accent: "amber",
    glyph: "→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Watermark settings",
    body: "Text, opacity, scale, 9-cell position grid with live preview.",
    href: "/ui-primitives/asset-library/watermark-settings",
    accent: "red",
    glyph: "❖",
    state: "Stateful · edit",
  },
  {
    kicker: "Primitive 14",
    title: "Renditions list",
    body: "Original / Web / Thumbnail / Square / 4K renditions with download CTAs.",
    href: "/ui-primitives/asset-library/renditions-list",
    accent: "green",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full DAM",
    body: "Folder tree + asset grid + preview + bulk toolbar + type filter, composed.",
    href: "/ui-primitives/asset-library/full-dam",
    accent: "red",
    glyph: "▦◇",
    state: "Composition",
  },
  {
    kicker: "Media registry",
    title: "Replicate generated media",
    body: "Generated asset entries with prompt, model, cost, suitability, alt text, optimization, and reuse notes.",
    href: "/ui-primitives/asset-library/replicate-generated",
    accent: "green",
    glyph: "AI",
    state: "Generated assets",
  },
]

const ACCENT_CLASS: Record<AssetPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function AssetLibraryIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Asset library / 14 primitives + composition + media registry"
        title="Asset library & DAM primitives"
        description="Reusable primitives for digital asset management — asset cards, folder trees, tag managers, colour extractors, version timelines, approval flows, watermark editors, renditions, and generated-media registry entries. Visual references — no real storage wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — DAM operations are not wired
      </span>

      <section className={styles.grid} aria-label="Asset library primitives">
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
