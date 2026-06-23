"use client"

import { useState } from "react"

import { AddonChipRow } from "../../components/booking-widget"
import { SAMPLE_ADDONS } from "../sample-data"

export function AddonChipRowShowcase() {
  const [selected, setSelected] = useState<ReadonlyArray<string>>(["sound-demo"])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id],
    )
  }

  return (
    <AddonChipRow addons={SAMPLE_ADDONS} selectedIds={selected} onToggle={toggle} />
  )
}
