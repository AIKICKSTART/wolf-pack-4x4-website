"use client"

import { useState } from "react"

import type { DateRangePresetEntry } from "./reports-types"
import styles from "./date-range-presets.module.css"

interface DateRangePresetsProps {
  presets: ReadonlyArray<DateRangePresetEntry>
  initialPresetId?: string
  onSelect?: (presetId: string) => void
  className?: string
}

export function DateRangePresets({
  presets,
  initialPresetId,
  onSelect,
  className,
}: DateRangePresetsProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialPresetId ?? presets[0]?.id ?? "",
  )

  const handleSelect = (id: string) => {
    setSelectedId(id)
    onSelect?.(id)
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="radiogroup" aria-label="Date range presets">
      {presets.map((preset) => {
        const active = preset.id === selectedId
        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.preset} ${active ? styles.presetActive : ""}`}
            onClick={() => handleSelect(preset.id)}
          >
            <span className={styles.label}>{preset.label}</span>
            <span className={styles.hint}>{preset.hint}</span>
          </button>
        )
      })}
    </div>
  )
}

export default DateRangePresets
