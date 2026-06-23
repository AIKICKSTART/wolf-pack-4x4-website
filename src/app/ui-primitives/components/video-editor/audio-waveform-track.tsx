import type { CSSProperties } from "react"

import styles from "./audio-waveform-track.module.css"
import type {
  AudioLevelSnapshot,
  TimelineRange,
  WaveformSamples,
} from "./video-editor-types"

interface AudioWaveformTrackProps {
  /** Track label e.g. "Wireless lav · Brodie". */
  name: string
  /** Samples in 0..1 — long-form across the clip. */
  samples: WaveformSamples
  /** Optional selection range — startSec/endSec in absolute timeline seconds. */
  selection?: TimelineRange
  /** Total duration in seconds. Used to map selection range. */
  durationSec: number
  /** Current peak level snapshot for the meter. Defaults to silence. */
  level?: AudioLevelSnapshot
  /** Overall track width override. */
  width?: string
}

function clamp01(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  if (value > 1) return 1
  return value
}

export function AudioWaveformTrack({
  name,
  samples,
  selection,
  durationSec,
  level = { left: 0, right: 0 },
  width,
}: AudioWaveformTrackProps) {
  const safeSamples = samples.length > 0 ? samples : Array.from({ length: 48 }, () => 0.18)

  const widthStyle: CSSProperties = width ? { width } : {}

  const selectionStyle: CSSProperties = (() => {
    if (!selection || durationSec <= 0) return {}
    const startPct = clamp01(selection.startSec / durationSec) * 100
    const widthPct = clamp01((selection.endSec - selection.startSec) / durationSec) * 100
    return {
      left: `${startPct}%`,
      width: `${widthPct}%`,
    }
  })()

  return (
    <div
      className={styles.wrap}
      style={widthStyle}
      role="img"
      aria-label={`Audio waveform for ${name}`}
    >
      <div className={styles.waveformArea}>
        <div className={styles.bars} aria-hidden="true">
          {safeSamples.map((value, index) => (
            <span
              key={`bar-${index}`}
              className={styles.bar}
              style={{ height: `${Math.max(8, clamp01(value) * 100)}%` }}
            />
          ))}
        </div>
        {selection ? (
          <span
            className={styles.selection}
            style={selectionStyle}
            aria-hidden="true"
          />
        ) : null}
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.meter} aria-label="Output level">
        <div className={styles.meterChannel}>
          <span
            className={styles.meterFill}
            style={{ width: `${clamp01(level.left) * 100}%` }}
          />
          <em className={styles.meterLabel}>L</em>
        </div>
        <div className={styles.meterChannel}>
          <span
            className={styles.meterFill}
            style={{ width: `${clamp01(level.right) * 100}%` }}
          />
          <em className={styles.meterLabel}>R</em>
        </div>
      </div>
    </div>
  )
}
