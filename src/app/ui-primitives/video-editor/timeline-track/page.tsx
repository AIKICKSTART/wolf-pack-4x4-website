import type { Metadata } from "next"

import {
  ClipThumbnailStrip,
  TimelineTrack,
} from "../../components/video-editor"
import { PageHeader } from "../../components/page-header"

import styles from "../video-editor.module.css"

export const metadata: Metadata = {
  title: "Timeline track | Video editor",
  description:
    "Primitive 01 — single timeline track row with header (icon + label + lock/mute/solo chips), a horizontal track area and a height-resize handle.",
}

export default function TimelineTrackScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Timeline track"
        title="Timeline track"
        description="A single timeline track row with a left-rail track header (icon, label, lock / mute / solo chips), a horizontal lane and a height-resize handle. Variants by kind: video / audio / subtitles / effect, plus density (dense / regular / tall)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Video editor", href: "/ui-primitives/video-editor" },
          { label: "Timeline track" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Video track — Cam A · BMPCC 6K · 24fps</span>
        <div className={styles.trackStack}>
          <TimelineTrack
            kind="video"
            label="V1 · Cam A"
            meta="BMPCC 6K · 24fps"
            density="tall"
          >
            <div style={{ position: "absolute", inset: "4px 6px" }}>
              <ClipThumbnailStrip
                name="B-roll Hilux arrive"
                durationSec={4.8}
                width="220px"
                thumbnails={[
                  { label: "Hilux 01" },
                  { label: "Hilux 02" },
                  { label: "Hilux 03" },
                  { label: "Hilux 04" },
                ]}
              />
            </div>
          </TimelineTrack>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Audio track — solo + muted variants</span>
        <div className={styles.trackStack}>
          <TimelineTrack
            kind="audio"
            label="A1 · Boom mic"
            meta="Sennheiser MKH 416 · 48 kHz"
            solo
          >
            <span style={{ position: "absolute", inset: "8px 12px", display: "block", borderRadius: "4px", background: "color-mix(in oklab, var(--primitive-amber) 18%, transparent)" }} />
          </TimelineTrack>
          <TimelineTrack
            kind="audio"
            label="A2 · Wireless lav"
            meta="Brodie · Bay 2"
            muted
            density="dense"
          >
            <span style={{ position: "absolute", inset: "6px 12px", display: "block", borderRadius: "4px", background: "color-mix(in oklab, var(--primitive-text-strong) 8%, transparent)" }} />
          </TimelineTrack>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Subtitles + locked effect track</span>
        <div className={styles.trackStack}>
          <TimelineTrack
            kind="subtitles"
            label="SUB · EN-AU"
            meta="Auto + manual review"
          >
            <span style={{ position: "absolute", inset: "10px 12px", display: "block", borderRadius: "4px", background: "color-mix(in oklab, var(--primitive-green) 16%, transparent)" }} />
          </TimelineTrack>
          <TimelineTrack
            kind="effect"
            label="FX · Cinematic LUT"
            meta="Workshop Steel · v1.2"
            locked
            density="dense"
          >
            <span style={{ position: "absolute", inset: "6px 12px", display: "block", borderRadius: "4px", background: "color-mix(in oklab, var(--primitive-red) 12%, transparent)" }} />
          </TimelineTrack>
        </div>
      </section>
    </main>
  )
}
