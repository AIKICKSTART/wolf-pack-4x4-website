"use client"

import { CalendarDays, Clock } from "lucide-react"
import { useId, useState } from "react"

import { MiniDatePicker } from "../calendar"
import { Chip } from "../primitives"
import { GlassSurface } from "../surfaces"

import type { PublishCadence } from "./content-studio-types"
import styles from "./publish-scheduler.module.css"

interface PublishSchedulerProps {
  /** Initial scheduled date. Defaults to today. */
  defaultDate?: Date
  /** Selected publish time, 24h "HH:mm". */
  defaultTime?: string
  /** Selected timezone label. */
  defaultTimezone?: string
  /** Initial cadence. */
  defaultCadence?: PublishCadence
  /** Optional onSchedule callback. */
  onSchedule?: (payload: { date: Date | null; time: string; cadence: PublishCadence }) => void
  className?: string
}

const TIMEZONE_OPTIONS: ReadonlyArray<{ id: string; label: string; offset: string }> = [
  { id: "AEST", label: "Sydney · AEST", offset: "+10:00" },
  { id: "ACST", label: "Adelaide · ACST", offset: "+09:30" },
  { id: "AWST", label: "Perth · AWST", offset: "+08:00" },
  { id: "NZST", label: "Auckland · NZST", offset: "+12:00" },
]

const CADENCE_OPTIONS: ReadonlyArray<{ id: PublishCadence; label: string }> = [
  { id: "one-off", label: "One-off" },
  { id: "weekly", label: "Weekly" },
  { id: "fortnightly", label: "Fortnightly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
]

function formatDateLong(date: Date | null): string {
  if (!date) return "—"
  return date.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

export function PublishScheduler({
  defaultDate,
  defaultTime = "08:30",
  defaultTimezone = "AEST",
  defaultCadence = "one-off",
  onSchedule,
  className,
}: PublishSchedulerProps) {
  const schedulerId = useId()
  const [date, setDate] = useState<Date | null>(defaultDate ?? new Date(2026, 5, 4))
  const [time, setTime] = useState<string>(defaultTime)
  const [timezone, setTimezone] = useState<string>(defaultTimezone)
  const [cadence, setCadence] = useState<PublishCadence>(defaultCadence)

  const classes = [styles.scheduler, className].filter(Boolean).join(" ")
  const tz = TIMEZONE_OPTIONS.find((t) => t.id === timezone) ?? TIMEZONE_OPTIONS[0]

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <div className={styles.shell} id={schedulerId}>
        <header className={styles.head}>
          <span className={styles.kicker}>Publish scheduler</span>
          <h2 className={styles.title}>When does this go live?</h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.picker}>
            <MiniDatePicker
              value={date}
              onChange={(next) => {
                setDate(next)
                onSchedule?.({ date: next, time, cadence })
              }}
            />
          </div>

          <div className={styles.controls}>
            <div className={styles.summary}>
              <span className={styles.summaryLabel}>Scheduled for</span>
              <span className={styles.summaryValue}>{formatDateLong(date)}</span>
              <span className={styles.summaryDetail}>
                {time} · {tz.label} ({tz.offset})
              </span>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                <Clock size={11} strokeWidth={2.4} aria-hidden="true" /> Time
              </span>
              <input
                type="time"
                className={styles.input}
                value={time}
                onChange={(event) => {
                  setTime(event.target.value)
                  onSchedule?.({ date, time: event.target.value, cadence })
                }}
                aria-label="Publish time"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                <CalendarDays size={11} strokeWidth={2.4} aria-hidden="true" /> Timezone
              </span>
              <select
                className={styles.input}
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                aria-label="Publish timezone"
              >
                {TIMEZONE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} ({option.offset})
                  </option>
                ))}
              </select>
            </label>

            <fieldset className={styles.cadence}>
              <legend className={styles.fieldLabel}>Republish cadence</legend>
              <div className={styles.cadenceRow} role="radiogroup" aria-label="Cadence">
                {CADENCE_OPTIONS.map((option) => (
                  <Chip
                    key={option.id}
                    label={option.label}
                    tone={option.id === cadence ? "teal" : "neutral"}
                    selected={option.id === cadence}
                    onSelect={() => {
                      setCadence(option.id)
                      onSchedule?.({ date, time, cadence: option.id })
                    }}
                  />
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </GlassSurface>
  )
}

export default PublishScheduler
