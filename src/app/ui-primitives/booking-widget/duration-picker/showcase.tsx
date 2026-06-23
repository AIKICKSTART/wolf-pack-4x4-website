"use client"

import { useState } from "react"

import { DurationPicker } from "../../components/booking-widget"
import { SAMPLE_DURATIONS } from "../sample-data"

export function DurationPickerShowcase() {
  const [selected, setSelected] = useState<number | null>(60)
  return (
    <DurationPicker
      options={SAMPLE_DURATIONS}
      selectedMinutes={selected}
      onSelect={setSelected}
    />
  )
}
