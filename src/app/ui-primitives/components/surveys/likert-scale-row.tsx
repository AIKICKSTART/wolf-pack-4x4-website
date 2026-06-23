"use client"

import { useId, useState } from "react"

import type { LikertScale } from "./survey-types"

import styles from "./likert-scale-row.module.css"

interface LikertScaleRowProps {
  /** Statement on the left side of the row. */
  statement: string
  /** 5, 7 or 9 point variant. */
  scale?: LikertScale
  /** Optional labels override. Provide enough labels for the scale length. */
  labels?: ReadonlyArray<string>
  /** Default selected index (0-based). */
  defaultValue?: number
  /** Hidden input name. */
  name?: string
  className?: string
}

const DEFAULT_LABELS_BY_SCALE: Record<LikertScale, ReadonlyArray<string>> = {
  5: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
  7: [
    "Strongly disagree",
    "Disagree",
    "Slightly disagree",
    "Neutral",
    "Slightly agree",
    "Agree",
    "Strongly agree",
  ],
  9: [
    "Strongly disagree",
    "Disagree",
    "Slightly disagree",
    "Lean disagree",
    "Neutral",
    "Lean agree",
    "Slightly agree",
    "Agree",
    "Strongly agree",
  ],
}

export function LikertScaleRow({
  statement,
  scale = 5,
  labels,
  defaultValue,
  name = "likert-value",
  className,
}: LikertScaleRowProps) {
  const groupId = useId()
  const [selected, setSelected] = useState<number | null>(
    typeof defaultValue === "number" ? defaultValue : null
  )

  const resolvedLabels = labels ?? DEFAULT_LABELS_BY_SCALE[scale]
  const classes = [styles.row, styles[`scale${scale}`], className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.statement} id={`${groupId}-label`}>
        <span className={styles.statementText}>{statement}</span>
      </div>

      <div
        className={styles.options}
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
      >
        {resolvedLabels.map((label, idx) => {
          const isSelected = selected === idx
          const optionId = `${groupId}-opt-${idx}`
          return (
            <button
              key={optionId}
              id={optionId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={[styles.option, isSelected ? styles.optionSelected : null]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelected(idx)}
              title={label}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.optionLabel}>{label}</span>
            </button>
          )
        })}
      </div>

      <input type="hidden" name={name} value={selected ?? ""} readOnly />
    </div>
  )
}
