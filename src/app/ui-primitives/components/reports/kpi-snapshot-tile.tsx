"use client"

import type { ReactNode } from "react"

import type { KpiTone } from "./reports-types"
import styles from "./kpi-snapshot-tile.module.css"

interface KpiSnapshotTileProps {
  label: string
  value: string
  unit?: string
  deltaLabel?: string
  deltaTone?: KpiTone
  comparisonLabel?: string
  spark?: ReactNode
  onDrillDown?: () => void
  className?: string
}

const DELTA_CLASS: Record<KpiTone, string> = {
  neutral: styles.deltaNeutral,
  positive: styles.deltaPositive,
  negative: styles.deltaNegative,
  warning: styles.deltaWarning,
}

const DELTA_GLYPH: Record<KpiTone, string> = {
  neutral: "→",
  positive: "▲",
  negative: "▼",
  warning: "!",
}

export function KpiSnapshotTile({
  label,
  value,
  unit,
  deltaLabel,
  deltaTone = "neutral",
  comparisonLabel,
  spark,
  onDrillDown,
  className,
}: KpiSnapshotTileProps) {
  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <button
      type="button"
      className={classes}
      onClick={onDrillDown}
      aria-label={`${label}: ${value}${unit ? ` ${unit}` : ""}. Drill down.`}
    >
      <div className={styles.label}>
        <span>{label}</span>
        <span className={styles.drill} aria-hidden="true">
          ↳
        </span>
      </div>
      <div className={styles.value}>
        <span className={styles.valueText}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      <div className={styles.compareRow}>
        {deltaLabel && (
          <span
            className={`${styles.delta} ${DELTA_CLASS[deltaTone]}`}
            role="status"
            aria-live="polite"
          >
            <span aria-hidden="true">{DELTA_GLYPH[deltaTone]}</span>
            {deltaLabel}
          </span>
        )}
        {comparisonLabel && <span className={styles.comparison}>{comparisonLabel}</span>}
      </div>
      {spark && <div className={styles.sparkSlot}>{spark}</div>}
    </button>
  )
}

export default KpiSnapshotTile
