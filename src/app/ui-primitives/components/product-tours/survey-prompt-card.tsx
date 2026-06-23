"use client"

import { useId, useState, type CSSProperties } from "react"

import { MaterialSurface } from "../surfaces/material-surface"
import {
  TONE_VAR,
  type SurveyChoiceTone,
  type TourTone,
} from "./tour-types"
import styles from "./survey-prompt-card.module.css"

export interface SurveyChoice {
  id: string
  label: string
  tone?: SurveyChoiceTone
}

interface SurveyPromptCardProps {
  question: string
  choices: ReadonlyArray<SurveyChoice>
  /** Optional kicker e.g. "Quick survey · 30s". */
  kicker?: string
  /** Optional helper text under the question. */
  helper?: string
  /** Allow multiple choices? Defaults false. */
  multi?: boolean
  /** Optional send callback. */
  onSend?: (selectedIds: ReadonlyArray<string>) => void
  /** Optional dismiss callback. */
  onDismiss?: () => void
  tone?: TourTone
  className?: string
}

const TONE_CLASS: Record<SurveyChoiceTone, string> = {
  neutral: styles.choiceNeutral,
  positive: styles.choicePositive,
  warning: styles.choiceWarning,
  negative: styles.choiceNegative,
}

export function SurveyPromptCard({
  question,
  choices,
  kicker = "Quick survey",
  helper,
  multi = false,
  onSend,
  onDismiss,
  tone = "teal",
  className,
}: SurveyPromptCardProps) {
  const groupId = useId()
  const [selected, setSelected] = useState<ReadonlyArray<string>>([])

  const toggle = (id: string) => {
    if (multi) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((existing) => existing !== id) : [...prev, id],
      )
    } else {
      setSelected([id])
    }
  }

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  const groupRole = multi ? "group" : "radiogroup"

  return (
    <MaterialSurface
      tone="surface"
      elevation={2}
      className={classes}
    >
      <div
        className={styles.inner}
        role="region"
        aria-label={`${kicker}: ${question}`}
        style={{ "--survey-tone": TONE_VAR[tone] } as CSSProperties}
      >
        <header className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          {onDismiss ? (
            <button
              type="button"
              className={styles.dismiss}
              aria-label="Dismiss survey"
              onClick={onDismiss}
            >
              ×
            </button>
          ) : null}
        </header>

        <p className={styles.question} id={`${groupId}-question`}>
          {question}
        </p>
        {helper ? <p className={styles.helper}>{helper}</p> : null}

        <div
          className={styles.choices}
          role={groupRole}
          aria-labelledby={`${groupId}-question`}
        >
          {choices.map((choice) => {
            const isSelected = selected.includes(choice.id)
            const toneClass = TONE_CLASS[choice.tone ?? "neutral"]
            const classList = [
              styles.choice,
              toneClass,
              isSelected ? styles.choiceOn : null,
            ]
              .filter(Boolean)
              .join(" ")
            return (
              <button
                key={choice.id}
                type="button"
                className={classList}
                role={multi ? "checkbox" : "radio"}
                aria-checked={isSelected}
                onClick={() => toggle(choice.id)}
              >
                {choice.label}
              </button>
            )
          })}
        </div>

        <footer className={styles.foot}>
          <button
            type="button"
            className={styles.send}
            disabled={selected.length === 0}
            onClick={() => onSend?.(selected)}
          >
            Send <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </MaterialSurface>
  )
}

export default SurveyPromptCard
