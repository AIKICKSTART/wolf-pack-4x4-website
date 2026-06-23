import { ComplianceBandChip } from "../adr-compliance/compliance-band-chip"
import {
  classifySoundBand,
  SOUND_BAND_LABEL,
} from "../adr-compliance/adr-compliance-types"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./live-sound-band-chip.module.css"

export interface LiveSoundBandChipProps {
  /** Measured close-proximity dB(A) from the live dyno run. */
  measuredDb: number
  /** ADR limit in dB(A) — usually 90 for light vehicles. */
  limitDb?: number
  /** Bay sourcing the reading. */
  bay: BayId
  /** Rev test RPM, e.g. 3500. */
  rpm?: number
  /** "Live · 1Hz" pill text override. */
  liveLabel?: string
  className?: string
}

export function LiveSoundBandChip({
  measuredDb,
  limitDb = 90,
  bay,
  rpm,
  liveLabel = "Live · 1Hz",
  className,
}: LiveSoundBandChipProps) {
  const band = classifySoundBand(measuredDb, limitDb)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Live sound reading ${measuredDb.toFixed(1)} decibels A from ${BAY_LABEL[bay]} — ${SOUND_BAND_LABEL[band]}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Sound test · {BAY_LABEL[bay]}</span>
        <span className={styles.live} aria-hidden="true">
          <span /> {liveLabel}
        </span>
      </header>

      <div className={styles.body}>
        <div className={styles.readout}>
          <strong className={styles.value}>{measuredDb.toFixed(1)}</strong>
          <em className={styles.unit}>dB(A)</em>
        </div>
        <div className={styles.limitMeta}>
          <span>Limit {limitDb} dB(A)</span>
          {rpm && <span>{rpm.toLocaleString("en-AU")} rpm</span>}
        </div>
      </div>

      <ComplianceBandChip band={band} />
    </article>
  )
}

export default LiveSoundBandChip
