"use client"

import { useId, useState } from "react"

import type {
  ConfidenceTone,
  SourceColumnDescriptor,
  TargetFieldDescriptor,
} from "./import-types"
import styles from "./column-mapper.module.css"

interface ColumnMapping {
  sourceId: string
  targetId: string | null
  skip: boolean
  confidence: number
  confidenceTone: ConfidenceTone
}

interface ColumnMapperProps {
  sources: ReadonlyArray<SourceColumnDescriptor>
  targets: ReadonlyArray<TargetFieldDescriptor>
  initialMappings: ReadonlyArray<ColumnMapping>
  onChange?: (mappings: ReadonlyArray<ColumnMapping>) => void
  className?: string
}

const CONFIDENCE_LABEL: Record<ConfidenceTone, string> = {
  high: "high",
  medium: "med",
  low: "low",
}

export function ColumnMapper({
  sources,
  targets,
  initialMappings,
  onChange,
  className,
}: ColumnMapperProps) {
  const groupId = useId()
  const [mappings, setMappings] =
    useState<ReadonlyArray<ColumnMapping>>(initialMappings)

  const updateMapping = (sourceId: string, next: Partial<ColumnMapping>) => {
    const computed = mappings.map((mapping) =>
      mapping.sourceId === sourceId ? { ...mapping, ...next } : mapping,
    )
    setMappings(computed)
    onChange?.(computed)
  }

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-labelledby={`${groupId}-heading`}
    >
      <header className={styles.head}>
        <h3 id={`${groupId}-heading`} className={styles.heading}>
          Column mapping
        </h3>
        <span className={styles.meta}>
          {mappings.filter((mapping) => !mapping.skip && mapping.targetId).length}{" "}
          of {mappings.length} mapped
        </span>
      </header>

      <ol className={styles.list}>
        {sources.map((source) => {
          const mapping = mappings.find(
            (entry) => entry.sourceId === source.id,
          )
          if (!mapping) {
            return null
          }
          const selectId = `${groupId}-${source.id}-target`
          const skipId = `${groupId}-${source.id}-skip`
          const target = targets.find((entry) => entry.id === mapping.targetId)
          return (
            <li key={source.id} className={styles.row}>
              <div className={styles.sourceCell}>
                <span className={styles.sourceLabel}>{source.label}</span>
                <span className={styles.sourceSample}>{source.sample}</span>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
              <div className={styles.targetCell}>
                <label className={styles.fieldLabel} htmlFor={selectId}>
                  Target field
                </label>
                <select
                  id={selectId}
                  className={styles.select}
                  value={mapping.targetId ?? ""}
                  disabled={mapping.skip}
                  onChange={(event) =>
                    updateMapping(source.id, {
                      targetId: event.target.value || null,
                    })
                  }
                >
                  <option value="">— pick a target —</option>
                  {targets.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                      {option.required ? " *" : ""}
                    </option>
                  ))}
                </select>
                <div className={styles.chipRow}>
                  {target?.required && (
                    <span className={styles.requiredChip}>required</span>
                  )}
                  <span
                    className={[
                      styles.confidenceChip,
                      styles[`confidence_${mapping.confidenceTone}`],
                    ].join(" ")}
                    aria-label={`Auto-match confidence ${mapping.confidence}%`}
                  >
                    auto-match {mapping.confidence}% ·{" "}
                    {CONFIDENCE_LABEL[mapping.confidenceTone]}
                  </span>
                </div>
              </div>
              <label className={styles.skipCell} htmlFor={skipId}>
                <input
                  id={skipId}
                  type="checkbox"
                  checked={mapping.skip}
                  onChange={(event) =>
                    updateMapping(source.id, { skip: event.target.checked })
                  }
                />
                <span>Skip</span>
              </label>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export type { ColumnMapping }
export default ColumnMapper
