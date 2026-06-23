import type { CSSProperties } from "react"

import styles from "./timeline-ruler.module.css"
import type { ZoomLevel } from "./video-editor-types"

interface TimelineRulerProps {
  /** Total duration the ruler spans, in seconds. */
  durationSec: number
  /** Pixels per second — controls density. Defaults to 40. */
  pxPerSec?: ZoomLevel
  /** Frames per second for the frame chips. Defaults to 24. */
  fps?: number
  /** Label every Nth second. Defaults to 10. */
  labelEverySec?: number
  /** Optional zoom indicator chip text e.g. "1.5x". */
  zoomLabel?: string
}

function formatSeconds(secs: number): string {
  const minutes = Math.floor(secs / 60)
  const remainder = Math.floor(secs - minutes * 60)
  const m = minutes.toString().padStart(2, "0")
  const s = remainder.toString().padStart(2, "0")
  return `${m}:${s}`
}

export function TimelineRuler({
  durationSec,
  pxPerSec = 40,
  fps = 24,
  labelEverySec = 10,
  zoomLabel,
}: TimelineRulerProps) {
  const totalWidth = Math.max(durationSec * pxPerSec, pxPerSec)
  const totalSeconds = Math.max(1, Math.floor(durationSec))

  const ticks: Array<{ atSec: number; major: boolean; label?: string }> = []
  for (let sec = 0; sec <= totalSeconds; sec += 1) {
    const major = sec % labelEverySec === 0
    ticks.push({
      atSec: sec,
      major,
      label: major ? formatSeconds(sec) : undefined,
    })
  }

  // Frame sub-ticks: render fps marks within first 4 seconds for density preview.
  const previewFrameSeconds = Math.min(4, totalSeconds)
  const frameTicks: Array<{ atSec: number }> = []
  for (let sec = 0; sec < previewFrameSeconds; sec += 1) {
    for (let frame = 1; frame < fps; frame += 1) {
      frameTicks.push({ atSec: sec + frame / fps })
    }
  }

  const trackStyle: CSSProperties = {
    width: `${totalWidth}px`,
    "--ruler-px-per-sec": `${pxPerSec}px`,
  } as CSSProperties

  return (
    <div className={styles.ruler} role="presentation">
      <div className={styles.meta}>
        <span className={styles.metaLabel}>Timeline</span>
        <span className={styles.metaValue}>
          {formatSeconds(durationSec)} <small>· {fps}fps</small>
        </span>
        {zoomLabel ? (
          <span className={styles.zoomChip}>{zoomLabel}</span>
        ) : null}
      </div>
      <div className={styles.scroll}>
        <div className={styles.track} style={trackStyle}>
          {frameTicks.map((tick) => (
            <span
              key={`f-${tick.atSec.toFixed(4)}`}
              className={styles.frameTick}
              style={{ left: `${tick.atSec * pxPerSec}px` }}
              aria-hidden="true"
            />
          ))}
          {ticks.map((tick) => (
            <span
              key={`s-${tick.atSec}`}
              className={[styles.tick, tick.major ? styles.tickMajor : ""].join(" ")}
              style={{ left: `${tick.atSec * pxPerSec}px` }}
              aria-hidden="true"
            >
              {tick.label ? <em className={styles.tickLabel}>{tick.label}</em> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
