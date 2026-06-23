import type { QuizScoringBand } from "./survey-types"

import styles from "./quiz-scoring-rules.module.css"

interface QuizQuestionPoints {
  id: string
  label: string
  /** Points awarded for a correct answer. */
  points: number
}

interface QuizScoringRulesProps {
  questions: ReadonlyArray<QuizQuestionPoints>
  bands: ReadonlyArray<QuizScoringBand>
  /** Pass threshold percentage (0-100). */
  passThreshold: number
  className?: string
}

const BAND_TONE: Record<QuizScoringBand["id"], string> = {
  fail: styles.bandFail,
  pass: styles.bandPass,
  distinction: styles.bandDistinction,
}

export function QuizScoringRules({
  questions,
  bands,
  passThreshold,
  className,
}: QuizScoringRulesProps) {
  const total = questions.reduce((acc, q) => acc + q.points, 0)
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Quiz scoring rules">
      <header className={styles.head}>
        <div className={styles.headBody}>
          <span className={styles.kicker}>Quiz scoring</span>
          <h3 className={styles.title}>Per-answer points &amp; bands</h3>
        </div>
        <div className={styles.totals}>
          <span className={styles.totalsLabel}>Max</span>
          <span className={styles.totalsValue}>{total}</span>
          <span className={styles.totalsUnit}>pts</span>
        </div>
      </header>

      <section className={styles.questionsBlock}>
        <span className={styles.subhead}>Question weights</span>
        <ul className={styles.questions}>
          {questions.map((q) => {
            const share = total > 0 ? Math.round((q.points / total) * 100) : 0
            return (
              <li key={q.id} className={styles.questionRow}>
                <span className={styles.questionLabel}>{q.label}</span>
                <span className={styles.questionTrack}>
                  <span
                    className={styles.questionFill}
                    style={{ width: `${share}%` }}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.questionValue}>
                  <span className={styles.questionPts}>{q.points}</span>
                  <span className={styles.questionShare}>{share}%</span>
                </span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.thresholdRow}>
        <span className={styles.subhead}>Pass threshold</span>
        <div className={styles.thresholdGauge}>
          <span className={styles.thresholdTrack}>
            <span
              className={styles.thresholdMarker}
              style={{ left: `${passThreshold}%` }}
              aria-hidden="true"
            />
          </span>
          <span className={styles.thresholdValue}>{passThreshold}%</span>
        </div>
      </section>

      <section className={styles.bandsBlock}>
        <span className={styles.subhead}>Tone bands</span>
        <ul className={styles.bands}>
          {bands.map((band) => (
            <li key={band.id} className={[styles.band, BAND_TONE[band.id]].join(" ")}>
              <span className={styles.bandHead}>
                <span className={styles.bandLabel}>{band.label}</span>
                <span className={styles.bandRange}>
                  {band.minPercent}% – {band.maxPercent}%
                </span>
              </span>
              <span className={styles.bandDescription}>{band.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
