import { Box, CircleDashed, CircleX, RefreshCcw } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./container-badge.module.css"
import type { ContainerStatus } from "./topology-types"

interface ContainerBadgeProps {
  /** Image with tag — e.g. `quotes-api:v4.18.2`. */
  image: string
  /** Current status. */
  status: ContainerStatus
  /** Restart counter — pulses when crashing. */
  restarts?: number
}

const STATUS_ICON: Record<ContainerStatus, ReactNode> = {
  running: <Box strokeWidth={2.2} />,
  pending: <CircleDashed strokeWidth={2.2} />,
  failed: <CircleX strokeWidth={2.2} />,
  crashing: <RefreshCcw strokeWidth={2.4} />,
}

const STATUS_TONE: Record<ContainerStatus, string> = {
  running: styles.statusRunning,
  pending: styles.statusPending,
  failed: styles.statusFailed,
  crashing: styles.statusCrashing,
}

const STATUS_LABEL: Record<ContainerStatus, string> = {
  running: "Running",
  pending: "Pending",
  failed: "Failed",
  crashing: "Crashing",
}

export function ContainerBadge({
  image,
  status,
  restarts = 0,
}: ContainerBadgeProps) {
  const [imageName, imageTag] = image.includes(":")
    ? image.split(":", 2)
    : [image, "latest"]

  return (
    <span
      className={[styles.badge, STATUS_TONE[status]].join(" ")}
      role="img"
      aria-label={`Container ${image}, status ${STATUS_LABEL[status]}, ${restarts} restarts`}
    >
      <span className={styles.iconBadge} aria-hidden="true">
        {STATUS_ICON[status]}
      </span>
      <span className={styles.body}>
        <span className={styles.image}>
          <strong>{imageName}</strong>
          <small>:{imageTag}</small>
        </span>
        <span className={styles.metaRow}>
          <span className={styles.statusChip}>{STATUS_LABEL[status]}</span>
          <span className={styles.restartChip}>
            <RefreshCcw strokeWidth={2.4} aria-hidden="true" />
            {restarts} restarts
          </span>
        </span>
      </span>
    </span>
  )
}
