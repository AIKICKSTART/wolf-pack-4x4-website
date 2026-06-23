import type { ReactNode } from "react"

import styles from "./timeline-track.module.css"
import type { TrackKind } from "./video-editor-types"

interface TimelineTrackProps {
  /** Track kind drives the left-rail icon + accent. */
  kind: TrackKind
  /** Display label e.g. "V1 Cam A" / "A2 Wireless lav". */
  label: string
  /** Secondary line beneath the label e.g. "BMPCC 6K · 24fps". */
  meta?: string
  /** Horizontal track lane contents — clips, audio waveforms, subtitle cues. */
  children: ReactNode
  /** Mute toggle state. */
  muted?: boolean
  /** Solo toggle state. */
  solo?: boolean
  /** Lock toggle state — disables interaction styling. */
  locked?: boolean
  /** Track row height — px. Defaults to 72. */
  height?: number
  /** Visual variant — `dense` for shorter rows, `tall` for video tracks. */
  density?: "dense" | "regular" | "tall"
}

const KIND_GLYPH: Record<TrackKind, string> = {
  video: "V",
  audio: "A",
  subtitles: "S",
  effect: "FX",
}

const KIND_LABEL: Record<TrackKind, string> = {
  video: "Video",
  audio: "Audio",
  subtitles: "Subtitles",
  effect: "Effect",
}

const DENSITY_CLASS: Record<NonNullable<TimelineTrackProps["density"]>, string> = {
  dense: styles.densityDense,
  regular: styles.densityRegular,
  tall: styles.densityTall,
}

export function TimelineTrack({
  kind,
  label,
  meta,
  children,
  muted = false,
  solo = false,
  locked = false,
  height = 72,
  density = "regular",
}: TimelineTrackProps) {
  const classes = [styles.track, styles[`kind-${kind}`], DENSITY_CLASS[density]]
  if (locked) classes.push(styles.locked)
  if (muted) classes.push(styles.muted)
  if (solo) classes.push(styles.soloed)

  return (
    <section
      className={classes.filter(Boolean).join(" ")}
      style={{ "--track-height": `${height}px` } as React.CSSProperties}
      role="region"
      aria-label={`${KIND_LABEL[kind]} track — ${label}`}
    >
      <header className={styles.header}>
        <div className={styles.kindGlyph} aria-hidden="true">
          {KIND_GLYPH[kind]}
        </div>
        <div className={styles.headerText}>
          <strong className={styles.headerLabel}>{label}</strong>
          {meta ? <span className={styles.headerMeta}>{meta}</span> : null}
        </div>
        <div className={styles.chipRow} role="group" aria-label="Track state">
          <span
            className={[styles.chip, locked ? styles.chipOn : ""].join(" ")}
            aria-pressed={locked}
            role="button"
            tabIndex={0}
          >
            Lock
          </span>
          <span
            className={[styles.chip, muted ? styles.chipOn : ""].join(" ")}
            aria-pressed={muted}
            role="button"
            tabIndex={0}
          >
            Mute
          </span>
          <span
            className={[styles.chip, solo ? styles.chipOn : ""].join(" ")}
            aria-pressed={solo}
            role="button"
            tabIndex={0}
          >
            Solo
          </span>
        </div>
      </header>
      <div className={styles.lane}>{children}</div>
      <span className={styles.resizeHandle} aria-hidden="true" />
    </section>
  )
}
