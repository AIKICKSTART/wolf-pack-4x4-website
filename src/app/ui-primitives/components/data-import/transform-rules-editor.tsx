"use client"

import { useId, useMemo, useState } from "react"

import type { TransformChip, TransformKind } from "./import-types"
import styles from "./transform-rules-editor.module.css"

interface TransformColumn {
  id: string
  label: string
  rawSample: string
  chips: ReadonlyArray<TransformChip>
}

interface TransformRulesEditorProps {
  columns: ReadonlyArray<TransformColumn>
  availableTransforms: ReadonlyArray<TransformChip>
  onChange?: (columns: ReadonlyArray<TransformColumn>) => void
  className?: string
}

function applyChip(value: string, kind: TransformKind): string {
  switch (kind) {
    case "trim":
      return value.trim()
    case "lowercase":
      return value.toLowerCase()
    case "uppercase":
      return value.toUpperCase()
    case "regex-replace":
      return value.replace(/\s+/g, " ")
    case "split":
      return value.split(/\s+/)[0] ?? value
    case "lookup":
      return value === "" ? "—" : value
    case "coalesce":
      return value === "" ? "n/a" : value
    default:
      return value
  }
}

function preview(value: string, chips: ReadonlyArray<TransformChip>): string {
  return chips.reduce((acc, chip) => applyChip(acc, chip.kind), value)
}

export function TransformRulesEditor({
  columns,
  availableTransforms,
  onChange,
  className,
}: TransformRulesEditorProps) {
  const groupId = useId()
  const [draft, setDraft] = useState<ReadonlyArray<TransformColumn>>(columns)

  const transformMap = useMemo(
    () => new Map(availableTransforms.map((chip) => [chip.id, chip])),
    [availableTransforms],
  )

  const updateColumn = (id: string, chips: ReadonlyArray<TransformChip>) => {
    const computed = draft.map((column) =>
      column.id === id ? { ...column, chips } : column,
    )
    setDraft(computed)
    onChange?.(computed)
  }

  const removeChip = (columnId: string, chipId: string) => {
    const column = draft.find((entry) => entry.id === columnId)
    if (!column) return
    updateColumn(
      columnId,
      column.chips.filter((chip) => chip.id !== chipId),
    )
  }

  const addChip = (columnId: string, chipId: string) => {
    const column = draft.find((entry) => entry.id === columnId)
    const chip = transformMap.get(chipId)
    if (!column || !chip) return
    if (column.chips.some((existing) => existing.id === chipId)) return
    updateColumn(columnId, [...column.chips, chip])
  }

  return (
    <section
      className={[styles.surface, className].filter(Boolean).join(" ")}
      aria-labelledby={`${groupId}-heading`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Transforms</span>
        <h3 id={`${groupId}-heading`} className={styles.heading}>
          Transform rules editor
        </h3>
        <p className={styles.subline}>
          Chained transforms apply left-to-right. Preview row updates as you go.
        </p>
      </header>

      <ul className={styles.list}>
        {draft.map((column) => {
          const previewValue = preview(column.rawSample, column.chips)
          const remaining = availableTransforms.filter(
            (chip) => !column.chips.some((existing) => existing.id === chip.id),
          )
          const addId = `${groupId}-${column.id}-add`
          return (
            <li key={column.id} className={styles.row}>
              <div className={styles.identity}>
                <span className={styles.columnName}>{column.label}</span>
                <span className={styles.sampleRow}>
                  <span className={styles.sampleKey}>raw</span>
                  <code className={styles.sampleValue}>
                    {column.rawSample === "" ? "—" : column.rawSample}
                  </code>
                </span>
                <span className={styles.previewRow}>
                  <span className={styles.previewKey}>preview</span>
                  <code className={styles.previewValue}>{previewValue}</code>
                </span>
              </div>

              <div className={styles.pipeline}>
                <span className={styles.pipelineKey}>pipeline</span>
                <div className={styles.chipTray}>
                  {column.chips.length === 0 && (
                    <span className={styles.emptyHint}>no transforms applied</span>
                  )}
                  {column.chips.map((chip, index) => (
                    <span key={chip.id} className={styles.chip}>
                      <span className={styles.chipOrder}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.chipLabel}>{chip.label}</span>
                      {chip.detail && (
                        <span className={styles.chipDetail}>{chip.detail}</span>
                      )}
                      <button
                        type="button"
                        className={styles.chipRemove}
                        aria-label={`Remove ${chip.label}`}
                        onClick={() => removeChip(column.id, chip.id)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {remaining.length > 0 && (
                  <div className={styles.adder}>
                    <label htmlFor={addId} className={styles.adderLabel}>
                      Add
                    </label>
                    <select
                      id={addId}
                      className={styles.adderSelect}
                      value=""
                      onChange={(event) => {
                        if (event.target.value) {
                          addChip(column.id, event.target.value)
                        }
                      }}
                    >
                      <option value="">— append transform —</option>
                      {remaining.map((chip) => (
                        <option key={chip.id} value={chip.id}>
                          {chip.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export type { TransformColumn }
export default TransformRulesEditor
