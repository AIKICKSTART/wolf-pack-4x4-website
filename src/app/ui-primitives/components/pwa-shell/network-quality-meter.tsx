import type { CSSProperties } from "react"

import type { PwaNetworkQuality } from "./pwa-shell-types"
import styles from "./network-quality-meter.module.css"

interface NetworkQualityMeterProps {
  quality: PwaNetworkQuality
  latencyMs?: number
  downKbps?: number
  upKbps?: number
  carrier?: string
  className?: string
}

const QUALITY_BARS: Record<PwaNetworkQuality, number> = {
  offline: 0,
  "2g": 1,
  "3g": 2,
  "4g": 3,
  "5g": 4,
  wifi: 4,
}

const QUALITY_LABEL: Record<PwaNetworkQuality, string> = {
  offline: "Offline",
  "2g": "2G",
  "3g": "3G",
  "4g": "4G LTE",
  "5g": "5G",
  wifi: "Wi-Fi",
}

const QUALITY_ROLE: Record<PwaNetworkQuality, string> = {
  offline: "No service",
  "2g": "Edge of coverage",
  "3g": "Patchy mobile",
  "4g": "Stable mobile",
  "5g": "Bay-grade speed",
  wifi: "Workshop AP",
}

const QUALITY_COLOR: Record<PwaNetworkQuality, string> = {
  offline: "var(--primitive-red)",
  "2g": "var(--primitive-red)",
  "3g": "var(--primitive-amber)",
  "4g": "var(--primitive-teal)",
  "5g": "var(--primitive-green)",
  wifi: "var(--primitive-teal)",
}

const BAR_HEIGHTS = [10, 16, 22, 28]

export function NetworkQualityMeter({
  quality,
  latencyMs,
  downKbps,
  upKbps,
  carrier,
  className,
}: NetworkQualityMeterProps) {
  const litCount = QUALITY_BARS[quality]
  const style: CSSProperties = {
    ["--tier-color" as string]: QUALITY_COLOR[quality],
  }
  const classes = [styles.root, className].filter(Boolean).join(" ")
  const isOffline = quality === "offline"

  return (
    <section
      className={classes}
      style={style}
      aria-label={`Network quality ${QUALITY_LABEL[quality]}`}
    >
      <header className={styles.head}>
        <div className={styles.label}>
          <span className={styles.kind}>{QUALITY_LABEL[quality]}</span>
          <span className={styles.role}>{carrier ?? QUALITY_ROLE[quality]}</span>
        </div>
        <span className={styles.tier}>
          {isOffline ? "Reconnect" : `${litCount}/4`}
        </span>
      </header>
      <div
        className={styles.bars}
        role="img"
        aria-label={`Signal ${litCount} of 4`}
      >
        {BAR_HEIGHTS.map((height, index) => {
          const lit = !isOffline && index < litCount
          const barClass = [
            styles.bar,
            lit ? styles.barLit : "",
            isOffline ? styles.barOffline : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <span
              key={index}
              className={barClass}
              style={{ height: `${height}px` }}
              aria-hidden="true"
            />
          )
        })}
      </div>
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Latency</span>
          <span className={styles.metricValue}>
            {isOffline ? "—" : `${latencyMs ?? 0}`}
            <span className={styles.metricUnit}> ms</span>
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Down</span>
          <span className={styles.metricValue}>
            {isOffline ? "—" : (downKbps ?? 0).toLocaleString("en-AU")}
            <span className={styles.metricUnit}> kbps</span>
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Up</span>
          <span className={styles.metricValue}>
            {isOffline ? "—" : (upKbps ?? 0).toLocaleString("en-AU")}
            <span className={styles.metricUnit}> kbps</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default NetworkQualityMeter
