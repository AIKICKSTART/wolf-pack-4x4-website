"use client"

import { useState } from "react"

import { MapPin, type MapPinTone } from "./map-pin"
import { StaticMapCanvas } from "./static-map-canvas"
import styles from "./workshop-locator.module.css"

export interface LocatorEntry {
  id: string
  name: string
  suburb: string
  /** km from the user. */
  distance: number
  /** e.g. "Open · until 5pm" / "Closed". */
  status: string
  tone: MapPinTone
  /** Pin X position (0–100). */
  x: number
  /** Pin Y position (0–100). */
  y: number
}

export interface WorkshopLocatorProps {
  entries: ReadonlyArray<LocatorEntry>
  caption: string
}

export function WorkshopLocator({ entries, caption }: WorkshopLocatorProps) {
  const initial = entries[0]?.id ?? ""
  const [activeId, setActiveId] = useState<string>(initial)

  return (
    <section className={styles.root} aria-label="Workshop locator">
      <div className={styles.mapWrap}>
        <StaticMapCanvas label={`Workshop locator map — ${caption}`} tone="dark">
          {/* Pins are positioned via percentage inside the canvas figure */}
        </StaticMapCanvas>
        <div className={styles.pinLayer} aria-hidden="true">
          {entries.map((entry, index) => (
            <MapPin
              key={entry.id}
              x={entry.x}
              y={entry.y}
              tone={entry.tone}
              label={`${entry.name}, ${entry.suburb}`}
              active={entry.id === activeId}
              index={index + 1}
            />
          ))}
        </div>
        <figcaption className={styles.caption}>{caption}</figcaption>
      </div>

      <ol className={styles.list} aria-label="Workshops near you">
        {entries.map((entry, index) => {
          const isActive = entry.id === activeId
          return (
            <li key={entry.id}>
              <button
                type="button"
                className={`${styles.entry} ${isActive ? styles.entryActive : ""}`}
                onClick={() => setActiveId(entry.id)}
                aria-pressed={isActive}
              >
                <span className={styles.entryIndex}>{index + 1}</span>
                <span className={styles.entryBody}>
                  <span className={styles.entryName}>{entry.name}</span>
                  <span className={styles.entrySuburb}>{entry.suburb}</span>
                  <span className={styles.entryStatus}>{entry.status}</span>
                </span>
                <span className={styles.entryDistance}>
                  <strong>{entry.distance.toFixed(1)}</strong>
                  <small>km</small>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default WorkshopLocator
