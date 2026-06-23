import { Chip } from "../primitives/chip"

import {
  formatAud,
  formatAudCompact,
  regionLabel,
  type AwsRegion,
  type RegionSpendCell,
} from "./cloud-costs-types"
import styles from "./region-cost-heatmap.module.css"

export interface RegionCostHeatmapProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Spend per region. */
  cells: ReadonlyArray<RegionSpendCell>
  className?: string
}

/**
 * Approximate map coordinates (x left%, y top%) for AWS regions.
 * Drawn on a stylised world plate — purely visual.
 */
const REGION_COORDS: Record<AwsRegion, { x: number; y: number }> = {
  "ap-southeast-2": { x: 85, y: 76 }, // Sydney
  "ap-southeast-4": { x: 80, y: 80 }, // Melbourne
  "ap-southeast-1": { x: 75, y: 56 }, // Singapore
  "us-east-1": { x: 24, y: 38 }, // N. Virginia
  "us-west-2": { x: 13, y: 34 }, // Oregon
  "eu-west-1": { x: 46, y: 26 }, // Ireland
}

function spendTone(
  spend: number,
  max: number
): "red" | "amber" | "teal" | "green" {
  if (max <= 0) {
    return "green"
  }
  const ratio = spend / max
  if (ratio > 0.75) {
    return "red"
  }
  if (ratio > 0.45) {
    return "amber"
  }
  if (ratio > 0.2) {
    return "teal"
  }
  return "green"
}

export function RegionCostHeatmap({
  periodLabel,
  cells,
  className,
}: RegionCostHeatmapProps) {
  const max = cells.reduce((acc, cell) => (cell.spend > acc ? cell.spend : acc), 0)
  const total = cells.reduce((sum, cell) => sum + cell.spend, 0)
  const heaviest = cells.length > 0
    ? [...cells].sort((a, b) => b.spend - a.spend)[0]
    : null

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Region cost heatmap for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Region heatmap · {periodLabel}</span>
          <h3 className={styles.title}>Spend by region</h3>
        </div>
        <div className={styles.headRight}>
          {heaviest ? (
            <Chip
              label={`Heaviest ${heaviest.label} ${formatAudCompact(heaviest.spend)}`}
              tone="red"
            />
          ) : null}
          <span className={styles.total}>{formatAudCompact(total)}</span>
        </div>
      </header>

      <div className={styles.map} aria-hidden="true">
        <div className={styles.mapGrid} />
        {cells.map((cell) => {
          const coord = REGION_COORDS[cell.region]
          const tone = spendTone(cell.spend, max)
          const ratio = max > 0 ? cell.spend / max : 0
          const dotSize = 18 + ratio * 22
          return (
            <span
              key={cell.region}
              className={styles.dotWrap}
              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
            >
              <span
                className={styles.dot}
                data-tone={tone}
                style={{ width: dotSize, height: dotSize }}
              />
              <span className={styles.label} data-tone={tone}>
                {cell.label}
              </span>
            </span>
          )
        })}
      </div>

      <ul className={styles.list}>
        {cells.map((cell) => {
          const tone = spendTone(cell.spend, max)
          const pct = total > 0 ? (cell.spend / total) * 100 : 0
          return (
            <li key={cell.region} className={styles.row}>
              <span className={styles.swatch} data-tone={tone} aria-hidden="true" />
              <span className={styles.regionLabel}>{regionLabel(cell.region)}</span>
              <span className={styles.regionPct}>{pct.toFixed(1)}%</span>
              <span className={styles.regionSpend}>{formatAud(cell.spend)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RegionCostHeatmap
