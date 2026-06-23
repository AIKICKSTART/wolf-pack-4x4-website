"use client"

import { useState } from "react"

import { TimeRangePicker, type TimeRange } from "../../components/calendar"

export function TimeRangeShowcase() {
  const [range, setRange] = useState<TimeRange>({
    from: { hours: 8, minutes: 30 },
    to: { hours: 17, minutes: 0 },
  })

  return <TimeRangePicker value={range} onChange={setRange} clock={24} step={15} />
}
