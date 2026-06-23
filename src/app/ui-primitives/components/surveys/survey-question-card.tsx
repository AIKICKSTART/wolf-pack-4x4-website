import type { QuestionType } from "./survey-types"

import styles from "./survey-question-card.module.css"

const TYPE_LABEL: Record<QuestionType, string> = {
  "single-choice": "Single choice",
  "multi-choice": "Multi choice",
  "short-answer": "Short answer",
  "long-answer": "Long answer",
  rating: "Rating",
  scale: "Scale",
  ranking: "Ranking",
  matrix: "Matrix",
  date: "Date",
  file: "File",
  nps: "NPS",
}

const TYPE_TONE_CLASS: Record<QuestionType, string> = {
  "single-choice": styles.toneTeal,
  "multi-choice": styles.toneTeal,
  "short-answer": styles.toneAmber,
  "long-answer": styles.toneAmber,
  rating: styles.toneViolet,
  scale: styles.toneViolet,
  ranking: styles.toneViolet,
  matrix: styles.toneGreen,
  date: styles.toneGreen,
  file: styles.toneGreen,
  nps: styles.toneRed,
}

interface SurveyQuestionCardProps {
  /** 1-based question number displayed on the card. */
  index: number
  prompt: string
  type: QuestionType
  required: boolean
  /** When true the card renders with the selected outline. */
  selected?: boolean
  /** Optional helper hint rendered below the type chip. */
  helper?: string
  /** Optional override for the type label. */
  typeLabel?: string
  className?: string
}

export function SurveyQuestionCard({
  index,
  prompt,
  type,
  required,
  selected = false,
  helper,
  typeLabel,
  className,
}: SurveyQuestionCardProps) {
  const classes = [
    styles.card,
    TYPE_TONE_CLASS[type],
    selected ? styles.cardSelected : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const indexLabel = String(index).padStart(2, "0")

  return (
    <article
      className={classes}
      aria-current={selected ? "true" : undefined}
      aria-label={`Question ${index}: ${prompt}`}
    >
      <header className={styles.head}>
        <span className={styles.index} aria-hidden="true">{`Q${indexLabel}`}</span>
        <span className={styles.typeChip}>{typeLabel ?? TYPE_LABEL[type]}</span>
        {required ? (
          <span className={styles.requiredFlag} title="Required">
            <span aria-hidden="true">*</span>
            <span className={styles.srOnly}>Required</span>
          </span>
        ) : null}
      </header>

      <div className={styles.body}>
        <span className={styles.promptLabel}>Question</span>
        <p className={styles.prompt}>{prompt}</p>
        {helper ? <p className={styles.helper}>{helper}</p> : null}
      </div>

      <footer className={styles.actions}>
        <button type="button" className={styles.action} aria-label="Duplicate question">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <rect x="2.5" y="2.5" width="8" height="8" rx="1.5" stroke="currentColor" />
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" />
          </svg>
        </button>
        <button type="button" className={styles.action} aria-label="Delete question">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M4 5h8m-7 0 .5 7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1L11 5M6.5 5V3.5h3V5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className={styles.action} aria-label="More options">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <circle cx="4" cy="8" r="1.3" />
            <circle cx="8" cy="8" r="1.3" />
            <circle cx="12" cy="8" r="1.3" />
          </svg>
        </button>
      </footer>
    </article>
  )
}
