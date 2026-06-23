import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./file-browser.module.css"

export const metadata: Metadata = {
  title: "File Browser | UI Primitives",
  description:
    "Reusable file-browser and media-library primitives — tree, grid, list, preview pane, upload zone, context menu, bulk bar, media lightbox, version history.",
}

interface FilePrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<FilePrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "File tree",
    body: "Recursive folder tree with chevron rotation, indent guides, drag handles.",
    href: "/ui-primitives/file-browser/tree",
    accent: "amber",
    glyph: "▾▸",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 02",
    title: "File card",
    body: "Grid-view card with preview thumbnail, name, meta line, kebab trigger.",
    href: "/ui-primitives/file-browser/card",
    accent: "teal",
    glyph: "▢",
    state: "Selectable",
  },
  {
    kicker: "Primitive 03",
    title: "File row",
    body: "List row with icon, name, size, modified, owner, and actions chevron.",
    href: "/ui-primitives/file-browser/row",
    accent: "teal",
    glyph: "≡",
    state: "Selectable",
  },
  {
    kicker: "Primitive 04",
    title: "File grid view",
    body: "Auto-fill grid wrapper with multi-select via shift / cmd indicators.",
    href: "/ui-primitives/file-browser/grid-view",
    accent: "teal",
    glyph: "▦",
    state: "Stateful · selection",
  },
  {
    kicker: "Primitive 05",
    title: "File list view",
    body: "Table list with sortable headers using aria-sort.",
    href: "/ui-primitives/file-browser/list-view",
    accent: "teal",
    glyph: "↕",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 06",
    title: "Folder breadcrumb",
    body: "Path crumbs that collapse mid-path into a popover when narrow.",
    href: "/ui-primitives/file-browser/breadcrumb",
    accent: "amber",
    glyph: "/ … /",
    state: "Stateful · overflow",
  },
  {
    kicker: "Primitive 07",
    title: "Preview pane",
    body: "Right-side preview with type chip, size, dimensions, properties accordion.",
    href: "/ui-primitives/file-browser/preview-pane",
    accent: "amber",
    glyph: "□",
    state: "Stateful · accordion",
  },
  {
    kicker: "Primitive 08",
    title: "Upload drop zone",
    body: "Drag-drop with per-file progress, speed, ETA, segmenter, cancel.",
    href: "/ui-primitives/file-browser/upload-drop-zone",
    accent: "teal",
    glyph: "↑",
    state: "Stateful · uploads",
  },
  {
    kicker: "Primitive 09",
    title: "Context menu",
    body: "Right-click menu with keyboard hints and destructive variant.",
    href: "/ui-primitives/file-browser/context-menu",
    accent: "amber",
    glyph: "⋯",
    state: "Stateful · open",
  },
  {
    kicker: "Primitive 10",
    title: "Bulk action bar",
    body: "Floating bottom bar with count chip, actions, clear — animated entrance.",
    href: "/ui-primitives/file-browser/bulk-action-bar",
    accent: "red",
    glyph: "▭",
    state: "Stateful · count",
  },
  {
    kicker: "Primitive 11",
    title: "Media lightbox",
    body: "Design-asset focused lightbox with arrow nav, zoom, thumbnails, info pane.",
    href: "/ui-primitives/file-browser/media-lightbox",
    accent: "teal",
    glyph: "◇",
    state: "Stateful · overlay",
  },
  {
    kicker: "Primitive 12",
    title: "File type icon",
    body: "Twelve hand-drawn SVG icons covering image, video, audio, code, CAD, 3D.",
    href: "/ui-primitives/file-browser/file-type-icon",
    accent: "amber",
    glyph: "✦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Inline rename",
    body: "Click to edit filename with validation, Esc cancel, Enter commit.",
    href: "/ui-primitives/file-browser/inline-rename",
    accent: "teal",
    glyph: "✎",
    state: "Stateful · validate",
  },
  {
    kicker: "Primitive 14",
    title: "Version history",
    body: "Vertical timeline of versions with author, delta, summary, restore.",
    href: "/ui-primitives/file-browser/version-history",
    accent: "green",
    glyph: "○─○─●",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full explorer",
    body: "Tree + grid/list toggle + preview + breadcrumb + bulk bar + upload zone.",
    href: "/ui-primitives/file-browser/full-explorer",
    accent: "red",
    glyph: "▦◇",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<FilePrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function FileBrowserIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="File browser & media library primitives"
        description="Reusable primitives for assembling file managers — folder trees, grid and list views, preview panes, upload zones, context menus, lightboxes, and version timelines. Visual references — no real storage wired."
        dnaSectionId="file-browser"
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real file system wired
      </span>

      <FormPatternReferences ids={["file-upload"]} />

      <section className={styles.grid} aria-label="File browser primitives">
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
