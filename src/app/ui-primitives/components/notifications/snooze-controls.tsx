"use client"

import { useId, useState } from "react"

import styles from "./snooze-controls.module.css"

export type SnoozePresetId = "hour" | "tomorrow" | "next-week" | "custom"

export interface SnoozePreset {
  id: SnoozePresetId
  label: string
  hint?: string
}

export interface SnoozeCustomValue {
  date: string
  time: string
}

interface SnoozeControlsProps {
  presets?: ReadonlyArray<SnoozePreset>
  defaultSelected?: SnoozePresetId
  defaultCustom?: SnoozeCustomValue
  onChange?: (selected: SnoozePresetId, custom?: SnoozeCustomValue) => void
  summary?: string
  className?: string
}

const DEFAULT_PRESETS: ReadonlyArray<SnoozePreset> = [
  { id: "hour", label: "1 hour", hint: "Quiet for 60 min" },
  { id: "tomorrow", label: "Until tomorrow", hint: "Resume 09:00" },
  { id: "next-week", label: "Until next week", hint: "Resume Monday" },
  { id: "custom", label: "Custom", hint: "Pick date + time" },
]

export function SnoozeControls({
  presets = DEFAULT_PRESETS,
  defaultSelected = "hour",
  defaultCustom = { date: "", time: "" },
  onChange,
  summary,
  className,
}: SnoozeControlsProps) {
  const [selected, setSelected] = useState<SnoozePresetId>(defaultSelected)
  const [custom, setCustom] = useState<SnoozeCustomValue>(defaultCustom)
  const dateId = useId()
  const timeId = useId()

  const choose = (id: SnoozePresetId) => {
    setSelected(id)
    onChange?.(id, id === "custom" ? custom : undefined)
  }

  const updateCustom = (next: SnoozeCustomValue) => {
    setCustom(next)
    if (selected === "custom") {
      onChange?.("custom", next)
    }
  }

  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Snooze notifications">
      <header className={styles.head}>
        <p className={styles.label}>Snooze for</p>
        <p className={styles.help}>Pause notifications and resume automatically</p>
      </header>

      <div className={styles.chips} role="radiogroup" aria-label="Snooze duration">
        {presets.map((preset) => {
          const isCurrent = selected === preset.id
          return (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={isCurrent}
              aria-current={isCurrent ? "true" : undefined}
              className={styles.chip}
              onClick={() => choose(preset.id)}
            >
              {preset.label}
            </button>
          )
        })}
      </div>

      {selected === "custom" && (
        <div className={styles.customWrap}>
          <div className={styles.customGrid}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor={dateId}>
                Resume date
              </label>
              <input
                id={dateId}
                type="date"
                value={custom.date}
                onChange={(event) =>
                  updateCustom({ ...custom, date: event.target.value })
                }
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor={timeId}>
                Resume time
              </label>
              <input
                id={timeId}
                type="time"
                value={custom.time}
                onChange={(event) =>
                  updateCustom({ ...custom, time: event.target.value })
                }
                className={styles.input}
              />
            </div>
          </div>
        </div>
      )}

      {summary && (
        <p className={styles.summary} role="status" aria-live="polite">
          {summary}
        </p>
      )}
    </section>
  )
}

export default SnoozeControls
