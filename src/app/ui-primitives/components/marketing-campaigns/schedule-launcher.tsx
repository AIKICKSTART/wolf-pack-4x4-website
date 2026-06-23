"use client"

import { Calendar, Clock, Repeat, Sparkles, Zap } from "lucide-react"
import { useId, useState, type ChangeEvent, type ReactNode } from "react"

import { Chip } from "../primitives/chip"

import styles from "./schedule-launcher.module.css"
import type { ScheduleKind } from "./marketing-campaigns-types"

interface ScheduleLauncherProps {
  /** Default selected mode. */
  defaultMode?: ScheduleKind
  /** Default ISO datetime (for "specific" mode). */
  defaultDateTime?: string
  /** Timezone options. */
  timezones?: ReadonlyArray<string>
  defaultTimezone?: string
  className?: string
}

const MODES: ReadonlyArray<{
  id: ScheduleKind
  label: string
  description: string
  icon: ReactNode
}> = [
  {
    id: "now",
    label: "Send now",
    description: "Push to the queue immediately",
    icon: <Zap size={15} strokeWidth={2.4} aria-hidden="true" />,
  },
  {
    id: "specific",
    label: "Specific time",
    description: "Pick a date and time",
    icon: <Calendar size={15} strokeWidth={2.4} aria-hidden="true" />,
  },
  {
    id: "recurring",
    label: "Recurring",
    description: "Daily, weekly, or monthly cadence",
    icon: <Repeat size={15} strokeWidth={2.4} aria-hidden="true" />,
  },
  {
    id: "optimized",
    label: "Send-time optimized",
    description: "Per-contact best time inferred",
    icon: <Sparkles size={15} strokeWidth={2.4} aria-hidden="true" />,
  },
]

const DEFAULT_TIMEZONES: ReadonlyArray<string> = [
  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Perth",
  "Pacific/Auckland",
]

export function ScheduleLauncher({
  defaultMode = "specific",
  defaultDateTime = "2026-06-02T18:30",
  timezones = DEFAULT_TIMEZONES,
  defaultTimezone = "Australia/Sydney",
  className,
}: ScheduleLauncherProps) {
  const radioGroupId = useId()
  const [mode, setMode] = useState<ScheduleKind>(defaultMode)
  const [dateTime, setDateTime] = useState<string>(defaultDateTime)
  const [timezone, setTimezone] = useState<string>(defaultTimezone)

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Schedule launcher"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>
          <Clock size={13} strokeWidth={2.4} aria-hidden="true" />
          Schedule
        </span>
      </header>

      <div
        className={styles.modes}
        role="radiogroup"
        aria-label="Schedule mode"
        id={radioGroupId}
      >
        {MODES.map((option) => {
          const selected = option.id === mode
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={styles.mode}
              onClick={() => setMode(option.id)}
            >
              <span className={styles.modeIcon} aria-hidden="true">
                {option.icon}
              </span>
              <span className={styles.modeLabel}>{option.label}</span>
              <span className={styles.modeDescription}>
                {option.description}
              </span>
            </button>
          )
        })}
      </div>

      {mode === "specific" || mode === "recurring" ? (
        <div className={styles.timeRow}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Local time</span>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDateTime(event.target.value)
              }
              className={styles.input}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Timezone</span>
            <select
              value={timezone}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setTimezone(event.target.value)
              }
              className={styles.input}
            >
              {timezones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}

      <footer className={styles.footer}>
        <Chip
          label={mode === "now" ? "Send · immediately" : `Send · ${dateTime.replace("T", " ")}`}
          tone="teal"
          selected
        />
        <Chip label={`Tz · ${timezone}`} tone="neutral" />
      </footer>
    </section>
  )
}

export default ScheduleLauncher
