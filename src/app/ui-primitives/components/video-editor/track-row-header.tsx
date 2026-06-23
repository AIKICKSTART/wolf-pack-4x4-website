import styles from "./track-row-header.module.css"
import type { TrackKind } from "./video-editor-types"

interface TrackRowHeaderProps {
  /** Track kind drives icon + accent. */
  kind: TrackKind
  /** Track shortname e.g. "V1", "A2". */
  shortName: string
  /** Long descriptive name e.g. "Cam A · BMPCC 6K". */
  name: string
  /** Mute state. */
  muted?: boolean
  /** Solo state. */
  solo?: boolean
  /** Lock state. */
  locked?: boolean
  /** Record-arm state. Audio tracks only typically. */
  armed?: boolean
  /** Compact variant for narrow rails. */
  compact?: boolean
}

const KIND_LABEL: Record<TrackKind, string> = {
  video: "Video track",
  audio: "Audio track",
  subtitles: "Subtitles track",
  effect: "Effect track",
}

function KindIcon({ kind }: { kind: TrackKind }) {
  if (kind === "video") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
        <path d="M6 6.5 L11 8 L6 9.5 Z" />
      </svg>
    )
  }
  if (kind === "audio") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M3 8 L3 8 M5 5 L5 11 M7 3 L7 13 M9 5 L9 11 M11 6 L11 10 M13 8 L13 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    )
  }
  if (kind === "subtitles") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect x="2" y="3" width="12" height="10" rx="2" />
        <rect x="4" y="7" width="6" height="1.4" rx="0.5" fill="color-mix(in oklab, var(--primitive-canvas) 32%, transparent)" />
        <rect x="4" y="9.6" width="4" height="1.4" rx="0.5" fill="color-mix(in oklab, var(--primitive-canvas) 32%, transparent)" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M8 1.6 L9.7 5.6 L14 6 L10.8 8.6 L11.8 13 L8 10.8 L4.2 13 L5.2 8.6 L2 6 L6.3 5.6 Z" />
    </svg>
  )
}

export function TrackRowHeader({
  kind,
  shortName,
  name,
  muted = false,
  solo = false,
  locked = false,
  armed = false,
  compact = false,
}: TrackRowHeaderProps) {
  const classes = [styles.header, styles[`kind-${kind}`]]
  if (compact) classes.push(styles.compact)

  return (
    <div
      className={classes.join(" ")}
      role="group"
      aria-label={`${KIND_LABEL[kind]} ${shortName} ${name}`}
    >
      <div className={styles.glyph} aria-hidden="true">
        <KindIcon kind={kind} />
      </div>
      <div className={styles.text}>
        <strong className={styles.shortName}>{shortName}</strong>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.controls}>
        {kind === "audio" ? (
          <button
            type="button"
            className={[styles.btn, armed ? styles.btnArmed : ""].join(" ")}
            aria-pressed={armed}
            aria-label="Arm for recording"
          >
            R
          </button>
        ) : null}
        <button
          type="button"
          className={[styles.btn, muted ? styles.btnMuted : ""].join(" ")}
          aria-pressed={muted}
          aria-label="Mute track"
        >
          M
        </button>
        <button
          type="button"
          className={[styles.btn, solo ? styles.btnSolo : ""].join(" ")}
          aria-pressed={solo}
          aria-label="Solo track"
        >
          S
        </button>
        <button
          type="button"
          className={[styles.btn, locked ? styles.btnLocked : ""].join(" ")}
          aria-pressed={locked}
          aria-label="Lock track"
        >
          L
        </button>
      </div>
    </div>
  )
}
