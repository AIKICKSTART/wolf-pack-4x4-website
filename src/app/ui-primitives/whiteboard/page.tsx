import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./whiteboard.module.css"

export const metadata: Metadata = {
  title: "Whiteboard | UI Primitives",
  description:
    "FigJam / Miro-style whiteboard primitives — canvas, drawing tool palette, sticky notes, shape picker, connectors, hand-drawn arrows, frames, swatch picker, presence cursors, selection box, pen strokes, text box, vote dots, mind-map nodes — plus a full collaborative board composition.",
}

interface Scene {
  index: string
  title: string
  href: string
  description: string
  accent: "teal" | "amber" | "red" | "green" | "purple" | "neutral"
  state: string
}

const SCENES: ReadonlyArray<Scene> = [
  {
    index: "01",
    title: "Whiteboard canvas",
    href: "/ui-primitives/whiteboard/whiteboard-canvas",
    description:
      "Infinite-pan canvas surface — dotted background pattern, zoom-level indicator (125%) and live position chip. Visual only, no actual pan/zoom drag logic.",
    accent: "teal",
    state: "Stateless · visual",
  },
  {
    index: "02",
    title: "Drawing tool palette",
    href: "/ui-primitives/whiteboard/drawing-tool-palette",
    description:
      "Vertical tool palette — pen / highlighter / eraser / shape / sticky / text / connector / hand. Keyboard hint chip on each, active tool highlighted brand red.",
    accent: "red",
    state: "Stateful · active tool",
  },
  {
    index: "03",
    title: "WB sticky note",
    href: "/ui-primitives/whiteboard/wb-sticky-note",
    description:
      "Whiteboard sticky note (distinct from comments/sticky-note) — rotated paper visual, 6 colour variants, author chip, +/- vote indicator, lo-fi tape strip.",
    accent: "amber",
    state: "Stateless · per-note",
  },
  {
    index: "04",
    title: "Shape tool card",
    href: "/ui-primitives/whiteboard/shape-tool-card",
    description:
      "Inline shape picker — rectangle / ellipse / triangle / hexagon / arrow / star with size, fill, and stroke swatch chips.",
    accent: "teal",
    state: "Stateful · per-property",
  },
  {
    index: "05",
    title: "Connector line tool",
    href: "/ui-primitives/whiteboard/connector-line-tool",
    description:
      "Visual connector — straight / orthogonal / curved with arrow / dot / diamond endpoint caps and an optional inline label-on-line slot.",
    accent: "teal",
    state: "Stateless · SVG primitive",
  },
  {
    index: "06",
    title: "Hand-drawn arrow",
    href: "/ui-primitives/whiteboard/hand-drawn-arrow",
    description:
      "Hand-drawn looking SVG arrow with three wobble variants — loose / scratchy / marker — and tone variants (ink, red, amber, teal, green).",
    accent: "red",
    state: "Stateless · per-style",
  },
  {
    index: "07",
    title: "Frame outline",
    href: "/ui-primitives/whiteboard/frame-outline",
    description:
      "Frame group — large dashed-outline area with title chip top-left, dimension badge top-right, and tone-driven id (F-04, F-05).",
    accent: "green",
    state: "Stateless · per-tone",
  },
  {
    index: "08",
    title: "WB colour swatch picker",
    href: "/ui-primitives/whiteboard/wb-color-swatch-picker",
    description:
      "Tool colour picker (distinct from branding palette extractor) — 12-swatch grid, recent-used row, and inline hex input with invalid state.",
    accent: "amber",
    state: "Stateful · selected hex",
  },
  {
    index: "09",
    title: "Cursor presence marker",
    href: "/ui-primitives/whiteboard/cursor-presence-marker",
    description:
      "Live cursor presence — pointing arrow + collaborator label chip + tone per user. Idle state fades opacity in a slow pulse.",
    accent: "purple",
    state: "Stateless · active / idle",
  },
  {
    index: "10",
    title: "WB selection box",
    href: "/ui-primitives/whiteboard/wb-selection-box",
    description:
      "Selection box around chosen objects — dashed teal border with 8 resize handles, top rotation handle, and a group-objects chip when count > 1.",
    accent: "teal",
    state: "Stateless · per-selection",
  },
  {
    index: "11",
    title: "Pen stroke layer",
    href: "/ui-primitives/whiteboard/pen-stroke-layer",
    description:
      "Pen stroke SVG primitive — bezier path generated from a points array with optional per-point pressure that drives stroke-width variation.",
    accent: "amber",
    state: "Stateless · per-stroke",
  },
  {
    index: "12",
    title: "Text box tool",
    href: "/ui-primitives/whiteboard/text-box-tool",
    description:
      "Auto-grow text box with a floating mini-toolbar — font, size, bold, italic, and colour swatches — that appears on focus.",
    accent: "red",
    state: "Stateful · focus toolbar",
  },
  {
    index: "13",
    title: "Vote dot",
    href: "/ui-primitives/whiteboard/vote-dot",
    description:
      "Small numbered vote dot stamp collaborators stack on items during dot-voting. Three sizes, six tones, optional new-vote pulse halo.",
    accent: "red",
    state: "Stateless · sm / md / lg",
  },
  {
    index: "14",
    title: "Mind map node",
    href: "/ui-primitives/whiteboard/mind-map-node",
    description:
      "Mind map node card — text label, child-count chip, collapse toggle, and depth-driven tone (root / branch / accent / leaf).",
    accent: "amber",
    state: "Stateful · collapse",
  },
]

