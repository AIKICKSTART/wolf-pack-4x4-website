"use client"

import { useState } from "react"

import { RecurringBookingOption } from "../../components/booking-widget"
import type { RecurrenceFrequency } from "../../components/booking-widget"

export function RecurringBookingShowcase() {
  const [frequency, setFrequency] = useState<RecurrenceFrequency>("monthly")
  const [occurrences, setOccurrences] = useState<number>(6)
  const [endDate, setEndDate] = useState<string>("2026-12-15")

  return (
    <RecurringBookingOption
      frequency={frequency}
      occurrences={occurrences}
      endDate={endDate}
      onFrequencyChange={setFrequency}
      onOccurrencesChange={setOccurrences}
      onEndDateChange={setEndDate}
    />
  )
}
