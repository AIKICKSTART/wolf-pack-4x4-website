import { Crown, Server, Wifi } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./cluster-node.module.css"
import type { ClusterRole } from "./topology-types"

interface CpuMemUsage {
  /** CPU as 0..100. */
  cpu: number
  /** Memory as 0..100. */
  mem: number
}

interface ClusterNodeProps {
  /** Node name — e.g. `ip-10-1-3-44.ec2.internal`. */
  name: string
  /** Cluster role. */
  role: ClusterRole
  /** Number of pods running on this node. */
  podCount: number
  /** CPU + memory snapshot. */
  usage: CpuMemUsage
  /** Optional zone label. */
  zone?: string
}

const ROLE_LABEL: Record<ClusterRole, string> = {
  master: "Master",
  worker: "Worker",
  edge: "Edge",
}

const ROLE_TONE: Record<ClusterRole, string> = {
  master: styles.roleMaster,
  worker: styles.roleWorker,
  edge: styles.roleEdge,
}

const ROLE_ICON: Record<ClusterRole, ReactNode> = {
  master: <Crown strokeWidth={2.2} />,
  worker: <Server strokeWidth={2.2} />,
  edge: <Wifi strokeWidth={2.2} />,
}

function pickUsageTone(value: number): string {
  if (value >= 85) return styles.usageRed
  if (value >= 65) return styles.usageAmber
  return styles.usageGreen
}

export function ClusterNode({
  name,
  role,
  podCount,
  usage,
  zone,
}: ClusterNodeProps) {
  return (
    <article
      className={[styles.node, ROLE_TONE[role]].join(" ")}
      aria-label={`Cluster ${ROLE_LABEL[role]} node: ${name}`}
    >
      <header className={styles.header}>
        <span className={styles.iconBadge} aria-hidden="true">
          {ROLE_ICON[role]}
        </span>
        <div className={styles.headerMeta}>
          <span className={styles.kicker}>{ROLE_LABEL[role]}</span>
          <h3 className={styles.title}>{name}</h3>
          {zone ? <span className={styles.zone}>{zone}</span> : null}
        </div>
      </header>
      <div className={styles.miniChips}>
        <span className={styles.podChip}>{podCount} pods</span>
        <span className={[styles.usageChip, pickUsageTone(usage.cpu)].join(" ")}>
          CPU {usage.cpu}%
        </span>
        <span className={[styles.usageChip, pickUsageTone(usage.mem)].join(" ")}>
          MEM {usage.mem}%
        </span>
      </div>
    </article>
  )
}
