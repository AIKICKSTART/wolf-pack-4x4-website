"use client"

import { useState } from "react"

import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./concurrency-limits-card.module.css"

export interface ConcurrencyLimit {
  queue: string
  /** Currently in-flight jobs on the queue. */
  used: number
  /** Maximum allowed in-flight jobs. */
  cap: number
  /** Lower bound when adjusting the slider. */
  minCap: number
  /** Upper bound when adjusting the slider. */
  maxCap: number
}

interface ConcurrencyLimitsCardProps {
  limits: ReadonlyArray<ConcurrencyLimit>
  /** Fires when user moves a slider. */
  onAdjust?: (queue: string, nextCap: number) => void
  className?: string
}

function toneFor(ratio: number): "teal" | "amber" | "red" {
  if (ratio < 0.7) return "teal"
  if (ratio < 0.9) return "amber"
  return "red"
}

export function ConcurrencyLimitsCard({
  limits,
  onAdjust,
  className,
}: ConcurrencyLimitsCardProps) {
  const [draft, setDraft] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    for (const limit of limits) {
      init[limit.queue] = limit.cap
    }
    return init
  })

  const handleChange = (queue: string, value: number) => {
    setDraft((current) => ({ ...current, [queue]: value }))
    onAdjust?.(queue, value)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Concurrency limits">
      <header className={styles.head}>
        <span className={styles.kicker}>Concurrency caps</span>
        <h3 className={styles.title}>Per-queue limits</h3>
      </header>
      <ul className={styles.list}>
        {limits.map((limit) => {
          const cap = draft[limit.queue] ?? limit.cap
          const ratio = cap > 0 ? limit.used / cap : 0
          return (
            <li key={limit.queue} className={styles.item}>
              <header className={styles.itemHead}>
                <span className={styles.queueName}>{limit.queue}</span>
                <span className={styles.queueRatio}>
                  {limit.used} / {cap}
                </span>
              </header>
              <ProgressLinear
                value={limit.used}
                max={cap}
                tone={toneFor(ratio)}
                variant="solid"
              />
              <div className={styles.sliderWrap}>
                <label
                  className={styles.sliderLabel}
                  htmlFor={`conc-${limit.queue}`}
                >
                  Adjust cap
                </label>
                <input
                  id={`conc-${limit.queue}`}
                  type="range"
                  min={limit.minCap}
                  max={limit.maxCap}
                  value={cap}
                  className={styles.slider}
                  onChange={(event) => handleChange(limit.queue, Number(event.target.value))}
                  aria-valuemin={limit.minCap}
                  aria-valuemax={limit.maxCap}
                  aria-valuenow={cap}
                  aria-label={`Concurrency cap for ${limit.queue}`}
                />
                <span className={styles.sliderRange}>
                  {limit.minCap} – {limit.maxCap}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ConcurrencyLimitsCard
