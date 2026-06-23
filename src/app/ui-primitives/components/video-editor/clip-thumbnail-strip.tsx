"use client"

import type { CSSProperties } from "react"

import styles from "./clip-thumbnail-strip.module.css"
import type { ClipState, ClipThumbnail } from "./video-editor-types"

interface ClipThumbnailStripProps {
  /** Clip name shown as overlay e.g. "B-roll Hilux arrive". */
  name: string
  /** Duration in seconds — displayed as chip e.g. 4.8 → "00:04.8". */
  durationSec: number
  /** Thumbnails strung along the clip width. */
  thumbnails: ReadonlyArray<ClipThumbnail>
  /** Selection / interaction state. */
  state?: ClipState
  /** Width override (CSS length). When omitted the clip stretches. */
  width?: string
  /** Optional click handler — converts the outer element into a button. */
  onSelect?: () => void
}

function formatDuration(secs: number): string {
  if (secs < 0) return "00:00.0"
  const minutes = Math.floor(secs / 60)
  const remainder = secs - minutes * 60
  const seconds = Math.floor(remainder)
  const tenths = Math.round((remainder - seconds) * 10)
  const m = minutes.toString().padStart(2, "0")
  const s = seconds.toString().padStart(2, "0")
  return `${m}:${s}.${tenths}`
}

const STATE_CLASS: Record<ClipState, string> = {
  idle: styles.stateIdle,
  selected: styles.stateSelected,
  trimming: styles.stateTrimming,
  locked: styles.stateLocked,
  muted: styles.stateMuted,
}

export function ClipThumbnailStrip({
  name,
  durationSec,
  thumbnails,
  state = "idle",
  width,
  onSelect,
}: ClipThumbnailStripProps) {
  const style: CSSProperties = width ? { width } : {}
  const safeThumbs = thumbnails.length > 0 ? thumbnails : [{ label: name }]
  const interactive = typeof onSelect === "function"

  const classes = [styles.clip, STATE_CLASS[state]]
  if (interactive) classes.push(styles.interactive)

  const ariaLabel = `${name}, ${formatDuration(durationSec)} duration, ${state}`

  if (interactive) {
    return (
      <button
        type="button"
        className={classes.join(" ")}
        style={style}
        onClick={onSelect}
        aria-label={ariaLabel}
        aria-pressed={state === "selected"}
      >
        <ClipBody
          name={name}
          durationSec={durationSec}
          thumbnails={safeThumbs}
        />
      </button>
    )
  }

  return (
    <div
      className={classes.join(" ")}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      <ClipBody name={name} durationSec={durationSec} thumbnails={safeThumbs} />
    </div>
  )
}

interface ClipBodyProps {
  name: string
  durationSec: number
  thumbnails: ReadonlyArray<ClipThumbnail>
}

function ClipBody({ name, durationSec, thumbnails }: ClipBodyProps) {
  return (
    <>
      <div className={styles.thumbStrip} aria-hidden="true">
        {thumbnails.map((thumb, index) => (
          <div
            key={`${thumb.label}-${index}`}
            className={styles.thumbCell}
            style={
              thumb.src
                ? { backgroundImage: `url(${JSON.stringify(thumb.src).slice(1, -1)})` }
                : undefined
            }
          >
            {!thumb.src ? (
              <span className={styles.thumbGlyph}>
                {thumb.label.slice(0, 1).toUpperCase()}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className={styles.overlay}>
        <span className={styles.name}>{name}</span>
        <span className={styles.duration}>{formatDuration(durationSec)}</span>
      </div>
    </>
  )
}
