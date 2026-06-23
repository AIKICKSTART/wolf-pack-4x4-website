"use client"

import { Moon } from "lucide-react"
import { useId, useState } from "react"

import type {
  TimeWindow,
  WeekdayCode,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface DoNotDisturbValue {
  enabled: boolean
  weekdays: ReadonlyArray<WeekdayCode>
  window: TimeWindow
}

interface DoNotDisturbCardProps {
  initialValue: DoNotDisturbValue
  onChange?: (value: DoNotDisturbValue) => void
  className?: string
}

const ALL_DAYS: ReadonlyArray<WeekdayCode> = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]

function pad2(n: number): string {
  return n.toString().padStart(2, "0")
}

function fmtWindow(window: TimeWindow): string {
  return `${pad2(window.startHour)}:${pad2(window.startMinute)} – ${pad2(window.endHour)}:${pad2(window.endMinute)}`
}

export function DoNotDisturbCard({
  initialValue,
  onChange,
  className,
}: DoNotDisturbCardProps) {
  const [value, setValue] = useState<DoNotDisturbValue>(initialValue)
  const enabledId = useId()
  const startId = useId()
  const endId = useId()

  const update = (next: DoNotDisturbValue) => {
    setValue(next)
    onChange?.(next)
  }

  const toggleDay = (day: WeekdayCode) => {
    const has = value.weekdays.includes(day)
    const nextDays: WeekdayCode[] = has
      ? value.weekdays.filter((existing) => existing !== day)
      : [...value.weekdays, day]
    update({ ...value, weekdays: nextDays })
  }

  const parseTime = (raw: string): [number, number] => {
    const [hh, mm] = raw.split(":")
    return [Number.parseInt(hh ?? "0", 10) || 0, Number.parseInt(mm ?? "0", 10) || 0]
  }

  const classes = [styles.dndCard, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Do not disturb schedule">
      <header className={styles.dndHead}>
        <span className={styles.dndIcon} aria-hidden="true">
          <Moon size={16} strokeWidth={2.2} />
        </span>
        <div className={styles.dndTitleWrap}>
          <p className={styles.dndKicker}>Do not disturb</p>
          <h3 className={styles.dndTitle}>Weekday hush window</h3>
        </div>
        <label className={styles.dndSwitchLabel} htmlFor={enabledId}>
          <span className={styles.dndSwitchText}>
            {value.enabled ? "On" : "Off"}
          </span>
          <span className={styles.dndSwitch}>
            <input
              id={enabledId}
              type="checkbox"
              checked={value.enabled}
              onChange={(event) => update({ ...value, enabled: event.target.checked })}
              className={styles.dndCheckbox}
              aria-label="Enable do not disturb"
            />
            <span className={styles.dndKnob} aria-hidden="true" />
          </span>
        </label>
      </header>

      <fieldset className={styles.dndDays} disabled={!value.enabled}>
        <legend className={styles.srOnly}>Repeat on</legend>
        {ALL_DAYS.map((day) => {
          const on = value.weekdays.includes(day)
          return (
            <button
              key={day}
              type="button"
              role="switch"
              aria-checked={on}
              className={[styles.dndDay, on ? styles.dndDayOn : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => toggleDay(day)}
              aria-label={`${day} ${on ? "active" : "inactive"}`}
            >
              {day}
            </button>
          )
        })}
      </fieldset>

      <div className={styles.dndTimes}>
        <div className={styles.dndField}>
          <label className={styles.dndFieldLabel} htmlFor={startId}>
            Quiet from
          </label>
          <input
            id={startId}
            type="time"
            disabled={!value.enabled}
            className={styles.dndInput}
            value={`${pad2(value.window.startHour)}:${pad2(value.window.startMinute)}`}
            onChange={(event) => {
              const [hh, mm] = parseTime(event.target.value)
              update({
                ...value,
                window: {
                  ...value.window,
                  startHour: hh,
                  startMinute: mm,
                },
              })
            }}
          />
        </div>
        <div className={styles.dndField}>
          <label className={styles.dndFieldLabel} htmlFor={endId}>
            Resume at
          </label>
          <input
            id={endId}
            type="time"
            disabled={!value.enabled}
            className={styles.dndInput}
            value={`${pad2(value.window.endHour)}:${pad2(value.window.endMinute)}`}
            onChange={(event) => {
              const [hh, mm] = parseTime(event.target.value)
              update({
                ...value,
                window: {
                  ...value.window,
                  endHour: hh,
                  endMinute: mm,
                },
              })
            }}
          />
        </div>
      </div>

      <p className={styles.dndSummary} role="status" aria-live="polite">
        {value.enabled
          ? `Hushing ${value.weekdays.join(" · ")} from ${fmtWindow(value.window)} AEST.`
          : "Currently off — all channels will deliver in real time."}
      </p>
    </section>
  )
}

export default DoNotDisturbCard
