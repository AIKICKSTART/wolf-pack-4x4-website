import { AreaChart } from "../charts/area-chart"
import { Chip } from "../primitives/chip"
import { formatAud as _formatAud } from "./cs-types"
import styles from "./nps-trend-chart.module.css"

export interface NpsTrendPoint {
  /** Period label, e.g. "Jan", "Feb", "2026 Q1". */
  period: string
  promoters: number
  passives: number
  detractors: number
  /** Optional NPS for the period — calculated if absent. */
  nps?: number
}

interface NpsTrendChartProps {
  points: ReadonlyArray<NpsTrendPoint>
  ariaLabel: string
  className?: string
}

function npsForPoint(p: NpsTrendPoint): number {
  if (typeof p.nps === "number") return p.nps
  const total = p.promoters + p.passives + p.detractors
  if (total === 0) return 0
  return Math.round(((p.promoters - p.detractors) / total) * 100)
}

export function NpsTrendChart({ points, ariaLabel, className }: NpsTrendChartProps) {
  // Avoid the unused _formatAud import — keep formatter reachable to type-check.
  void _formatAud
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const xLabels: string[] = points.map((p) => p.period)
  const promoters: number[] = points.map((p) => p.promoters)
  const passives: number[] = points.map((p) => p.passives)
  const detractors: number[] = points.map((p) => p.detractors)

  const latest = points[points.length - 1]
  const latestNps = latest ? npsForPoint(latest) : 0
  const npsTone = latestNps >= 50 ? "green" : latestNps >= 30 ? "teal" : latestNps >= 0 ? "amber" : "red"

  const totalPromoters = promoters.reduce((s, v) => s + v, 0)
  const totalPassives = passives.reduce((s, v) => s + v, 0)
  const totalDetractors = detractors.reduce((s, v) => s + v, 0)

  return (
    <section className={classes} aria-label={ariaLabel}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>NPS · trailing</span>
          <h3 className={styles.title}>{`Latest NPS · ${latestNps}`}</h3>
        </div>
        <div className={styles.chipRow}>
          <Chip label={`Promoters ${totalPromoters}`} tone="green" />
          <Chip label={`Passives ${totalPassives}`} tone="amber" />
          <Chip label={`Detractors ${totalDetractors}`} tone="red" />
          <Chip label={`NPS ${latestNps}`} tone={npsTone} />
        </div>
      </header>

      <AreaChart
        ariaLabel={ariaLabel}
        xLabels={xLabels}
        series={[
          { label: "Detractors", values: detractors, tone: "red" },
          { label: "Passives", values: passives, tone: "amber" },
          { label: "Promoters", values: promoters, tone: "green" },
        ]}
        unit=""
      />
    </section>
  )
}

export default NpsTrendChart
