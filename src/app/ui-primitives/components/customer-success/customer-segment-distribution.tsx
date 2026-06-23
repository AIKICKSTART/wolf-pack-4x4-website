import { DonutChart, type DonutSegment } from "../charts/donut-chart"
import {
  SEGMENT_LABEL,
  type CustomerSuccessSegment,
} from "./cs-types"
import styles from "./customer-segment-distribution.module.css"

export interface CustomerSegmentSlice {
  segment: CustomerSuccessSegment
  count: number
}

interface CustomerSegmentDistributionProps {
  slices: ReadonlyArray<CustomerSegmentSlice>
  className?: string
}

const SEGMENT_DONUT_TONE: Record<CustomerSuccessSegment, "red" | "amber" | "teal" | "green"> = {
  strategic: "teal",
  growth: "green",
  retention: "amber",
  "win-back": "red",
}

export function CustomerSegmentDistribution({
  slices,
  className,
}: CustomerSegmentDistributionProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const total = slices.reduce((s, slice) => s + slice.count, 0)
  const segments: DonutSegment[] = slices.map((slice) => ({
    label: SEGMENT_LABEL[slice.segment],
    value: slice.count,
    tone: SEGMENT_DONUT_TONE[slice.segment],
  }))

  return (
    <section className={classes} aria-label="Customer segment distribution">
      <header className={styles.head}>
        <span className={styles.kicker}>Segment mix</span>
        <h3 className={styles.title}>Book of business</h3>
      </header>
      <DonutChart
        segments={segments}
        size={220}
        thickness={28}
        ariaLabel={`${total} customers split by segment: ${slices
          .map((s) => `${SEGMENT_LABEL[s.segment]} ${s.count}`)
          .join(", ")}`}
        centerLabel={String(total)}
        centerCaption="customers"
      />
    </section>
  )
}

export default CustomerSegmentDistribution
