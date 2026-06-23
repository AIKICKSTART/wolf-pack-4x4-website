"use client"

import { useCallback, useId, useState } from "react"

import styles from "./quiet-hours-scheduler.module.css"

export type DayCode = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export interface QuietHoursException {
  id: string
  label: string
  description?: string
  enabled: boolean
}

export interface QuietHoursValue {
  days: ReadonlyArray<DayCode>
  startTime: string
  endTime: string
  exceptions: ReadonlyArray<QuietHoursException>
}

interface QuietHoursSchedulerProps {
  defaultValue?: QuietHoursValue
  onChange?: (value: QuietHoursValue) => void
  className?: string
}

const DAY_ORDER: ReadonlyArray<{ code: DayCode; label: string }> = [
  { code: "mon", label: "Mo" },
  { code: "tue", label: "Tu" },
  { code: "wed", label: "We" },
  { code: "thu", label: "Th" },
  { code: "fri", label: "Fr" },
  { code: "sat", label: "Sa" },
  { code: "sun", label: "Su" },
]

const DEFAULT_VALUE: QuietHoursValue = {
  days: ["mon", "tue", "wed", "thu", "fri"],
  startTime: "20:00",
  endTime: "07:00",
  exceptions: [
    {
      id: "urgent",
      label: "Urgent always breaks through",
      description: "Bay 02 emergency · safety alerts",
      enabled: true,
    },
    {
      id: "mentions",
      label: "Team mentions always notify",
      description: "@you mentions across all channels",
      enabled: false,
    },
  ],
}

export function QuietHoursScheduler({
  defaultValue = DEFAULT_VALUE,
  onChange,
  className,
}: QuietHoursSchedulerProps) {
  const [value, setValue] = useState<QuietHoursValue>(defaultValue)
  const startId = useId()
  const endId = useId()

  const apply = useCallback(
    (next: QuietHoursValue) => {
      setValue(next)
      onChange?.(next)
    },
    [onChange],
  )

  const toggleDay = (code: DayCode) => {
    const isOn = value.days.includes(code)
    const days = isOn
      ? value.days.filter((d) => d !== code)
      : [...value.days, code]
    apply({ ...value, days })
  }

  const setStart = (startTime: string) => apply({ ...value, startTime })
  const setEnd = (endTime: string) => apply({ ...value, endTime })

  const toggleException = (id: string) => {
    const exceptions = value.exceptions.map((ex) =>
      ex.id === id ? { ...ex, enabled: !ex.enabled } : ex,
    )
    apply({ ...value, exceptions })
  }

  const classes = [styles.scheduler, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Quiet hours scheduler">
      <fieldset className={styles.section}>
        <legend className={styles.legend}>Days</legend>
        <div className={styles.days}>
          {DAY_ORDER.map((day) => {
            const active = value.days.includes(day.code)
            return (
              <button
                key={day.code}
                type="button"
                className={styles.dayChip}
                aria-pressed={active}
                aria-label={day.code}
                onClick={() => toggleDay(day.code)}
              >
                {day.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>Quiet window</legend>
        <div className={styles.timeRow}>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor={startId}>
              Start
            </label>
            <input
              id={startId}
              type="time"
              value={value.startTime}
              onChange={(event) => setStart(event.target.value)}
              className={styles.input}
            />
          </div>
          <span className={styles.timeArrow} aria-hidden="true">
            →
          </span>
          <div className={styles.field}>
            <label className={styles.fieldLabel} htmlFor={endId}>
              End
            </label>
            <input
              id={endId}
              type="time"
              value={value.endTime}
              onChange={(event) => setEnd(event.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.section}>
        <legend className={styles.legend}>Exceptions</legend>
        <div className={styles.exceptions}>
          {value.exceptions.map((ex) => (
            <div key={ex.id} className={styles.exception}>
              <div className={styles.exceptionLabel}>
                <strong>{ex.label}</strong>
                {ex.description && <span>{ex.description}</span>}
              </div>
              <button
                type="button"
                role="switch"
                className={styles.switch}
                aria-checked={ex.enabled}
                aria-label={`${ex.label} ${ex.enabled ? "on" : "off"}`}
                onClick={() => toggleException(ex.id)}
                data-on={ex.enabled ? "true" : "false"}
              />
            </div>
          ))}
        </div>
      </fieldset>
    </section>
  )
}

export default QuietHoursScheduler
