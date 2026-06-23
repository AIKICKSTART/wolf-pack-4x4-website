import * as React from "react"

import { RadialMeter, type RadialTone } from "./radial-meter"

import styles from "./gauge-cluster.module.css"

export interface GaugeClusterDatum {
  label: string
  value: number
  max?: number
  unit?: string
  tone: RadialTone
}

interface GaugeClusterProps {
  /** Exactly three radial gauges arranged left-center-right. */
  gauges: readonly [GaugeClusterDatum, GaugeClusterDatum, GaugeClusterDatum]
  ariaLabel: string
  /** Optional shared kicker rendered above the row. */
  kicker?: string
  /** Optional shared scale labels rendered below the row (e.g. ["Low", "Target", "Peak"]). */
  scaleLabels?: readonly [string, string, string]
}

export function GaugeCluster({ gauges, ariaLabel, kicker, scaleLabels }: GaugeClusterProps) {
  return (
    <div className={styles.cluster} role="group" aria-label={ariaLabel}>
      {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
      <div className={styles.row}>
        {gauges.map((g, idx) => (
          <div key={g.label + idx} className={styles.cell}>
            <RadialMeter
              value={g.value}
              max={g.max ?? 100}
              label={g.label}
              tone={g.tone}
              unit={g.unit ?? "%"}
              ariaLabel={`${g.label} ${g.value}${g.unit ?? "%"} of ${g.max ?? 100}`}
            />
          </div>
        ))}
      </div>
      {scaleLabels ? (
        <div className={styles.scale} aria-hidden="true">
          {scaleLabels.map((label, idx) => (
            <span key={label + idx}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
