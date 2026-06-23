"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react"

import styles from "./rollout-slider.module.css"

const SNAP_POINTS: ReadonlyArray<number> = [0, 25, 50, 75, 100]

export interface RolloutSliderProps {
  /** Controlled percent value (0-100). */
  value?: number
  /** Uncontrolled default. */
  defaultValue?: number
  onChange?: (next: number) => void
  /** Aria label for the slider. */
  label?: string
  /** Optional hint shown next to the kbd. */
  hint?: string
  /** Snap to the nearest 5 / 25 stops automatically. */
  snap?: boolean
  className?: string
}

function clamp(value: number): number {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

function nearestSnap(value: number): number {
  let best = SNAP_POINTS[0]
  let bestDelta = Math.abs(value - best)
  for (const point of SNAP_POINTS) {
    const delta = Math.abs(value - point)
    if (delta < bestDelta) {
      best = point
      bestDelta = delta
    }
  }
  return best
}

function toneFor(value: number): "off" | "low" | "mid" | "high" | "full" {
  if (value <= 0) return "off"
  if (value < 25) return "low"
  if (value < 75) return "mid"
  if (value < 100) return "high"
  return "full"
}

const TONE_CLASS: Record<
  ReturnType<typeof toneFor>,
  string
> = {
  off: styles.toneOff,
  low: styles.toneLow,
  mid: styles.toneMid,
  high: styles.toneHigh,
  full: styles.toneFull,
}

export function RolloutSlider({
  value,
  defaultValue,
  onChange,
  label = "Rollout percent",
  hint = "Arrow keys ±1, Shift+Arrow ±10, Home/End jump",
  snap = false,
  className,
}: RolloutSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState<number>(clamp(defaultValue ?? 0))
  const isControlled = value !== undefined
  const current = isControlled ? clamp(value) : internal

  const commit = useCallback(
    (next: number) => {
      const final = clamp(next)
      if (!isControlled) setInternal(final)
      onChange?.(final)
    },
    [isControlled, onChange],
  )

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const node = trackRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const ratio = (clientX - rect.left) / rect.width
      const pct = Math.round(ratio * 100)
      commit(snap ? nearestSnap(pct) : pct)
    },
    [commit, snap],
  )

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromPointer(event.clientX)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons === 0) return
    updateFromPointer(event.clientX)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const big = event.shiftKey ? 10 : 1
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault()
        commit(current - big)
        break
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault()
        commit(current + big)
        break
      case "Home":
        event.preventDefault()
        commit(0)
        break
      case "End":
        event.preventDefault()
        commit(100)
        break
      case "PageDown":
        event.preventDefault()
        commit(nearestSnap(current - 25))
        break
      case "PageUp":
        event.preventDefault()
        commit(nearestSnap(current + 25))
        break
      default:
        break
    }
  }

  // ensure controlled clamping
  useEffect(() => {
    if (isControlled && value !== undefined && value !== clamp(value)) {
      onChange?.(clamp(value))
    }
  }, [isControlled, value, onChange])

  const toneClass = useMemo(() => TONE_CLASS[toneFor(current)], [current])
  const wrapClass = [styles.wrap, toneClass, className].filter(Boolean).join(" ")

  return (
    <div className={wrapClass}>
      <div className={styles.head}>
        <span className={styles.label}>{label}</span>
        <output className={styles.value} aria-live="polite">
          {current}%
        </output>
      </div>
      <div
        ref={trackRef}
        className={styles.track}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={current}
        aria-valuetext={`${current}%`}
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
      >
        <span
          className={styles.fill}
          style={{ width: `${current}%` }}
          aria-hidden="true"
        />
        <ol className={styles.snaps} aria-hidden="true">
          {SNAP_POINTS.map((point) => {
            const isReached = current >= point
            return (
              <li
                key={point}
                className={[styles.snap, isReached ? styles.snapReached : null]
                  .filter(Boolean)
                  .join(" ")}
                style={{ left: `${point}%` }}
              >
                <span>{point}</span>
              </li>
            )
          })}
        </ol>
        <span
          className={styles.thumb}
          style={{ left: `${current}%` }}
          aria-hidden="true"
        />
      </div>
      <p className={styles.hint}>
        <kbd className={styles.kbd}>←</kbd>
        <kbd className={styles.kbd}>→</kbd>
        <span>{hint}</span>
      </p>
    </div>
  )
}

export default RolloutSlider
