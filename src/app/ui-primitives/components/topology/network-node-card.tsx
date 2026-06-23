import type { CSSProperties, ReactNode } from "react"
import {
  Boxes,
  Cloud,
  Database,
  Globe,
  Layers,
  Network,
  Router,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react"

import styles from "./network-node-card.module.css"
import type { HealthState, NodeKind } from "./topology-types"

interface NetworkNodeCardProps {
  /** Display name — e.g. `quotes-api`. */
  name: string
  /** Node kind — determines icon + accent. */
  kind: NodeKind
  /** Position as percentage inside a TopologyCanvas. */
  x: number
  y: number
  /** IP or CIDR string — e.g. `10.1.4.32/27`. */
  ip?: string
  /** Region chip label — e.g. `ap-southeast-2`. */
  region?: string
  /** Health status — drives the dot + degraded pulse. */
  health?: HealthState
  /** Optional sub-label line — e.g. `quotes · v4.18.2`. */
  meta?: string
}

const KIND_ICON: Record<NodeKind, ReactNode> = {
  service: <Server strokeWidth={2.2} />,
  database: <Database strokeWidth={2.2} />,
  cache: <Layers strokeWidth={2.2} />,
  queue: <Workflow strokeWidth={2.2} />,
  gateway: <Router strokeWidth={2.2} />,
  "load-balancer": <Network strokeWidth={2.2} />,
  function: <Zap strokeWidth={2.4} />,
  "object-store": <Boxes strokeWidth={2.2} />,
  edge: <Globe strokeWidth={2.2} />,
  client: <ShieldCheck strokeWidth={2.2} />,
}

const KIND_LABEL: Record<NodeKind, string> = {
  service: "Service",
  database: "DB",
  cache: "Cache",
  queue: "Queue",
  gateway: "Gateway",
  "load-balancer": "LB",
  function: "Function",
  "object-store": "Bucket",
  edge: "Edge",
  client: "Client",
}

const KIND_TONE: Record<NodeKind, string> = {
  service: styles.toneTeal,
  database: styles.toneAmber,
  cache: styles.toneTeal,
  queue: styles.toneTeal,
  gateway: styles.toneRed,
  "load-balancer": styles.toneRed,
  function: styles.toneAmber,
  "object-store": styles.toneNeutral,
  edge: styles.toneNeutral,
  client: styles.toneGreen,
}

const HEALTH_CLASS: Record<HealthState, string> = {
  healthy: styles.healthHealthy,
  degraded: styles.healthDegraded,
  failed: styles.healthFailed,
  unknown: styles.healthUnknown,
}

const HEALTH_FALLBACK = <Cloud aria-hidden="true" />

export function NetworkNodeCard({
  name,
  kind,
  x,
  y,
  ip,
  region,
  health = "healthy",
  meta,
}: NetworkNodeCardProps) {
  const position: CSSProperties = { left: `${x}%`, top: `${y}%` }
  const classes = [styles.card, KIND_TONE[kind]].join(" ")
  const healthClass = HEALTH_CLASS[health]
  const icon = KIND_ICON[kind] ?? HEALTH_FALLBACK

  return (
    <article
      className={classes}
      style={position}
      aria-label={`${KIND_LABEL[kind]} node: ${name}`}
    >
      <div className={styles.header}>
        <span className={styles.iconBadge} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.kicker}>{KIND_LABEL[kind]}</span>
        <span
          className={[styles.healthDot, healthClass].join(" ")}
          aria-label={`Health: ${health}`}
        />
      </div>
      <h3 className={styles.title}>{name}</h3>
      {ip ? <span className={styles.ip}>{ip}</span> : null}
      {meta ? <span className={styles.meta}>{meta}</span> : null}
      {region ? <span className={styles.regionChip}>{region}</span> : null}
    </article>
  )
}
