"use client"

import { useId, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./ab-variant-editor.module.css"

export type WinnerRule = "opens" | "clicks" | "revenue" | "manual"

export interface ABVariant {
  id: string
  label: string
  /** Subject line / hook copy for the variant. */
  subject: string
  /** Body preview snippet. */
  preview: string
  /** Initial weight (0-100). */
  weight: number
}

interface ABVariantEditorProps {
  variants: ReadonlyArray<ABVariant>
  defaultWinnerRule?: WinnerRule
  className?: string
}

const WINNER_OPTIONS: ReadonlyArray<{ id: WinnerRule; label: string }> = [
  { id: "opens", label: "Highest opens" },
  { id: "clicks", label: "Highest clicks" },
  { id: "revenue", label: "Highest revenue" },
  { id: "manual", label: "Manual pick" },
]

export function ABVariantEditor({
  variants,
  defaultWinnerRule = "clicks",
  className,
}: ABVariantEditorProps) {
  const tablistId = useId()
  const [activeId, setActiveId] = useState<string>(variants[0]?.id ?? "")
  const [winnerRule, setWinnerRule] = useState<WinnerRule>(defaultWinnerRule)
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(variants.map((v) => [v.id, v.weight])),
  )

  const activeVariant = variants.find((v) => v.id === activeId) ?? variants[0]
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  if (!activeVariant) {
    return null
  }

  const handleWeight = (id: string, value: number) => {
    setWeights((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <section
      className={classes}
      role="region"
      aria-label="A/B variant editor"
    >
      <header className={styles.header}>
        <span className={styles.kicker}>A/B variants</span>
        <div className={styles.winnerRow}>
          {WINNER_OPTIONS.map((opt) => (
            <Chip
              key={opt.id}
              label={opt.label}
              tone={opt.id === winnerRule ? "teal" : "neutral"}
              selected={opt.id === winnerRule}
              onSelect={() => setWinnerRule(opt.id)}
            />
          ))}
        </div>
      </header>

      <div
        className={styles.tablist}
        role="tablist"
        id={tablistId}
        aria-label="Choose variant"
      >
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            className={styles.tab}
            role="tab"
            aria-selected={variant.id === activeId}
            aria-controls={`${tablistId}-panel-${variant.id}`}
            id={`${tablistId}-tab-${variant.id}`}
            onClick={() => setActiveId(variant.id)}
          >
            Variant {variant.label}
          </button>
        ))}
      </div>

      <div
        className={styles.panel}
        role="tabpanel"
        id={`${tablistId}-panel-${activeVariant.id}`}
        aria-labelledby={`${tablistId}-tab-${activeVariant.id}`}
      >
        <dl className={styles.field}>
          <dt>Subject</dt>
          <dd>{activeVariant.subject}</dd>
        </dl>
        <dl className={styles.field}>
          <dt>Preview body</dt>
          <dd>{activeVariant.preview}</dd>
        </dl>
        <div className={styles.weightRow}>
          <label
            className={styles.weightLabel}
            htmlFor={`${tablistId}-weight-${activeVariant.id}`}
          >
            Send weight
          </label>
          <input
            id={`${tablistId}-weight-${activeVariant.id}`}
            type="range"
            min={0}
            max={100}
            value={weights[activeVariant.id] ?? activeVariant.weight}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleWeight(activeVariant.id, Number(event.target.value))
            }
            className={styles.range}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={weights[activeVariant.id] ?? activeVariant.weight}
          />
          <span className={styles.weightValue}>
            {weights[activeVariant.id] ?? activeVariant.weight}%
          </span>
        </div>
      </div>

      <footer className={styles.summary}>
        {variants.map((variant) => (
          <div key={variant.id} className={styles.summaryItem}>
            <span>Variant {variant.label}</span>
            <ProgressLinear
              value={weights[variant.id] ?? variant.weight}
              max={100}
              tone={variant.id === activeId ? "teal" : "green"}
              variant="solid"
              label={`Variant ${variant.label}`}
            />
          </div>
        ))}
      </footer>
    </section>
  )
}

export default ABVariantEditor
