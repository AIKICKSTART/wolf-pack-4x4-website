"use client"

import { useId } from "react"

import styles from "./recurring-booking-option.module.css"
import type { RecurrenceFrequency } from "./booking-widget-types"

interface RecurringBookingOptionProps {
  frequency: RecurrenceFrequency
  occurrences: number
  /** ISO date e.g. "2026-09-30". */
  endDate: string
  onFrequencyChange?: (next: RecurrenceFrequency) => void
  onOccurrencesChange?: (next: number) => void
  onEndDateChange?: (iso: string) => void
}

const FREQUENCIES: ReadonlyArray<{ id: RecurrenceFrequency; label: string }> = [
  { id: "weekly", label: "Weekly" },
  { id: "fortnightly", label: "Fortnightly" },
  { id: "monthly", label: "Monthly" },
  { id: "custom", label: "Custom" },
]

export function RecurringBookingOption({
  frequency,
  occurrences,
  endDate,
  onFrequencyChange,
  onOccurrencesChange,
  onEndDateChange,
}: RecurringBookingOptionProps) {
  const occurrencesId = useId()
  const endId = useId()

  return (
    <fieldset className={styles.wrap}>
      <legend className={styles.legend}>Repeat this booking</legend>

      <div className={styles.row} role="radiogroup" aria-label="Repeat frequency">
        {FREQUENCIES.map((item) => {
          const isSelected = item.id === frequency
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={[styles.chip, isSelected && styles.chipSelected]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onFrequencyChange?.(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor={occurrencesId} className={styles.fieldLabel}>
            Occurrences
          </label>
          <div className={styles.stepper}>
            <button
              type="button"
              className={styles.step}
              aria-label="Fewer occurrences"
              onClick={() => onOccurrencesChange?.(Math.max(1, occurrences - 1))}
            >
              −
            </button>
            <input
              id={occurrencesId}
              type="number"
              className={styles.stepperInput}
              min={1}
              max={52}
              value={occurrences}
              onChange={(event) => {
                const next = Number.parseInt(event.target.value, 10)
                if (!Number.isNaN(next)) onOccurrencesChange?.(next)
              }}
            />
            <button
              type="button"
              className={styles.step}
              aria-label="More occurrences"
              onClick={() => onOccurrencesChange?.(Math.min(52, occurrences + 1))}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor={endId} className={styles.fieldLabel}>
            End date
          </label>
          <input
            id={endId}
            type="date"
            className={styles.dateInput}
            value={endDate}
            onChange={(event) => onEndDateChange?.(event.target.value)}
          />
        </div>
      </div>
    </fieldset>
  )
}

export default RecurringBookingOption
