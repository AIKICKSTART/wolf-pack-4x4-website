"use client"

import { useState } from "react"

import { CancellationFlow } from "../../components/booking-widget"
import type { CancellationReason } from "../../components/booking-widget"

const POLICY_POINTS: ReadonlyArray<string> = [
  "Cancel up to 24 hours before the booking for a full refund.",
  "Inside 24 hours, a $25 late-cancel fee applies.",
  "No-shows are charged the full deposit.",
  "Bays are released back to the public schedule the moment you confirm.",
]

type Step = 1 | 2 | 3

export function CancellationFlowShowcase() {
  const [step, setStep] = useState<Step>(1)
  const [reason, setReason] = useState<CancellationReason | null>("schedule-conflict")

  const next = () => {
    if (step === 1) setStep(2)
    else if (step === 2) setStep(3)
  }
  const prev = () => {
    if (step === 3) setStep(2)
    else if (step === 2) setStep(1)
  }

  return (
    <CancellationFlow
      step={step}
      reason={reason}
      refundWindowDays={3}
      policyPoints={POLICY_POINTS}
      bookingId="MM-26-00417"
      onReasonChange={setReason}
      onNextStep={next}
      onPrevStep={prev}
      onConfirm={() => setStep(1)}
    />
  )
}
