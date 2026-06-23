"use client"

import { useState } from "react"

import { RefundFlowCard } from "../../components/pos-checkout"
import type { RefundMethod, RefundStep } from "../../components/pos-checkout"

import { REFUND_CANDIDATES, REFUND_REASONS } from "../_mock-data"

const STEP_ORDER: ReadonlyArray<RefundStep> = [
  "select-items",
  "reason",
  "method",
  "confirm",
]

export function RefundFlowInteractiveDemo() {
  const [selectedItemIds, setSelectedItemIds] = useState<ReadonlyArray<string>>([])
  const [reason, setReason] = useState<string | null>(null)
  const [method, setMethod] = useState<RefundMethod | null>(null)
  const [step, setStep] = useState<RefundStep>("select-items")

  const handleToggle = (id: string) => {
    setSelectedItemIds((current) =>
      current.includes(id) ? current.filter((token) => token !== id) : [...current, id],
    )
  }
  const handleReason = (token: string) => setReason(token)
  const handleMethod = (token: RefundMethod) => setMethod(token)
  const handleNext = () => {
    const index = STEP_ORDER.indexOf(step)
    if (index < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[index + 1])
    }
  }
  const handleBack = () => {
    const index = STEP_ORDER.indexOf(step)
    if (index > 0) {
      setStep(STEP_ORDER[index - 1])
    }
  }
  const handleConfirm = () => {
    setSelectedItemIds([])
    setReason(null)
    setMethod(null)
    setStep("select-items")
  }

  return (
    <RefundFlowCard
      receiptNumber="OFM-30418"
      items={REFUND_CANDIDATES}
      selectedItemIds={selectedItemIds}
      reasons={REFUND_REASONS}
      reason={reason}
      method={method}
      step={step}
      onToggleItem={handleToggle}
      onReasonSelect={handleReason}
      onMethodSelect={handleMethod}
      onNext={handleNext}
      onBack={handleBack}
      onConfirm={handleConfirm}
    />
  )
}
