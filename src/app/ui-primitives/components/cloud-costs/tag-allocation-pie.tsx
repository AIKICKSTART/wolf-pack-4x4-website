import { Chip } from "../primitives/chip"
import { DonutChart, type DonutSegment, type DonutTone } from "../charts/donut-chart"

import {
  allocationTagLabel,
  formatAud,
  formatAudCompact,
  type AllocationSegment,
  type AllocationTag,
  type CloudTone,
} from "./cloud-costs-types"
import styles from "./tag-allocation-pie.module.css"

export interface TagAllocationPieProps {
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Tag dimension being allocated. */
  tagDimension: AllocationTag
  /** Allocation segments. */
  segments: ReadonlyArray<AllocationSegment>
  /** AUD value treated as untagged spend (drawn as a chip warning). */
  untaggedAud?: number
  className?: string
}

function toDonutTone(tone: CloudTone): DonutTone {
  if (tone === "neutral") {
    return "teal"
  }
  return tone
}

export function TagAllocationPie({
  periodLabel,
  tagDimension,
  segments,
  untaggedAud = 0,
  className,
}: TagAllocationPieProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)
  const donutSegments: DonutSegment[] = segments.map((seg) => ({
    label: seg.label,
    value: seg.value,
    tone: toDonutTone(seg.tone),
  }))
  const tagLabel = allocationTagLabel(tagDimension)
  const untaggedPct = total > 0 ? (untaggedAud / (total + untaggedAud)) * 100 : 0

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Spend by ${tagLabel} for ${periodLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Allocation · {tagLabel}</span>
          <h3 className={styles.title}>Spend by {tagLabel.toLowerCase()}</h3>
          <span className={styles.meta}>Period {periodLabel}</span>
        </div>
        {untaggedAud > 0 ? (
          <Chip
            label={`Untagged ${formatAudCompact(untaggedAud)} (${untaggedPct.toFixed(0)}%)`}
            tone="amber"
          />
        ) : null}
      </header>

      <div className={styles.body}>
        <div className={styles.chart}>
          <DonutChart
            segments={donutSegments}
            ariaLabel={`Allocation pie chart for ${tagLabel}`}
            centerLabel={formatAudCompact(total)}
            centerCaption="Allocated"
            size={220}
            thickness={32}
          />
        </div>

        <ul className={styles.list}>
          {segments.map((seg) => {
            const pct = total > 0 ? (seg.value / total) * 100 : 0
            return (
              <li key={seg.label} className={styles.row}>
                <span className={styles.swatch} data-tone={toDonutTone(seg.tone)} aria-hidden="true" />
                <span className={styles.rowLabel}>{seg.label}</span>
                <span className={styles.rowPct}>{pct.toFixed(1)}%</span>
                <span className={styles.rowSpend}>{formatAud(seg.value)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default TagAllocationPie
