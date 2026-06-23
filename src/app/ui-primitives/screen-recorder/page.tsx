import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./screen-recorder.module.css"

export const metadata: Metadata = {
  title: "Screen recorder | UI Primitives",
  description:
    "Loom / Snagit-style screen-recorder primitives — start button, mode picker, controls, timer pill, webcam bubble, region selector, audio meter, post-record preview, transcript status, share modal, watermark badge, trim handles, annotation overlay and source device selector for the Mufflermen workshop tours.",
}

interface RecorderScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<RecorderScene> = [
  {
    kicker: "Primitive 01",
    title: "Start record button",
    body: "Big circular Start button — rest, arming and recording states plus 3-2-1 countdown overlay.",
    href: "/ui-primitives/screen-recorder/start-record-button",
    accent: "red",
    glyph: "●",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Record mode picker",
    body: "Mode picker — Screen + Camera / Screen only / Camera only / Audio only — each with a mini preview.",
    href: "/ui-primitives/screen-recorder/record-mode-picker",
    accent: "amber",
    glyph: "▦",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Recording controls",
    body: "Floating control bar — pause / resume / stop / cancel, elapsed timer and remaining-storage chip.",
    href: "/ui-primitives/screen-recorder/recording-controls",
    accent: "red",
    glyph: "▮▮",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Recording timer pill",
    body: "Floating pill — red dot pulse, elapsed HH:MM:SS and bandwidth chip.",
    href: "/ui-primitives/screen-recorder/recording-timer-pill",
    accent: "red",
    glyph: "00",
    state: "aria-live",
  },
  {
    kicker: "Primitive 05",
    title: "Webcam bubble",
    body: "Round PIP bubble — corner-position picker, size slider and mirror toggle.",
    href: "/ui-primitives/screen-recorder/webcam-bubble",
    accent: "teal",
    glyph: "◯",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Region selector",
    body: "Dashed-outline region with eight handles, resolution chip and fps chip.",
    href: "/ui-primitives/screen-recorder/recording-region-selector",
    accent: "amber",
    glyph: "▢",
    state: "role=region",
  },
  {
    kicker: "Primitive 07",
    title: "Audio level meter",
    body: "Vertical stereo meter — peak indicator, clipping warning and quick-mute toggle.",
    href: "/ui-primitives/screen-recorder/audio-level-meter",
    accent: "green",
    glyph: "▮",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "After-record preview",
    body: "Post-stop preview — video player, duration + size meta and Retake / Trim / Save & Share.",
    href: "/ui-primitives/screen-recorder/after-record-preview",
    accent: "green",
    glyph: "▶",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Transcript status",
    body: "Queued / processing / ready / failed — language chip and word-count chip when ready.",
    href: "/ui-primitives/screen-recorder/transcript-generation-status",
    accent: "teal",
    glyph: "✎",
    state: "aria-live",
  },
  {
    kicker: "Primitive 10",
    title: "Share modal",
    body: "Share URL chip, privacy radios, recipient field, embed code block and expiry-date picker.",
    href: "/ui-primitives/screen-recorder/share-recording-modal",
    accent: "amber",
    glyph: "↗",
    state: "role=dialog",
  },
  {
    kicker: "Primitive 11",
    title: "Watermark badge",
    body: "Customer-logo watermark with position picker and opacity slider preview.",
    href: "/ui-primitives/screen-recorder/recording-watermark-badge",
    accent: "neutral",
    glyph: "©",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Recorded clip trim",
    body: "Post-record trim handles — left/right grips, duration delta chip and a scrubber playhead.",
    href: "/ui-primitives/screen-recorder/recorded-clip-trim-handles",
    accent: "amber",
    glyph: "⟺",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Annotation overlay",
    body: "During-record annotation — pen / arrow / box / text, colour swatches and clear-frame chip.",
    href: "/ui-primitives/screen-recorder/live-annotation-overlay",
    accent: "red",
    glyph: "✎→",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Device source selector",
    body: "Mic / Speaker / Camera dropdowns with detected device lists plus test-mic and test-camera CTAs.",
    href: "/ui-primitives/screen-recorder/device-source-selector",
    accent: "teal",
    glyph: "🎙",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full recorder flow",
    body: "Pre-record stage, recording stage and post-record stage composed — Workshop tour Bay 2 install.",
    href: "/ui-primitives/screen-recorder/full-flow",
    accent: "red",
    glyph: "●▶↗",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<RecorderScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function ScreenRecorderIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Screen recorder / 14 primitives + composition"
        title="Loom-style screen recorder primitives"
        description="Capture-flow primitives — start, mode picker, controls, timer pill, webcam bubble, region selector, audio meter, after-record preview, transcript status, share modal, watermark badge, trim handles, live annotation and device source selector. Cut against the Mufflermen Workshop tour Bay 2 install walkthrough."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Screen recorder" },
        ]}
      />

      <span className={styles.notice}>
        Capture pipeline mocked — no MediaRecorder or upload wired
      </span>

      <section className={styles.grid} aria-label="Screen recorder primitives">
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
