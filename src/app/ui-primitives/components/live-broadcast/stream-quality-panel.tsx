import { Activity, AlertOctagon, CheckCircle2, Waves } from "lucide-react"
import type { ReactNode } from "react"

import { Sparkline } from "../charts/sparkline"

import styles from "./stream-quality-panel.module.css"
import type { StreamHealth, StreamHealthSnapshot } from "./live-broadcast-types"

interface StreamQualityPanelProps {
  snapshot: StreamHealthSnapshot
  className?: string
}

const HEALTH_LABEL: Record<StreamHealth, string> = {
  excellent: "Excellent",
  good: "Stable",
  degraded: "Degraded",
  critical: "At risk",
}

const HEALTH_ICON: Record<StreamHealth, ReactNode> = {
  excellent: <CheckCircle2 size={14} strokeWidth={2.2} aria-hidden="true" />,
  good: <CheckCircle2 size={14} strokeWidth={2.2} aria-hidden="true" />,
  degraded: <AlertOctagon size={14} strokeWidth={2.2} aria-hidden="true" />,
  critical: <AlertOctagon size={14} strokeWidth={2.2} aria-hidden="true" />,
}

export function StreamQualityPanel({ snapshot, className }: StreamQualityPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const droppedPercent = (snapshot.droppedRatio * 100).toFixed(2)
  const audioPercent = Math.round(snapshot.audioLevel * 100)
  const audioSegmentCount = 12
  const audioActiveCount = Math.round(audioSegmentCount * snapshot.audioLevel)
  const audioSegments = Array.from({ length: audioSegmentCount }, (_, idx) => idx < audioActiveCount)

  return (
    <section className={classes} aria-label="Stream quality monitor">
      <header className={styles.head}>
        <span className={styles.kicker}>Encoder health</span>
        <span
          className={[styles.healthBadge, styles[`health-${snapshot.health}`]].join(" ")}
          aria-label={`Health: ${HEALTH_LABEL[snapshot.health]}`}
        >
          {HEALTH_ICON[snapshot.health]} {HEALTH_LABEL[snapshot.health]}
        </span>
      </header>

      <div className={styles.metrics}>
        <article className={styles.metric} aria-label="Bitrate">
          <span className={styles.metricLabel}>
            <Activity size={11} strokeWidth={2.4} aria-hidden="true" />
            Bitrate
          </span>
          <span className={styles.metricValue}>
            <span className={styles.bigNumber}>{snapshot.bitrateKbps.toLocaleString("en-AU")}</span>
            <span className={styles.metricUnit}>kbps</span>
          </span>
          <span className={styles.metricSub}>{snapshot.resolutionLabel} · {snapshot.fps} fps</span>
        </article>

        <article className={styles.metric} aria-label="Dropped frames">
          <span className={styles.metricLabel}>Dropped</span>
          <span className={styles.metricValue}>
            <span className={styles.bigNumber}>{droppedPercent}</span>
            <span className={styles.metricUnit}>%</span>
          </span>
          <span className={styles.metricSub}>last 60s rolling</span>
        </article>

        <article className={styles.metric} aria-label="Audio level">
          <span className={styles.metricLabel}>
            <Waves size={11} strokeWidth={2.4} aria-hidden="true" />
            Audio
          </span>
          <span className={styles.metricValue}>
            <span className={styles.bigNumber}>{audioPercent}</span>
            <span className={styles.metricUnit}>%</span>
          </span>
          <div className={styles.audioBars} aria-hidden="true">
            {audioSegments.map((isActive, idx) => (
              <span
                key={idx}
                className={[styles.audioBar, isActive ? styles.audioBarOn : ""].filter(Boolean).join(" ")}
              />
            ))}
          </div>
        </article>
      </div>

      <div className={styles.chartBlock}>
        <div className={styles.chartHead}>
          <span className={styles.chartLabel}>Bitrate · last 24 samples</span>
          <span className={styles.chartRange}>
            min {Math.min(...snapshot.bitrateHistory).toLocaleString("en-AU")} /
            max {Math.max(...snapshot.bitrateHistory).toLocaleString("en-AU")}
          </span>
        </div>
        <div className={styles.chartFrame}>
          <Sparkline
            points={[...snapshot.bitrateHistory]}
            tone={snapshot.health === "critical" ? "red" : snapshot.health === "degraded" ? "amber" : "teal"}
            width={420}
            height={70}
            ariaLabel="Bitrate sparkline over last 24 samples"
          />
        </div>
      </div>
    </section>
  )
}

export default StreamQualityPanel
