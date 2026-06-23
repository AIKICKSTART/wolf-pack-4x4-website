"use client"

import { useState } from "react"

import { CartPanel } from "../../components/pos-checkout"
import type { PosCartLine } from "../../components/pos-checkout"

interface CartPanelInteractiveDemoProps {
  initialLines: ReadonlyArray<PosCartLine>
}

export function CartPanelInteractiveDemo({ initialLines }: CartPanelInteractiveDemoProps) {
  const [lines, setLines] = useState<ReadonlyArray<PosCartLine>>(initialLines)

  const handleQuantity = (id: string, quantity: number) => {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, quantity } : line)),
    )
  }
  const handleRemove = (id: string) => {
    setLines((current) => current.filter((line) => line.id !== id))
  }

  return (
    <CartPanel lines={lines} onQuantityChange={handleQuantity} onRemove={handleRemove} />
  )
}
