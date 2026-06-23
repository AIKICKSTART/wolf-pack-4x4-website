"use client"

import { useState } from "react"

import { DailyTallyPanel } from "../../components/pos-checkout"
import type { DenominationCount, TallyMode } from "../../components/pos-checkout"

interface DailyTallyInteractiveDemoProps {
  initialMode: TallyMode
  initialDenominations: ReadonlyArray<DenominationCount>
  systemAmount: number
  operator: string
}

export function DailyTallyInteractiveDemo({
  initialMode,
  initialDenominations,
  systemAmount,
  operator,
}: DailyTallyInteractiveDemoProps) {
  const [mode, setMode] = useState<TallyMode>(initialMode)
  const [denominations, setDenominations] =
    useState<ReadonlyArray<DenominationCount>>(initialDenominations)

  const handleCount = (denomination: number, count: number) => {
    setDenominations((current) =>
      current.map((entry) =>
        entry.denomination === denomination ? { ...entry, count } : entry,
      ),
    )
  }

  return (
    <DailyTallyPanel
      mode={mode}
      drawerLabel="Bay 1 drawer"
      operator={operator}
      denominations={denominations}
      systemAmount={systemAmount}
      onCountChange={handleCount}
      onModeChange={setMode}
    />
  )
}
