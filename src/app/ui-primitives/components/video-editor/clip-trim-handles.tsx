import styles from "./clip-trim-handles.module.css"

interface ClipTrimHandlesProps {
  /** Frame rate for the delta chip. Defaults to 24. */
  fps?: number
  /** Trim delta in seconds — positive means extend, negative means trim in. */
  deltaSec?: number
  /** Side currently being dragged — affects chip placement + glow. */
  activeSide?: "left" | "right" | "none"
  /** Whether to render the chip showing the delta. Defaults to true. */
  showDelta?: boolean
}

function formatDelta(sec: number, fps: number): string {
  const sign = sec >= 0 ? "+" : "-"
  const abs = Math.abs(sec)
  const seconds = Math.floor(abs)
  const frames = Math.round((abs - seconds) * fps)
  return `${sign}${seconds.toString().padStart(2, "0")}:${frames.toString().padStart(2, "0")}f`
}

export function ClipTrimHandles({
  fps = 24,
  deltaSec = 0,
  activeSide = "none",
  showDelta = true,
}: ClipTrimHandlesProps) {
  const leftClasses = [styles.handle, styles.left]
  if (activeSide === "left") leftClasses.push(styles.active)

  const rightClasses = [styles.handle, styles.right]
  if (activeSide === "right") rightClasses.push(styles.active)

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-label="Clip trim handles"
    >
      <button
        type="button"
        className={leftClasses.join(" ")}
        aria-label="Trim clip in-point"
      >
        <span className={styles.grip} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <button
        type="button"
        className={rightClasses.join(" ")}
        aria-label="Trim clip out-point"
      >
        <span className={styles.grip} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      {showDelta && activeSide !== "none" ? (
        <span
          className={[styles.deltaChip, activeSide === "left" ? styles.deltaLeft : styles.deltaRight].join(" ")}
          role="status"
        >
          {formatDelta(deltaSec, fps)}
        </span>
      ) : null}
    </div>
  )
}
