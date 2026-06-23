"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState, type KeyboardEvent } from "react"

import {
  WEEKDAY_MIN,
  addDays,
  addMonths,
  buildMonthMatrix,
  formatMonthYear,
  isWithinRange,
  sameDay,
  sameMonth,
} from "./date-utils"
import styles from "./mini-date-picker.module.css"

export interface DateRange {
  start: Date
  end: Date
}

interface MiniDatePickerProps {
  value: Date | null
  onChange?: (date: Date) => void
  /** When provided, days within range are highlighted as the active range. */
  range?: DateRange | null
  /** Reference for "today" highlight. Falls back to runtime now. */
  today?: Date
  /** Initial month shown when value is null. */
  defaultMonth?: Date
  /** Week start day. 0 = Sunday, 1 = Monday. Default Monday. */
  weekStartsOn?: 0 | 1
  /** Hide month-nav chevrons (used inside DateRangePicker). */
  hideNav?: boolean
  /** Optional ARIA label for the grid. */
  label?: string
  className?: string
}

export function MiniDatePicker({
  value,
  onChange,
  range,
  today,
  defaultMonth,
  weekStartsOn = 1,
  hideNav = false,
  label = "Date picker",
  className,
}: MiniDatePickerProps) {
  const referenceToday = today ?? new Date()
  const [viewMonth, setViewMonth] = useState<Date>(
    defaultMonth ?? value ?? referenceToday,
  )
  const [focused, setFocused] = useState<Date>(value ?? referenceToday)

  const cells = useMemo(
    () => buildMonthMatrix(viewMonth, weekStartsOn),
    [viewMonth, weekStartsOn],
  )

  const weekdayLabels = Array.from({ length: 7 }, (_, index) =>
    WEEKDAY_MIN[(weekStartsOn + index) % 7],
  )

  const handleKey = (event: KeyboardEvent<HTMLDivElement>, cell: Date) => {
    let next: Date | null = null
    switch (event.key) {
      case "ArrowLeft":
        next = addDays(cell, -1)
        break
      case "ArrowRight":
        next = addDays(cell, 1)
        break
      case "ArrowUp":
        next = addDays(cell, -7)
        break
      case "ArrowDown":
        next = addDays(cell, 7)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        onChange?.(cell)
        return
      case "Escape":
        event.preventDefault()
        ;(event.target as HTMLElement).blur()
        return
      default:
        return
    }
    if (next) {
      event.preventDefault()
      setFocused(next)
      if (!sameMonth(next, viewMonth)) {
        setViewMonth(next)
      }
    }
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        {!hideNav && (
          <button
            type="button"
            className={styles.nav}
            aria-label="Previous month"
            onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          >
            <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
        <strong className={styles.month}>{formatMonthYear(viewMonth)}</strong>
        {!hideNav && (
          <button
            type="button"
            className={styles.nav}
            aria-label="Next month"
            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          >
            <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
      </header>
      <div className={styles.weekdays} aria-hidden="true">
        {weekdayLabels.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
      <div className={styles.grid} role="grid" aria-label={label}>
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={rowIndex} role="row" className={styles.row}>
            {cells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell) => {
              const inMonth = sameMonth(cell, viewMonth)
              const isToday = sameDay(cell, referenceToday)
              const isSelected = value !== null && sameDay(cell, value)
              const inRange =
                range !== null && range !== undefined
                  ? isWithinRange(cell, range.start, range.end)
                  : false
              const isRangeStart = range ? sameDay(cell, range.start) : false
              const isRangeEnd = range ? sameDay(cell, range.end) : false
              const isFocused = sameDay(cell, focused)
              return (
                <div
                  key={cell.toISOString()}
                  role="gridcell"
                  aria-selected={isSelected || isRangeStart || isRangeEnd}
                  aria-current={isToday ? "date" : undefined}
                  aria-label={cell.toDateString()}
                  tabIndex={isFocused ? 0 : -1}
                  className={[
                    styles.cell,
                    !inMonth && styles.outMonth,
                    isToday && styles.today,
                    (isSelected || isRangeStart || isRangeEnd) && styles.selected,
                    inRange && styles.inRange,
                    isRangeStart && styles.rangeStart,
                    isRangeEnd && styles.rangeEnd,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onChange?.(cell)}
                  onKeyDown={(event) => handleKey(event, cell)}
                  onFocus={() => setFocused(cell)}
                >
                  <span>{cell.getDate()}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiniDatePicker
