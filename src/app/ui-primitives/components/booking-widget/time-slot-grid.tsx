"use client"

import { useMemo } from "react"

import styles from "./time-slot-grid.module.css"
import type {
  AmPmBand,
  ClockFormat,
  SlotAvailability,
  TimeSlot,
} from "./booking-widget-types"

interface TimeSlotGridProps {
  slots: ReadonlyArray<TimeSlot>
  /** Currently selected slot id. */
  selectedId: string | null
  onSelect?: (id: string) => void
  /** Format the time labels: 12h or 24h. Defaults to 12h. */
  clock?: ClockFormat
  /** Optional toggle handler to flip the clock display. */
  onClockChange?: (clock: ClockFormat) => void
}

interface BandedSlots {
  am: ReadonlyArray<TimeSlot>
  pm: ReadonlyArray<TimeSlot>
}

const AVAILABILITY_LABEL: Record<SlotAvailability, string> = {
  available: "Available",
  "few-left": "Few left",
  full: "Full",
  closed: "Closed",
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0")
}

function formatTime(slot: TimeSlot, clock: ClockFormat): string {
  const hours = Math.floor(slot.minutesSinceMidnight / 60)
  const minutes = slot.minutesSinceMidnight % 60
  if (clock === "24h") {
    return `${pad2(hours)}:${pad2(minutes)}`
  }
  const period: AmPmBand = hours >= 12 ? "PM" : "AM"
  const projected = hours % 12 === 0 ? 12 : hours % 12
  return `${projected}:${pad2(minutes)} ${period}`
}

function partition(slots: ReadonlyArray<TimeSlot>): BandedSlots {
  const am: TimeSlot[] = []
  const pm: TimeSlot[] = []
  for (const slot of slots) {
    if (Math.floor(slot.minutesSinceMidnight / 60) < 12) {
      am.push(slot)
    } else {
      pm.push(slot)
    }
  }
  return { am, pm }
}

export function TimeSlotGrid({
  slots,
  selectedId,
  onSelect,
  clock = "12h",
  onClockChange,
}: TimeSlotGridProps) {
  const { am, pm } = useMemo(() => partition(slots), [slots])

  const renderBand = (band: AmPmBand, items: ReadonlyArray<TimeSlot>, rowIndex: number) => (
    <div
      key={band}
      className={styles.band}
      role="row"
      aria-rowindex={rowIndex}
      aria-label={`${band} slots`}
    >
      <span className={styles.bandLabel}>{band}</span>
      <div className={styles.grid}>
        {items.length === 0 ? (
          <span className={styles.empty}>No slots</span>
        ) : (
          items.map((slot) => {
            const disabled = slot.availability === "full" || slot.availability === "closed"
            const isSelected = slot.id === selectedId
            return (
              <button
                key={slot.id}
                type="button"
                role="gridcell"
                className={[
                  styles.slot,
                  styles[`tone-${slot.availability}`],
                  isSelected && styles.slotSelected,
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-selected={isSelected}
                aria-label={`${formatTime(slot, clock)} ${AVAILABILITY_LABEL[slot.availability]}${
                  slot.bayId ? `, ${slot.bayId}` : ""
                }`}
                disabled={disabled}
                onClick={() => onSelect?.(slot.id)}
              >
                <span className={styles.time}>{formatTime(slot, clock)}</span>
                <span className={styles.tag}>{AVAILABILITY_LABEL[slot.availability]}</span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )

  return (
    <div
      className={styles.wrap}
      role="grid"
      aria-label="Time slots"
      aria-rowcount={2}
    >
      <header className={styles.head}>
        <span className={styles.headLabel}>Time slots</span>
        <div className={styles.modeSwitch} role="group" aria-label="Clock format">
          <button
            type="button"
            aria-pressed={clock === "12h"}
            className={clock === "12h" ? styles.modeActive : undefined}
            onClick={() => onClockChange?.("12h")}
          >
            12h
          </button>
          <button
            type="button"
            aria-pressed={clock === "24h"}
            className={clock === "24h" ? styles.modeActive : undefined}
            onClick={() => onClockChange?.("24h")}
          >
            24h
          </button>
        </div>
      </header>
      {renderBand("AM", am, 1)}
      {renderBand("PM", pm, 2)}
    </div>
  )
}

export default TimeSlotGrid
