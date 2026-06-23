import { ArrowDown, ArrowRight, ArrowUp, Fuel } from "lucide-react"

import { formatFuelPrice, type FuelGrade } from "./bay-display-types"
import styles from "./fuel-price-strip.module.css"

export type FuelTrend = "up" | "down" | "flat"

export interface FuelPriceRow {
  id: string
  /** Station label — "Albion Park Shell". */
  station: string
  grade: FuelGrade
  /** Cents per litre as decimal — 1.96 means $1.96/L. */
  perLitre: number
  trend?: FuelTrend
}

export interface FuelPriceStripProps {
  rows: ReadonlyArray<FuelPriceRow>
  /** Update-clock label — "as at 11:48 am". */
  asAt?: string
  className?: string
}

const TREND_LABEL: Readonly<Record<FuelTrend, string>> = {
  up: "Rising",
  down: "Falling",
  flat: "Steady",
}

function TrendIcon({ trend }: { trend: FuelTrend }) {
  if (trend === "up") return <ArrowUp size={14} strokeWidth={2.4} aria-hidden="true" />
  if (trend === "down") return <ArrowDown size={14} strokeWidth={2.4} aria-hidden="true" />
  return <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
}

export function FuelPriceStrip({
  rows,
  asAt,
  className,
}: FuelPriceStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Local fuel prices"
    >
      <header className={styles.head}>
        <span className={styles.titleWrap}>
          <Fuel size={20} strokeWidth={2.2} aria-hidden="true" />
          <strong>Fuel watch</strong>
        </span>
        {asAt && <span className={styles.asAt}>{asAt}</span>}
      </header>
      <ul className={styles.rows}>
        {rows.map((row) => {
          const trend = row.trend ?? "flat"
          return (
            <li key={row.id} className={styles.row} data-trend={trend}>
              <div className={styles.station}>
                <em>{row.station}</em>
                <strong>{row.grade}</strong>
              </div>
              <div className={styles.priceCell}>
                <strong className={styles.price}>
                  {formatFuelPrice(row.perLitre)}
                </strong>
                <span className={styles.unit}>/L</span>
              </div>
              <span className={styles.trend} aria-label={TREND_LABEL[trend]}>
                <TrendIcon trend={trend} />
                <em>{TREND_LABEL[trend]}</em>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FuelPriceStrip
