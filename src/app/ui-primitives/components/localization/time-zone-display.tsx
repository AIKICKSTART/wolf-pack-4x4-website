"use client"

import { useEffect, useState } from "react"

import styles from "./time-zone-display.module.css"

export interface TimeZoneEntry {
  /** IANA timezone, e.g. "Australia/Sydney". */
  zone: string
  /** Display label, e.g. "Sydney". */
  label: string
  /** Optional region tag for the chip, e.g. "AU". */
  region?: string
}

export interface TimeZoneDisplayProps {
  zones: ReadonlyArray<TimeZoneEntry>
  /**
   * Optional fixed reference instant — when provided the strip stops ticking and uses
   * this instant for every zone. Useful for stable visual reference shots.
   */
  referenceIso?: string
  /** Tick interval in ms when no reference is provided. Defaults to 30 seconds. */
  tickMs?: number
}

function formatTime(date: Date, zone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: zone,
    }).format(date)
  } catch {
    return "--:--"
  }
}

function formatDate(date: Date, zone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      timeZone: zone,
    }).format(date)
  } catch {
    return ""
  }
}

function offsetLabel(date: Date, zone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      timeZoneName: "shortOffset",
    })
    const parts = formatter.formatToParts(date)
    const offset = parts.find((p) => p.type === "timeZoneName")?.value
    return offset ?? ""
  } catch {
    return ""
  }
}

export function TimeZoneDisplay({
  zones,
  referenceIso,
  tickMs = 30_000,
}: TimeZoneDisplayProps) {
  const initial = referenceIso ? new Date(referenceIso) : new Date()
  const [now, setNow] = useState<Date>(initial)

  useEffect(() => {
    if (referenceIso) return
    const interval = window.setInterval(() => setNow(new Date()), tickMs)
    return () => window.clearInterval(interval)
  }, [referenceIso, tickMs])

  const valid = !Number.isNaN(now.getTime())

  return (
    <section className={styles.root} aria-label="Time zone display">
      <ol className={styles.list}>
        {zones.map((zone) => (
          <li key={zone.zone} className={styles.tile}>
            <div className={styles.tileHead}>
              <span className={styles.label}>{zone.label}</span>
              {zone.region ? <span className={styles.region}>{zone.region}</span> : null}
            </div>
            <span className={styles.time} aria-live="polite">
              {valid ? formatTime(now, zone.zone) : "--:--"}
            </span>
            <div className={styles.tileFoot}>
              <span className={styles.date}>{valid ? formatDate(now, zone.zone) : ""}</span>
              <span className={styles.offset}>{valid ? offsetLabel(now, zone.zone) : ""}</span>
            </div>
            <code className={styles.zoneTag}>{zone.zone}</code>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TimeZoneDisplay
