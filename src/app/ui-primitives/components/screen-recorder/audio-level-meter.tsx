"use client"

import styles from "./audio-level-meter.module.css"

interface AudioLevelMeterProps {
  /** Current level (0-1) for left channel. */
  left: number
  /** Current level (0-1) for right channel — defaults to left when omitted. */
  right?: number
  /** Peak hold position (0-1). */
  peak: number
  /** Whether the meter is currently clipping (>= 0.96). */
  clipping?: boolean
  /** Quick-mute toggle handler. */
  onMuteToggle?: () => void
  /** Mute state. */
  muted?: boolean
}

const TICK_VALUES: ReadonlyArray<{ value: number; label: string }> = [
  { value: 1.0, label: "0" },
  { value: 0.86, label: "-3" },
  { value: 0.7, label: "-6" },
  { value: 0.5, label: "-12" },
  { value: 0.3, label: "-24" },
  { value: 0.0, label: "∞" },
]

export function AudioLevelMeter({
  left,
  right,
  peak,
  clipping = false,
  onMuteToggle,
  muted = false,
}: AudioLevelMeterProps) {
  const rightLevel = right ?? left
  const clampedPeak = Math.max(0, Math.min(1, peak))
  const clampedLeft = muted ? 0 : Math.max(0, Math.min(1, left))
  const clampedRight = muted ? 0 : Math.max(0, Math.min(1, rightLevel))

  return (
    <div className={[styles.wrap, muted ? styles.muted : ""].join(" ")}>
      <span className={styles.title}>Mic input</span>

      <div className={styles.body}>
        <ul className={styles.ticks} aria-hidden="true">
          {TICK_VALUES.map((tick) => (
            <li
              key={tick.label}
              style={{ bottom: `${tick.value * 100}%` }}
            >
              {tick.label}
            </li>
          ))}
        </ul>

        <div
          className={styles.channels}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={clampedLeft}
          aria-label={`Input level ${Math.round(clampedLeft * 100)}%`}
        >
          <div className={styles.channel}>
            <span
              className={styles.fillLeft}
              style={{ height: `${clampedLeft * 100}%` }}
            />
            <span
              className={styles.peakDot}
              style={{ bottom: `${clampedPeak * 100}%` }}
              aria-hidden="true"
            />
            <span className={styles.channelLabel}>L</span>
          </div>
          <div className={styles.channel}>
            <span
              className={styles.fillRight}
              style={{ height: `${clampedRight * 100}%` }}
            />
            <span
              className={styles.peakDot}
              style={{ bottom: `${clampedPeak * 100}%` }}
              aria-hidden="true"
            />
            <span className={styles.channelLabel}>R</span>
          </div>
        </div>
      </div>

      {clipping ? (
        <span className={styles.clipWarn} role="alert">
          <span aria-hidden="true">!</span> Clipping — back off the gain
        </span>
      ) : null}

      <button
        type="button"
        className={[styles.mute, muted ? styles.muteOn : ""].join(" ")}
        aria-pressed={muted}
        onClick={onMuteToggle}
        aria-label={muted ? "Unmute microphone" : "Mute microphone"}
      >
        <span aria-hidden="true">{muted ? "✕" : "●"}</span>
        <span>{muted ? "Muted" : "Live"}</span>
      </button>
    </div>
  )
}
