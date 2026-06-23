import {
  formatLiftPercent,
  formatPValue,
  formatSignificanceStars,
  significanceTier,
  type AbSignificanceTier,
} from "./ab-runtime-types"

import styles from "./primary-metric-tile.module.css"

export interface PrimaryMetricTileProps {
  /** Label, e.g. "Quote-accept rate". */
  label: string
  /** Value rendered as the headline number. */
  value: string
  /** Optional units, e.g. "%". */
  unit?: string
  /** Treatment lift relative to control, percent. */
  deltaPct?: number
  /** Optional p-value for the headline metric. */
  pValue?: number
  /** Optional badge or tag, e.g. "Primary". */
  tag?: string
  /** Optional helper text in the foot row. */
  helpText?: string
  className?: string
}

function deltaTone(delta: number | undefined): "up" | "down" | "flat" {
  if (delta === undefined || delta === 0) return "flat"
  return delta > 0 ? "up" : "down"
}

const DELTA_CLASS: Record<"up" | "down" | "flat", string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

const STAR_COUNT: Record<AbSignificanceTier, number> = {
  none: 0,
  one: 1,
  two: 2,
  three: 3,
}

export function PrimaryMetricTile({
  label,
  value,
  unit,
  deltaPct,
  pValue,
  tag = "Primary",
  helpText,
  className,
}: PrimaryMetricTileProps) {
  const tier = significanceTier(pValue)
  const stars = STAR_COUNT[tier]
  const direction = deltaTone(deltaPct)
  const classes = [styles.tile, className].filter(Boolean).join(" ")

  const ariaLabel = `${label}: ${value}${unit ?? ""}${
    deltaPct !== undefined ? `, change ${formatLiftPercent(deltaPct)}` : ""
  }${pValue !== undefined ? `, ${formatPValue(pValue)}` : ""}`

  return (
    <article
      className={classes}
      role="group"
      aria-label={ariaLabel}
    >
      <header className={styles.head}>
        <span>{label}</span>
        <span className={styles.tag} aria-hidden="true">
          {tag}
        </span>
      </header>

      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {unit ? <span className={styles.unit}>{unit}</span> : null}
      </div>

      <div className={styles.deltaRow}>
        <span className={`${styles.delta} ${DELTA_CLASS[direction]}`}>
          {deltaPct !== undefined ? formatLiftPercent(deltaPct) : "—"}
        </span>
        <span className={styles.stars} aria-label={
          stars === 0
            ? "Not statistically significant"
            : `Significance tier ${stars} of 3`
        }>
          <span className={stars >= 1 ? styles.star : styles.starOff}>★</span>
          <span className={stars >= 2 ? styles.star : styles.starOff}>★</span>
          <span className={stars >= 3 ? styles.star : styles.starOff}>★</span>
          {stars > 0 ? (
            <span aria-hidden="true" style={{ marginLeft: "var(--primitive-space-1)" }}>
              {formatSignificanceStars(tier)}
            </span>
          ) : null}
        </span>
      </div>

      <footer className={styles.foot}>
        <span>{pValue !== undefined ? formatPValue(pValue) : "Awaiting data"}</span>
        {helpText ? <span>{helpText}</span> : null}
      </footer>
    </article>
  )
}

export default PrimaryMetricTile
