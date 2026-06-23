"use client"

import { useRef, useState } from "react"

import { SplitTenderCard } from "../../components/pos-checkout"
import type { SplitTenderEntry } from "../../components/pos-checkout"

import { TENDER_INITIAL } from "../_mock-data"

interface SplitTenderInteractiveDemoProps {
  total: number
}

export function SplitTenderInteractiveDemo({ total }: SplitTenderInteractiveDemoProps) {
  const [entries, setEntries] = useState<ReadonlyArray<SplitTenderEntry>>(TENDER_INITIAL)
  const nextIdRef = useRef(1)

  const handleEntryChange = (id: string, amount: number) => {
    setEntries((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, amount } : entry)),
    )
  }
  const handleMethodChange = (id: string, method: SplitTenderEntry["method"]) => {
    setEntries((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, method } : entry)),
    )
  }
  const handleRemove = (id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id))
  }
  const handleAdd = () => {
    nextIdRef.current += 1
    const id = `split-new-${nextIdRef.current}`
    setEntries((current) => [...current, { id, method: "card", amount: 0 }])
  }

  return (
    <SplitTenderCard
      total={total}
      entries={entries}
      onEntryChange={handleEntryChange}
      onMethodChange={handleMethodChange}
      onRemove={handleRemove}
      onAdd={handleAdd}
    />
  )
}
