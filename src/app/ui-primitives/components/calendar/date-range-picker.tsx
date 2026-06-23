"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"

import {
  addDays,
  addMonths,
  formatLongDate,
  formatMonthYear,
  startOfMonth,
} from "./date-utils"
import { MiniDatePicker, type DateRange } from "./mini-date-picker"
import styles from "./date-range-picker.module.css"

export type RangePreset =
  | "today"
  | "yesterday"
  | "last-7"
  | "this-month"
  | "last-month"
  | "custom"

interface PresetEntry {
  id: RangePreset
  label: string
}

const PRESETS: ReadonlyArray<PresetEntry> = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last-7", label: "Last 7 days" },
  { id: "this-month", label: "This month" },
  { id: "last-month", label: "Last month" },
  { id: "custom", label: "Custom" },
]

interface DateRangePickerProps {
  value: DateRange | null
  onChange?: (range: DateRange) => void
  today?: Date
  className?: string
}

function presetToRange(preset: RangePreset, today: Date): DateRange | null {
  switch (preset) {
    case "today":
      return { start: today, end: today }
    case "yesterday": {
      const y = addDays(today, -1)
      return { start: y, end: y }
    }
    case "last-7":
      return { start: addDays(today, -6), end: today }
    case "this-month":
      return { start: startOfMonth(today), end: today }
    case "last-month": {
      const prev = addMonths(today, -1)
      return { start: startOfMonth(prev), end: addDays(startOfMonth(today), -1) }
    }
    case "custom":
    default:
      return null
  }
}

export function DateRangePicker({
  value,
  onChange,
  today,
  className,
}: DateRangePickerProps) {
  const referenceToday = today ?? new Date()
  const [activePreset, setActivePreset] = useState<RangePreset>("custom")
  const [pendingStart, setPendingStart] = useState<Date | null>(null)
  const [leftMonth, setLeftMonth] = useState<Date>(value?.start ?? referenceToday)
  const rightMonth = useMemo(() => addMonths(leftMonth, 1), [leftMonth])

  const handleDayPick = (date: Date) => {
    if (!pendingStart) {
      setPendingStart(date)
      setActivePreset("custom")
      return
    }
    const range: DateRange =
      pendingStart.getTime() <= date.getTime()
        ? { start: pendingStart, end: date }
        : { start: date, end: pendingStart }
    setPendingStart(null)
    onChange?.(range)
  }

  const handlePreset = (preset: RangePreset) => {
    setActivePreset(preset)
    if (preset === "custom") {
      return
    }
    const range = presetToRange(preset, referenceToday)
    if (range) {
      setLeftMonth(range.start)
      onChange?.(range)
    }
  }

  const visualRange: DateRange | null = useMemo(() => {
    if (value) return value
    if (pendingStart) return { start: pendingStart, end: pendingStart }
    return null
  }, [value, pendingStart])

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <aside className={styles.presets} aria-label="Quick ranges">
        <span className={styles.kicker}>Presets</span>
        <ul>
          {PRESETS.map((preset) => (
            <li key={preset.id}>
              <button
                type="button"
                onClick={() => handlePreset(preset.id)}
                aria-pressed={activePreset === preset.id}
                className={styles.presetButton}
              >
                {preset.label}
              </button>
            </li>
          ))}
        </ul>
        <footer className={styles.summary}>
          <span className={styles.kicker}>Selection</span>
          {value ? (
            <p>
              {formatLongDate(value.start)}
              <br />
              → {formatLongDate(value.end)}
            </p>
          ) : (
            <p>Pick a start date, then an end date.</p>
          )}
        </footer>
      </aside>
      <div className={styles.dual}>
        <div className={styles.dualHead}>
          <button
            type="button"
            className={styles.nav}
            aria-label="Previous month"
            onClick={() => setLeftMonth(addMonths(leftMonth, -1))}
          >
            <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <strong>
            {formatMonthYear(leftMonth)} — {formatMonthYear(rightMonth)}
          </strong>
          <button
            type="button"
            className={styles.nav}
            aria-label="Next month"
            onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
          >
            <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.dualGrid}>
          <MiniDatePicker
            value={visualRange?.start ?? null}
            onChange={handleDayPick}
            range={visualRange}
            today={referenceToday}
            defaultMonth={leftMonth}
            hideNav
            label="Range start month"
          />
          <MiniDatePicker
            value={visualRange?.end ?? null}
            onChange={handleDayPick}
            range={visualRange}
            today={referenceToday}
            defaultMonth={rightMonth}
            hideNav
            label="Range end month"
          />
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
