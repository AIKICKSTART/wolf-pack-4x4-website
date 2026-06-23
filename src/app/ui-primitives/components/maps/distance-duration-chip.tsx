import styles from "./distance-duration-chip.module.css"

export type DistanceDurationTraffic = "free" | "moderate" | "heavy"

export interface DistanceDurationChipProps {
  /** Distance label e.g. "12.4 km". */
  distance: string
  /** Duration label e.g. "18 min". */
  duration: string
  traffic?: DistanceDurationTraffic
  /** Optional descriptor for screen readers e.g. "Workshop to depot". */
  label?: string
}

const TRAFFIC_CLASS: Record<DistanceDurationTraffic, string> = {
  free: styles.trafficFree,
  moderate: styles.trafficModerate,
  heavy: styles.trafficHeavy,
}

const TRAFFIC_LABEL: Record<DistanceDurationTraffic, string> = {
  free: "Clear",
  moderate: "Some delay",
  heavy: "Heavy traffic",
}

/**
 * Compact distance + duration chip. Traffic tone shifts the right-hand
 * status pip. Live changes are announced via aria-live.
 */
export function DistanceDurationChip({
  distance,
  duration,
  traffic = "free",
  label,
}: DistanceDurationChipProps) {
  const classes = [styles.chip, TRAFFIC_CLASS[traffic]].join(" ")
  const fullLabel = label
    ? `${label}: ${distance}, ${duration}, ${TRAFFIC_LABEL[traffic]}`
    : `${distance}, ${duration}, ${TRAFFIC_LABEL[traffic]}`

  return (
    <span className={classes} role="status" aria-live="polite" aria-label={fullLabel}>
      <svg viewBox="0 0 20 12" aria-hidden="true" className={styles.car}>
        {/* Simple car silhouette */}
        <path
          d="M 2 9 L 2 7 L 4 6 L 6 3 L 14 3 L 16 6 L 18 7 L 18 9 Z"
          className={styles.carBody}
        />
        <circle cx="6" cy="9.5" r="1.6" className={styles.wheel} />
        <circle cx="14" cy="9.5" r="1.6" className={styles.wheel} />
      </svg>
      <span className={styles.distance}>{distance}</span>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.duration}>{duration}</span>
      <span className={styles.trafficDot} aria-hidden="true" />
    </span>
  )
}

export default DistanceDurationChip
