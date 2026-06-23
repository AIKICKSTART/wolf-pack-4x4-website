import { ArrowDown, RefreshCw } from "lucide-react"
import type { CSSProperties } from "react"

import styles from "./pull-to-refresh-loader.module.css"

type LoaderState = "idle" | "armed" | "loading"

interface PullToRefreshLoaderProps {
  progress: number
  state?: LoaderState
  hint?: string
  className?: string
}

const STATE_HINT: Record<LoaderState, string> = {
  idle: "Pull to refresh",
  armed: "Release to refresh",
  loading: "Fetching latest…",
}

const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function PullToRefreshLoader({
  progress,
  state = "idle",
  hint,
  className,
}: PullToRefreshLoaderProps) {
  const clamped = Math.max(0, Math.min(1, progress))
  const computed: LoaderState =
    state === "loading"
      ? "loading"
      : clamped >= 1
        ? "armed"
        : state
  const stateClass =
    computed === "armed"
      ? styles.armed
      : computed === "loading"
        ? styles.loading
        : styles.idle

  const classes = [styles.root, stateClass, className].filter(Boolean).join(" ")
  const dashOffset = CIRCUMFERENCE - clamped * CIRCUMFERENCE
  const ringStyle: CSSProperties = {
    strokeDasharray: CIRCUMFERENCE,
    strokeDashoffset: computed === "loading" ? 0 : dashOffset,
  }
  const scale = 0.86 + clamped * 0.18
  const opacity = computed === "loading" ? 1 : Math.max(0.2, clamped)

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={hint ?? STATE_HINT[computed]}
    >
      <div
        className={styles.bowl}
        style={{ transform: `scale(${scale})`, opacity }}
      >
        <svg
          className={styles.ring}
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <circle className={styles.ringTrack} cx="32" cy="32" r={RADIUS} />
          <circle
            className={styles.ringFill}
            cx="32"
            cy="32"
            r={RADIUS}
            style={ringStyle}
          />
        </svg>
        <span className={styles.icon} aria-hidden="true">
          {computed === "loading" ? (
            <RefreshCw size={20} strokeWidth={2.4} />
          ) : (
            <ArrowDown
              size={20}
              strokeWidth={2.4}
              style={{
                transform: `rotate(${computed === "armed" ? 180 : 0}deg)`,
                transition: "transform 200ms ease",
              }}
            />
          )}
        </span>
      </div>
      <span className={styles.hint}>{hint ?? STATE_HINT[computed]}</span>
    </div>
  )
}

export default PullToRefreshLoader
