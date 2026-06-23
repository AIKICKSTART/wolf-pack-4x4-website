"use client"

import { useState } from "react"

import { GroupBookingPartySize } from "../../components/booking-widget"

export function GroupBookingShowcase() {
  const [size, setSize] = useState<number>(4)
  return (
    <GroupBookingPartySize
      size={size}
      onChange={setSize}
      perPersonPrice={{ cents: 4500, currency: "AUD" }}
      groupDiscountCents={500}
      groupDiscountThreshold={3}
      minSize={1}
      maxSize={8}
    />
  )
}
