"use client"

import styles from "./webcam-bubble.module.css"

import type { BubblePosition } from "./screen-recorder-types"

interface WebcamBubbleProps {
  /** Currently selected position. */
  position: BubblePosition
  /** Onscreen size in pixels (60–160). */
  sizePx?: number
  /** Mirror the camera preview horizontally. */
  mirrored?: boolean
  /** Optional speaker name shown under the bubble. */
  speakerName?: string
  /** Position change handler — turns picker into a controlled chooser. */
  onPositionChange?: (next: BubblePosition) => void
  /** Size slider change handler. */
  onSizeChange?: (next: number) => void
  /** Mirror toggle handler. */
  onMirrorToggle?: () => void
}

const POSITIONS: ReadonlyArray<{ key: BubblePosition; label: string }> = [
  { key: "top-left", label: "Top left" },
  { key: "top-right", label: "Top right" },
  { key: "bottom-left", label: "Bottom left" },
  { key: "bottom-right", label: "Bottom right" },
]

const MIN_SIZE = 60
const MAX_SIZE = 160

export function WebcamBubble({
  position,
  sizePx = 108,
  mirrored = false,
  speakerName = "Brodie — Service manager",
  onPositionChange,
  onSizeChange,
  onMirrorToggle,
}: WebcamBubbleProps) {
  const clampedSize = Math.min(MAX_SIZE, Math.max(MIN_SIZE, sizePx))
  const sliderPct = ((clampedSize - MIN_SIZE) / (MAX_SIZE - MIN_SIZE)) * 100

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Webcam bubble · {speakerName}</span>

      <div className={styles.stage} aria-label="Recording region preview">
        <span className={styles.screen} aria-hidden="true">
          <span className={styles.screenBar} style={{ width: "62%" }} />
          <span className={styles.screenBar} style={{ width: "44%" }} />
          <span className={styles.screenBar} style={{ width: "78%" }} />
          <span className={styles.screenBar} style={{ width: "36%" }} />
        </span>
        <span
          className={[styles.bubble, styles[`pos-${position}`]].join(" ")}
          style={{ width: clampedSize, height: clampedSize }}
          aria-label="Webcam picture-in-picture preview"
        >
          <span
            className={styles.face}
            style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
            aria-hidden="true"
          >
            <span className={styles.head} />
            <span className={styles.shoulders} />
          </span>
        </span>
      </div>

      <div className={styles.controls}>
        <div
          className={styles.positionGrid}
          role="radiogroup"
          aria-label="Bubble position"
        >
          {POSITIONS.map((p) => (
            <button
              key={p.key}
              type="button"
              role="radio"
              aria-checked={p.key === position}
              aria-label={p.label}
              className={[
                styles.posDot,
                styles[`dot-${p.key}`],
                p.key === position ? styles.posDotActive : "",
              ].join(" ")}
              onClick={() => onPositionChange?.(p.key)}
            />
          ))}
        </div>

        <label className={styles.slider}>
          <span className={styles.sliderLabel}>Size · {clampedSize}px</span>
          <input
            type="range"
            min={MIN_SIZE}
            max={MAX_SIZE}
            value={clampedSize}
            onChange={(event) => onSizeChange?.(Number(event.target.value))}
            className={styles.sliderInput}
            style={{ "--slider-pct": `${sliderPct}%` } as React.CSSProperties}
            aria-label="Bubble size"
          />
        </label>

        <button
          type="button"
          className={[styles.mirror, mirrored ? styles.mirrorOn : ""].join(" ")}
          onClick={onMirrorToggle}
          aria-pressed={mirrored}
        >
          <span aria-hidden="true">⇄</span>
          <span>{mirrored ? "Mirror on" : "Mirror off"}</span>
        </button>
      </div>
    </div>
  )
}
