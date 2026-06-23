import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import type { CSSProperties } from "react"

import { Sparkline } from "../charts/sparkline"
import {
  KPI_PERIOD_LABEL,
  adminToneToSpark,
  adminToneToVar,
  type KpiDelta,
  type KpiTileData,
} from "./admin-hub-types"

import styles from "./kpi-tile.module.css"

interface KpiTileProps {
  kpi: KpiTileData
  className?: string
}

function DeltaIcon({ direction }: { direction: KpiDelta }) {
  if (direction === "up") {
    return <ArrowUpRight size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  if (direction === "down") {
    return <ArrowDownRight size={12} strokeWidth={2.4} aria-hidden="true" />
  }
  return <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
}

const DIRECTION_CLASS: Record<KpiDelta, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

export function KpiTile({ kpi, className }: KpiTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")
  const direction = kpi.deltaDirection ?? "flat"
  const sparkTone = adminToneToSpark(kpi.tone)
  const periodLabel = KPI_PERIOD_LABEL[kpi.period]
  const a11yValue = [kpi.value, kpi.unit].filter(Boolean).join(" ")
  const a11yLabel = `${kpi.label}: ${a11yValue}${
    kpi.delta ? `, ${direction} ${kpi.delta}` : ""
  }, ${periodLabel.toLowerCase()}`

  return (
    <article
      className={classes}
      aria-label={a11yLabel}
      style={{ "--tile-tone": adminToneToVar(kpi.tone) } as CSSProperties}
    >
      <header className={styles.head}>
        <span className={styles.label}>{kpi.label}</span>
        <span className={styles.periodChip} aria-label={`Period: ${periodLabel}`}>
          {periodLabel}
        </span>
      </header>

      <div className={styles.body}>
        <strong className={styles.value}>
          {kpi.value}
          {kpi.unit && <em className={styles.unit}>{kpi.unit}</em>}
        </strong>
        {kpi.delta && (
          <span
            className={[styles.delta, DIRECTION_CLASS[direction]].join(" ")}
            aria-hidden="true"
          >
            <DeltaIcon direction={direction} />
            <span>{kpi.delta}</span>
          </span>
        )}
      </div>

      <div className={styles.spark}>
        <Sparkline
          points={[...kpi.trend]}
          tone={sparkTone}
          area
          ariaLabel={`${kpi.label} trend across ${kpi.trend.length} samples`}
          height={48}
          width={220}
        />
      </div>

      {kpi.caption && <footer className={styles.caption}>{kpi.caption}</footer>}
    </article>
  )
}

export default KpiTile
