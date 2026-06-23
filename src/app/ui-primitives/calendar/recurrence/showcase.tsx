"use client"

import { useState } from "react"

import { RecurrencePicker, type RecurrenceValue } from "../../components/calendar"

export function RecurrenceShowcase() {
  const [value, setValue] = useState<RecurrenceValue>({
    interval: 2,
    frequency: "weekly",
    weekdays: [1, 3, 5],
    monthDay: 15,
    end: { kind: "after", count: 12 },
  })

  return <RecurrencePicker value={value} onChange={setValue} />
}
