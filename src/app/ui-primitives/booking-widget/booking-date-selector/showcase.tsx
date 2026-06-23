"use client"

import { useState } from "react"

import { BookingDateSelector } from "../../components/booking-widget"
import { SAMPLE_DATES } from "../sample-data"

export function BookingDateSelectorShowcase() {
  const [selected, setSelected] = useState<string | null>("2026-06-04")
  return (
    <BookingDateSelector
      dates={SAMPLE_DATES}
      selectedIso={selected}
      onSelect={setSelected}
    />
  )
}
