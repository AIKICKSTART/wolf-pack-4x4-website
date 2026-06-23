import { Gauge } from "lucide-react"

import type { UsageCoverageDatum } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface UsageCoverageStripProps {
  data: ReadonlyArray<UsageCoverageDatum>
  className?: string
}

/**
 * Usage coverage strip — adoption % per primitive family. Built from a
 * simple list of `{ family, adopted, total }` records. Animated fill
 * respects reduced motion (handled inside the module CSS).
 */
export function UsageCoverageStrip({ data, className }: UsageCoverageStripProps) {
  const overall = data.reduce(
    (acc, datum) => ({
      adopted: acc.adopted + datum.adopted,
      total: acc.total + datum.total,
    }),
    { adopted: 0, total: 0 }
  )
  const overallPct = overall.total > 0
    ? Math.round((overall.adopted / overall.total) * 100)
    : 0

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label="Token adoption coverage"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Gauge size={12} aria-hidden="true" /> Umbrella · Coverage
          </span>
          <h3 className={styles.title}>Token adoption</h3>
          <p className={styles.subtitle}>
            Cascade reach across every primitive family.
          </p>
        </div>
        <span className={`${styles.tag} ${styles.tagGreen}`}>{overallPct}% overall</span>
      </header>

      <ul className={styles.coverageList} role="list">
        {data.map((datum) => {
          const pct = datum.total > 0 ? (datum.adopted / datum.total) * 100 : 0
          return (
            <li key={datum.family} className={styles.coverageRow}>
              <span className={styles.coverageLabel}>{datum.family}</span>
              <span
                className={styles.coverageBar}
                role="progressbar"
                aria-label={`${datum.family} coverage`}
                aria-valuenow={Math.round(pct)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className={styles.coverageBarFill}
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className={styles.coverageValue}>
                {datum.adopted}/{datum.total}
              </span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default UsageCoverageStrip
