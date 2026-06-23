import {
  REGION_LABEL,
  REGION_SHORT,
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  type RegionId,
  type ServiceStatus,
  type StatusTone,
} from "./status-types"
import styles from "./region-status-grid.module.css"

export interface RegionStatusEntry {
  region: RegionId
  status: ServiceStatus
  /** Median latency in ms for the region. */
  latencyMs: number
  /** Optional secondary metric, e.g. "98 services". */
  meta?: string
}

export interface RegionStatusGridProps {
  regions: ReadonlyArray<RegionStatusEntry>
  caption?: string
  className?: string
}

const TONE_CLASS: Record<StatusTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

function latencyTone(ms: number, status: ServiceStatus): StatusTone {
  if (status === "major-outage") return "red"
  if (status === "partial-outage") return "amber"
  if (ms >= 600) return "red"
  if (ms >= 300) return "amber"
  if (ms >= 150) return "teal"
  return "green"
}

export function RegionStatusGrid({
  regions,
  caption,
  className,
}: RegionStatusGridProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption ?? "Region status grid"}
    >
      {caption ? <h3 className={styles.caption}>{caption}</h3> : null}
      <ul className={styles.grid}>
        {regions.map((entry) => {
          const statusTone = SERVICE_STATUS_TONE[entry.status]
          const lTone = latencyTone(entry.latencyMs, entry.status)
          return (
            <li
              key={entry.region}
              className={[styles.cell, TONE_CLASS[statusTone]].join(" ")}
            >
              <header className={styles.cellHead}>
                <span className={styles.short}>{REGION_SHORT[entry.region]}</span>
                <span
                  className={[styles.dot, TONE_CLASS[statusTone]].join(" ")}
                  aria-label={SERVICE_STATUS_LABEL[entry.status]}
                />
              </header>
              <p className={styles.label}>{REGION_LABEL[entry.region]}</p>
              <footer className={styles.foot}>
                <span className={[styles.latency, TONE_CLASS[lTone]].join(" ")}>
                  {entry.latencyMs}ms
                </span>
                {entry.meta ? (
                  <span className={styles.meta}>{entry.meta}</span>
                ) : null}
              </footer>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default RegionStatusGrid
