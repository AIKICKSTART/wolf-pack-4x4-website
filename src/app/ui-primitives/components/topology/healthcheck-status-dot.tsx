import { QuoteBubble } from "../primitives/quote-bubble"

import styles from "./healthcheck-status-dot.module.css"
import type { HealthState } from "./topology-types"

interface HealthcheckStatusDotProps {
  /** Current health state. */
  state: HealthState
  /** Optional check name — e.g. `quotes-api /healthz`. */
  label?: string
  /** Optional human-readable detail rendered in the QuoteBubble tooltip. */
  detail?: string
  /** Size — defaults to `md`. */
  size?: "sm" | "md" | "lg"
}

const STATE_LABEL: Record<HealthState, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  failed: "Failed",
  unknown: "Unknown",
}

const STATE_TONE: Record<HealthState, string> = {
  healthy: styles.toneHealthy,
  degraded: styles.toneDegraded,
  failed: styles.toneFailed,
  unknown: styles.toneUnknown,
}

const SIZE_CLASS: Record<"sm" | "md" | "lg", string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const BUBBLE_TONE_MAP = {
  healthy: "obsidian",
  degraded: "amber",
  failed: "red",
  unknown: "obsidian",
} as const

export function HealthcheckStatusDot({
  state,
  label,
  detail,
  size = "md",
}: HealthcheckStatusDotProps) {
  const statusLabel = `${label ? `${label}: ` : ""}${STATE_LABEL[state]}`

  return (
    <span className={styles.wrap}>
      <span
        className={[styles.dot, STATE_TONE[state], SIZE_CLASS[size]].join(" ")}
        role="status"
        aria-live="polite"
        aria-label={statusLabel}
      >
        <span className={styles.pulse} aria-hidden="true" />
        <span className={styles.core} aria-hidden="true" />
      </span>
      {label || detail ? (
        <span className={styles.tooltipSlot} role="tooltip">
          <QuoteBubble
            side="bottom"
            tone={BUBBLE_TONE_MAP[state]}
            label={statusLabel}
          >
            <strong className={styles.tooltipTitle}>{statusLabel}</strong>
            {detail ? <span className={styles.tooltipDetail}>{detail}</span> : null}
          </QuoteBubble>
        </span>
      ) : null}
    </span>
  )
}
