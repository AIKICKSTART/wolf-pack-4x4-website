"use client"

import { useCallback, useState } from "react"

import { Chip } from "../primitives/chip"

import styles from "./hypothesis-statement-card.module.css"

export interface HypothesisChunkOption {
  id: string
  label: string
}

export interface HypothesisStatementValue {
  observationId: string
  changeId: string
  outcomeId: string
  metricId: string
  thresholdId: string
}

export interface HypothesisStatementCardProps {
  observations: ReadonlyArray<HypothesisChunkOption>
  changes: ReadonlyArray<HypothesisChunkOption>
  outcomes: ReadonlyArray<HypothesisChunkOption>
  metrics: ReadonlyArray<HypothesisChunkOption>
  thresholds: ReadonlyArray<HypothesisChunkOption>
  defaultValue: HypothesisStatementValue
  onChange?: (next: HypothesisStatementValue) => void
  className?: string
}

type ChunkKey = keyof HypothesisStatementValue

function findLabel(
  options: ReadonlyArray<HypothesisChunkOption>,
  id: string,
): string {
  return options.find((o) => o.id === id)?.label ?? "—"
}

export function HypothesisStatementCard({
  observations,
  changes,
  outcomes,
  metrics,
  thresholds,
  defaultValue,
  onChange,
  className,
}: HypothesisStatementCardProps) {
  const [value, setValue] = useState<HypothesisStatementValue>(defaultValue)
  const [activeChunk, setActiveChunk] = useState<ChunkKey | null>(null)

  const update = useCallback(
    (key: ChunkKey, nextId: string) => {
      const next: HypothesisStatementValue = { ...value, [key]: nextId }
      setValue(next)
      setActiveChunk(null)
      onChange?.(next)
    },
    [onChange, value],
  )

  const classes = [styles.card, className].filter(Boolean).join(" ")

  const chunkOptions: Record<
    ChunkKey,
    ReadonlyArray<HypothesisChunkOption>
  > = {
    observationId: observations,
    changeId: changes,
    outcomeId: outcomes,
    metricId: metrics,
    thresholdId: thresholds,
  }

  const renderChunk = (key: ChunkKey, label: string) => {
    const current = value[key]
    return (
      <button
        type="button"
        className={[
          styles.chunk,
          activeChunk === key ? styles.chunkActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setActiveChunk((prev) => (prev === key ? null : key))}
        aria-haspopup="listbox"
        aria-expanded={activeChunk === key}
      >
        <span className={styles.chunkLabel}>{label}</span>
        <span className={styles.chunkValue}>
          {findLabel(chunkOptions[key], current)}
        </span>
      </button>
    )
  }

  return (
    <section
      className={classes}
      role="region"
      aria-label="Experiment hypothesis statement editor"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Hypothesis</span>
      </header>

      <p className={styles.statement}>
        <span>Because</span>
        {renderChunk("observationId", "observation")}
        <span>we believe</span>
        {renderChunk("changeId", "change")}
        <span>will cause</span>
        {renderChunk("outcomeId", "outcome")}
        <span>measured by</span>
        {renderChunk("metricId", "metric")}
        <span>of at least</span>
        {renderChunk("thresholdId", "threshold")}
        <span>.</span>
      </p>

      {activeChunk ? (
        <div
          className={styles.picker}
          role="listbox"
          aria-label={`Choose ${activeChunk}`}
        >
          {chunkOptions[activeChunk].map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              tone="teal"
              selected={value[activeChunk] === option.id}
              onSelect={() => update(activeChunk, option.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default HypothesisStatementCard
