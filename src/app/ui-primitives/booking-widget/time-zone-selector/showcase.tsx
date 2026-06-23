"use client"

import { useState } from "react"

import { TimeZoneSelector } from "../../components/booking-widget"
import { SAMPLE_TIME_ZONES } from "../sample-data"

export function TimeZoneSelectorShowcase() {
  const [selected, setSelected] = useState<string>("Australia/Sydney")
  return (
    <TimeZoneSelector
      zones={SAMPLE_TIME_ZONES}
      selectedId={selected}
      onSelect={setSelected}
      onDetect={() => setSelected("Australia/Sydney")}
    />
  )
}
