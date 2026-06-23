import type { CSSProperties } from "react"

import styles from "./playhead-cursor.module.css"

interface PlayheadCursorProps {
  /** Current play time in seconds. */
  atSec: number
  /** Total duration in seconds — drives the aria slider range. */
  durationSec: number
  /** Pixels per second to position the line. Defaults to 40. */
  pxPerSec?: number
  /** Frame rate for the frame chip. Defaults to 24. */
  fps?: number
  /** Visual variant — `full` spans tracks, `compact` is short. */
  variant?: "full" | "compact"
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return value
}

function formatTimecode(sec: number, fps: number): { display: string; frame: number } {
  const safe = clampNonNegative(sec)
  const minutes = Math.floor(safe / 60)
  const remainder = safe - minutes * 60
  const seconds = Math.floor(remainder)
  const tenths = Math.round((remainder - seconds) * 10)
  const frame = Math.round((remainder - seconds) * fps)
  const m = minutes.toString().padStart(2, "0")
  const s = seconds.toString().padStart(2, "0")
  return {
    display: `${m}:${s}.${tenths}`,
    frame,
  }
}

export function PlayheadCursor({
  atSec,
  durationSec,
  pxPerSec = 40,
  fps = 24,
  variant = "full",
}: PlayheadCursorProps) {
  const safeAt = clampNonNegative(atSec)
  const safeDuration = Math.max(safeAt, durationSec)
  const left = safeAt * pxPerSec
  const tc = formatTimecode(safeAt, fps)

  const classes = [styles.playhead, variant === "compact" ? styles.compact : styles.full]

  const style: CSSProperties = {
    left: `${left}px`,
  }

  return (
    <div
      className={classes.join(" ")}
      style={style}
      role="slider"
      aria-label="Playhead"
      aria-valuemin={0}
      aria-valuemax={safeDuration}
      aria-valuenow={safeAt}
      aria-valuetext={tc.display}
      tabIndex={0}
    >
      <span className={styles.chip}>
        <strong>{tc.display}</strong>
        <em className={styles.frameDot}>f{tc.frame.toString().padStart(2, "0")}</em>
      </span>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.tail} aria-hidden="true" />
    </div>
  )
}
