import { Activity, Scale } from "lucide-react"

import styles from "./load-balancer-card.module.css"
import type { BandwidthSnapshot, LbType, PortDescriptor } from "./topology-types"

interface TargetGroupHealth {
  /** Total target count. */
  total: number
  /** Healthy targets. */
  healthy: number
  /** Unhealthy targets. */
  unhealthy: number
}

interface LoadBalancerCardProps {
  /** LB name — e.g. `quotes-prod-alb`. */
  name: string
  /** ALB / NLB / CLB. */
  type: LbType
  /** Listener ports — e.g. `[ { range: "443", protocol: "https" } ]`. */
  listeners: ReadonlyArray<PortDescriptor>
  /** Target group health snapshot. */
  health: TargetGroupHealth
  /** Throughput snapshot. */
  throughput?: BandwidthSnapshot
}

const TYPE_HINT: Record<LbType, string> = {
  ALB: "Application LB · Layer 7",
  NLB: "Network LB · Layer 4",
  CLB: "Classic LB · Legacy",
}

const PROTO_TONE_CLASS: Record<string, string> = {
  https: "listener-https",
  http: "listener-http",
  tcp: "listener-tcp",
  udp: "listener-udp",
  grpc: "listener-grpc",
}

export function LoadBalancerCard({
  name,
  type,
  listeners,
  health,
  throughput,
}: LoadBalancerCardProps) {
  const healthyPct = health.total > 0
    ? Math.round((health.healthy / health.total) * 100)
    : 0
  const healthTone =
    healthyPct >= 95 ? styles.healthGreen
      : healthyPct >= 70 ? styles.healthAmber
        : styles.healthRed

  return (
    <article className={styles.card} aria-label={`${type} load balancer: ${name}`}>
      <header className={styles.header}>
        <span className={styles.iconBadge} aria-hidden="true">
          <Scale strokeWidth={2.2} />
        </span>
        <div className={styles.headerMeta}>
          <span className={styles.kicker}>{type}</span>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.subTitle}>{TYPE_HINT[type]}</span>
        </div>
      </header>

      <section className={styles.section} aria-label="Listeners">
        <span className={styles.sectionLabel}>Listeners</span>
        <ul className={styles.listenerList}>
          {listeners.map((port) => (
            <li
              key={`${port.protocol}-${port.range}`}
              className={[
                styles.listenerChip,
                styles[PROTO_TONE_CLASS[port.protocol] ?? ""],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span>{port.protocol.toUpperCase()}</span>
              <strong>:{port.range}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-label="Target group health">
        <span className={styles.sectionLabel}>Target group health</span>
        <div className={[styles.healthBar, healthTone].join(" ")}>
          <span
            className={styles.healthFill}
            style={{ width: `${healthyPct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className={styles.healthMeta}>
          <span className={styles.healthMetricGreen}>
            <Activity strokeWidth={2.2} aria-hidden="true" />
            {health.healthy} healthy
          </span>
          <span className={styles.healthMetricRed}>{health.unhealthy} unhealthy</span>
          <span className={styles.healthMetricMuted}>{health.total} total</span>
        </div>
      </section>

      {throughput ? (
        <div className={styles.throughput}>
          <span className={styles.throughputLabel}>Throughput</span>
          <span className={styles.throughputValue}>
            {throughput.value}<small>{throughput.unit}</small>
          </span>
        </div>
      ) : null}
    </article>
  )
}
