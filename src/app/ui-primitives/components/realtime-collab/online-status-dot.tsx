import type { PresenceStatus } from "./realtime-collab-types"
import { PRESENCE_LABEL } from "./realtime-collab-types"
import styles from "./online-status-dot.module.css"

export type OnlineStatusDotSize = "xs" | "sm" | "md" | "lg"

interface OnlineStatusDotProps {
  /** Presence state. */
  status: PresenceStatus
  /** Pixel size variant. */
  size?: OnlineStatusDotSize
  /** Whether the online dot pulses. Defaults to true for online state. */
  pulse?: boolean
  /** Optional inline label rendered to the right of the dot. */
  label?: string
  /** Accessible label override (otherwise derived from status). */
  ariaLabel?: string
  className?: string
}

const SIZE_CLASS: Record<OnlineStatusDotSize, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const STATUS_CLASS: Record<PresenceStatus, string> = {
  online: styles.statusOnline,
  idle: styles.statusIdle,
  offline: styles.statusOffline,
  busy: styles.statusBusy,
}

export function OnlineStatusDot({
  status,
  size = "sm",
  pulse,
  label,
  ariaLabel,
  className,
}: OnlineStatusDotProps) {
  const shouldPulse = pulse ?? status === "online"
  const classes = [
    styles.dot,
    SIZE_CLASS[size],
    STATUS_CLASS[status],
    shouldPulse ? styles.pulse : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const text = label ?? PRESENCE_LABEL[status]

  if (!label) {
    return (
      <span
        className={classes}
        role="img"
        aria-label={ariaLabel ?? PRESENCE_LABEL[status]}
        data-status={status}
      />
    )
  }

  return (
    <span
      className={styles.row}
      role="img"
      aria-label={ariaLabel ?? `${PRESENCE_LABEL[status]} · ${text}`}
    >
      <span className={classes} aria-hidden="true" data-status={status} />
      <span className={styles.label}>{text}</span>
    </span>
  )
}

export default OnlineStatusDot
