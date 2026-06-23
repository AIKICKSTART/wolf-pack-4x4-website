import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./abc-analysis-tile.module.css"
import type { AbcClass } from "./inventory-deep-types"

export interface AbcAnalysisBand {
  /** ABC class — A=top, B=mid, C=tail. */
  klass: AbcClass
  /** SKU count in this class. */
  skuCount: number
  /** Share of total SKUs as decimal 0–1. */
  skuShare: number
  /** Revenue contribution as AUD. */
  revenue: number
  /** Share of total revenue as decimal 0–1. */
  revenueShare: number
}

export interface AbcAnalysisTileProps {
  /** Warehouse / segment label. */
  scopeLabel: string
  /** Bands in A→B→C order. */
  bands: ReadonlyArray<AbcAnalysisBand>
}

const KLASS_LABEL: Record<AbcClass, string> = {
  A: "Class A · core",
  B: "Class B · mid",
  C: "Class C · tail",
}

const KLASS_TONE: Record<AbcClass, "green" | "amber" | "teal"> = {
  A: "green",
  B: "amber",
  C: "teal",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercent(share: number): string {
  return `${Math.round(share * 100)}%`
}

export function AbcAnalysisTile({ scopeLabel, bands }: AbcAnalysisTileProps) {
  return (
    <article
      className={styles.wrap}
      aria-label={`ABC analysis for ${scopeLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>ABC analysis</span>
        <h3 className={styles.title}>{scopeLabel}</h3>
      </header>

      <ul className={styles.bands}>
        {bands.map((band) => (
          <li key={band.klass} className={styles.band}>
            <div className={styles.bandHead}>
              <span className={styles.bandLabel}>{KLASS_LABEL[band.klass]}</span>
              <span className={styles.bandRevenue}>{formatAud(band.revenue)}</span>
            </div>
            <ProgressLinear
              value={Math.round(band.revenueShare * 100)}
              max={100}
              tone={KLASS_TONE[band.klass]}
              variant="solid"
              label={`${band.klass} revenue share`}
            />
            <dl className={styles.bandMeta}>
              <div>
                <dt>SKUs</dt>
                <dd>
                  {band.skuCount}
                  <span className={styles.bandMetaShare}>
                    {" "}
                    · {formatPercent(band.skuShare)}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Revenue share</dt>
                <dd>{formatPercent(band.revenueShare)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default AbcAnalysisTile
