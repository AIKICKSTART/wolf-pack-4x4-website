import { ProgressLinear } from "../primitives/progress-linear"
import { Chip } from "../primitives/chip"
import styles from "./feature-adoption-meter.module.css"

export interface FeatureAdoptionRow {
  id: string
  /** Feature name e.g. "Online booking" */
  feature: string
  /** Customers using the feature. */
  adopted: number
  /** Total addressable customers. */
  total: number
  /** Trend versus previous period, +/- whole numbers. */
  delta?: number
}

interface FeatureAdoptionMeterProps {
  rows: ReadonlyArray<FeatureAdoptionRow>
  caption?: string
  className?: string
}

function toneForRatio(ratio: number): "red" | "amber" | "teal" | "green" {
  if (ratio < 0.25) return "red"
  if (ratio < 0.55) return "amber"
  if (ratio < 0.8) return "teal"
  return "green"
}

export function FeatureAdoptionMeter({
  rows,
  caption = "Feature adoption across active customers",
  className,
}: FeatureAdoptionMeterProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={caption}>
      <header className={styles.head}>
        <span className={styles.kicker}>Adoption</span>
        <h3 className={styles.title}>{caption}</h3>
      </header>
      <ul className={styles.list} aria-label="Feature adoption ratios">
        {rows.map((row) => {
          const ratio = row.total > 0 ? row.adopted / row.total : 0
          const tone = toneForRatio(ratio)
          const pct = Math.round(ratio * 100)
          return (
            <li key={row.id} className={styles.row}>
              <div className={styles.rowHead}>
                <span className={styles.feature}>{row.feature}</span>
                <span className={styles.ratio}>
                  <span className={styles.adopted}>{row.adopted}</span>
                  <span className={styles.slash}>/</span>
                  <span className={styles.total}>{row.total}</span>
                  <span className={styles.pct}>· {pct}%</span>
                </span>
                {typeof row.delta === "number" && row.delta !== 0 ? (
                  <Chip
                    label={`${row.delta > 0 ? "+" : ""}${row.delta} mo/mo`}
                    tone={row.delta > 0 ? "green" : "red"}
                  />
                ) : null}
              </div>
              <ProgressLinear value={row.adopted} max={row.total || 1} tone={tone} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FeatureAdoptionMeter
