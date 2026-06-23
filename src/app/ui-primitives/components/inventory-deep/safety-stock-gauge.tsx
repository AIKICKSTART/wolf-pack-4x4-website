import { ProgressRadial } from "../primitives/progress-radial"
import { Chip } from "../primitives/chip"

import styles from "./safety-stock-gauge.module.css"

export interface SafetyStockGaugeProps {
  /** SKU label. */
  sku: string
  /** Friendly part title. */
  title: string
  /** Current units on hand. */
  current: number
  /** Safety stock minimum (in units). */
  safetyStock: number
  /** Daily demand in units. */
  dailyDemand: number
  /** Optional radial size. */
  size?: "md" | "lg"
}

function tone(current: number, safety: number): "red" | "amber" | "green" {
  if (current < safety) return "red"
  if (current < safety * 1.5) return "amber"
  return "green"
}

function toneLabel(t: "red" | "amber" | "green"): string {
  if (t === "red") return "Below safety"
  if (t === "amber") return "Buffer thin"
  return "Above safety"
}

export function SafetyStockGauge({
  sku,
  title,
  current,
  safetyStock,
  dailyDemand,
  size = "lg",
}: SafetyStockGaugeProps) {
  const safeDemand = Math.max(dailyDemand, 0.01)
  const ratioCap = Math.max(safetyStock * 3, current, 1)
  const t = tone(current, safetyStock)
  const daysOfCover = Math.round(current / safeDemand)

  return (
    <article
      className={styles.wrap}
      aria-label={`Safety stock gauge for ${sku} — ${toneLabel(t)}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Safety stock</span>
        <h3 className={styles.title}>{sku}</h3>
        <span className={styles.subtitle}>{title}</span>
      </header>

      <div className={styles.gaugeRow}>
        <ProgressRadial
          value={current}
          max={ratioCap}
          tone={t}
          size={size}
          showLabel
          label={`${current} of ${ratioCap} cap`}
        />
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Current</dt>
            <dd>
              <span className={styles.statValue}>{current}</span>
              <span className={styles.statUnit}>units</span>
            </dd>
          </div>
          <div className={styles.stat}>
            <dt>Safety floor</dt>
            <dd>
              <span className={styles.statValue}>{safetyStock}</span>
              <span className={styles.statUnit}>units</span>
            </dd>
          </div>
          <div className={styles.stat}>
            <dt>Days of cover</dt>
            <dd>
              <span className={`${styles.statValue} ${styles[`tone${t[0].toUpperCase()}${t.slice(1)}`]}`}>
                {daysOfCover}
              </span>
              <span className={styles.statUnit}>days</span>
            </dd>
          </div>
        </dl>
      </div>

      <footer className={styles.foot}>
        <Chip label={toneLabel(t)} tone={t} />
        <span className={styles.demand}>
          Burn · {dailyDemand.toLocaleString("en-AU", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
          /day
        </span>
      </footer>
    </article>
  )
}

export default SafetyStockGauge
