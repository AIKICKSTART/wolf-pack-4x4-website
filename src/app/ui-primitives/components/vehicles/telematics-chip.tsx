"use client"

import { useEffect, useState } from "react"
import { Activity, Fuel, Gauge, Thermometer } from "lucide-react"

import { Chip, type ChipTone } from "../primitives/chip"

import styles from "./telematics-chip.module.css"

export interface TelematicsReading {
  /** Live speed in km/h. */
  speedKmh: number
  /** ECU engine load (0–100). */
  engineLoadPercent: number
  /** Fuel level (0–100). */
  fuelLevelPercent: number
  /** Coolant temperature in degrees Celsius. */
  coolantTempC: number
  /** ISO timestamp when the reading was taken. */
  capturedAtISO: string
}

interface TelematicsChipProps {
  /** Single snapshot, or a stream that updates over time. */
  reading: TelematicsReading
  /** Optional label for the vehicle (e.g. "Hilux N80 · ABC123"). */
  vehicleLabel?: string
  className?: string
}

function speedTone(km: number): ChipTone {
  if (km > 110) {
    return "red"
  }
  if (km > 90) {
    return "amber"
  }
  return "teal"
}

function loadTone(percent: number): ChipTone {
  if (percent > 85) {
    return "red"
  }
  if (percent > 65) {
    return "amber"
  }
  return "green"
}

function fuelTone(percent: number): ChipTone {
  if (percent < 12) {
    return "red"
  }
  if (percent < 28) {
    return "amber"
  }
  return "green"
}

function tempTone(celsius: number): ChipTone {
  if (celsius >= 110) {
    return "red"
  }
  if (celsius >= 100) {
    return "amber"
  }
  if (celsius < 60) {
    return "teal"
  }
  return "green"
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

export function TelematicsChip({ reading, vehicleLabel, className }: TelematicsChipProps) {
  // Tiny live pulse — purely decorative, paused under reduced motion.
  const [pulsed, setPulsed] = useState(true)
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      return
    }
    const handle = window.setInterval(() => {
      setPulsed((p) => !p)
    }, 1400)
    return () => window.clearInterval(handle)
  }, [])

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={vehicleLabel ? `Telematics for ${vehicleLabel}` : "Telematics snapshot"}
    >
      <header className={styles.head}>
        <span className={[styles.dot, pulsed ? styles.dotOn : null].filter(Boolean).join(" ")} aria-hidden="true" />
        <span className={styles.headLabel}>
          Telematics{vehicleLabel ? ` · ${vehicleLabel}` : ""}
        </span>
        <time className={styles.time}>{formatTime(reading.capturedAtISO)}</time>
      </header>
      <div className={styles.cluster}>
        <Chip
          icon={<Gauge size={12} strokeWidth={2.4} aria-hidden="true" />}
          label={`${Math.round(reading.speedKmh)} km/h`}
          tone={speedTone(reading.speedKmh)}
        />
        <Chip
          icon={<Activity size={12} strokeWidth={2.4} aria-hidden="true" />}
          label={`Load ${Math.round(reading.engineLoadPercent)}%`}
          tone={loadTone(reading.engineLoadPercent)}
        />
        <Chip
          icon={<Fuel size={12} strokeWidth={2.4} aria-hidden="true" />}
          label={`Fuel ${Math.round(reading.fuelLevelPercent)}%`}
          tone={fuelTone(reading.fuelLevelPercent)}
        />
        <Chip
          icon={<Thermometer size={12} strokeWidth={2.4} aria-hidden="true" />}
          label={`${Math.round(reading.coolantTempC)} °C`}
          tone={tempTone(reading.coolantTempC)}
        />
      </div>
    </section>
  )
}

export default TelematicsChip
