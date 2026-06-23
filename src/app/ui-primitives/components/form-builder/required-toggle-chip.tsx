"use client"

import { useState } from "react"

import styles from "./required-toggle-chip.module.css"

interface RequiredToggleChipProps {
  /** Initial pressed state. */
  initialRequired?: boolean
  /** Optional label override. Defaults to "Required". */
  label?: string
  /** Optional accessible name describing the field this chip controls. */
  fieldName?: string
  className?: string
}

export function RequiredToggleChip({
  initialRequired = false,
  label = "Required",
  fieldName,
  className,
}: RequiredToggleChipProps) {
  const [required, setRequired] = useState(initialRequired)
  const classes = [styles.chip, required ? styles.chipOn : "", className]
    .filter(Boolean)
    .join(" ")

  const ariaLabel = fieldName
    ? `${label}: ${fieldName}`
    : label

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={required}
      aria-label={ariaLabel}
      onClick={() => setRequired((value) => !value)}
    >
      <span className={styles.indicator} aria-hidden="true">
        <span className={styles.asterisk}>*</span>
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.state} aria-hidden="true">
        {required ? "On" : "Off"}
      </span>
    </button>
  )
}
