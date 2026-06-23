"use client"

import { useCallback, useMemo, useRef, type KeyboardEvent } from "react"

import styles from "./time-picker.module.css"

export type ClockMode = 12 | 24

export interface TimeValue {
  hours: number
  minutes: number
}

interface TimePickerProps {
  value: TimeValue
  onChange?: (value: TimeValue) => void
  /** Clock mode: 12h or 24h. Defaults to 24. */
  clock?: ClockMode
  /** Minute step. Defaults to 5. */
  step?: number
  /** Field label rendered as the kicker above the columns. */
  label?: string
  className?: string
}

interface ColumnProps<T extends number> {
  label: string
  values: ReadonlyArray<T>
  selected: T
  formatter: (value: T) => string
  onSelect: (value: T) => void
}

function ScrollColumn<T extends number>({
  label,
  values,
  selected,
  formatter,
  onSelect,
}: ColumnProps<T>) {
  const listRef = useRef<HTMLUListElement | null>(null)

  const handleKey = (event: KeyboardEvent<HTMLLIElement>, value: T, index: number) => {
    let nextIndex: number | null = null
    switch (event.key) {
      case "ArrowDown":
        nextIndex = (index + 1) % values.length
        break
      case "ArrowUp":
        nextIndex = (index - 1 + values.length) % values.length
        break
      case "Enter":
      case " ":
        event.preventDefault()
        onSelect(value)
        return
      default:
        return
    }
    if (nextIndex !== null) {
      event.preventDefault()
      onSelect(values[nextIndex])
      const list = listRef.current
      if (list) {
        const next = list.children[nextIndex] as HTMLElement | undefined
        if (next) {
          next.focus()
          next.scrollIntoView({ block: "nearest" })
        }
      }
    }
  }

  return (
    <div className={styles.column}>
      <span className={styles.columnLabel}>{label}</span>
      <ul className={styles.list} ref={listRef} role="listbox" aria-label={label}>
        {values.map((value, index) => {
          const isSelected = value === selected
          return (
            <li
              key={value}
              role="option"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={[styles.option, isSelected && styles.optionSelected]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSelect(value)}
              onKeyDown={(event) => handleKey(event, value, index)}
            >
              {formatter(value)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0")
}

export function TimePicker({
  value,
  onChange,
  clock = 24,
  step = 5,
  label = "Time",
  className,
}: TimePickerProps) {
  const hourValues = useMemo<ReadonlyArray<number>>(() => {
    if (clock === 24) {
      return Array.from({ length: 24 }, (_, index) => index)
    }
    return Array.from({ length: 12 }, (_, index) => index + 1)
  }, [clock])

  const minuteValues = useMemo<ReadonlyArray<number>>(() => {
    const count = Math.floor(60 / step)
    return Array.from({ length: count }, (_, index) => index * step)
  }, [step])

  const formatHour = useCallback(
    (hour: number): string => {
      if (clock === 24) return pad2(hour)
      return String(hour)
    },
    [clock],
  )

  const isPm = value.hours >= 12
  const displayHour =
    clock === 24
      ? value.hours
      : value.hours % 12 === 0
        ? 12
        : value.hours % 12

  const handleClockSwitch = (mode: ClockMode) => {
    if (mode === clock) return
    // Switching modes doesn't alter the stored value, but the UI re-projects.
  }

  const handleHour = (hour: number) => {
    if (clock === 24) {
      onChange?.({ hours: hour, minutes: value.minutes })
    } else {
      const base = hour === 12 ? 0 : hour
      const next = isPm ? base + 12 : base
      onChange?.({ hours: next, minutes: value.minutes })
    }
  }

  const handleMinute = (minute: number) => {
    onChange?.({ hours: value.hours, minutes: minute })
  }

  const handlePeriod = (period: "AM" | "PM") => {
    const base = value.hours % 12
    const next = period === "PM" ? base + 12 : base
    onChange?.({ hours: next, minutes: value.minutes })
  }

  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <header className={styles.head}>
        <span className={styles.kicker}>{label}</span>
        <div className={styles.modeSwitch} role="group" aria-label="Clock format">
          <button
            type="button"
            aria-pressed={clock === 12}
            onClick={() => handleClockSwitch(12)}
            disabled={clock === 12}
          >
            12h
          </button>
          <button
            type="button"
            aria-pressed={clock === 24}
            onClick={() => handleClockSwitch(24)}
            disabled={clock === 24}
          >
            24h
          </button>
        </div>
      </header>
      <div className={styles.columns}>
        <ScrollColumn<number>
          label="Hour"
          values={hourValues}
          selected={displayHour}
          formatter={formatHour}
          onSelect={handleHour}
        />
        <span className={styles.colon}>:</span>
        <ScrollColumn<number>
          label="Min"
          values={minuteValues}
          selected={value.minutes}
          formatter={pad2}
          onSelect={handleMinute}
        />
        {clock === 12 && (
          <div className={styles.periodBlock} role="group" aria-label="AM or PM">
            <button
              type="button"
              aria-pressed={!isPm}
              onClick={() => handlePeriod("AM")}
              className={styles.period}
            >
              AM
            </button>
            <button
              type="button"
              aria-pressed={isPm}
              onClick={() => handlePeriod("PM")}
              className={styles.period}
            >
              PM
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimePicker
