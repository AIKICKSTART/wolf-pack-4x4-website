"use client"

import { useState } from "react"

import { QuoteLineItem, type QuoteLine } from "../../components/quotes"

import { CATALOGUE } from "../quote-fixtures"
import styles from "../quotes.module.css"

interface FullQuoteLineStackProps {
  initial: ReadonlyArray<QuoteLine>
}

export function FullQuoteLineStack({ initial }: FullQuoteLineStackProps) {
  const [lines, setLines] = useState<ReadonlyArray<QuoteLine>>(initial)

  const handleChange = (next: QuoteLine) => {
    setLines((prev) => prev.map((line) => (line.id === next.id ? next : line)))
  }

  const handleRemove = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }

  return (
    <div className={styles.stack}>
      {lines.map((line) => (
        <QuoteLineItem
          key={line.id}
          line={line}
          catalogue={CATALOGUE}
          onLineChange={handleChange}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}
