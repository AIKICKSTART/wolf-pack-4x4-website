"use client"

import { useId, useState } from "react"

import type { ImportSourceKind } from "./import-types"
import styles from "./import-source-picker.module.css"

interface ImportSourceOption {
  kind: ImportSourceKind
  label: string
  description: string
  glyph: string
  hint: string
}

interface ImportSourcePickerProps {
  options: ReadonlyArray<ImportSourceOption>
  initialKind?: ImportSourceKind
  onChange?: (kind: ImportSourceKind) => void
  legend?: string
  className?: string
}

export function ImportSourcePicker({
  options,
  initialKind,
  onChange,
  legend = "Choose a source",
  className,
}: ImportSourcePickerProps) {
  const groupId = useId()
  const [selected, setSelected] = useState<ImportSourceKind>(
    initialKind ?? options[0]?.kind ?? "csv",
  )

  const handleSelect = (kind: ImportSourceKind) => {
    setSelected(kind)
    onChange?.(kind)
  }

  return (
    <fieldset
      className={[styles.fieldset, className].filter(Boolean).join(" ")}
      aria-describedby={`${groupId}-legend`}
    >
      <legend id={`${groupId}-legend`} className={styles.legend}>
        {legend}
      </legend>
      <div className={styles.grid} role="radiogroup" aria-labelledby={`${groupId}-legend`}>
        {options.map((option) => {
          const isActive = option.kind === selected
          return (
            <label
              key={option.kind}
              className={[styles.card, isActive ? styles.cardActive : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="radio"
                name={`${groupId}-source`}
                value={option.kind}
                checked={isActive}
                onChange={() => handleSelect(option.kind)}
                className={styles.input}
              />
              <span className={styles.glyph} aria-hidden="true">
                {option.glyph}
              </span>
              <span className={styles.text}>
                <span className={styles.label}>{option.label}</span>
                <span className={styles.description}>{option.description}</span>
                <span className={styles.hint}>{option.hint}</span>
              </span>
              <span
                className={styles.indicator}
                aria-hidden="true"
                data-active={isActive}
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export type { ImportSourceOption }
export default ImportSourcePicker
