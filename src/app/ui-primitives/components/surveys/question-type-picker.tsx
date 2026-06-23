import type { QuestionType } from "./survey-types"

import styles from "./question-type-picker.module.css"

interface QuestionTypeOption {
  type: QuestionType
  label: string
  hint: string
}

interface QuestionTypePickerProps {
  options: ReadonlyArray<QuestionTypeOption>
  /** Visually highlight one option without managing state. */
  activeType?: QuestionType
  className?: string
}

const TONE_BY_TYPE: Record<QuestionType, string> = {
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

interface IconProps {
  size?: number
}

function TypeIcon({ type, size = 16 }: { type: QuestionType } & IconProps) {
  const common = { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true } as const

  switch (type) {
    case "single-choice":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" />
          <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        </svg>
      )
    case "multi-choice":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" />
          <path d="m5 8.4 2.2 2.2L11 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "short-answer":
      return (
        <svg {...common}>
          <path d="M2.5 6.5h11M2.5 9.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "long-answer":
      return (
        <svg {...common}>
          <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case "rating":
      return (
        <svg {...common}>
          <path d="m8 2.5 1.7 3.4 3.8.5-2.8 2.6.7 3.7L8 10.9l-3.4 1.8.7-3.7L2.5 6.4l3.8-.5z" stroke="currentColor" strokeLinejoin="round" />
        </svg>
      )
    case "scale":
      return (
        <svg {...common}>
          <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="2.6" cy="8" r="1.4" fill="currentColor" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" />
          <circle cx="13.4" cy="8" r="1.4" fill="currentColor" />
        </svg>
      )
    case "ranking":
      return (
        <svg {...common}>
          <path d="M3.5 4h9M3.5 8h9M3.5 12h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="1.5" cy="4" r="1" fill="currentColor" />
          <circle cx="1.5" cy="8" r="1" fill="currentColor" />
          <circle cx="1.5" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    case "matrix":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="11" height="11" rx="1" stroke="currentColor" />
          <path d="M2.5 6.5h11M2.5 10h11M6 2.5v11M10 2.5v11" stroke="currentColor" />
        </svg>
      )
    case "date":
      return (
        <svg {...common}>
          <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" />
          <path d="M2.5 7h11M5 1.5v3M11 1.5v3" stroke="currentColor" strokeLinecap="round" />
        </svg>
      )
    case "file":
      return (
        <svg {...common}>
          <path d="M4 2.5h5l3 3v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" stroke="currentColor" />
          <path d="M9 2.5v3h3" stroke="currentColor" />
        </svg>
      )
    case "nps":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="3" height="6" rx="1" stroke="currentColor" />
          <rect x="6.5" y="3.5" width="3" height="9" rx="1" stroke="currentColor" />
          <rect x="11" y="5" width="3" height="7" rx="1" stroke="currentColor" />
        </svg>
      )
  }
}

export function QuestionTypePicker({
  options,
  activeType,
  className,
}: QuestionTypePickerProps) {
  const classes = [styles.picker, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} aria-label="Question type picker">
      <header className={styles.head}>
        <span className={styles.kicker}>Add a question</span>
        <span className={styles.hint}>Pick a response type</span>
      </header>

      <ul className={styles.list} role="listbox" aria-label="Question types">
        {options.map((option) => {
          const isActive = option.type === activeType
          return (
            <li
              key={option.type}
              className={[styles.item, TONE_BY_TYPE[option.type], isActive ? styles.itemActive : null]
                .filter(Boolean)
                .join(" ")}
              role="option"
              aria-selected={isActive}
              tabIndex={0}
            >
              <span className={styles.itemIcon} aria-hidden="true">
                <TypeIcon type={option.type} size={16} />
              </span>
              <span className={styles.itemBody}>
                <span className={styles.itemLabel}>{option.label}</span>
                <span className={styles.itemHint}>{option.hint}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