const ACCENT_CLASS: Record<Scene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  purple: styles.accentPurple,
  neutral: styles.accentNeutral,
}

export default function WhiteboardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 14 primitives + 1 composition"
        title="Boards that think out loud"
        description="FigJam / Miro-style collaborative whiteboard primitives — infinite canvas with dot grid, drawing tool palette, sticky notes, shape picker, connectors with end caps, hand-drawn arrows, frames, colour swatch picker, live presence cursors, multi-handle selection box, pressure-sensitive pen strokes, floating-toolbar text box, vote dots, and mind-map nodes. Tuned for Oak Flats Mufflermen brainstorm boards — Q3 marketing, workshop bay layout, customer pain points retro."
      />
      <section className={styles.section} aria-label="Whiteboard primitives index">
        <header>
          <span className={styles.kicker}>Index · 14 primitives + Full board</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Every primitive renders at full scale in its own sub-route with realistic Oak Flats
            content — stickies like &ldquo;Add ADR cheatsheet&rdquo;, &ldquo;Photo evidence flow
            needs SMS link&rdquo;, brainstorm frames for the Q3 marketing campaign, mind-mapped
            customer pain points. Composition lives under{" "}
            <code style={{ color: "var(--primitive-amber)" }}>/full-board</code>.
          </p>
        </header>
        <div className={styles.grid}>
          {SCENES.map((scene) => (
            <Link
              key={scene.href}
              className={`${styles.thumb} ${ACCENT_CLASS[scene.accent]}`}
              href={scene.href}
            >
              <div className={styles.thumbHead}>
                <span className={styles.thumbIndex}>{scene.index}</span>
                <span className={styles.thumbState}>{scene.state}</span>
              </div>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={`${styles.thumb} ${styles.accentTeal}`}
            href="/ui-primitives/whiteboard/full-board"
          >
            <div className={styles.thumbHead}>
              <span className={styles.thumbIndex}>15</span>
              <span className={styles.thumbState}>Composition · bonus</span>
            </div>
            <h3 className={styles.thumbTitle}>Full board composition</h3>
            <p className={styles.thumbCopy}>
              Every primitive assembled into a single working board — WhiteboardCanvas with
              DrawingToolPalette on the left, six WbStickyNotes scattered, two FrameOutlines
              grouping them, HandDrawnArrows between, a mind-map cluster, multiple
              CursorPresenceMarkers, VoteDots stacked on stickies, TextBoxTool open mid-canvas.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
