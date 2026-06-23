import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./photo-editor.module.css"

export const metadata: Metadata = {
  title: "Photo editor | UI Primitives",
  description:
    "Photoshop-lite primitives for workshop photo intake — image canvas, tool palette, layers panel, crop overlay, brush settings, levels + curves, filter presets, text tool, marquee selection, history panel, export options, before/after slider, swatch library and mask thumbnails. Composed against the Mufflermen Hilux dyno run, Manta exhaust closeup and Bay 2 hero shots.",
}

interface EditorScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<EditorScene> = [
  {
    kicker: "Primitive 01",
    title: "Image canvas",
    body: "Centre image canvas with header chip row, zoom indicator and pan track footer.",
    href: "/ui-primitives/photo-editor/image-canvas",
    accent: "teal",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Tool palette",
    body: "Left tool palette — Select / Crop / Brush / Eraser / Text / Shape / Heal / Clone with shortcut chips.",
    href: "/ui-primitives/photo-editor/tool-palette",
    accent: "teal",
    glyph: "✎▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Layers panel",
    body: "Right layers panel with visibility + lock + opacity per layer, blend bar and footer actions.",
    href: "/ui-primitives/photo-editor/layers-panel",
    accent: "teal",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Crop overlay",
    body: "Ratio picker — Freeform / 1:1 / 4:5 / 16:9 / 9:16 with draggable corner + side handles and rule-of-thirds grid.",
    href: "/ui-primitives/photo-editor/crop-overlay",
    accent: "amber",
    glyph: "⌖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Brush settings",
    body: "Brush size + hardness + flow sliders with colour bar and quick swatch row.",
    href: "/ui-primitives/photo-editor/brush-settings",
    accent: "amber",
    glyph: "●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Levels & curves",
    body: "Histogram + curve editor with black / mid / white anchor points and gamma sliders.",
    href: "/ui-primitives/photo-editor/levels-curves",
    accent: "amber",
    glyph: "∿",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Filter presets",
    body: "Preset thumbs — Workshop / Vintage / B&W / High contrast / Sepia with strength slider.",
    href: "/ui-primitives/photo-editor/filter-presets",
    accent: "teal",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Text tool",
    body: "Text overlay with font + size + weight + fill picker and live caret on the surface.",
    href: "/ui-primitives/photo-editor/text-tool",
    accent: "green",
    glyph: "T",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Selection marquee",
    body: "Draggable marquee with ant-march animation, corner handles and boolean mode row.",
    href: "/ui-primitives/photo-editor/selection-marquee",
    accent: "teal",
    glyph: "▭",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "History panel",
    body: "Edit history list with thumbnail per step, current marker and jump-back actions.",
    href: "/ui-primitives/photo-editor/history-panel",
    accent: "neutral",
    glyph: "↺",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Export options",
    body: "Export card — format (JPG / PNG / WebP) + quality slider + size presets + estimated file size.",
    href: "/ui-primitives/photo-editor/export-options",
    accent: "amber",
    glyph: "↥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Before / after",
    body: "Split comparison with draggable centre divider and split-position chip.",
    href: "/ui-primitives/photo-editor/before-after",
    accent: "teal",
    glyph: "◧",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Swatch library",
    body: "Saved swatches grid with extracted document palette stripe and ASE export action.",
    href: "/ui-primitives/photo-editor/color-swatches",
    accent: "green",
    glyph: "▣▣▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Mask thumbnails",
    body: "Layer mask thumbnails row with density chip and inverted tag per layer.",
    href: "/ui-primitives/photo-editor/mask-thumbnails",
    accent: "neutral",
    glyph: "◐◑",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full photo editor",
    body: "Hilux dyno run / Manta exhaust closeup / Bay 2 hero composed into a working editor shell.",
    href: "/ui-primitives/photo-editor/full-editor",
    accent: "red",
    glyph: "▣✎T",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<EditorScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function PhotoEditorIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Photo editor / 14 primitives + composition"
        title="Photoshop-lite primitives for workshop photo intake"
        description="Photoshop-style primitives — image canvas, tool palette, layers panel, crop overlay, brush settings, levels + curves, filter presets, text tool, marquee selection, history panel, export options, before/after slider, swatch library and mask thumbnails. Composed against the Mufflermen Hilux dyno run, Manta exhaust closeup and Bay 2 hero."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Photo editor" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real bitmap or filter pipeline wired
      </span>

      <section className={styles.grid} aria-label="Photo editor primitives">
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
