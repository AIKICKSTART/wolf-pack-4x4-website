import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./audio.module.css"

export const metadata: Metadata = {
  title: "Audio Primitives | UI Primitives",
  description:
    "Reusable audio primitives — full player, mini player, voice memo recorder, waveform, volume, speaker selector, now-playing, queue, chapter markers, podcast, loading, equalizer.",
}

interface AudioPrimitiveScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AudioPrimitiveScene> = [
  {
    kicker: "Primitive 01",
    title: "Audio player",
    body: "Full player — play/pause, skip, scrubber over waveform, time, volume, speaker selector.",
    href: "/ui-primitives/audio/player",
    accent: "red",
    glyph: "▶",
    state: "Stateful · playback",
  },
  {
    kicker: "Primitive 02",
    title: "Mini audio player",
    body: "Compact inline player with 60px waveform and total duration chip.",
    href: "/ui-primitives/audio/mini-player",
    accent: "teal",
    glyph: "▷",
    state: "Stateful · playback",
  },
  {
    kicker: "Primitive 03",
    title: "Voice memo recorder",
    body: "Round red record button, live spike visualization, elapsed counter, save/discard.",
    href: "/ui-primitives/audio/voice-memo",
    accent: "red",
    glyph: "◉",
    state: "Stateful · mock record",
  },
  {
    kicker: "Primitive 04",
    title: "Audio waveform",
    body: "Pure SVG waveform from sample array — compact and detailed variants, progress fill.",
    href: "/ui-primitives/audio/waveform",
    accent: "teal",
    glyph: "▍▎",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Volume slider",
    body: "Horizontal or vertical slider in 0–1 with optional mute toggle.",
    href: "/ui-primitives/audio/volume-slider",
    accent: "amber",
    glyph: "▁▃▅",
    state: "Stateful · value",
  },
  {
    kicker: "Primitive 06",
    title: "Speaker selector",
    body: "Popover dropdown of available output devices with type icons and subtitles.",
    href: "/ui-primitives/audio/speaker-selector",
    accent: "teal",
    glyph: "◖",
    state: "Stateful · open",
  },
  {
    kicker: "Primitive 07",
    title: "Audio device chip",
    body: "Compact chip showing current device with optional switch action.",
    href: "/ui-primitives/audio/device-chip",
    accent: "green",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "Now playing card",
    body: "Hero card — cover gradient, title, artist, progress, transport controls.",
    href: "/ui-primitives/audio/now-playing",
    accent: "red",
    glyph: "♪",
    state: "Stateful · playback",
  },
  {
    kicker: "Primitive 09",
    title: "Audio queue list",
    body: "Up-next list with track number, title, artist, duration, drag handle, remove.",
    href: "/ui-primitives/audio/queue",
    accent: "amber",
    glyph: "≡♪",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Podcast episode card",
    body: "Thumbnail + show name + duration chip + published time + chapter accordion.",
    href: "/ui-primitives/audio/podcast-episode",
    accent: "teal",
    glyph: "▣",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 11",
    title: "Chapter markers",
    body: "Horizontal chapter timeline strip with hover bubble revealing the chapter title.",
    href: "/ui-primitives/audio/chapter-markers",
    accent: "amber",
    glyph: "─●─",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Audio loading state",
    body: "Buffering state — animated equalizer bars + status copy.",
    href: "/ui-primitives/audio/loading",
    accent: "teal",
    glyph: "▮▮▮",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Exhaust sound preview",
    body: "Mufflermen exhaust clip button — small waveform animation + loudness + pipe chips.",
    href: "/ui-primitives/audio/exhaust-sound",
    accent: "red",
    glyph: "✦",
    state: "Stateful · playback",
  },
  {
    kicker: "Primitive 14",
    title: "Equalizer bars",
    body: "Decorative 4–16 bar live equalizer animated via CSS keyframes, reduced-motion safe.",
    href: "/ui-primitives/audio/equalizer",
    accent: "green",
    glyph: "▁▄▆",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full audio scene",
    body: "Now-playing card + full player + queue + chapter markers + equalizer decoration.",
    href: "/ui-primitives/audio/full-scene",
    accent: "red",
    glyph: "♫▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<AudioPrimitiveScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
}

export default function AudioIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Audio / 14 primitives + composition"
        title="Audio primitives"
        description="Reusable primitives for assembling audio players, podcast modules, voice memos, and Mufflermen exhaust previews. Visual references — primitives tolerate missing media sources gracefully."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Audio" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — audio files may not be wired
      </span>

      <section className={styles.grid} aria-label="Audio primitives">
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
