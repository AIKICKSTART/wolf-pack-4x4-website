"use client"

import { useState } from "react"

import { TimeSlotGrid } from "../../components/booking-widget"
import type { ClockFormat } from "../../components/booking-widget"
import { SAMPLE_SLOTS } from "../sample-data"

export function TimeSlotGridShowcase() {
  const [selected, setSelected] = useState<string | null>("10:00")
  const [clock, setClock] = useState<ClockFormat>("12h")

  return (
    <TimeSlotGrid
      slots={SAMPLE_SLOTS}
      selectedId={selected}
      onSelect={setSelected}
      clock={clock}
      onClockChange={setClock}
    />
  )
}
