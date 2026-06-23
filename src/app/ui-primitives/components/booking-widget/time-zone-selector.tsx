"use client"

import { Globe2, Search } from "lucide-react"
import { useMemo, useState } from "react"

import styles from "./time-zone-selector.module.css"
import type { TimeZoneOption } from "./booking-widget-types"

interface TimeZoneSelectorProps {
  zones: ReadonlyArray<TimeZoneOption>
  selectedId: string
  onSelect?: (id: string) => void
  /** Used as the auto-detect link label. */
  detectedLabel?: string
  onDetect?: () => void
}

export function TimeZoneSelector({
  zones,
  selectedId,
  onSelect,
  detectedLabel = "Use my time zone",
  onDetect,
}: TimeZoneSelectorProps) {
  const [query, setQuery] = useState<string>("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q === "") return zones
    return zones.filter((zone) => {
      return (
        zone.city.toLowerCase().includes(q) ||
        zone.id.toLowerCase().includes(q) ||
        zone.country.toLowerCase().includes(q)
      )
    })
  }, [query, zones])

  const current = zones.find((zone) => zone.id === selectedId) ?? null

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <span className={styles.label}>Time zone</span>
        {current ? (
          <span className={styles.currentChip}>
            <Globe2 size={11} strokeWidth={2.4} aria-hidden="true" />
            {current.city} {current.offset}
          </span>
        ) : null}
      </header>

      <div className={styles.searchRow}>
        <span className={styles.searchIcon} aria-hidden="true">
          <Search size={14} strokeWidth={2.2} />
        </span>
        <input
          type="search"
          className={styles.search}
          value={query}
          placeholder="Search cities, countries"
          aria-label="Search time zones"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          type="button"
          className={styles.detect}
          onClick={onDetect}
        >
          {detectedLabel}
        </button>
      </div>

      <ul className={styles.list} role="listbox" aria-label="Time zones">
        {filtered.length === 0 ? (
          <li className={styles.empty}>No matching zones</li>
        ) : (
          filtered.map((zone) => {
            const isSelected = zone.id === selectedId
            return (
              <li key={zone.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[styles.row, isSelected && styles.rowSelected]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onSelect?.(zone.id)}
                >
                  <span className={styles.city}>{zone.city}</span>
                  <span className={styles.id}>{zone.id}</span>
                  <span className={styles.offset}>{zone.offset}</span>
                </button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default TimeZoneSelector
