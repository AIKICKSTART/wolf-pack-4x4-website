"use client"

import { BellOff, Clock } from "lucide-react"
import { useState } from "react"

import type { SnoozeDuration, SnoozeDurationId } from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface SnoozeControllerProps {
  durations: ReadonlyArray<SnoozeDuration>
  defaultSelected?: SnoozeDurationId | null
  activeChipLabel?: string
  onSnooze?: (id: SnoozeDurationId, resumesAt: string) => void
  onClear?: () => void
  className?: string
}

export function SnoozeController({
  durations,
  defaultSelected = null,
  activeChipLabel,
  onSnooze,
  onClear,
  className,
}: SnoozeControllerProps) {
  const [selected, setSelected] = useState<SnoozeDurationId | null>(defaultSelected)

  const handleSelect = (duration: SnoozeDuration) => {
    setSelected(duration.id)
    onSnooze?.(duration.id, duration.resumesAt)
  }

  const handleClear = () => {
    setSelected(null)
    onClear?.()
  }

  const active = selected
    ? durations.find((duration) => duration.id === selected) ?? null
    : null

  const classes = [styles.snoozePanel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Snooze notifications">
      <header className={styles.snoozeHead}>
        <span className={styles.snoozeIcon} aria-hidden="true">
          <BellOff size={16} strokeWidth={2.2} />
        </span>
        <div>
          <p className={styles.snoozeTitle}>Snooze the bell</p>
          <p className={styles.snoozeHint}>
            We&apos;ll resume push, SMS, and email when the timer is up.
          </p>
        </div>
      </header>

      <div className={styles.snoozeChips} role="radiogroup" aria-label="Snooze duration">
        {durations.map((duration) => {
          const isOn = selected === duration.id
          return (
            <button
              key={duration.id}
              type="button"
              role="radio"
              aria-checked={isOn}
              className={[styles.snoozeChip, isOn ? styles.snoozeChipOn : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(duration)}
            >
              <span className={styles.snoozeChipLabel}>{duration.label}</span>
              <span className={styles.snoozeChipHint}>{duration.hint}</span>
            </button>
          )
        })}
      </div>

      {active && (
        <div className={styles.snoozeActive} role="status" aria-live="polite">
          <Clock size={14} strokeWidth={2.4} aria-hidden="true" />
          <span>
            {activeChipLabel ?? `Snoozed — resumes ${active.resumesAt}`}
          </span>
          <button type="button" className={styles.snoozeClear} onClick={handleClear}>
            Wake up
          </button>
        </div>
      )}
    </section>
  )
}

export default SnoozeController
