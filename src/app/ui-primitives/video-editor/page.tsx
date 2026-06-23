import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./video-editor.module.css"

export const metadata: Metadata = {
  title: "Video editor | UI Primitives",
  description:
    "Video editor timeline primitives — tracks, ruler, playhead, clip thumbnails, trim handles, razor split, effects, transitions, speed ramps, color grading wheels, audio waveform tracks, cue markers, subtitle rows and a full editor composition cut for the Workshop tour - Bay 2 exhaust install.",
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
    title: "Timeline track",
    body: "Single horizontal track row — kind icon, label, lock/mute/solo chips, lane area and resize handle.",
    href: "/ui-primitives/video-editor/timeline-track",
    accent: "teal",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Clip thumbnail strip",
    body: "Video clip with frame thumbnails strung along its width, name overlay and duration chip.",
    href: "/ui-primitives/video-editor/clip-thumbnail-strip",
    accent: "teal",
    glyph: "▥",
    state: "Optional click",
  },
  {
    kicker: "Primitive 03",
    title: "Playhead cursor",
    body: "Vertical playhead line spanning all tracks with current-time chip and frame indicator.",
    href: "/ui-primitives/video-editor/playhead-cursor",
    accent: "red",
    glyph: "▌",
    state: "Stateless · aria-slider",
  },
  {
    kicker: "Primitive 04",
    title: "Timeline ruler",
    body: "Tick marks for seconds + minutes + frames, label every 10s, with a zoom level chip.",
    href: "/ui-primitives/video-editor/timeline-ruler",
    accent: "teal",
    glyph: "⌖",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Track row header",
    body: "Compact track header with kind icon, name, mute / solo / lock / arm buttons.",
    href: "/ui-primitives/video-editor/track-row-header",
    accent: "neutral",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Clip trim handles",
    body: "Left + right grips overlaid on the selected clip with hover ripple and duration delta chip.",
    href: "/ui-primitives/video-editor/clip-trim-handles",
    accent: "amber",
    glyph: "⟺",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Razor split tool",
    body: "Razor cursor indicator over hover position with split-confirmation popover and frame-snap toggle.",
    href: "/ui-primitives/video-editor/razor-split-tool",
    accent: "amber",
    glyph: "✂",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Effect chip",
    body: "Applied-effect chip with on/off toggle and parameters popover containing sliders.",
    href: "/ui-primitives/video-editor/effect-chip",
    accent: "amber",
    glyph: "★",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Transition between clips",
    body: "Transition primitive — cut / cross-fade / dissolve / wipe with a duration chip.",
    href: "/ui-primitives/video-editor/transition-between-clips",
    accent: "teal",
    glyph: "⇌",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Speed ramp curve",
    body: "SVG curve editor for playback speed (0.25× → 4×) with anchor points and log midline.",
    href: "/ui-primitives/video-editor/speed-ramp-curve",
    accent: "amber",
    glyph: "∿",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Color grading wheels",
    body: "Three color wheels — Shadows / Midtones / Highlights — with hue, saturation and lift indicators.",
    href: "/ui-primitives/video-editor/color-grading-wheels",
    accent: "red",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Audio waveform track",
    body: "Track-row variant with long-form waveform, selection range overlay and stereo level meter.",
    href: "/ui-primitives/video-editor/audio-waveform-track",
    accent: "amber",
    glyph: "≋",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Cue marker",
    body: "Numbered pin on the timeline with label chip, stem and optional note popover.",
    href: "/ui-primitives/video-editor/cue-marker",
    accent: "green",
    glyph: "▼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Subtitle row",
    body: "Subtitle track with numbered cue blocks rendered across the timeline width.",
    href: "/ui-primitives/video-editor/subtitle-row",
    accent: "green",
    glyph: "❝❞",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full video editor",
    body: "Workshop tour — Bay 2 exhaust install: 2 video + 2 audio + 1 subtitle track, color wheels and speed ramp.",
    href: "/ui-primitives/video-editor/full-editor",
    accent: "red",
    glyph: "▤▥▌",
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

export default function VideoEditorIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Video editor / 14 primitives + composition"
        title="Premier-style video editor primitives"
        description="DaVinci / Premier-style timeline primitives — tracks, ruler, playhead, clip thumbnails, trim handles, razor, effects, transitions, speed ramps, grading wheels, waveform tracks, cue markers, subtitle rows. Cut against the Mufflermen Workshop tour — Bay 2 exhaust install."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real codec or render pipeline wired
      </span>

      <section className={styles.grid} aria-label="Video editor primitives">
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
