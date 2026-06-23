import { DonutChart, type DonutSegment } from "../charts/donut-chart"
import { RadialMeter } from "../charts/radial-meter"
import { Chip } from "../primitives/chip"

import styles from "./fleet-utilization-gauge.module.css"

export interface FleetBreakdown {
  active: number
  workshop: number
  reserved: number
  offRoad: number
}

interface FleetUtilizationGaugeProps {
  breakdown: FleetBreakdown
  /** Optional period label (e.g. "Past 7 days"). */
  periodLabel?: string
  className?: string
}

export function FleetUtilizationGauge({
  breakdown,
  periodLabel,
  className,
}: FleetUtilizationGaugeProps) {
  const total =
    breakdown.active + breakdown.workshop + breakdown.reserved + breakdown.offRoad
  const utilisation = total > 0 ? Math.round((breakdown.active / total) * 100) : 0

  const segments: DonutSegment[] = [
    { label: "Active", value: breakdown.active, tone: "green" },
    { label: "Workshop", value: breakdown.workshop, tone: "amber" },
    { label: "Reserved", value: breakdown.reserved, tone: "teal" },
    { label: "Off-road", value: breakdown.offRoad, tone: "red" },
  ]
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const utilisationTone: "green" | "amber" | "red" | "teal" =
    utilisation >= 75 ? "green" : utilisation >= 50 ? "teal" : utilisation >= 30 ? "amber" : "red"

  return (
    <section
      className={classes}
      role="meter"
      aria-valuenow={utilisation}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Fleet utilisation ${utilisation} percent`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Fleet utilisation</span>
          <strong className={styles.value}>{utilisation}%</strong>
          {periodLabel ? <span className={styles.period}>{periodLabel}</span> : null}
        </div>
        <Chip label={`Fleet · ${total} vehicles`} tone="neutral" />
      </header>

      <div className={styles.meterRow}>
        <RadialMeter
          value={utilisation}
          label="Active"
          tone={utilisationTone}
          ariaLabel={`Fleet utilisation ${utilisation} percent`}
          size={150}
        />
        <DonutChart
          segments={segments}
          size={180}
          centerLabel={`${breakdown.active}/${total}`}
          centerCaption="In service"
          ariaLabel="Fleet status breakdown"
        />
      </div>
    </section>
  )
}

export default FleetUtilizationGauge
