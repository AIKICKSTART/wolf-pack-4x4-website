"use client"

import styles from "./start-record-button.module.css"

import type { RecordingState } from "./screen-recorder-types"

interface StartRecordButtonProps {
  /** Display state — drives label, glyph and ring animation. */
  state?: Extract<RecordingState, "idle" | "arming" | "countdown" | "recording">
  /** Countdown digit shown when state === "countdown". */
  countdownDigit?: 3 | 2 | 1
  /** Tap target label override — defaults to mode-appropriate copy. */
  label?: string
  /** Optional click handler — primitive is presentational without it. */
  onClick?: () => void
}

const COPY: Record<
  Extract<RecordingState, "idle" | "arming" | "countdown" | "recording">,
  string
> = {
  idle: "Start recording",
  arming: "Arming sources",
  countdown: "Countdown…",
  recording: "Recording — tap to stop",
}

export function StartRecordButton({
  state = "idle",
  countdownDigit = 3,
  label,
  onClick,
}: StartRecordButtonProps) {
  const copy = label ?? COPY[state]
  const classes = [styles.wrap, styles[`state-${state}`]].join(" ")

  return (
    <div className={classes} role="group" aria-label="Start recording control">
      <button
        type="button"
        className={styles.button}
        onClick={onClick}
        aria-pressed={state === "recording"}
        aria-label={copy}
      >
        <span className={styles.ring} aria-hidden="true" />
        <span className={styles.pulse} aria-hidden="true" />
        <span className={styles.core} aria-hidden="true">
          {state === "recording" ? (
            <span className={styles.square} />
          ) : (
            <span className={styles.dot} />
          )}
        </span>
      </button>
      <span className={styles.caption}>{copy}</span>
      {state === "countdown" ? (
        <div className={styles.countdown} role="alert" aria-live="assertive">
          <span className={styles.countdownDigit}>{countdownDigit}</span>
          <span className={styles.countdownLabel}>get ready</span>
        </div>
      ) : null}
    </div>
  )
}
