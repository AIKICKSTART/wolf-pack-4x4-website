import { CodeBlock } from "../primitives/code-block"

import styles from "./connection-test-result.module.css"

export type ConnectionTestStatus = "ok" | "warn" | "fail" | "running"

export interface ConnectionTestResultProps {
  /** Endpoint under test, e.g. "POST https://api.stripe.com/v1/charges". */
  endpoint: string
  status: ConnectionTestStatus
  /** HTTP status code from the test call. */
  statusCode: number
  /** Round-trip latency in milliseconds. */
  latencyMs: number
  /** ISO timestamp of the test. */
  testedAt: string
  /** Optional resolved region label, e.g. "AU-East-1 · Sydney". */
  region?: string
  /** Sample payload preview — already formatted JSON or text. */
  samplePayload: string
  className?: string
}

const STATUS_CLASS: Record<ConnectionTestStatus, string> = {
  ok: styles.statusOk,
  warn: styles.statusWarn,
  fail: styles.statusFail,
  running: styles.statusRunning,
}

const STATUS_LABEL: Record<ConnectionTestStatus, string> = {
  ok: "OK",
  warn: "Degraded",
  fail: "Failed",
  running: "Running",
}

function latencyTone(ms: number): "ok" | "warn" | "fail" {
  if (ms < 250) return "ok"
  if (ms < 1000) return "warn"
  return "fail"
}

export function ConnectionTestResult({
  endpoint,
  status,
  statusCode,
  latencyMs,
  testedAt,
  region,
  samplePayload,
  className,
}: ConnectionTestResultProps) {
  const classes = [styles.card, STATUS_CLASS[status], className]
    .filter(Boolean)
    .join(" ")
  const latencyToneClass = STATUS_CLASS[latencyTone(latencyMs)]

  return (
    <article
      className={classes}
      role="region"
      aria-label={`Connection test result for ${endpoint} — ${STATUS_LABEL[status]} (${statusCode})`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Test result</span>
          <code className={styles.endpoint}>{endpoint}</code>
        </div>
        <span className={styles.statusBadge}>
          <span className={styles.statusDot} aria-hidden="true" />
          {STATUS_LABEL[status]}
        </span>
      </header>

      <dl className={styles.stats}>
        <div className={styles.statItem}>
          <dt className={styles.statLabel}>HTTP</dt>
          <dd className={[styles.statValue, styles.statCode].join(" ")}>{statusCode}</dd>
        </div>
        <div className={styles.statItem}>
          <dt className={styles.statLabel}>Latency</dt>
          <dd className={[styles.statValue, latencyToneClass].join(" ")}>
            {latencyMs.toFixed(latencyMs < 10 ? 1 : 0)}ms
          </dd>
        </div>
        <div className={styles.statItem}>
          <dt className={styles.statLabel}>Tested at</dt>
          <dd className={styles.statValue}>{testedAt}</dd>
        </div>
        {region ? (
          <div className={styles.statItem}>
            <dt className={styles.statLabel}>Region</dt>
            <dd className={styles.statValue}>{region}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.payload}>
        <span className={styles.payloadLabel}>Sample payload</span>
        <CodeBlock language="json" code={samplePayload} fileName="response.json" />
      </div>
    </article>
  )
}

export default ConnectionTestResult
