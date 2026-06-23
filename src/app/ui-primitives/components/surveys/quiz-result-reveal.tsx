import type { QuizAnswerScore, QuizBand } from "./survey-types"

import styles from "./quiz-result-reveal.module.css"

interface QuizResultRevealProps {
  quizTitle: string
  /** Points the respondent earned. */
  earned: number
  /** Maximum points available. */
  total: number
  band: QuizBand
  /** Band label e.g. "Distinction". */
  bandLabel: string
  /** Optional copy shown under the band chip. */
  summary?: string
  /** Per-question feedback rows. */
  answers: ReadonlyArray<QuizAnswerScore>
  /** Hide the retry CTA when retries are disabled. */
  retryDisabled?: boolean
  className?: string
}

const BAND_CLASS: Record<QuizBand, string> = {
  fail: styles.bandFail,
  pass: styles.bandPass,
  distinction: styles.bandDistinction,
}

const FEEDBACK_CLASS: Record<QuizAnswerScore["feedback"], string> = {
  correct: styles.fbCorrect,
  partial: styles.fbPartial,
  incorrect: styles.fbIncorrect,
}

const FEEDBACK_LABEL: Record<QuizAnswerScore["feedback"], string> = {
  correct: "Correct",
  partial: "Partial",
  incorrect: "Incorrect",
}

export function QuizResultReveal({
  quizTitle,
  earned,
  total,
  band,
  bandLabel,
  summary,
  answers,
  retryDisabled = false,
  className,
}: QuizResultRevealProps) {
  const safeTotal = Math.max(1, total)
  const percent = Math.round((earned / safeTotal) * 100)
  const classes = [styles.surface, BAND_CLASS[band], className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Quiz result for ${quizTitle}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Quiz result</span>
        <h2 className={styles.title}>{quizTitle}</h2>
      </header>

      <div className={styles.scoreBlock}>
        <div className={styles.scoreFigure}>
          <span className={styles.scoreEarned}>{earned}</span>
          <span className={styles.scoreSep}>/</span>
          <span className={styles.scoreTotal}>{total}</span>
        </div>
        <span className={styles.bandChip}>{bandLabel}</span>
        <span className={styles.percent}>{percent}% correct</span>
        {summary ? <p className={styles.summary}>{summary}</p> : null}
      </div>

      <section className={styles.feedbackBlock}>
        <span className={styles.subhead}>Per-question feedback</span>
        <ul className={styles.feedback}>
          {answers.map((answer) => (
            <li key={answer.id} className={styles.fbRow}>
              <span className={[styles.fbChip, FEEDBACK_CLASS[answer.feedback]].join(" ")}>
                {FEEDBACK_LABEL[answer.feedback]}
              </span>
              <div className={styles.fbBody}>
                <span className={styles.fbLabel}>{answer.questionLabel}</span>
                <span className={styles.fbNote}>{answer.note}</span>
              </div>
              <span className={styles.fbPoints}>
                <span className={styles.fbEarned}>{answer.earned}</span>
                <span className={styles.fbSep}>/</span>
                <span className={styles.fbMax}>{answer.max}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.retry}
          disabled={retryDisabled}
        >
          {retryDisabled ? "Retry locked" : "Retry quiz"}
        </button>
        <button type="button" className={styles.share}>
          Share certificate
        </button>
      </footer>
    </section>
  )
}
