"use client"

import styles from "./record-mode-picker.module.css"

import type { RecordMode } from "./screen-recorder-types"

interface RecordModePickerProps {
  /** Currently selected mode. */
  value: RecordMode
  /** Tap target callback for changing modes. */
  onChange?: (mode: RecordMode) => void
}

interface ModeTile {
  mode: RecordMode
  title: string
  subtitle: string
}

const TILES: ReadonlyArray<ModeTile> = [
  {
    mode: "screen+camera",
    title: "Screen + Camera",
    subtitle: "Bay walkthroughs with Brodie on-cam",
  },
  {
    mode: "screen-only",
    title: "Screen only",
    subtitle: "Quote tool clicks, no presenter",
  },
  {
    mode: "camera-only",
    title: "Camera only",
    subtitle: "Owner pieces-to-camera",
  },
  {
    mode: "audio-only",
    title: "Audio only",
    subtitle: "ADR refresher voiceover",
  },
]

function ScreenPreview({ withBubble }: { withBubble?: boolean }) {
  return (
    <span className={styles.preview} aria-hidden="true">
      <span className={styles.previewHead}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className={styles.previewBody}>
        <span className={styles.bar} style={{ width: "74%" }} />
        <span className={styles.bar} style={{ width: "42%" }} />
        <span className={styles.bar} style={{ width: "58%" }} />
      </span>
      {withBubble ? <span className={styles.bubble} /> : null}
    </span>
  )
}

function CameraPreview() {
  return (
    <span className={styles.preview} aria-hidden="true">
      <span className={styles.cameraSky} />
      <span className={styles.cameraHead} />
      <span className={styles.cameraShoulders} />
    </span>
  )
}

function AudioPreview() {
  const bars = [0.4, 0.7, 0.32, 0.86, 0.58, 0.74, 0.48, 0.62, 0.32, 0.7, 0.5, 0.36]
  return (
    <span className={styles.preview} aria-hidden="true">
      <span className={styles.audioRow}>
        {bars.map((sample, index) => (
          <span
            key={index}
            className={styles.audioBar}
            style={{ height: `${Math.round(sample * 100)}%` }}
          />
        ))}
      </span>
    </span>
  )
}

function previewFor(mode: RecordMode) {
  switch (mode) {
    case "screen+camera":
      return <ScreenPreview withBubble />
    case "screen-only":
      return <ScreenPreview />
    case "camera-only":
      return <CameraPreview />
    case "audio-only":
      return <AudioPreview />
    default:
      return null
  }
}

export function RecordModePicker({ value, onChange }: RecordModePickerProps) {
  return (
    <div
      className={styles.grid}
      role="radiogroup"
      aria-label="Recording mode"
    >
      {TILES.map((tile) => {
        const selected = tile.mode === value
        const classes = [styles.tile]
        if (selected) classes.push(styles.selected)
        return (
          <button
            key={tile.mode}
            type="button"
            role="radio"
            aria-checked={selected}
            className={classes.join(" ")}
            onClick={() => onChange?.(tile.mode)}
          >
            <span className={styles.previewWell}>{previewFor(tile.mode)}</span>
            <span className={styles.copy}>
              <span className={styles.title}>{tile.title}</span>
              <span className={styles.subtitle}>{tile.subtitle}</span>
            </span>
            <span className={styles.check} aria-hidden="true">
              {selected ? "●" : "○"}
            </span>
          </button>
        )
      })}
    </div>
  )
}
