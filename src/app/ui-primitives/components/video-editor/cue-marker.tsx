import styles from "./cue-marker.module.css"
import type { CueMarker, CueMarkerTone } from "./video-editor-types"

interface CueMarkerProps {
  marker: CueMarker
  /** Pixels per second — used to position the pin. Defaults to 40. */
  pxPerSec?: number
  /** Whether the note popover should render. */
  popoverOpen?: boolean
}

const TONE_CLASS: Record<CueMarkerTone, string> = {
  neutral: styles.toneNeutral,
  amber: styles.toneAmber,
  red: styles.toneRed,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function CueMarkerPin({
  marker,
  pxPerSec = 40,
  popoverOpen = false,
}: CueMarkerProps) {
  const tone = TONE_CLASS[marker.tone ?? "amber"]
  const left = Math.max(0, marker.atSec * pxPerSec)

  return (
    <div
      className={[styles.pin, tone].join(" ")}
      style={{ left: `${left}px` }}
      role="button"
      tabIndex={0}
      aria-label={`Cue marker ${marker.index} at ${marker.atSec.toFixed(2)} seconds — ${marker.label}`}
    >
      <span className={styles.chip}>
        <strong>{marker.index}</strong>
        <em>{marker.label}</em>
      </span>
      <span className={styles.stem} aria-hidden="true" />
      <span className={styles.tip} aria-hidden="true" />
      {popoverOpen && marker.note ? (
        <div className={styles.popover} role="note">
          <span className={styles.popoverTitle}>Marker {marker.index}</span>
          <p className={styles.popoverNote}>{marker.note}</p>
        </div>
      ) : null}
    </div>
  )
}
