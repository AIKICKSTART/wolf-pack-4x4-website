import styles from "./recorded-clip-trim-handles.module.css"

interface RecordedClipTrimHandlesProps {
  /** Full duration of the recorded clip in seconds. */
  durationSec: number
  /** Trim start relative to clip 0 — seconds. */
  startSec: number
  /** Trim end relative to clip 0 — seconds. */
  endSec: number
  /** Current scrubber position in seconds. */
  playheadSec?: number
  /** Optional thumbnail labels printed inside the scrub strip. */
  thumbnails?: ReadonlyArray<string>
  /** Optional active drag side — for active-side styling. */
  activeSide?: "start" | "end" | "none"
}

function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const mm = Math.floor(total / 60)
  const ss = total % 60
  return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`
}

const DEFAULT_THUMBS: ReadonlyArray<string> = [
  "Intro",
  "Bay 2",
  "Manta fit",
  "Dyno",
  "Outro",
]

export function RecordedClipTrimHandles({
  durationSec,
  startSec,
  endSec,
  playheadSec,
  thumbnails = DEFAULT_THUMBS,
  activeSide = "none",
}: RecordedClipTrimHandlesProps) {
  const clampedStart = Math.max(0, Math.min(durationSec, startSec))
  const clampedEnd = Math.max(clampedStart, Math.min(durationSec, endSec))
  const startPct = (clampedStart / durationSec) * 100
  const endPct = (clampedEnd / durationSec) * 100
  const trimmedDuration = clampedEnd - clampedStart
  const fullDuration = durationSec
  const playheadPct = playheadSec !== undefined
    ? Math.max(0, Math.min(100, (playheadSec / durationSec) * 100))
    : null

  return (
    <div className={styles.wrap} role="group" aria-label="Trim recorded clip">
      <div className={styles.head}>
        <span className={styles.kicker}>Trim recording</span>
        <span className={styles.range}>
          <span>{formatTime(clampedStart)}</span>
          <span aria-hidden="true">—</span>
          <span>{formatTime(clampedEnd)}</span>
        </span>
      </div>

      <div className={styles.scrubber}>
        <div className={styles.thumbStrip} aria-hidden="true">
          {thumbnails.map((label, index) => (
            <span
              key={`${label}-${index}`}
              className={styles.thumbCell}
              style={{ width: `${100 / thumbnails.length}%` }}
            >
              <span className={styles.thumbLabel}>{label}</span>
            </span>
          ))}
        </div>

        <div
          className={styles.trimWindow}
          style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
        >
          <span className={styles.windowBorder} />
        </div>

        <button
          type="button"
          className={[
            styles.handle,
            styles.handleStart,
            activeSide === "start" ? styles.handleActive : "",
          ].join(" ")}
          style={{ left: `${startPct}%` }}
          aria-label={`Trim start at ${formatTime(clampedStart)}`}
        >
          <span className={styles.grip} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>

        <button
          type="button"
          className={[
            styles.handle,
            styles.handleEnd,
            activeSide === "end" ? styles.handleActive : "",
          ].join(" ")}
          style={{ left: `${endPct}%` }}
          aria-label={`Trim end at ${formatTime(clampedEnd)}`}
        >
          <span className={styles.grip} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>

        {playheadPct !== null ? (
          <span
            className={styles.playhead}
            style={{ left: `${playheadPct}%` }}
            aria-hidden="true"
          >
            <span className={styles.playheadHead} />
            <span className={styles.playheadStem} />
          </span>
        ) : null}
      </div>

      <div className={styles.footer}>
        <span className={styles.chip}>
          <span aria-hidden="true">Δ</span>
          {formatTime(trimmedDuration)} kept · {formatTime(fullDuration - trimmedDuration)} removed
        </span>
      </div>
    </div>
  )
}
