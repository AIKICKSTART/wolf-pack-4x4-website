import { Lock } from "lucide-react"

import styles from "./service-mesh-dependency.module.css"

interface ServiceMeshDependencyProps {
  /** Caller service name. */
  caller: string
  /** Callee service name. */
  callee: string
  /** Requests per second. */
  rps: number
  /** Error rate 0..1. */
  errorRate: number
  /** Whether mutual TLS is enforced on this edge. */
  mTls?: boolean
}

function pickErrorTone(errorRate: number): string {
  if (errorRate >= 0.05) return styles.errorRed
  if (errorRate >= 0.01) return styles.errorAmber
  return styles.errorGreen
}

function formatRps(rps: number): string {
  if (rps >= 1000) return `${(rps / 1000).toFixed(1)}k`
  return `${rps}`
}

export function ServiceMeshDependency({
  caller,
  callee,
  rps,
  errorRate,
  mTls = false,
}: ServiceMeshDependencyProps) {
  const errorTone = pickErrorTone(errorRate)
  const errorPct = `${(errorRate * 100).toFixed(errorRate < 0.01 ? 2 : 1)}%`

  return (
    <article
      className={styles.dependency}
      aria-label={`Service mesh dependency: ${caller} calls ${callee}`}
    >
      <span className={styles.endpoint}>{caller}</span>
      <span className={styles.arrowWrap} aria-hidden="true">
        <span className={styles.arrowLine} />
        <span className={styles.arrowHead} />
      </span>
      <span className={styles.endpoint}>{callee}</span>
      <span className={styles.metaRow}>
        <span className={styles.rpsChip}>{formatRps(rps)} RPS</span>
        <span className={[styles.errChip, errorTone].join(" ")}>{errorPct} err</span>
        <span
          className={[styles.mtlsChip, mTls ? styles.mtlsOn : styles.mtlsOff].join(" ")}
        >
          <Lock strokeWidth={2.6} aria-hidden="true" />
          {mTls ? "mTLS" : "plain"}
        </span>
      </span>
    </article>
  )
}
