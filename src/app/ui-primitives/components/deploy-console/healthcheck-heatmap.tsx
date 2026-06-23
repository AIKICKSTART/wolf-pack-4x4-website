import {
  HEALTH_BUCKET_LABEL,
  type HealthBucket,
  type HealthcheckEndpoint,
} from "./deploy-console-types"
import styles from "./healthcheck-heatmap.module.css"
import shell from "./deploy-console.module.css"

export interface HealthcheckHeatmapProps {
  endpoints: ReadonlyArray<HealthcheckEndpoint>
  /** Heading rendered above the heatmap. */
  caption?: string
  /** Optional kicker rendered above the caption. */
  kicker?: string
  /** Label for the row legend axis. Defaults to "Hour of day (UTC)". */
  axisLabel?: string
  className?: string
}

const HOUR_TICKS: ReadonlyArray<number> = [0, 4, 8, 12, 16, 20]

const BUCKET_CLASS: Record<HealthBucket, string> = {
  ok: styles.bucketOk,
  warn: styles.bucketWarn,
  fail: styles.bucketFail,
  "no-data": styles.bucketNoData,
}

function summarise(hours: ReadonlyArray<HealthBucket>): {
  ok: number
  warn: number
  fail: number
} {
  let ok = 0
  let warn = 0
  let fail = 0
  for (const bucket of hours) {
    if (bucket === "ok") ok += 1
    else if (bucket === "warn") warn += 1
    else if (bucket === "fail") fail += 1
  }
  return { ok, warn, fail }
}

function uptimePercent(hours: ReadonlyArray<HealthBucket>): number {
  const sampled = hours.filter((bucket) => bucket !== "no-data").length
  if (sampled === 0) return 100
  const failing = hours.filter((bucket) => bucket === "fail").length
  const ratio = (sampled - failing) / sampled
  return Math.round(ratio * 1000) / 10
}

export function HealthcheckHeatmap({
  endpoints,
  caption = "Endpoint health × hour",
  kicker = "Healthchecks",
  axisLabel = "Hour of day (UTC)",
  className,
}: HealthcheckHeatmapProps) {
  return (
    <section
      className={[shell.shell, styles.heatmap, className].filter(Boolean).join(" ")}
      aria-label={`${caption} — ${endpoints.length} endpoints`}
    >
      <header className={shell.shellHead}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>{kicker}</span>
          <h3 className={shell.title}>{caption}</h3>
          <p className={shell.subtitle}>
            <span className={shell.tabular}>{endpoints.length}</span> endpoints across
            production · 24h window
          </p>
        </div>
        <ul className={styles.legend} aria-label="Healthcheck legend">
          <li>
            <span className={[styles.swatch, styles.bucketOk].join(" ")} /> {HEALTH_BUCKET_LABEL.ok}
          </li>
          <li>
            <span className={[styles.swatch, styles.bucketWarn].join(" ")} />{" "}
            {HEALTH_BUCKET_LABEL.warn}
          </li>
          <li>
            <span className={[styles.swatch, styles.bucketFail].join(" ")} />{" "}
            {HEALTH_BUCKET_LABEL.fail}
          </li>
          <li>
            <span className={[styles.swatch, styles.bucketNoData].join(" ")} />{" "}
            {HEALTH_BUCKET_LABEL["no-data"]}
          </li>
        </ul>
      </header>

      <div className={styles.grid} role="table" aria-label={caption}>
        <div className={styles.headRow} role="row">
          <span className={styles.cornerCell} role="columnheader" aria-label="Endpoint">
            <span className={shell.sectionLabel}>{axisLabel}</span>
          </span>
          <div className={styles.hoursAxis} role="columnheader">
            {HOUR_TICKS.map((hour) => (
              <span key={hour} className={styles.hourTick}>
                {hour.toString().padStart(2, "0")}
              </span>
            ))}
          </div>
          <span
            className={styles.uptimeHead}
            role="columnheader"
            aria-label="Uptime"
          >
            Uptime
          </span>
        </div>

        {endpoints.map((endpoint) => {
          const summary = summarise(endpoint.hours)
          const uptime = uptimePercent(endpoint.hours)
          const uptimeTone =
            summary.fail > 2 ? "red" : summary.fail > 0 || summary.warn > 2 ? "amber" : "green"
          const toneCls =
            uptimeTone === "red"
              ? shell.toneRed
              : uptimeTone === "amber"
              ? shell.toneAmber
              : shell.toneGreen
          return (
            <div
              key={endpoint.path}
              className={styles.row}
              role="row"
              aria-label={`Endpoint ${endpoint.label}`}
            >
              <div className={styles.rowLabel} role="rowheader">
                <span className={styles.rowName}>{endpoint.label}</span>
                <code className={styles.rowPath}>{endpoint.path}</code>
                <span className={styles.rowMeta}>
                  p95 <span className={shell.tabular}>{endpoint.p95LatencyMs}</span>
                  ms
                </span>
              </div>
              <div
                className={styles.cells}
                role="cell"
                aria-label={`${endpoint.label} hourly buckets`}
              >
                {endpoint.hours.map((bucket, idx) => (
                  <span
                    key={`${endpoint.path}-${idx}`}
                    className={[styles.cell, BUCKET_CLASS[bucket]].join(" ")}
                    title={`${endpoint.label} · ${idx.toString().padStart(2, "0")}:00 — ${HEALTH_BUCKET_LABEL[bucket]}`}
                  />
                ))}
              </div>
              <div className={[styles.uptime, toneCls].join(" ")} role="cell">
                <span className={shell.tabular}>{uptime.toFixed(1)}%</span>
                <span className={styles.uptimeMeta}>
                  {summary.fail} fail · {summary.warn} warn
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HealthcheckHeatmap
