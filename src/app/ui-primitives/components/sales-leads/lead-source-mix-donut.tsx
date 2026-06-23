import { DonutChart } from "../charts/donut-chart"
import type { DonutSegment } from "../charts/donut-chart"
import { LEAD_SOURCE_LABEL, type LeadSource } from "./sales-leads-types"

import styles from "./lead-source-mix-donut.module.css"

export interface LeadSourceMixDatum {
  source: LeadSource
  count: number
}

interface LeadSourceMixDonutProps {
  data: ReadonlyArray<LeadSourceMixDatum>
  /** Optional override pixel size of the donut. */
  size?: number
  /** Center label override; defaults to total count. */
  centerLabel?: string
  centerCaption?: string
  className?: string
}

// Map each lead source onto one of the four donut tones, mixing intentionally
// so adjacent slices contrast visually.
const SOURCE_TO_DONUT_TONE: Record<
  LeadSource,
  DonutSegment["tone"]
> = {
  website: "teal",
  phone: "amber",
  "walk-in": "green",
  referral: "green",
  social: "amber",
  ad: "red",
}

export function LeadSourceMixDonut({
  data,
  size = 240,
  centerLabel,
  centerCaption = "Leads / 30d",
  className,
}: LeadSourceMixDonutProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  const segments: DonutSegment[] = data.map((item) => ({
    label: LEAD_SOURCE_LABEL[item.source],
    value: item.count,
    tone: SOURCE_TO_DONUT_TONE[item.source],
  }))

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <div className={classes} aria-label="Lead source mix over the last 30 days">
      <DonutChart
        segments={segments}
        size={size}
        ariaLabel={`Lead source mix: ${total} total leads`}
        centerLabel={centerLabel ?? total.toString()}
        centerCaption={centerCaption}
      />
    </div>
  )
}

export default LeadSourceMixDonut
