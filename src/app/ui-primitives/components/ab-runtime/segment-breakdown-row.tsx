import type { CSSProperties } from "react"

import {
  SEGMENT_LABEL,
  formatLiftPercent,
  formatSampleSize,
  type AbSegmentKey,
} from "./ab-runtime-types"

import styles from "./segment-breakdown-row.module.css"

export interface SegmentBreakdownRowProps {
  /** Segment key — picks the label and glyph. */
  segment: AbSegmentKey
  /** Lift percent for this segment. */
  liftPct: number
  /** Sample size in this segment. */
  sampleSize: number
  /** Maximum |lift| across siblings for normalising the bar (defaults to 50). */
  maxAbsLift?: number
  /** Optional short tag, e.g. "p<0.05". */
  pTag?: string
  className?: string
}

const SEGMENT_GLYPH: Record<AbSegmentKey, string> = {
  mobile: "MOB",
  desktop: "WEB",
  ios: "iOS",
  android: "AND",
  au: "AU",
  nz: "NZ",
}

export function SegmentBreakdownRow({
  segment,
  liftPct,
  sampleSize,
  maxAbsLift = 50,
  pTag,
  className,
}: SegmentBreakdownRowProps) {
  const clampedMax = Math.max(0.0001, maxAbsLift)
  const ratio = Math.max(-1, Math.min(1, liftPct / clampedMax))
  const halfWidthPct = `${Math.abs(ratio) * 50}%`
  const isUp = liftPct > 0
  const isFlat = liftPct === 0

  const fillStyle: CSSProperties = isUp
    ? { width: halfWidthPct }
    : { width: halfWidthPct }

  const classes = [styles.row, className].filter(Boolean).join(" ")
  const liftClass = isFlat
    ? styles.liftFlat
    : isUp
      ? styles.liftUp
      : styles.liftDown

  return (
    <div
      className={classes}
      role="row"
      aria-label={`${SEGMENT_LABEL[segment]} lift ${formatLiftPercent(liftPct)} on ${formatSampleSize(sampleSize)} subjects`}
    >
      <span className={styles.label}>
        <span className={styles.glyph} aria-hidden="true">
          {SEGMENT_GLYPH[segment]}
        </span>
        {SEGMENT_LABEL[segment]}
      </span>
      <div
        className={styles.bar}
        aria-hidden="true"
      >
        <span
          className={[
            styles.barFill,
            isUp ? styles.barFillUp : styles.barFillDown,
          ].join(" ")}
          style={fillStyle}
        />
        <span className={styles.barAxis} />
      </div>
      <span className={`${styles.lift} ${liftClass}`}>
        {formatLiftPercent(liftPct)}
        {pTag ? ` · ${pTag}` : ""}
      </span>
      <span className={styles.sample}>n {formatSampleSize(sampleSize)}</span>
    </div>
  )
}

export default SegmentBreakdownRow
