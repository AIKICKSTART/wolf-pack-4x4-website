"use client"

import styles from "./duration-picker.module.css"
import type { DurationOption } from "./booking-widget-types"

interface DurationPickerProps {
  options: ReadonlyArray<DurationOption>
  selectedMinutes: number | null
  onSelect?: (minutes: number) => void
  label?: string
}

function formatAud(cents: number): string {
  if (cents === 0) return "Free"
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

export function DurationPicker({
  options,
  selectedMinutes,
  onSelect,
  label = "Duration",
}: DurationPickerProps) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{label}</span>
      <div className={styles.row} role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = option.minutes === selectedMinutes
          return (
            <button
              key={option.minutes}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={[styles.chip, isSelected && styles.chipSelected]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSelect?.(option.minutes)}
            >
              <span className={styles.duration}>{formatDuration(option.minutes)}</span>
              <span className={styles.price}>{formatAud(option.price.cents)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DurationPicker
