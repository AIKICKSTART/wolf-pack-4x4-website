"use client"

import { type ChangeEvent } from "react"

import { WEEKDAY_MIN } from "./date-utils"
import styles from "./recurrence-picker.module.css"

export type RecurrenceFrequency = "daily" | "weekly" | "monthly"
export type RecurrenceEnd =
  | { kind: "never" }
  | { kind: "on"; date: string }
  | { kind: "after"; count: number }

export interface RecurrenceValue {
  interval: number
  frequency: RecurrenceFrequency
  /** Active weekdays (0=Sun … 6=Sat). Only meaningful when frequency = weekly. */
  weekdays: ReadonlyArray<number>
  /** Day-of-month, 1-31. Only meaningful when frequency = monthly. */
  monthDay: number
  end: RecurrenceEnd
}

interface RecurrencePickerProps {
  value: RecurrenceValue
  onChange?: (value: RecurrenceValue) => void
  className?: string
}

const FREQUENCY_OPTIONS: ReadonlyArray<{ id: RecurrenceFrequency; label: string }> = [
  { id: "daily", label: "Days" },
  { id: "weekly", label: "Weeks" },
  { id: "monthly", label: "Months" },
]

export function RecurrencePicker({ value, onChange, className }: RecurrencePickerProps) {
  const handleInterval = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(1, Math.min(99, Number.parseInt(event.target.value, 10) || 1))
    onChange?.({ ...value, interval: next })
  }

  const handleFrequency = (frequency: RecurrenceFrequency) => {
    onChange?.({ ...value, frequency })
  }

  const handleWeekday = (day: number) => {
    const exists = value.weekdays.includes(day)
    const next = exists ? value.weekdays.filter((d) => d !== day) : [...value.weekdays, day]
    onChange?.({ ...value, weekdays: next })
  }

  const handleMonthDay = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(1, Math.min(31, Number.parseInt(event.target.value, 10) || 1))
    onChange?.({ ...value, monthDay: next })
  }

  const handleEndKind = (kind: RecurrenceEnd["kind"]) => {
    if (kind === "never") {
      onChange?.({ ...value, end: { kind: "never" } })
      return
    }
    if (kind === "on") {
      const fallback =
        value.end.kind === "on" ? value.end.date : new Date().toISOString().slice(0, 10)
      onChange?.({ ...value, end: { kind: "on", date: fallback } })
      return
    }
    const fallback = value.end.kind === "after" ? value.end.count : 10
    onChange?.({ ...value, end: { kind: "after", count: fallback } })
  }

  const handleEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...value, end: { kind: "on", date: event.target.value } })
  }

  const handleEndCount = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(1, Math.min(999, Number.parseInt(event.target.value, 10) || 1))
    onChange?.({ ...value, end: { kind: "after", count: next } })
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <fieldset className={styles.row}>
        <legend className={styles.kicker}>Repeat every</legend>
        <input
          type="number"
          min={1}
          max={99}
          value={value.interval}
          onChange={handleInterval}
          className={styles.numInput}
          aria-label="Interval"
        />
        <div className={styles.segmented} role="group" aria-label="Frequency">
          {FREQUENCY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={value.frequency === option.id}
              onClick={() => handleFrequency(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      {value.frequency === "weekly" && (
        <fieldset className={styles.row}>
          <legend className={styles.kicker}>On these days</legend>
          <div className={styles.weekdays} role="group" aria-label="Weekdays">
            {WEEKDAY_MIN.map((label, index) => {
              const active = value.weekdays.includes(index)
              return (
                <button
                  key={index}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleWeekday(index)}
                  className={styles.weekday}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      {value.frequency === "monthly" && (
        <fieldset className={styles.row}>
          <legend className={styles.kicker}>On the Nth day</legend>
          <input
            type="number"
            min={1}
            max={31}
            value={value.monthDay}
            onChange={handleMonthDay}
            className={styles.numInput}
            aria-label="Day of month"
          />
          <span className={styles.helper}>of each month</span>
        </fieldset>
      )}

      <fieldset className={styles.row}>
        <legend className={styles.kicker}>Ends</legend>
        <div className={styles.endRow}>
          <label className={styles.radio}>
            <input
              type="radio"
              name="recurrence-end"
              checked={value.end.kind === "never"}
              onChange={() => handleEndKind("never")}
            />
            <span>Never</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="recurrence-end"
              checked={value.end.kind === "on"}
              onChange={() => handleEndKind("on")}
            />
            <span>On</span>
            <input
              type="date"
              disabled={value.end.kind !== "on"}
              value={value.end.kind === "on" ? value.end.date : ""}
              onChange={handleEndDate}
              className={styles.dateInput}
            />
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              name="recurrence-end"
              checked={value.end.kind === "after"}
              onChange={() => handleEndKind("after")}
            />
            <span>After</span>
            <input
              type="number"
              min={1}
              max={999}
              disabled={value.end.kind !== "after"}
              value={value.end.kind === "after" ? value.end.count : 10}
              onChange={handleEndCount}
              className={styles.numInput}
              aria-label="Occurrences"
            />
            <span>occurrences</span>
          </label>
        </div>
      </fieldset>
    </div>
  )
}

export default RecurrencePicker
