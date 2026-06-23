"use client"

import { useState } from "react"

import { WEEKDAY_SHORT, buildHourLabels } from "./date-utils"
import styles from "./schedule-grid.module.css"

export type SlotState = "available" | "booked" | "blocked"

export interface ScheduleSlot {
  weekday: number
  hour: number
  state: SlotState
  label?: string
}

interface ScheduleGridProps {
  slots: ReadonlyArray<ScheduleSlot>
  /** First hour to render. Default 7. */
  startHour?: number
  /** Last hour exclusive. Default 18. */
  endHour?: number
  /** Week start day. 0 = Sunday, 1 = Monday. Defaults to Monday. */
  weekStartsOn?: 0 | 1
  /** When set, clicks on available slots fire this callback. */
  onSelect?: (slot: ScheduleSlot) => void
  className?: string
}

function makeKey(weekday: number, hour: number): string {
  return `${weekday}-${hour}`
}

const NEXT_STATE: Record<SlotState, SlotState> = {
  available: "booked",
  booked: "blocked",
  blocked: "available",
}

export function ScheduleGrid({
  slots,
  startHour = 7,
  endHour = 18,
  weekStartsOn = 1,
  onSelect,
  className,
}: ScheduleGridProps) {
  const hours = buildHourLabels(startHour, endHour - 1, 24)
  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    WEEKDAY_SHORT[(weekStartsOn + index) % 7],
  )
  const lookup = new Map<string, ScheduleSlot>()
  for (const slot of slots) {
    lookup.set(makeKey(slot.weekday, slot.hour), slot)
  }

  const [overrides, setOverrides] = useState<Map<string, SlotState>>(new Map())

  const getState = (weekday: number, hour: number): SlotState => {
    const key = makeKey(weekday, hour)
    const override = overrides.get(key)
    if (override) return override
    return lookup.get(key)?.state ?? "available"
  }

  const handleCellClick = (weekday: number, hour: number) => {
    const state = getState(weekday, hour)
    const next = NEXT_STATE[state]
    setOverrides((prev) => {
      const map = new Map(prev)
      map.set(makeKey(weekday, hour), next)
      return map
    })
    const slot: ScheduleSlot = { weekday, hour, state: next }
    onSelect?.(slot)
  }

  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>Schedule grid</span>
        <ul className={styles.legend} aria-label="Legend">
          <li data-state="available">
            <span /> Available
          </li>
          <li data-state="booked">
            <span /> Booked
          </li>
          <li data-state="blocked">
            <span /> Blocked
          </li>
        </ul>
      </header>
      <div className={styles.matrix} role="grid">
        <div className={styles.corner} role="columnheader" aria-label="Hours" />
        {weekdayLabels.map((day, index) => (
          <div key={`${day}-${index}`} role="columnheader" className={styles.weekday}>
            {day}
          </div>
        ))}
        {hours.map((label, hourIndex) => {
          const hour = startHour + hourIndex
          return (
            <div key={hour} className={styles.hourRow} role="row">
              <div role="rowheader" className={styles.hourLabel}>
                {label}
              </div>
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const weekday = (weekStartsOn + dayIndex) % 7
                const state = getState(weekday, hour)
                const data = lookup.get(makeKey(weekday, hour))
                return (
                  <button
                    key={`${weekday}-${hour}`}
                    type="button"
                    role="gridcell"
                    aria-label={`${WEEKDAY_SHORT[weekday]} ${label} — ${state}`}
                    data-state={state}
                    className={styles.cell}
                    onClick={() => handleCellClick(weekday, hour)}
                  >
                    {data?.label && <span>{data.label}</span>}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ScheduleGrid
