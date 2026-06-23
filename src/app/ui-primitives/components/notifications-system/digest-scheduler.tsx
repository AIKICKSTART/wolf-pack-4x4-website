"use client"

import { useId, useState } from "react"

import type {
  DigestScheduleValue,
  WeekdayCode,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface DigestSchedulerProps {
  initialValue: DigestScheduleValue
  /** Limit timezones shown. AEST workshop default. */
  timezones?: ReadonlyArray<string>
  onChange?: (value: DigestScheduleValue) => void
  className?: string
}

const WEEKDAYS: ReadonlyArray<WeekdayCode> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const DEFAULT_TZ: ReadonlyArray<string> = [
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Perth",
  "UTC",
]

function pad2(n: number): string {
  return n.toString().padStart(2, "0")
}

export function DigestScheduler({
  initialValue,
  timezones = DEFAULT_TZ,
  onChange,
  className,
}: DigestSchedulerProps) {
  const [value, setValue] = useState<DigestScheduleValue>(initialValue)
  const cadenceId = useId()
  const timeId = useId()
  const tzId = useId()
  const weekdayId = useId()

  const update = (next: DigestScheduleValue) => {
    setValue(next)
    onChange?.(next)
  }

  const classes = [styles.digestPanel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Digest scheduler">
      <header className={styles.digestHead}>
        <p className={styles.digestKicker}>Digest schedule</p>
        <p className={styles.digestTitle}>Round up the workshop in one email</p>
      </header>

      <div className={styles.digestRow}>
        <span className={styles.digestLabel} id={cadenceId}>
          Cadence
        </span>
        <div className={styles.digestSeg} role="radiogroup" aria-labelledby={cadenceId}>
          {(["daily", "weekly"] as const).map((cadence) => {
            const isOn = value.cadence === cadence
            return (
              <button
                key={cadence}
                type="button"
                role="radio"
                aria-checked={isOn}
                className={[styles.digestSegBtn, isOn ? styles.digestSegBtnOn : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  update({
                    ...value,
                    cadence,
                    weekday: cadence === "weekly" ? value.weekday ?? "Sat" : undefined,
                  })
                }
              >
                {cadence === "daily" ? "Daily" : "Weekly"}
              </button>
            )
          })}
        </div>
      </div>

      {value.cadence === "weekly" && (
        <div className={styles.digestRow}>
          <span className={styles.digestLabel} id={weekdayId}>
            Send day
          </span>
          <div className={styles.digestDays} role="radiogroup" aria-labelledby={weekdayId}>
            {WEEKDAYS.map((day) => {
              const isOn = value.weekday === day
              return (
                <button
                  key={day}
                  type="button"
                  role="radio"
                  aria-checked={isOn}
                  className={[styles.digestDay, isOn ? styles.digestDayOn : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => update({ ...value, weekday: day })}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className={styles.digestRow}>
        <label className={styles.digestLabel} htmlFor={timeId}>
          Send time
        </label>
        <input
          id={timeId}
          type="time"
          className={styles.digestInput}
          value={`${pad2(value.hour)}:${pad2(value.minute)}`}
          onChange={(event) => {
            const [hh, mm] = event.target.value.split(":")
            update({
              ...value,
              hour: Number.parseInt(hh ?? "0", 10) || 0,
              minute: Number.parseInt(mm ?? "0", 10) || 0,
            })
          }}
        />
      </div>

      <div className={styles.digestRow}>
        <label className={styles.digestLabel} htmlFor={tzId}>
          Timezone
        </label>
        <select
          id={tzId}
          className={styles.digestInput}
          value={value.timezone}
          onChange={(event) => update({ ...value, timezone: event.target.value })}
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      <p className={styles.digestSummary} role="status" aria-live="polite">
        Sends to <strong className={styles.digestNum}>{value.recipients}</strong>{" "}
        recipients at{" "}
        <strong className={styles.digestNum}>
          {pad2(value.hour)}:{pad2(value.minute)}
        </strong>{" "}
        {value.cadence === "weekly" && value.weekday ? `every ${value.weekday}` : "every day"}{" "}
        ({value.timezone}).
      </p>
    </section>
  )
}

export default DigestScheduler
