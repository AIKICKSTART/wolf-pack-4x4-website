"use client"

import { useMemo } from "react"

import { TimePicker, type ClockMode, type TimeValue } from "./time-picker"
import styles from "./time-range-picker.module.css"

export interface TimeRange {
  from: TimeValue
  to: TimeValue
}

interface TimeRangePickerProps {
  value: TimeRange
  onChange?: (range: TimeRange) => void
  clock?: ClockMode
  step?: number
  className?: string
}

function toMinutes(time: TimeValue): number {
  return time.hours * 60 + time.minutes
}

export function TimeRangePicker({
  value,
  onChange,
  clock = 24,
  step = 15,
  className,
}: TimeRangePickerProps) {
  const fromMinutes = toMinutes(value.from)
  const toMinutesValue = toMinutes(value.to)
  const valid = toMinutesValue > fromMinutes

  const summary = useMemo<string>(() => {
    if (!valid) return "Invalid range"
    const total = toMinutesValue - fromMinutes
    const hours = Math.floor(total / 60)
    const mins = total % 60
    if (hours === 0) return `${mins}m`
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}m`
  }, [fromMinutes, toMinutesValue, valid])

  const handleFrom = (next: TimeValue) => {
    onChange?.({ from: next, to: value.to })
  }

  const handleTo = (next: TimeValue) => {
    onChange?.({ from: value.from, to: next })
  }

  const classes = [styles.range, !valid && styles.invalid, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.col}>
        <TimePicker value={value.from} onChange={handleFrom} clock={clock} step={step} label="From" />
      </div>
      <div className={styles.divider} aria-hidden="true">
        <span>→</span>
      </div>
      <div className={styles.col}>
        <TimePicker value={value.to} onChange={handleTo} clock={clock} step={step} label="To" />
      </div>
      <footer className={styles.foot}>
        <span className={styles.kicker}>Duration</span>
        <strong>{summary}</strong>
      </footer>
    </div>
  )
}

export default TimeRangePicker
