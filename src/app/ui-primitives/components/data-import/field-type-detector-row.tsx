"use client"

import { useId, useState } from "react"

import type { DetectedFieldType } from "./import-types"
import styles from "./field-type-detector-row.module.css"

interface FieldTypeDetectorRowProps {
  columnName: string
  detectedType: DetectedFieldType
  sampleValue: string
  override?: DetectedFieldType
  onOverride?: (next: DetectedFieldType) => void
  options?: ReadonlyArray<DetectedFieldType>
  className?: string
}

const TYPE_LABEL: Record<DetectedFieldType, string> = {
  text: "Text",
  number: "Number",
  currency: "Currency",
  date: "Date",
  boolean: "Boolean",
  email: "Email",
  phone: "Phone",
}

const TYPE_GLYPH: Record<DetectedFieldType, string> = {
  text: "T",
  number: "#",
  currency: "$",
  date: "▩",
  boolean: "◑",
  email: "@",
  phone: "☎",
}

const DEFAULT_OPTIONS: ReadonlyArray<DetectedFieldType> = [
  "text",
  "number",
  "currency",
  "date",
  "boolean",
  "email",
  "phone",
]

export function FieldTypeDetectorRow({
  columnName,
  detectedType,
  sampleValue,
  override,
  onOverride,
  options = DEFAULT_OPTIONS,
  className,
}: FieldTypeDetectorRowProps) {
  const selectId = useId()
  const [selected, setSelected] = useState<DetectedFieldType>(
    override ?? detectedType,
  )
  const isOverridden = selected !== detectedType

  const handleChange = (next: DetectedFieldType) => {
    setSelected(next)
    onOverride?.(next)
  }

  return (
    <div className={[styles.row, className].filter(Boolean).join(" ")}>
      <div className={styles.identity}>
        <span className={styles.name}>{columnName}</span>
        <span className={styles.sample}>
          <span className={styles.sampleKey}>sample</span>
          <code className={styles.sampleValue}>{sampleValue}</code>
        </span>
      </div>
      <span
        className={[styles.detectedChip, isOverridden ? styles.detectedMuted : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={styles.detectedGlyph} aria-hidden="true">
          {TYPE_GLYPH[detectedType]}
        </span>
        detected · {TYPE_LABEL[detectedType]}
      </span>
      <div className={styles.overrideCell}>
        <label className={styles.overrideLabel} htmlFor={selectId}>
          Override
        </label>
        <select
          id={selectId}
          className={styles.select}
          value={selected}
          onChange={(event) =>
            handleChange(event.target.value as DetectedFieldType)
          }
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {TYPE_LABEL[option]}
            </option>
          ))}
        </select>
        {isOverridden && (
          <span className={styles.overrideHint}>overridden</span>
        )}
      </div>
    </div>
  )
}

export default FieldTypeDetectorRow
