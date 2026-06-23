import { Chip } from "../primitives/chip"
import { DonutChart, type DonutSegment, type DonutTone } from "../charts/donut-chart"

import {
  formatAud,
  formatAudCompact,
  serviceTone,
  type AwsService,
  type ServiceSpendRow,
} from "./cloud-costs-types"
import styles from "./cost-by-service-donut.module.css"

export interface CostByServiceDonutProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Per-service spend rows. */
  rows: ReadonlyArray<ServiceSpendRow>
  className?: string
}

function donutTone(service: AwsService): DonutTone {
  const tone = serviceTone(service)
  // DonutChart only allows the four chart tones; neutral mapped to teal.
  if (tone === "neutral") {
    return "teal"
  }
  return tone
}

export function CostByServiceDonut({
  periodLabel,
  rows,
  className,
}: CostByServiceDonutProps) {
  const total = rows.reduce((sum, row) => sum + row.spend, 0)
  const topService = rows.length > 0 ? [...rows].sort((a, b) => b.spend - a.spend)[0] : null

  const segments: DonutSegment[] = rows.map((row) => ({
    label: row.service,
    value: row.spend,
    tone: donutTone(row.service),
  }))

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Spend by AWS service for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Spend split · {periodLabel}</span>
          <h3 className={styles.title}>Spend by AWS service</h3>
        </div>
        {topService ? (
          <Chip
            label={`Top: ${topService.service} ${formatAudCompact(topService.spend)}`}
            tone={serviceTone(topService.service)}
          />
        ) : null}
      </header>

      <div className={styles.chart}>
        <DonutChart
          segments={segments}
          ariaLabel={`Spend by service donut chart for ${periodLabel}`}
          centerLabel={formatAudCompact(total)}
          centerCaption="Total spend"
          size={220}
          thickness={28}
        />
      </div>

      <ul className={styles.list}>
        {rows.map((row) => {
          const pct = total > 0 ? (row.spend / total) * 100 : 0
          return (
            <li key={row.service} className={styles.row}>
              <span
                className={styles.swatch}
                aria-hidden="true"
                data-tone={serviceTone(row.service)}
              />
              <span className={styles.service}>{row.service}</span>
              <span className={styles.pct}>{pct.toFixed(1)}%</span>
              <span className={styles.spend}>{formatAud(row.spend)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CostByServiceDonut
