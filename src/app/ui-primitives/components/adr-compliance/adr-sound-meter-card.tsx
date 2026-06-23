import { RadialMeter } from "../charts/radial-meter"

import { ComplianceBandChip } from "./compliance-band-chip"
import {
  SOUND_BAND_TONE,
  classifySoundBand,
  type SoundComplianceBand,
} from "./adr-compliance-types"
import styles from "./adr-sound-meter-card.module.css"

interface AdrSoundMeterCardProps {
  /** Plain-English heading, e.g. "Bay 2 · Idle reading". */
  heading: string
  /** Live measured sound pressure level in dB(A). */
  measuredDb: number
  /** ADR limit in dB(A) for this vehicle class. */
  limitDb: number
  /** ADR rule label, e.g. "ADR 28/01". */
  ruleLabel: string
  /** Override the band auto-classification. Useful for stored results. */
  band?: SoundComplianceBand
  /** Optional caption rendered beneath the radial meter. */
  caption?: string
  className?: string
}

const TONE_CLASS: Record<SoundComplianceBand, string> = {
  legal: styles.toneLegal,
  borderline: styles.toneBorderline,
  over: styles.toneOver,
}

export function AdrSoundMeterCard({
  heading,
  measuredDb,
  limitDb,
  ruleLabel,
  band,
  caption,
  className,
}: AdrSoundMeterCardProps) {
  const resolvedBand = band ?? classifySoundBand(measuredDb, limitDb)
  const tone = SOUND_BAND_TONE[resolvedBand]
  const classes = [styles.card, TONE_CLASS[resolvedBand], className]
    .filter(Boolean)
    .join(" ")

  // RadialMeter uses 0..max — display measured vs limit*1.1 so over-limit shows
  // bar past the typical fill point.
  const meterMax = Math.round(limitDb * 1.1)
  const ariaSummary = `${heading}: ${measuredDb} decibels A-weighted against ${ruleLabel} limit of ${limitDb} decibels.`

  return (
    <article
      className={classes}
      role="group"
      aria-label={`Sound meter — ${heading}`}
    >
      <div className={styles.meterSide}>
        <div role="meter" aria-valuenow={measuredDb} aria-valuemin={0} aria-valuemax={meterMax} aria-label={ariaSummary}>
          <RadialMeter
            value={measuredDb}
            max={meterMax}
            label="dB(A)"
            tone={tone}
            ariaLabel={ariaSummary}
            unit=""
            size={140}
            caption={caption}
          />
        </div>
      </div>

      <div className={styles.readoutSide}>
        <span className={`${styles.kicker} ${styles.live}`}>Live · {ruleLabel}</span>
        <h3 className={styles.heading}>{heading}</h3>
        <div
          className={styles.readout}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={styles.bigNumber}>{measuredDb.toFixed(1)}</span>
          <span className={styles.unit}>dB(A)</span>
        </div>
        <p className={styles.limitRow}>
          ADR limit
          <span className={styles.limitValue}>{limitDb} dB(A)</span>
        </p>
        <div className={styles.bandSlot}>
          <ComplianceBandChip band={resolvedBand} />
        </div>
      </div>
    </article>
  )
}

export default AdrSoundMeterCard
