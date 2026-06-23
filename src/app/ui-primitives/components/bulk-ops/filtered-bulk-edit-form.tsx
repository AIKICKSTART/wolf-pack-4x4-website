"use client"

import { useState } from "react"

import type { BulkEditOperation } from "./bulk-ops-types"
import styles from "./filtered-bulk-edit-form.module.css"

interface FieldOption {
  /** Stable identifier. */
  id: string
  /** Display label. */
  label: string
}

interface FilteredBulkEditFormProps {
  /** Display label for the scope being edited (e.g. "42 quotes filtered by Status: Awaiting parts"). */
  scopeLabel: string
  /** Editable fields available for selection. */
  fieldOptions: ReadonlyArray<FieldOption>
  /** Default selected field id. */
  defaultFieldId?: string
  /** Default operation. */
  defaultOperation?: BulkEditOperation["operation"]
  /** Default value. */
  defaultValue?: string
  /** Default state for the only-update-empty toggle. */
  defaultOnlyEmpty?: boolean
  /** Triggered when the form is submitted. */
  onApply?: (op: BulkEditOperation) => void
  className?: string
}

const OPERATIONS: ReadonlyArray<{
  id: BulkEditOperation["operation"]
  label: string
  needsValue: boolean
}> = [
  { id: "set", label: "Set to", needsValue: true },
  { id: "append", label: "Append", needsValue: true },
  { id: "clear", label: "Clear", needsValue: false },
  { id: "increment", label: "Increment by", needsValue: true },
]

export function FilteredBulkEditForm({
  scopeLabel,
  fieldOptions,
  defaultFieldId,
  defaultOperation = "set",
  defaultValue = "",
  defaultOnlyEmpty = false,
  onApply,
  className,
}: FilteredBulkEditFormProps) {
  const initialField = defaultFieldId ?? fieldOptions[0]?.id ?? ""
  const [fieldId, setFieldId] = useState<string>(initialField)
  const [operation, setOperation] = useState<BulkEditOperation["operation"]>(
    defaultOperation,
  )
  const [value, setValue] = useState<string>(defaultValue)
  const [onlyEmpty, setOnlyEmpty] = useState<boolean>(defaultOnlyEmpty)

  const classes = [styles.form, className].filter(Boolean).join(" ")
  const opMeta = OPERATIONS.find((entry) => entry.id === operation) ?? OPERATIONS[0]
  const fieldLabel =
    fieldOptions.find((option) => option.id === fieldId)?.label ?? ""

  return (
    <form
      className={classes}
      aria-label="Filtered bulk edit"
      onSubmit={(event) => {
        event.preventDefault()
        onApply?.({
          field: fieldLabel,
          operation,
          value: opMeta.needsValue ? value : undefined,
          onlyUpdateEmpty: onlyEmpty,
        })
      }}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Bulk edit</span>
        <h2 className={styles.title}>Apply field change to selection</h2>
      </header>

      <span className={styles.scopeChip}>Scope · {scopeLabel}</span>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Field</span>
          <select
            className={styles.select}
            value={fieldId}
            onChange={(event) => setFieldId(event.target.value)}
          >
            {fieldOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Operation</span>
          <select
            className={styles.select}
            value={operation}
            onChange={(event) => {
              const next = event.target.value as BulkEditOperation["operation"]
              setOperation(next)
            }}
          >
            {OPERATIONS.map((op) => (
              <option key={op.id} value={op.id}>
                {op.label}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.label}>
            {opMeta.needsValue ? "New value" : "Value (n/a)"}
          </span>
          <input
            className={styles.input}
            type={operation === "increment" ? "number" : "text"}
            value={value}
            disabled={!opMeta.needsValue}
            onChange={(event) => setValue(event.target.value)}
            placeholder={operation === "increment" ? "1" : "e.g. Awaiting parts"}
          />
        </label>
      </div>

      <div className={styles.toggleRow}>
        <div className={styles.toggleLabel}>
          <span className={styles.toggleTitle}>Only update empty values</span>
          <span className={styles.toggleHint}>
            Preserve existing data when the field is already populated
          </span>
        </div>
        <button
          type="button"
          className={styles.toggle}
          aria-pressed={onlyEmpty}
          aria-label="Toggle only-update-empty"
          onClick={() => setOnlyEmpty((current) => !current)}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Apply to selection
        </button>
      </div>
    </form>
  )
}

export default FilteredBulkEditForm
