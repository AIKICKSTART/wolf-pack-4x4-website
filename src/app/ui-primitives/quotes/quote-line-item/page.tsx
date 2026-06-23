"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { QuoteLineItem, type QuoteLine } from "../../components/quotes"

import { CATALOGUE, INITIAL_LINES } from "../quote-fixtures"
import styles from "../quotes.module.css"

export default function QuoteLineItemPage() {
  const [lines, setLines] = useState<ReadonlyArray<QuoteLine>>(INITIAL_LINES)

  const handleChange = (next: QuoteLine) => {
    setLines((prev) => prev.map((line) => (line.id === next.id ? next : line)))
  }

  const handleRemove = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id))
  }

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 01"
        title="Quote line item"
        description="Single editable quote row — product/service select, quantity, unit price, discount chip, line total. Each line emits an immutable onChange with the new shape."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "Line item" },
        ]}
      />
      <section className={styles.stage} aria-label="Quote line item demo">
        <div className={styles.stageHead}>
          <span className={styles.stageKicker}>Hilux N80 quote OFM-2641</span>
          <h2 className={styles.stageTitle}>Editable quote lines</h2>
          <p className={styles.stageBody}>
            Edit quantity or unit price to see the line total recalculate. The mid-pipe line has a
            10% line-level discount applied via the discount chip.
          </p>
        </div>
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
      </section>
    </main>
  )
}
