import { Chip } from "../primitives/chip"
import { RadialMeter, type RadialTone } from "../charts/radial-meter"

import styles from "./chat-volume-gauge.module.css"

interface ChatVolumeGaugeProps {
  /** Chats currently in progress across the team. */
  inProgress: number
  /** Total concurrent chat capacity for the team. */
  capacity: number
  /** Length of the open queue waiting for pickup. */
  queueLength: number
  /** Projected ETA (minutes) for the next queued visitor. */
  projectedEtaMinutes: number
  className?: string
}

function pickTone(ratio: number): RadialTone {
  if (ratio >= 0.85) return "red"
  if (ratio >= 0.6) return "amber"
  return "teal"
}

export function ChatVolumeGauge({
  inProgress,
  capacity,
  queueLength,
  projectedEtaMinutes,
  className,
}: ChatVolumeGaugeProps) {
  const safeCapacity = Math.max(1, capacity)
  const ratio = Math.min(1, inProgress / safeCapacity)
  const tone = pickTone(ratio)
  const percent = Math.round(ratio * 100)
  const announcement = `${inProgress} of ${capacity} chats in progress. Queue length ${queueLength}. Next visitor ETA ${projectedEtaMinutes} minutes.`

  const queueTone =
    queueLength === 0 ? "green" : queueLength >= 4 ? "red" : "amber"
  const etaTone =
    projectedEtaMinutes <= 1
      ? "green"
      : projectedEtaMinutes <= 3
        ? "amber"
        : "red"

  const classes = [styles.gauge, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={announcement}
    >
      <div className={styles.meterWrap}>
        <RadialMeter
          value={percent}
          max={100}
          label="utilised"
          tone={tone}
          ariaLabel={announcement}
          size={108}
        />
      </div>
      <div className={styles.detail}>
        <span className={styles.kicker}>Team chat load</span>
        <h3 className={styles.title}>
          {inProgress} live chats
        </h3>
        <span className={styles.capacity}>
          of <strong>{capacity}</strong> capacity · {percent}% utilised
        </span>
        <div className={styles.chips}>
          <Chip
            label={
              queueLength === 0
                ? "Queue clear"
                : `${queueLength} in queue`
            }
            tone={queueTone}
          />
          <Chip
            label={`ETA ~${projectedEtaMinutes}m`}
            tone={etaTone}
          />
        </div>
        <span className={styles.eta}>
          Next pickup in <strong>~{projectedEtaMinutes}m</strong>
        </span>
      </div>
    </section>
  )
}

export default ChatVolumeGauge
