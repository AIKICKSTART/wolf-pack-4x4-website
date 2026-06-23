import styles from "./subtitle-row.module.css"
import type { SubtitleCue } from "./video-editor-types"

interface SubtitleRowProps {
  /** Numbered cues to render across the row. */
  cues: ReadonlyArray<SubtitleCue>
  /** Total duration in seconds — used to compute left/width per cue. */
  durationSec: number
  /** Pixels per second override. When omitted cues use percentage layout. */
  pxPerSec?: number
}

function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return value
}

export function SubtitleRow({
  cues,
  durationSec,
  pxPerSec,
}: SubtitleRowProps) {
  const safeDuration = Math.max(0.1, durationSec)

  return (
    <div className={styles.row} role="list" aria-label="Subtitle cues">
      {cues.map((cue) => {
        const start = clampNonNegative(cue.startSec)
        const end = Math.max(start, cue.endSec)
        const usePx = typeof pxPerSec === "number"
        const style = usePx
          ? {
              left: `${start * (pxPerSec ?? 0)}px`,
              width: `${Math.max(40, (end - start) * (pxPerSec ?? 0))}px`,
            }
          : {
              left: `${(start / safeDuration) * 100}%`,
              width: `${Math.max(0.5, ((end - start) / safeDuration) * 100)}%`,
            }
        return (
          <div
            key={`cue-${cue.index}`}
            className={styles.cue}
            style={style}
            role="listitem"
            aria-label={`Cue ${cue.index} from ${start.toFixed(2)}s to ${end.toFixed(2)}s — ${cue.text}`}
          >
            <span className={styles.cueIndex}>{cue.index.toString().padStart(2, "0")}</span>
            <span className={styles.cueText}>{cue.text}</span>
          </div>
        )
      })}
    </div>
  )
}
