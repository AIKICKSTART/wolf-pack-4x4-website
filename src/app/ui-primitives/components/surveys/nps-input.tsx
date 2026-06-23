"use client"

import { useId, useState } from "react"

import styles from "./nps-input.module.css"

interface NpsInputProps {
  /** Prompt rendered above the row. Defaults to a generic NPS prompt. */
  prompt?: string
  /** Optional initial value 0-10 to display as selected. */
  defaultValue?: number
  /** Optional name used on hidden field for non-interactive demos. */
  name?: string
  /** Override the left scale anchor label. */
  detractorLabel?: string
  /** Override the right scale anchor label. */
  promoterLabel?: string
  className?: string
}

const SCALE = Array.from({ length: 11 }, (_, i) => i)

function toneFor(value: number): string {
  if (value <= 6) return styles.btnDetractor
  if (value <= 8) return styles.btnPassive
  return styles.btnPromoter
}

export function NpsInput({
  prompt = "How likely are you to recommend Oak Flats Mufflermen?",
  defaultValue,
  name = "nps-score",
  detractorLabel = "Not at all",
  promoterLabel = "Extremely likely",
  className,
}: NpsInputProps) {
  const groupId = useId()
  const [selected, setSelected] = useState<number | null>(
    typeof defaultValue === "number" ? defaultValue : null
  )

  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <fieldset className={classes} aria-describedby={`${groupId}-help`}>
      <legend className={styles.legend}>{prompt}</legend>

      <div
        className={styles.row}
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
      >
        <span id={`${groupId}-label`} className={styles.srOnly}>
          {prompt}
        </span>

        {SCALE.map((value) => {
          const isSelected = selected === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={[styles.btn, toneFor(value), isSelected ? styles.btnSelected : null]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelected(value)}
            >
              {value}
            </button>
          )
        })}
      </div>

      <div id={`${groupId}-help`} className={styles.anchors}>
        <span className={styles.anchorLeft}>0 — {detractorLabel}</span>
        <span className={styles.anchorRight}>10 — {promoterLabel}</span>
      </div>

      <input type="hidden" name={name} value={selected ?? ""} readOnly />
    </fieldset>
  )
}
