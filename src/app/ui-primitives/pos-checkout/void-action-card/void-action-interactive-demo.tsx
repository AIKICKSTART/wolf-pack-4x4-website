"use client"

import { useState } from "react"

import { VoidActionCard } from "../../components/pos-checkout"

interface VoidActionInteractiveDemoProps {
  transactionRef: string
  operator: string
  amount: number
}

const PIN_LENGTH = 4

export function VoidActionInteractiveDemo({
  transactionRef,
  operator,
  amount,
}: VoidActionInteractiveDemoProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState<string | undefined>()

  const handleDigit = (digit: string) => {
    setError(undefined)
    setPin((current) => (current.length >= PIN_LENGTH ? current : current + digit))
  }
  const handleBackspace = () => {
    setError(undefined)
    setPin((current) => current.slice(0, -1))
  }
  const handleCancel = () => {
    setPin("")
    setError(undefined)
  }
  const handleConfirm = () => {
    if (pin === "9081") {
      setError(undefined)
      setPin("")
      return
    }
    setError("Manager PIN incorrect — request Daniel")
  }

  return (
    <VoidActionCard
      transactionRef={transactionRef}
      operator={operator}
      amount={amount}
      pin={pin}
      pinLength={PIN_LENGTH}
      errorMessage={error}
      onDigit={handleDigit}
      onBackspace={handleBackspace}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  )
}
