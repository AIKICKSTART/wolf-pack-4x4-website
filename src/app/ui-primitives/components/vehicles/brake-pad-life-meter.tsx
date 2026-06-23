import { RadialMeter, type RadialTone } from "../charts/radial-meter"
import { Chip, type ChipTone } from "../primitives/chip"

import type { AxleSide } from "./vehicles-types"
import styles from "./brake-pad-life-meter.module.css"

export interface BrakePadAxleReading {
  axle: AxleSide
  /** Remaining pad material as a percent (0–100). */
  remainingPercent: number
  /** Predicted km until service based on average driving load. */
  kmUntilService: number
}

interface BrakePadLifeMeterProps {
  readings: ReadonlyArray<BrakePadAxleReading>
  className?: string
}

function tone(percent: number): RadialTone {
  if (percent <= 15) {
    return "red"
  }
  if (percent <= 35) {
    return "amber"
  }
  if (percent <= 65) {
    return "teal"
  }
  return "green"
}

function chipTone(km: number): ChipTone {
  if (km <= 500) {
    return "red"
  }
  if (km <= 2500) {
    return "amber"
  }
  if (km <= 8000) {
    return "teal"
  }
  return "green"
}

const AXLE_LABEL: Record<AxleSide, string> = {
  front: "Front axle",
  rear: "Rear axle",
}

export function BrakePadLifeMeter({ readings, className }: BrakePadLifeMeterProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Brake pad life">
      {readings.map((reading) => (
        <article key={reading.axle} className={styles.axle}>
          <RadialMeter
            value={reading.remainingPercent}
            max={100}
            label={AXLE_LABEL[reading.axle]}
            tone={tone(reading.remainingPercent)}
            ariaLabel={`${AXLE_LABEL[reading.axle]} pad life ${reading.remainingPercent} percent remaining`}
            size={140}
          />
          <Chip
            label={
              reading.kmUntilService <= 0
                ? "Service overdue"
                : `${new Intl.NumberFormat("en-AU").format(reading.kmUntilService)} km to service`
            }
            tone={chipTone(reading.kmUntilService)}
          />
        </article>
      ))}
    </section>
  )
}

export default BrakePadLifeMeter
