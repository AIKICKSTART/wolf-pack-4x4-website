import {
  DistanceDurationChip,
  type DistanceDurationTraffic,
} from "../maps/distance-duration-chip"

import type { SuburbTrafficTone } from "./locations-pages-types"

import styles from "./drive-time-chip.module.css"

export interface DriveTimeChipProps {
  /** Drive time from the workshop to the suburb in minutes. */
  minutes: number
  /** Distance from the workshop to the suburb in kilometres. */
  distanceKm: number
  /** Traffic-aware tone — maps to DistanceDurationChip traffic. */
  traffic: SuburbTrafficTone
  /** Direction copy — e.g. "From Oak Flats workshop". */
  origin?: string
  className?: string
}

const TRAFFIC_MAP: Record<SuburbTrafficTone, DistanceDurationTraffic> = {
  clear: "free",
  moderate: "moderate",
  busy: "heavy",
}

/**
 * Drive time chip — adapter over `maps/DistanceDurationChip` that
 * formats the workshop-to-suburb distance and duration with a
 * traffic-aware tone and a small origin caption.
 */
export function DriveTimeChip({
  minutes,
  distanceKm,
  traffic,
  origin = "From Oak Flats",
  className,
}: DriveTimeChipProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const distance = `${distanceKm.toFixed(1)} km`
  const duration = `${minutes} min`

  return (
    <span className={classes}>
      <span className={styles.origin}>{origin}</span>
      <DistanceDurationChip
        distance={distance}
        duration={duration}
        traffic={TRAFFIC_MAP[traffic]}
        label="Workshop to suburb"
      />
    </span>
  )
}

export default DriveTimeChip
