"use client"

import styles from "./recording-controls.module.css"

import type { RecordingState } from "./screen-recorder-types"

interface RecordingControlsProps {
  /** Current state — drives label / disable flags. */
  state: Extract<RecordingState, "recording" | "paused" | "stopping">
  /** Elapsed in seconds. */
  elapsedSec: number
  /** Remaining storage / cloud-quota label, e.g. "1.4 GB left". */
  storageLabel?: string
  onPause?: () => void
  onResume?: () => void
  onStop?: () => void
  onCancel?: () => void
}

function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const hh = Math.floor(total / 3600)
  const mm = Math.floor((total % 3600) / 60)
  const ss = total % 60
  const pad = (n: number) => n.toString().padStart(2, "0")
  return hh > 0 ? `${pad(hh)}:${pad(mm)}:${pad(ss)}` : `${pad(mm)}:${pad(ss)}`
}

export function RecordingControls({
  state,
  elapsedSec,
  storageLabel = "1.4 GB left",
  onPause,
  onResume,
  onStop,
  onCancel,
}: RecordingControlsProps) {
  const isPaused = state === "paused"
  return (
    <div className={styles.wrap} role="toolbar" aria-label="Recording controls">
      <span className={[styles.indicator, isPaused ? styles.indicatorPaused : ""].join(" ")}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.indicatorLabel}>{isPaused ? "PAUSED" : "REC"}</span>
      </span>

      <span className={styles.elapsed} aria-live="polite">
        {formatTime(elapsedSec)}
      </span>

      <span className={styles.divider} aria-hidden="true" />

      {isPaused ? (
        <button
          type="button"
          className={[styles.btn, styles.resume].join(" ")}
          onClick={onResume}
          aria-label="Resume recording"
        >
          <span className={styles.triangle} aria-hidden="true" />
          <span>Resume</span>
        </button>
      ) : (
        <button
          type="button"
          className={styles.btn}
          onClick={onPause}
          aria-label="Pause recording"
        >
          <span className={styles.pauseBars} aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Pause</span>
        </button>
      )}

      <button
        type="button"
        className={[styles.btn, styles.stop].join(" ")}
        onClick={onStop}
        aria-label="Stop recording and review"
      >
        <span className={styles.stopSquare} aria-hidden="true" />
        <span>Stop</span>
      </button>

      <button
        type="button"
        className={[styles.btn, styles.cancel].join(" ")}
        onClick={onCancel}
        aria-label="Cancel recording and discard"
      >
        <span aria-hidden="true">×</span>
        <span>Cancel</span>
      </button>

      <span className={styles.divider} aria-hidden="true" />

      <span className={styles.chip} aria-label={`Storage: ${storageLabel}`}>
        <span className={styles.chipDot} aria-hidden="true" />
        {storageLabel}
      </span>
    </div>
  )
}
