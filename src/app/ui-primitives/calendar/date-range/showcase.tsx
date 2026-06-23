"use client"

import { useState } from "react"

import { DateRangePicker, type DateRange } from "../../components/calendar"

const TODAY = new Date(2026, 4, 28)

export function DateRangeShowcase() {
  const [range, setRange] = useState<DateRange | null>({
    start: new Date(2026, 4, 21),
    end: new Date(2026, 4, 28),
  })

  return <DateRangePicker value={range} onChange={setRange} today={TODAY} />
}
