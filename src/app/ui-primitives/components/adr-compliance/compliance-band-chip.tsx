import { Chip } from "../primitives/chip"

import {
  SOUND_BAND_LABEL,
  SOUND_BAND_TONE,
  type SoundComplianceBand,
} from "./adr-compliance-types"
import styles from "./compliance-band-chip.module.css"

interface ComplianceBandChipProps {
  band: SoundComplianceBand
  /** Override the chip text. Default uses the canonical band label. */
  label?: string
  className?: string
}

const TONE_CLASS: Record<SoundComplianceBand, string> = {
  legal: styles.toneLegal,
  borderline: styles.toneBorderline,
  over: styles.toneOver,
}

function WaveGlyph({ band }: { band: SoundComplianceBand }) {
  // Tone-shifting waveform glyph: legal = small even bars,
  // borderline = uneven, over = jagged amplitude.
  const heights: Record<SoundComplianceBand, ReadonlyArray<number>> = {
    legal: [4, 6, 4, 6, 4],
    borderline: [4, 8, 5, 7, 4],
    over: [3, 10, 4, 11, 3],
  }
  const bars = heights[band]
  return (
    <svg
      className={styles.wave}
      viewBox="0 0 14 12"
      aria-hidden="true"
      role="presentation"
    >
      {bars.map((h, idx) => (
        <rect
          key={idx}
          x={1 + idx * 3}
          y={(12 - h) / 2}
          width={1.6}
          height={h}
          rx={0.6}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}

export function ComplianceBandChip({
  band,
  label,
  className,
}: ComplianceBandChipProps) {
  const tone = SOUND_BAND_TONE[band]
  const text = label ?? SOUND_BAND_LABEL[band]

  // role="alert" is added at the wrap level for the "over" band so screen
  // readers announce the over-limit state without re-reading the chip text.
  return (
    <span
      className={`${styles.wrap} ${className ?? ""}`.trim()}
      role={band === "over" ? "alert" : undefined}
      aria-live={band === "over" ? "assertive" : undefined}
    >
      <span className={`${styles.glyph} ${TONE_CLASS[band]}`} aria-hidden="true">
        <WaveGlyph band={band} />
      </span>
      <Chip label={text} tone={tone} />
      {band === "over" ? <span className={styles.alertRing} aria-hidden="true" /> : null}
    </span>
  )
}

export default ComplianceBandChip
